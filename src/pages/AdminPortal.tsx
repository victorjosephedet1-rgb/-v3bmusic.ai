import React, { useState, useEffect } from 'react';
import { Upload, Users, Music, DollarSign, Settings, BarChart3, Shield, Database, Globe, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useAudio } from '../contexts/AudioContext';
import Analytics from '../components/Analytics';

export default function AdminPortal() {
  const { user } = useAuth();
  const { snippets, addSnippet } = useAudio();
  const [activeTab, setActiveTab] = useState<'overview' | 'upload' | 'users' | 'analytics' | 'settings'>('overview');
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [clientInfo, setClientInfo] = useState({
    artistName: '',
    email: '',
    title: '',
    genre: '',
    price: '0.15'
  });

  // Mock admin data
  const adminStats = {
    totalUsers: 50847293,
    totalRevenue: 28475045.67,
    totalSnippets: 5632847,
    totalLicenses: 189347293,
    monthlyGrowth: 156.7,
    topGenres: [
      { name: 'Hip-Hop', count: 12470000, revenue: 4567890.45 },
      { name: 'Electronic', count: 8920000, revenue: 3214567.89 },
      { name: 'Pop', count: 6540000, revenue: 2893412.34 }
    ],
    recentActivity: [
      { id: '1', type: 'license', user: 'GlobalCreator_US', snippet: 'Summer Vibes', amount: 0.15, timestamp: '2 seconds ago' },
      { id: '2', type: 'upload', user: 'ArtistXYZ_EU', snippet: 'Night Drive', timestamp: '5 seconds ago' },
      { id: '3', type: 'signup', user: 'NewUser_APAC', timestamp: '12 seconds ago' },
      { id: '4', type: 'license', user: 'Creator_BR', snippet: 'Tropical Beat', amount: 0.25, timestamp: '18 seconds ago' },
      { id: '5', type: 'license', user: 'Influencer_JP', snippet: 'City Lights', amount: 0.12, timestamp: '23 seconds ago' }
    ]
  };

  const handleClientUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadFile || !clientInfo.artistName || !clientInfo.title) return;

    try {
      await addSnippet({
        title: clientInfo.title,
        artist: clientInfo.artistName,
        duration: 30, // Default duration
        price: parseFloat(clientInfo.price),
        mood: ['energetic'], // Default mood
        bpm: 120, // Default BPM
        genre: clientInfo.genre,
        audioUrl: URL.createObjectURL(uploadFile),
        waveformData: Array.from({ length: 100 }, () => Math.random()),
        artistId: 'admin-upload'
      });

      // Reset form
      setUploadFile(null);
      setClientInfo({
        artistName: '',
        email: '',
        title: '',
        genre: '',
        price: '0.15'
      });

      alert('Music uploaded successfully for client!');
    } catch (error) {
      console.error('Upload failed:', error);
      alert('Upload failed. Please try again.');
    }
  };

  // Check if user is admin (in real app, this would be a proper role check)
  if (!user || user.email !== 'admin@v3bmusic.com') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400">You don't have permission to access the admin portal.</p>
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
            <h1 className="text-4xl font-bold text-white mb-2">Enterprise Admin Portal</h1>
            <p className="text-xl text-gray-300">V3B Music Global Platform Management</p>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-green-400 text-sm">Global System Online - 99.99% Uptime</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-8 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview', icon: BarChart3 },
            { id: 'upload', label: 'Upload for Clients', icon: Upload },
            { id: 'users', label: 'User Management', icon: Users },
            { id: 'analytics', label: 'Analytics', icon: BarChart3 },
            { id: 'settings', label: 'Platform Settings', icon: Settings }
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 whitespace-nowrap ${
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

        {/* Content */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-3">
                  <Users className="h-6 w-6 text-blue-400" />
                  <span className="text-sm text-gray-400">Global Users</span>
                </div>
                <div className="text-2xl font-bold text-white">{(adminStats.totalUsers / 1000).toFixed(0)}K</div>
                <div className="text-sm text-blue-400">+{adminStats.monthlyGrowth}% growth rate</div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-3">
                  <DollarSign className="h-6 w-6 text-green-400" />
                  <span className="text-sm text-gray-400">Global Revenue</span>
                </div>
                <div className="text-2xl font-bold text-white">${(adminStats.totalRevenue / 1000).toFixed(0)}K</div>
                <div className="text-sm text-green-400">Platform earnings</div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-3">
                  <Music className="h-6 w-6 text-purple-400" />
                  <span className="text-sm text-gray-400">Global Snippets</span>
                </div>
                <div className="text-2xl font-bold text-white">{(adminStats.totalSnippets / 1000).toFixed(0)}K</div>
                <div className="text-sm text-purple-400">Available worldwide</div>
              </div>

              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-3">
                  <Zap className="h-6 w-6 text-yellow-400" />
                  <span className="text-sm text-gray-400">Global Licenses</span>
                </div>
                <div className="text-2xl font-bold text-white">{(adminStats.totalLicenses / 1000).toFixed(0)}K</div>
                <div className="text-sm text-yellow-400">Generated globally</div>
              </div>
            </div>

            {/* Analytics Component */}
            <Analytics data={adminStats} />
          </div>
        )}

        {activeTab === 'upload' && (
          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white mb-2">Enterprise Client Upload System</h2>
              <p className="text-gray-400">Bulk upload and manage music for global artist clients with enterprise features</p>
            </div>

            <form onSubmit={handleClientUpload} className="p-6">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
                <h3 className="text-blue-300 font-semibold mb-2">Enterprise Features Available:</h3>
                <ul className="text-sm text-blue-200 space-y-1">
                  <li>• Bulk upload up to 1,000 tracks simultaneously</li>
                  <li>• Global distribution to 195+ countries instantly</li>
                  <li>• AI-powered metadata generation and optimization</li>
                  <li>• Enterprise-grade quality analysis and enhancement</li>
                </ul>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Artist Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientInfo.artistName}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, artistName: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    placeholder="Enter artist name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Artist Email
                  </label>
                  <input
                    type="email"
                    value={clientInfo.email}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    placeholder="artist@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Track Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientInfo.title}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, title: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                    placeholder="Enter track title"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Genre
                  </label>
                  <select
                    value={clientInfo.genre}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, genre: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  >
                    <option value="">Select genre</option>
                    <option value="Hip-Hop">Hip-Hop</option>
                    <option value="Electronic">Electronic</option>
                    <option value="Pop">Pop</option>
                    <option value="Rock">Rock</option>
                    <option value="R&B">R&B</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Price ($)
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    min="0.05"
                    max="2.00"
                    value={clientInfo.price}
                    onChange={(e) => setClientInfo(prev => ({ ...prev, price: e.target.value }))}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Audio File *
                  </label>
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                    className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-500 file:text-white hover:file:bg-purple-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!uploadFile || !clientInfo.artistName || !clientInfo.title}
                className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-lg"
              >
                Enterprise Upload & Global Distribution
              </button>
            </form>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden">
            <div className="p-6 border-b border-white/10">
              <h2 className="text-2xl font-bold text-white mb-2">User Management</h2>
              <p className="text-gray-400">Manage platform users and their permissions</p>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="w-full px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-400"
                />
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-white/5">
                    <tr>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">User</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Role</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Joined</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Status</th>
                      <th className="text-left py-3 px-4 text-sm font-medium text-gray-400">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-white/10">
                      <td className="py-3 px-4 text-white">DJ Alex</td>
                      <td className="py-3 px-4 text-gray-300">Artist</td>
                      <td className="py-3 px-4 text-gray-300">Jan 15, 2025</td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-1 bg-green-500/20 text-green-400 rounded text-xs">Active</span>
                      </td>
                      <td className="py-3 px-4">
                        <button 
                          onClick={() => {
                            console.log('Edit user: DJ Alex');
                            addNotification({
                              type: 'info',
                              title: 'Edit User',
                              message: 'User edit functionality would open here'
                            });
                          }}
                          className="text-blue-400 hover:text-blue-300 text-sm"
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <Analytics data={adminStats} />
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 p-6">
              <h2 className="text-2xl font-bold text-white mb-4">Enterprise Platform Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Global Performance Settings</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Max Concurrent Users</label>
                      <input
                        type="number"
                        defaultValue="10000000"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Target Latency (ms)</label>
                      <input
                        type="number"
                        defaultValue="50"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Revenue Sharing</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Artist Share (%)</label>
                      <input
                        type="number"
                        defaultValue="70"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Platform Share (%)</label>
                      <input
                        type="number"
                        defaultValue="30"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-white mb-3">Pricing Limits</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Minimum Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        defaultValue="0.05"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-gray-300 mb-2">Maximum Price ($)</label>
                      <input
                        type="number"
                        step="0.01"
                        defaultValue="2.00"
                        className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-white"
                      />
                    </div>
                  </div>
                </div>

                <button className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-200">
                  Apply Global Settings
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}