import React, { useState } from 'react';
import { Search, Filter, Play, Pause, Download, Heart, ShoppingBag, Grid3x3, List, Flag, Shield } from 'lucide-react';
import { useAudio } from '../contexts/AudioContext';
import { usePacks } from '../contexts/PackContext';
import { useAuth } from '../contexts/AuthContext';
import { useNotifications } from '../components/NotificationSystem';
import { supabase } from '../lib/supabase';
import AudioPlayer from '../components/AudioPlayer';
import BlockchainPaymentModal from '../components/BlockchainPaymentModal';
import AutomatedLicensing from '../components/AutomatedLicensing';
import EnhancedAutomatedLicensing from '../components/EnhancedAutomatedLicensing';
import ContentReportModal from '../components/ContentReportModal';
import SafetyBadges from '../components/SafetyBadges';

export default function CreatorMarketplace() {
  const { snippets, loading: snippetsLoading, searchSnippets, currentlyPlaying, playSnippet, pauseSnippet } = useAudio();
  const { packs, loading: packsLoading, searchPacks } = usePacks();
  const { user } = useAuth();
  const loading = snippetsLoading || packsLoading;
  const { addNotification } = useNotifications();
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: '',
    mood: '',
    minPrice: '',
    maxPrice: '',
    duration: '',
    packType: ''
  });
  const [viewMode, setViewMode] = useState<'packs' | 'tracks'>('packs');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState<string | null>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showLicensing, setShowLicensing] = useState(false);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [processingPayment, setProcessingPayment] = useState(false);
  const [reportSnippet, setReportSnippet] = useState<{id: string; ownerId: string; title: string} | null>(null);

  const filteredSnippets = searchSnippets(searchQuery, filters);
  const filteredPacks = searchPacks(searchQuery, { packType: filters.packType, minPrice: filters.minPrice, maxPrice: filters.maxPrice });

  const handlePlayPause = (snippetId: string) => {
    if (currentlyPlaying === snippetId) {
      pauseSnippet();
    } else {
      playSnippet(snippetId);
    }
  };

  const handleLicense = (snippetId: string) => {
    setSelectedSnippet(snippetId);
    setShowLicensing(true);
  };

  const handleLicenseComplete = (licenseId: string) => {
    setShowLicensing(false);
    // Navigate to license download page or show success
  };

  const handlePackPurchase = async (packId: string, price: number) => {
    if (!user) {
      addNotification({
        type: 'error',
        title: 'Login Required',
        message: 'Please log in to purchase packs'
      });
      return;
    }

    setProcessingPayment(true);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        throw new Error('Please log in to continue');
      }

      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/stripe-checkout`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            productType: 'pack',
            packId: packId,
            price: price,
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Payment failed');
      }

      const { url } = await response.json();
      window.location.href = url;
    } catch (error) {
      console.error('Payment failed:', error);
      addNotification({
        type: 'error',
        title: 'Payment Failed',
        message: error instanceof Error ? error.message : 'Unable to process payment'
      });
    } finally {
      setProcessingPayment(false);
    }
  };

  const toggleFavorite = (snippetId: string) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(snippetId)) {
      newFavorites.delete(snippetId);
      addNotification({
        type: 'info',
        title: 'Removed from Favorites',
        message: 'Snippet removed from your favorites'
      });
    } else {
      newFavorites.add(snippetId);
      addNotification({
        type: 'success',
        title: 'Added to Favorites',
        message: 'Snippet added to your favorites'
      });
    }
    setFavorites(newFavorites);
    console.log('Toggled favorite for snippet:', snippetId, 'Now favorited:', newFavorites.has(snippetId));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading snippets...</h2>
          <p className="text-gray-400">Finding the perfect sounds for you</p>
        </div>
      </div>
    );
  }

  // Map artist names to their Pexels images
  const artistImages: Record<string, string> = {
    'DJ SynthWave': 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400',
    'BeatsMaster': 'https://images.pexels.com/photos/7520390/pexels-photo-7520390.jpeg?auto=compress&cs=tinysrgb&w=400',
    'LoFi Producer': 'https://images.pexels.com/photos/744780/pexels-photo-744780.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Tropical Vibes': 'https://images.pexels.com/photos/1560424/pexels-photo-1560424.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Rock Legend': 'https://images.pexels.com/photos/1047442/pexels-photo-1047442.jpeg?auto=compress&cs=tinysrgb&w=400'
  };

  // Map genres to visual images
  const genreImages: Record<string, string> = {
    'Electronic': 'https://images.pexels.com/photos/1626481/pexels-photo-1626481.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Hip Hop': 'https://images.pexels.com/photos/1370545/pexels-photo-1370545.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Lo-Fi': 'https://images.pexels.com/photos/1376867/pexels-photo-1376867.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Pop': 'https://images.pexels.com/photos/417023/pexels-photo-417023.jpeg?auto=compress&cs=tinysrgb&w=400',
    'Rock': 'https://images.pexels.com/photos/1916824/pexels-photo-1916824.jpeg?auto=compress&cs=tinysrgb&w=400'
  };

  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <ShoppingBag className="h-10 w-10 text-purple-400" />
            <h1 className="text-4xl font-bold text-white">Audio Utility Store</h1>
          </div>
          <p className="text-xl text-gray-300">
            {viewMode === 'packs' ? filteredPacks.length : filteredSnippets.length} {viewMode === 'packs' ? 'packs' : 'assets'} ready for creators
          </p>

          {/* View Mode Toggle */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setViewMode('packs')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'packs'
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <Grid3x3 className="h-4 w-4" />
              <span>Browse Packs</span>
            </button>
            <button
              onClick={() => setViewMode('tracks')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all ${
                viewMode === 'tracks'
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              <List className="h-4 w-4" />
              <span>Individual Assets</span>
            </button>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search packs, creators, use cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 focus:ring-2 focus:ring-purple-400/20"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-200"
            >
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
                  <select
                    value={filters.genre}
                    onChange={(e) => setFilters(prev => ({ ...prev, genre: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="">All Genres</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Hip-Hop">Hip-Hop</option>
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    <option value="Ambient">Ambient</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Mood</label>
                  <select
                    value={filters.mood}
                    onChange={(e) => setFilters(prev => ({ ...prev, mood: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="">All Moods</option>
                    <option value="happy">Happy</option>
                    <option value="energetic">Energetic</option>
                    <option value="chill">Chill</option>
                    <option value="aggressive">Aggressive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Min Price</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="$0.00"
                    value={filters.minPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, minPrice: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Max Price</label>
                  <input
                    type="number"
                    step="0.01"
                    placeholder="$1.00"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters(prev => ({ ...prev, maxPrice: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Duration</label>
                  <select
                    value={filters.duration}
                    onChange={(e) => setFilters(prev => ({ ...prev, duration: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="">Any Length</option>
                    <option value="15">15 seconds</option>
                    <option value="30">30 seconds</option>
                    <option value="60">60 seconds</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Results Grid */}
        {viewMode === 'packs' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPacks.map((pack) => {
              const effectivePrice = pack.promo_price || pack.price;
              const hasPromo = pack.promo_price !== null;

              return (
                <div key={pack.id} className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  {/* Pack Cover */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={pack.featured_image_url || 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400'}
                      alt={pack.pack_name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 right-3">
                      <span className="px-3 py-1 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full text-xs font-bold text-white">
                        {pack.asset_count} Assets
                      </span>
                    </div>
                    {hasPromo && (
                      <div className="absolute top-3 left-3">
                        <span className="px-3 py-1 bg-red-500 rounded-full text-xs font-bold text-white">
                          PROMO
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Pack Content */}
                  <div className="p-6">
                    <div className="mb-4">
                      <h3 className="text-lg font-semibold text-white mb-1">{pack.pack_name}</h3>
                      <p className="text-gray-400 text-sm line-clamp-2">{pack.pack_description}</p>
                    </div>

                    {/* Use Cases */}
                    <div className="mb-4">
                      <div className="flex flex-wrap gap-2">
                        {pack.use_cases.slice(0, 3).map((useCase, index) => (
                          <span key={index} className="px-2 py-1 text-xs bg-cyan-500/20 text-cyan-300 rounded-full">
                            {useCase}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Pack Stats */}
                    <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                      <span>{Math.floor(pack.total_duration / 60)}:{String(pack.total_duration % 60).padStart(2, '0')} total</span>
                      <span className="capitalize">{pack.pack_type.replace('_', ' ')}</span>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        {hasPromo && (
                          <span className="text-sm text-gray-400 line-through">${pack.price.toFixed(2)}</span>
                        )}
                        <span className="text-2xl font-bold text-white">
                          ${effectivePrice.toFixed(2)}
                        </span>
                      </div>
                      <button
                        onClick={() => handlePackPurchase(pack.id, effectivePrice)}
                        className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
                      >
                        <Download className="h-4 w-4" />
                        <span>Get Pack</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSnippets.map((snippet) => {
            const coverImage = artistImages[snippet.artist] || genreImages[snippet.genre] || 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=400';

            return (
              <div key={snippet.id} className="bg-white/5 backdrop-blur-lg rounded-xl overflow-hidden border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                {/* Cover Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={coverImage}
                    alt={`${snippet.title} by ${snippet.artist}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 flex space-x-2">
                    <button
                      onClick={() => toggleFavorite(snippet.id)}
                      className="p-2 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-lg transition-colors"
                    >
                      <Heart className={`h-5 w-5 transition-colors ${
                        favorites.has(snippet.id)
                          ? 'text-red-400 fill-current'
                          : 'text-white hover:text-red-400'
                      }`} />
                    </button>
                    <button
                      onClick={() => setReportSnippet({id: snippet.id, ownerId: snippet.artistId || '', title: snippet.title})}
                      className="p-2 bg-black/50 backdrop-blur-sm hover:bg-black/70 rounded-lg transition-colors"
                      title="Report content"
                    >
                      <Flag className="h-5 w-5 text-white hover:text-red-400" />
                    </button>
                  </div>
                  <div className="absolute bottom-3 left-3">
                    <button
                      onClick={() => handlePlayPause(snippet.id)}
                      className="p-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full hover:from-purple-600 hover:to-cyan-600 transition-all duration-200 shadow-lg"
                    >
                      {currentlyPlaying === snippet.id ? (
                        <Pause className="h-5 w-5 text-white" />
                      ) : (
                        <Play className="h-5 w-5 text-white" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{snippet.title}</h3>
                        <p className="text-gray-400">by {snippet.artist}</p>
                      </div>
                      <SafetyBadges
                        trustLevel="gold"
                        trustScore={85}
                        emailVerified={true}
                        stripeVerified={true}
                      />
                    </div>
                  </div>

                  {/* Tags and Info */}
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2 mb-3">
                      {snippet.mood.slice(0, 2).map((mood, index) => (
                        <span key={index} className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                          {mood}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <span>{snippet.genre}</span>
                      <span>{snippet.bpm} BPM</span>
                      <span>{Math.floor(snippet.duration / 60)}:{String(snippet.duration % 60).padStart(2, '0')}</span>
                    </div>
                  </div>

                  {/* Waveform */}
                  <div className="mb-4">
                    <AudioPlayer snippet={snippet} />
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between">
                    <div className="text-2xl font-bold text-white">
                      ${snippet.price.toFixed(2)}
                    </div>
                    <button
                      onClick={() => handleLicense(snippet.id)}
                      className="flex items-center space-x-2 px-5 py-2.5 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200 shadow-lg"
                    >
                      <Download className="h-4 w-4" />
                      <span>License Now</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
          </div>
        )}

        {/* Empty State */}
        {viewMode === 'packs' && filteredPacks.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No performance packs found matching your criteria.</p>
          </div>
        )}

        {viewMode === 'tracks' && filteredSnippets.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">No individual assets found matching your criteria.</p>
          </div>
        )}

        {/* Blockchain Payment Modal */}
        {showPaymentModal && selectedSnippet && (
          <BlockchainPaymentModal
            snippet={snippets.find(s => s.id === selectedSnippet)!}
            onClose={() => setShowPaymentModal(false)}
          />
        )}

        {/* Enhanced Automated Licensing */}
        {showLicensing && selectedSnippet && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <EnhancedAutomatedLicensing
              snippetId={selectedSnippet}
              onLicenseComplete={handleLicenseComplete}
              onClose={() => setShowLicensing(false)}
            />
          </div>
        )}

        {/* Content Report Modal */}
        {reportSnippet && (
          <ContentReportModal
            snippetId={reportSnippet.id}
            contentOwnerId={reportSnippet.ownerId}
            snippetTitle={reportSnippet.title}
            onClose={() => setReportSnippet(null)}
          />
        )}

        {/* Platform Safety Info */}
        <div className="mt-12 bg-gradient-to-br from-cyan-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-8">
          <div className="flex items-start space-x-4">
            <Shield className="h-8 w-8 text-cyan-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-white mb-2">Safe & Secure Marketplace</h3>
              <p className="text-gray-300 mb-4">
                Every transaction is protected by payment escrow, fraud detection, and dispute resolution.
                All artists are verified and all content is moderated for quality and legality.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="bg-cyan-500/10 rounded-lg p-3">
                  <div className="text-cyan-200 font-semibold mb-1">Escrow Protection</div>
                  <div className="text-cyan-300">Payments held until delivery confirmed</div>
                </div>
                <div className="bg-purple-500/10 rounded-lg p-3">
                  <div className="text-purple-200 font-semibold mb-1">Verified Artists</div>
                  <div className="text-purple-300">Multi-level verification system</div>
                </div>
                <div className="bg-blue-500/10 rounded-lg p-3">
                  <div className="text-blue-200 font-semibold mb-1">Dispute Support</div>
                  <div className="text-blue-300">Fair resolution within 5-7 days</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}