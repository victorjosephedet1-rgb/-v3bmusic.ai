import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { DollarSign, TrendingUp, Music, Eye, Download, Users, Calendar, Shield, Zap, CreditCard as Edit, Trash2, BarChart3, Clock, Globe, CheckCircle, Award, User, Save, MapPin, Briefcase } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useNotifications } from '../components/NotificationSystem';
import EnhancedUploadModal from '../components/EnhancedUploadModal';
import ProfileGalleryManager from '../components/ProfileGalleryManager';
import ProfileVideoManager from '../components/ProfileVideoManager';

interface TrackStats {
  id: string;
  title: string;
  cover_image_url: string | null;
  play_count: number;
  license_count: number;
  total_revenue: number;
  genre: string;
  created_at: string;
  is_featured: boolean;
  is_verified: boolean;
}

interface EarningsSummary {
  today: number;
  this_week: number;
  this_month: number;
  all_time: number;
  pending: number;
}

interface RecentTransaction {
  id: string;
  amount: number;
  track_title: string;
  buyer_name: string;
  created_at: string;
  status: string;
}

export default function EnhancedArtistDashboard() {
  const { user } = useAuth();
  const { addNotification } = useNotifications();
  const [loading, setLoading] = useState(true);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'profile'>('dashboard');

  const [tracks, setTracks] = useState<TrackStats[]>([]);
  const [earnings, setEarnings] = useState<EarningsSummary>({
    today: 0,
    this_week: 0,
    this_month: 0,
    all_time: 0,
    pending: 0
  });
  const [recentTransactions, setRecentTransactions] = useState<RecentTransaction[]>([]);
  const [profileData, setProfileData] = useState<any>(null);
  const [editProfile, setEditProfile] = useState({
    name: '',
    headline: '',
    bio: '',
    location: '',
    is_profile_public: false
  });

  useEffect(() => {
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const loadDashboardData = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Load profile with earnings
      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      setProfileData(profile);
      setEditProfile({
        name: profile?.name || '',
        headline: profile?.headline || '',
    // eslint-disable-next-line react-hooks/exhaustive-deps
        bio: profile?.bio || '',
        location: profile?.location || '',
        is_profile_public: profile?.is_profile_public || false
      });

      // Load tracks with stats
      const { data: tracksData, error: tracksError } = await supabase
        .from('audio_snippets')
        .select('*')
        .eq('artist_id', user.id)
        .order('created_at', { ascending: false });

      if (tracksError) throw tracksError;
      setTracks(tracksData || []);

      // Load earnings summary (mock data for now - will be calculated from transactions)
      const totalRevenue = tracksData?.reduce((sum, track) => sum + (track.total_revenue || 0), 0) || 0;
      setEarnings({
        today: totalRevenue * 0.05, // Mock: 5% today
        this_week: totalRevenue * 0.15, // Mock: 15% this week
        this_month: totalRevenue * 0.3, // Mock: 30% this month
        all_time: totalRevenue,
        pending: totalRevenue * 0.1 // Mock: 10% pending
      });

      // Load recent transactions
      const { data: transactions } = await supabase
        .from('payment_transactions')
        .select(`
          id,
          amount,
          created_at,
          status,
          snippet_id,
          buyer_id,
          audio_snippets!inner(title),
          profiles!payment_transactions_buyer_id_fkey(name)
        `)
        .in('snippet_id', tracksData?.map(t => t.id) || [])
        .order('created_at', { ascending: false })
        .limit(10);

      setRecentTransactions(transactions?.map((t: any) => ({
        id: t.id,
        amount: t.amount,
        track_title: t.audio_snippets?.title || 'Unknown',
        buyer_name: t.profiles?.name || 'Unknown',
        created_at: t.created_at,
        status: t.status
      })) || []);

    } catch (error) {
      console.error('Error loading dashboard:', error);
      addNotification({
        type: 'error',
        title: 'Load Error',
        message: 'Failed to load dashboard data'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUploadSuccess = () => {
    loadDashboardData();
  };

  const handleProfileUpdate = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          name: editProfile.name,
          headline: editProfile.headline,
          bio: editProfile.bio,
          location: editProfile.location,
          is_profile_public: editProfile.is_profile_public
        })
        .eq('id', user.id);

      if (error) throw error;

      addNotification({
        type: 'success',
        title: 'Profile Updated',
        message: 'Your profile has been saved successfully'
      });

      loadDashboardData();
    } catch (error) {
      console.error('Error updating profile:', error);
      addNotification({
        type: 'error',
        title: 'Update Failed',
        message: 'Failed to update profile. Please try again.'
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-purple-400 mx-auto mb-4"></div>
          <h2 className="text-2xl font-bold text-white mb-2">Loading Dashboard...</h2>
          <p className="text-gray-400">Fetching your data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-4xl font-bold text-white">Artist Dashboard</h1>
              {profileData?.is_verified && (
                <div className="flex items-center space-x-1 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full">
                  <CheckCircle className="h-4 w-4 text-blue-400" />
                  <span className="text-xs font-medium text-blue-300">Verified Artist</span>
                </div>
              )}
            </div>
            <p className="text-xl text-gray-300">Welcome back, {profileData?.name || 'Artist'}!</p>
          </div>
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <button
              onClick={() => setActiveTab(activeTab === 'dashboard' ? 'profile' : 'dashboard')}
              className="px-6 py-3 bg-white/10 text-white rounded-lg font-medium hover:bg-white/20 transition-all flex items-center space-x-2 border border-white/20"
            >
              <User className="h-5 w-5" />
              <span>{activeTab === 'dashboard' ? 'Edit Profile' : 'View Dashboard'}</span>
            </button>
            <button
              onClick={() => setShowUploadModal(true)}
              className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-cyan-600 transition-all flex items-center space-x-2"
            >
              <Music className="h-5 w-5" />
              <span>Upload New Track</span>
            </button>
          </div>
        </div>

        {activeTab === 'profile' ? (
          /* Profile Editing Section */
          <div className="space-y-6">
            <div className="card-professional p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Edit Your Profile</h2>
                <button
                  onClick={handleProfileUpdate}
                  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-cyan-600 transition-all flex items-center space-x-2"
                >
                  <Save className="h-5 w-5" />
                  <span>Save Profile</span>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Artist Name
                  </label>
                  <input
                    type="text"
                    value={editProfile.name}
                    onChange={(e) => setEditProfile({ ...editProfile, name: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="Your artist name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <Briefcase className="h-4 w-4 inline mr-1" />
                    Headline
                  </label>
                  <input
                    type="text"
                    value={editProfile.headline}
                    onChange={(e) => setEditProfile({ ...editProfile, headline: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="e.g., Producer, Singer-Songwriter, Multi-instrumentalist"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={editProfile.location}
                    onChange={(e) => setEditProfile({ ...editProfile, location: e.target.value })}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
                    placeholder="e.g., Los Angeles, CA"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Bio
                  </label>
                  <textarea
                    value={editProfile.bio}
                    onChange={(e) => setEditProfile({ ...editProfile, bio: e.target.value })}
                    rows={6}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
                    placeholder="Tell your story... Share your musical journey, influences, and what makes your sound unique."
                  />
                </div>

                <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-lg">
                  <div>
                    <h3 className="text-white font-medium">Make Profile Public</h3>
                    <p className="text-sm text-gray-400 mt-1">
                      Your profile will be visible at: v3bmusic.ai/artist/{profileData?.profile_slug || 'your-name'}
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={editProfile.is_profile_public}
                      onChange={(e) => setEditProfile({ ...editProfile, is_profile_public: e.target.checked })}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="card-professional p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Gallery</h2>
              <ProfileGalleryManager profileId={user?.id || ''} />
            </div>

            <div className="card-professional p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Videos</h2>
              <ProfileVideoManager profileId={user?.id || ''} />
            </div>
          </div>
        ) : (
          <>
        {/* Earnings Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="card-professional p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Today</span>
              <DollarSign className="h-5 w-5 text-green-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              ${earnings.today.toFixed(2)}
            </div>
            <div className="flex items-center space-x-1 text-green-400 text-sm">
              <TrendingUp className="h-4 w-4" />
              <span>+12%</span>
            </div>
          </div>

          <div className="card-professional p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">This Week</span>
              <Calendar className="h-5 w-5 text-blue-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              ${earnings.this_week.toFixed(2)}
            </div>
            <div className="flex items-center space-x-1 text-blue-400 text-sm">
              <TrendingUp className="h-4 w-4" />
              <span>+8%</span>
            </div>
          </div>

          <div className="card-professional p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">This Month</span>
              <BarChart3 className="h-5 w-5 text-purple-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              ${earnings.this_month.toFixed(2)}
            </div>
            <div className="flex items-center space-x-1 text-purple-400 text-sm">
              <TrendingUp className="h-4 w-4" />
              <span>+15%</span>
            </div>
          </div>

          <div className="card-professional p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">All Time</span>
              <Globe className="h-5 w-5 text-cyan-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              ${earnings.all_time.toFixed(2)}
            </div>
            <div className="text-sm text-gray-400">
              Total Earnings
            </div>
          </div>

          <div className="card-professional p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400 text-sm">Pending</span>
              <Clock className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="text-3xl font-bold text-white mb-1">
              ${earnings.pending.toFixed(2)}
            </div>
            <div className="text-sm text-yellow-400">
              Processing
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="card-professional p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Music className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{tracks.length}</div>
                <div className="text-sm text-gray-400">Published Tracks</div>
              </div>
            </div>
          </div>

          <div className="card-professional p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Eye className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {tracks.reduce((sum, t) => sum + t.play_count, 0).toLocaleString()}
                </div>
                <div className="text-sm text-gray-400">Total Plays</div>
              </div>
            </div>
          </div>

          <div className="card-professional p-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Download className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white">
                  {tracks.reduce((sum, t) => sum + t.license_count, 0)}
                </div>
                <div className="text-sm text-gray-400">Licenses Sold</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Your Tracks */}
          <div className="lg:col-span-2">
            <div className="card-professional p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-white">Your Tracks</h2>
                <button className="text-purple-400 hover:text-purple-300 transition-colors">
                  View All
                </button>
              </div>

              {tracks.length === 0 ? (
                <div className="text-center py-12">
                  <Music className="h-16 w-16 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">No Tracks Yet</h3>
                  <p className="text-gray-400 mb-6">Upload your first track to get started</p>
                  <button
                    onClick={() => setShowUploadModal(true)}
                    className="px-6 py-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-cyan-600 transition-all"
                  >
                    Upload Track
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {tracks.map((track) => (
                    <div key={track.id} className="bg-white/5 rounded-lg p-4 border border-white/10 hover:bg-white/10 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-cyan-500 rounded-lg flex-shrink-0">
                          {track.cover_image_url ? (
                            <img src={track.cover_image_url} alt={track.title} className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <Music className="h-8 w-8 text-white" />
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-white font-semibold truncate">{track.title}</h3>
                            {track.is_featured && (
                              <Award className="h-4 w-4 text-yellow-400" />
                            )}
                          </div>
                          <div className="flex items-center space-x-4 text-sm text-gray-400">
                            <span className="flex items-center space-x-1">
                              <Eye className="h-4 w-4" />
                              <span>{track.play_count}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <Download className="h-4 w-4" />
                              <span>{track.license_count}</span>
                            </span>
                            <span className="flex items-center space-x-1">
                              <DollarSign className="h-4 w-4" />
                              <span>${track.total_revenue.toFixed(2)}</span>
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <BarChart3 className="h-5 w-5 text-gray-400 hover:text-white" />
                          </button>
                          <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                            <Edit className="h-5 w-5 text-gray-400 hover:text-white" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Recent Transactions */}
          <div>
            <div className="card-professional p-6">
              <h2 className="text-2xl font-bold text-white mb-6">Recent Sales</h2>

              {recentTransactions.length === 0 ? (
                <div className="text-center py-8">
                  <DollarSign className="h-12 w-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-400">No transactions yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-green-400 font-bold">
                          +${transaction.amount.toFixed(2)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          transaction.status === 'completed'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {transaction.status}
                        </span>
                      </div>
                      <div className="text-sm text-white truncate mb-1">
                        {transaction.track_title}
                      </div>
                      <div className="text-xs text-gray-400">
                        by {transaction.buyer_name}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Payment Methods */}
            <div className="card-professional p-6 mt-6">
              <h3 className="text-lg font-bold text-white mb-4">Payout Methods</h3>
              <div className="space-y-3">
                <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Zap className="h-5 w-5 text-purple-400" />
                      <span className="text-white">Blockchain</span>
                    </div>
                    <span className="text-xs text-green-400">Active</span>
                  </div>
                </div>
                <button className="w-full py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/20 transition-colors text-sm">
                  Add Payment Method
                </button>
              </div>
            </div>
          </div>
        </div>
          </>
        )}
      </div>

      {showUploadModal && (
        <EnhancedUploadModal
          onClose={() => setShowUploadModal(false)}
          onSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
}
