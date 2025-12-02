import React, { createContext, useContext, useState, ReactNode } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import type { User as SupabaseUser } from '@supabase/supabase-js';
import { useNotifications } from '../components/NotificationSystem';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'artist' | 'creator';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string, role: 'artist' | 'creator') => Promise<void>;
  register: (email: string, password: string, name: string, role: 'artist' | 'creator') => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { addNotification } = useNotifications();

  React.useEffect(() => {
    // Safety timeout - stop loading after 5 seconds regardless
    const timeout = setTimeout(() => {
      console.warn('Auth initialization timeout - forcing load');
      setLoading(false);
    }, 5000);

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchUserProfile(session.user);
      } else {
        setLoading(false);
      }
      clearTimeout(timeout);
    }).catch((error) => {
      console.error('Error getting session:', error);
      setLoading(false);
      clearTimeout(timeout);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        await fetchUserProfile(session.user);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
      clearTimeout(timeout);
    };
  }, []);

  const fetchUserProfile = async (authUser: SupabaseUser) => {
    try {
      const profileTimeout = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Profile fetch timeout')), 3000)
      );

      const profileFetch = supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .maybeSingle();

      const { data, error } = await Promise.race([profileFetch, profileTimeout]) as any;

      if (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }

      if (!data) {
        console.error('No profile found for user:', authUser.id);
        addNotification({
          type: 'error',
          title: 'Profile Not Found',
          message: 'Your profile was not found. Please contact support.'
        });
        setLoading(false);
        return;
      }

      setUser({
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role
      });
    } catch (error) {
      console.error('Error fetching user profile:', error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string, role: 'artist' | 'creator') => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    });
    if (error) {
      addNotification({
        type: 'error',
        title: 'Login Failed',
        message: error.message
      });
      throw error;
    }
    
    addNotification({
      type: 'success',
      title: 'Welcome Back!',
      message: 'You have successfully logged in to V3B Music'
    });
  };

  const register = async (email: string, password: string, name: string, role: 'artist' | 'creator') => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name,
          role
        }
      }
    });
    if (error) {
      addNotification({
        type: 'error',
        title: 'Registration Failed',
        message: error.message
      });
      throw error;
    }
    
    addNotification({
      type: 'success',
      title: 'Account Created!',
      message: 'Welcome to V3BMusic.Ai! Your account has been created successfully.'
    });
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    
    addNotification({
      type: 'info',
      title: 'Logged Out',
      message: 'You have been successfully logged out'
    });
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}