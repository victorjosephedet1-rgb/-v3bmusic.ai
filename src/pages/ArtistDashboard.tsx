import React, { useState } from 'react';
import { Upload, Music2, DollarSign, TrendingUp, Eye, Download, Shield, CreditCard, Brain, Globe, Zap, BarChart3, Coins, Activity } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAudio } from '../contexts/AudioContext';
import { useNotifications } from '../components/NotificationSystem';
import ErrorBoundary from '../components/ErrorBoundary';
import UploadModal from '../components/UploadModal';
import CopyrightProtection from '../components/CopyrightProtection';
import StripeConnect from '../components/StripeConnect';
import AIRecommendationEngine from '../components/AIRecommendationEngine';
import GlobalRoyaltyTracking from '../components/GlobalRoyaltyTracking';
import InstantPayoutSystem from '../components/InstantPayoutSystem';
import BlockchainRoyaltyLedger from '../components/BlockchainRoyaltyLedger';
import ProfileGalleryManager from '../components/ProfileGalleryManager';
import ProfileVideoManager from '../components/ProfileVideoManager';

export default function ArtistDashboard() {
  const { user } = useAuth();
  const { snippets, loading } = useAudio();
  const { addNotification } = useNotifications();
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'snippets' | 'profile' | 'ai-insights' | 'global-royalties' | 'instant-payouts' | 'blockchain' | 'protection' | 'payouts'>('overview');
  const [stripeConnected, setStripeConnected] = useState(false);

  const handleUploadClick = () => {
    console.log('Upload New Track button clicked');
    try {
      setShowUploadModal(true);
      addNotification({
        type: 'info',
        title: 'Upload Modal Opening',
        message: 'Preparing upload interface...'
      });
    } catch (error) {
      console.error('Error opening upload modal:', error);
      addNotification({
        type: 'error',
        title: 'Upload Error',
        message: 'Failed to open upload modal. Please try again.'
      });
    }
  };

  const handleUploadClose = () => {
    console.log('Upload modal closing');
    setShowUploadModal(false);
  };
  // Filter snippets for current artist
  const artistSnippets = snippets.filter(snippet => snippet.artistId === user?.id);

  // Mock analytics data
  const analytics = {
    totalEarnings: 127.45,
    totalLicenses: 1247,
    thisMonthEarnings: 23.80,
    thisMonthLicenses: 156,
    topPerformer: artistSnippets[0]?.title || 'No snippets yet'
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading dashboard...</h2>
          <p className="text-gray-400">Getting your latest data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <BarChart3 className="h-10 w-10 text-purple-400" />
              <h1 className="text-4xl font-bold text-white">Artist Dashboard</h1>
            </div>
            <p className="text-xl text-gray-300">Welcome back, {user?.name}!</p>
          </div>
          <button
            onClick={handleUploadClick}
            className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl text-white hover:from-purple-600 hover:to-cyan-600 transition-all duration-200"
          >
            <Upload className="h-5 w-5" />
            <span>Upload New Track</span>
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: Activity },
            { id: 'snippets', label: 'My Snippets', icon: Music2 },
            { id: 'profile', label: 'Profile Hub', icon: Eye },
            { id: 'ai-insights', label: 'AI Insights', icon: Brain },
            { id: 'global-royalties', label: 'Global Royalties', icon: Globe },
            { id: 'instant-payouts', label: 'Instant Payouts', icon: Zap },
            { id: 'protection', label: 'Copyright Protection', icon: Shield },
            { id: 'blockchain', label: 'Blockchain Ledger', icon: Coins },
            { id: 'payouts', label: 'Payouts', icon: CreditCard }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-green-500/20 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Earnings</p>
                <p className="text-2xl font-bold text-white">${analytics.totalEarnings}</p>
              </div>
            </div>
            <div className="text-sm text-green-400">
              +${analytics.thisMonthEarnings} this month
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Download className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Total Licenses</p>
                <p className="text-2xl font-bold text-white">{analytics.totalLicenses.toLocaleString()}</p>
              </div>
            </div>
            <div className="text-sm text-blue-400">
              +{analytics.thisMonthLicenses} this month
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Music className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Active Snippets</p>
                <p className="text-2xl font-bold text-white">{artistSnippets.length}</p>
              </div>
            </div>
            <div className="text-sm text-purple-400">
              Ready for licensing
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-3">
              <div className="p-2 bg-orange-500/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Top Performer</p>
                <p className="text-lg font-bold text-white truncate">{analytics.topPerformer}</p>
              </div>
            </div>
            <div className="text-sm text-orange-400">
              Most licensed track
            </div>
          </div>
        </div>
          </>
        )}

        {activeTab === 'snippets' && (
          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
          <div className="p-6 border-b border-white/10">
            <h2 className="text-2xl font-bold text-white mb-2">Your Snippets</h2>
            <p className="text-gray-400">Manage your uploaded tracks and snippets</p>
          </div>

          {artistSnippets.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-white/5">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Title</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Duration</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Price</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Licenses</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Earnings</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Status</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-gray-400">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {artistSnippets.map((snippet, index) => (
                    <tr key={snippet.id} className="border-t border-white/10 hover:bg-white/5">
                      <td className="py-4 px-6">
                        <div>
                          <div className="text-white font-medium">{snippet.title}</div>
                          <div className="text-sm text-gray-400">{snippet.genre}</div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-300">{snippet.duration}s</td>
                      <td className="py-4 px-6 text-gray-300">${snippet.price.toFixed(2)}</td>
                      <td className="py-4 px-6 text-gray-300">{Math.floor(Math.random() * 500)}</td>
                      <td className="py-4 px-6 text-green-400">${(Math.random() * 50).toFixed(2)}</td>
                      <td className="py-4 px-6">
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                          Active
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <button 
                          onClick={() => {
                            console.log('View snippet details:', snippet.title);
                            addNotification({
                              type: 'info',
                              title: 'Snippet Details',
                              message: `Viewing details for "${snippet.title}"`
                            });
                          }}
                          className="p-2 text-gray-400 hover:text-white transition-colors"
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-12 text-center">
              <Music className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No snippets yet</h3>
              <p className="text-gray-400 mb-6">Upload your first track to start earning from licensing</p>
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg text-white hover:from-purple-600 hover:to-cyan-600 transition-all duration-200"
              >
                Upload Your First Track
              </button>
            </div>
          )}
        </div>
        )}

        {activeTab === 'royalties' && (
          <RoyaltyTracker artistId={user?.id || ''} />
        )}

        {activeTab === 'profile' && (
          <div className="space-y-8">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <h2 className="text-2xl font-bold text-white mb-4">Profile Hub</h2>
              <p className="text-gray-400 mb-6">
                Build your artist profile to connect with fans and showcase your creative journey.
                Your profile will be public at: v3bmusic.ai/artist/{user?.name?.toLowerCase().replace(/\s+/g, '-')}
              </p>

              <div className="bg-white rounded-xl p-6">
                <ProfileGalleryManager profileId={user?.id || ''} />
              </div>

              <div className="bg-white rounded-xl p-6 mt-6">
                <ProfileVideoManager profileId={user?.id || ''} />
              </div>
            </div>
          </div>
        )}

        {activeTab === 'ai-insights' && (
          <AIRecommendationEngine
            userId={user?.id || ''}
            userType="artist"
          />
        )}

        {activeTab === 'global-royalties' && (
          <GlobalRoyaltyTracking artistId={user?.id || ''} />
        )}

        {activeTab === 'instant-payouts' && (
          <InstantPayoutSystem 
            artistId={user?.id || ''} 
            balance={analytics.totalEarnings} 
          />
        )}

        {activeTab === 'blockchain' && (
          <BlockchainRoyaltyLedger artistId={user?.id || ''} />
        )}


        {activeTab === 'protection' && (
          <div>
            {artistSnippets.length > 0 ? (
              <CopyrightProtection 
                snippetId={artistSnippets[0].id}
                title={artistSnippets[0].title}
                artist={artistSnippets[0].artist}
              />
            ) : (
              <div className="text-center py-12 text-gray-400">
                Upload snippets to enable copyright protection
              </div>
            )}
          </div>
        )}

        {activeTab === 'payouts' && (
          <StripeConnect artistId={user?.id || ''} onConnected={setStripeConnected} />
        )}

        {/* Upload Modal */}
        {showUploadModal && (
          <ErrorBoundary>
            <UploadModal onClose={handleUploadClose} />
          </ErrorBoundary>
        )}
      </div>
    </div>
  );
}