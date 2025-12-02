import React, { createContext, useContext, useState, ReactNode } from 'react';
import { supabase } from '../lib/supabase';
import { useNotifications } from '../components/NotificationSystem';

export interface AudioPack {
  id: string;
  pack_name: string;
  pack_description: string | null;
  pack_type: 'hooks' | 'reactions' | 'transitions' | 'brand_kit' | 'bundle' | 'custom';
  creator_id: string;
  price: number;
  promo_price: number | null;
  asset_count: number;
  total_duration: number;
  use_cases: string[];
  is_active: boolean;
  featured_image_url: string | null;
  pack_sales_count: number;
  created_at: string;
  updated_at: string;
}

export interface PackAsset {
  id: string;
  pack_id: string;
  snippet_id: string;
  order_index: number;
  audio_snippets?: {
    title: string;
    artist: string;
    duration: number;
    audio_url: string;
  };
}

interface PackContextType {
  packs: AudioPack[];
  loading: boolean;
  refreshPacks: () => Promise<void>;
  getPackById: (id: string) => Promise<AudioPack | null>;
  getPackAssets: (packId: string) => Promise<PackAsset[]>;
  searchPacks: (query: string, filters: any) => AudioPack[];
}

const PackContext = createContext<PackContextType | undefined>(undefined);

export function PackProvider({ children }: { children: ReactNode }) {
  const [packs, setPacks] = useState<AudioPack[]>([]);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  React.useEffect(() => {
    refreshPacks();
  }, []);

  const refreshPacks = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('audio_packs')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setPacks(data || []);
    } catch (error) {
      console.error('Error fetching packs:', error);
      addNotification({
        type: 'error',
        title: 'Error Loading Packs',
        message: 'Unable to load audio utility packs. Please try again.'
      });
      setPacks([]);
    } finally {
      setLoading(false);
    }
  };

  const getPackById = async (id: string): Promise<AudioPack | null> => {
    try {
      const { data, error } = await supabase
        .from('audio_packs')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching pack:', error);
      return null;
    }
  };

  const getPackAssets = async (packId: string): Promise<PackAsset[]> => {
    try {
      const { data, error } = await supabase
        .from('pack_assets')
        .select(`
          id,
          pack_id,
          snippet_id,
          order_index,
          audio_snippets (
            title,
            artist,
            duration,
            audio_url
          )
        `)
        .eq('pack_id', packId)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error('Error fetching pack assets:', error);
      return [];
    }
  };

  const searchPacks = (query: string, filters: any) => {
    return packs.filter(pack => {
      const matchesQuery = !query ||
        pack.pack_name.toLowerCase().includes(query.toLowerCase()) ||
        pack.pack_description?.toLowerCase().includes(query.toLowerCase()) ||
        pack.use_cases.some(uc => uc.toLowerCase().includes(query.toLowerCase()));

      const matchesType = !filters.packType || pack.pack_type === filters.packType;
      const matchesPriceRange =
        (!filters.minPrice || (pack.promo_price || pack.price) >= filters.minPrice) &&
        (!filters.maxPrice || (pack.promo_price || pack.price) <= filters.maxPrice);

      return matchesQuery && matchesType && matchesPriceRange;
    });
  };

  const value = {
    packs,
    loading,
    refreshPacks,
    getPackById,
    getPackAssets,
    searchPacks
  };

  return (
    <PackContext.Provider value={value}>
      {children}
    </PackContext.Provider>
  );
}

export function usePacks() {
  const context = useContext(PackContext);
  if (context === undefined) {
    throw new Error('usePacks must be used within a PackProvider');
  }
  return context;
}
