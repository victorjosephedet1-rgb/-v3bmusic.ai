import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Shield, CheckCircle, XCircle, Music, User, Calendar, TrendingUp, DollarSign, Youtube } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface VerificationData {
  clearance_code: string;
  is_active: boolean;
  track: {
    title: string;
    artist: string;
    genre: string;
    duration: number;
  };
  artist_profile: {
    name: string;
    avatar_url: string;
  };
  buyer_profile: {
    name: string;
  };
  platforms_allowed: string[];
  total_views: number;
  total_plays: number;
  total_royalties_earned: number;
  usage_count: number;
  created_at: string;
  expires_at: string;
}

export default function ClearanceVerification() {
  const { code } = useParams<{ code: string }>();
  const [data, setData] = useState<VerificationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (code) {
      fetchVerificationData();
    }
  }, [code]);

  const fetchVerificationData = async () => {
    try {
      const { data: clearanceData, error: fetchError } = await supabase
        .from('digital_clearance_codes')
        .select(`
          clearance_code,
          is_active,
          platforms_allowed,
          total_views,
          total_plays,
          total_royalties_earned,
          usage_count,
          created_at,
          expires_at,
          track:audio_snippets(title, artist, genre, duration),
          artist_profile:profiles!digital_clearance_codes_artist_id_fkey(name, avatar_url),
          buyer_profile:profiles!digital_clearance_codes_buyer_id_fkey(name)
        `)
        .eq('clearance_code', code)
        .maybeSingle();

      if (fetchError) throw fetchError;

      if (!clearanceData) {
        setError('Clearance code not found');
        setLoading(false);
        return;
      }

      setData(clearanceData as any);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching verification data:', err);
      setError('Failed to verify clearance code');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Shield className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-pulse" />
          <h2 className="text-2xl font-bold text-white mb-2">Verifying Clearance...</h2>
          <p className="text-gray-400">Please wait</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Invalid Clearance Code</h2>
          <p className="text-gray-400 mb-6">
            {error || 'The clearance code you entered could not be verified.'}
          </p>
          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
            <p className="text-red-300 text-sm">
              This content may not have proper licensing. Using unlicensed music can
              result in copyright strikes and content removal.
            </p>
          </div>
        </div>
      </div>
    );
  }

  const isExpired = new Date(data.expires_at) < new Date();
  const isValid = data.is_active && !isExpired;

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Verification Status */}
        <div className="text-center mb-8">
          {isValid ? (
            <>
              <CheckCircle className="h-20 w-20 text-green-400 mx-auto mb-4 animate-pulse" />
              <h1 className="text-4xl font-bold text-white mb-2">Clearance Verified ✓</h1>
              <p className="text-xl text-green-300">This content is properly licensed</p>
            </>
          ) : (
            <>
              <XCircle className="h-20 w-20 text-red-400 mx-auto mb-4" />
              <h1 className="text-4xl font-bold text-white mb-2">Clearance Expired</h1>
              <p className="text-xl text-red-300">This license is no longer active</p>
            </>
          )}
        </div>

        {/* Clearance Code */}
        <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 border border-white/20 rounded-xl p-6 mb-8">
          <div className="text-center">
            <div className="text-sm text-gray-400 mb-2">Digital Clearance Code</div>
            <div className="text-3xl font-mono font-bold text-white tracking-wider">
              {data.clearance_code}
            </div>
          </div>
        </div>

        {/* Track Information */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden mb-8">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3 mb-2">
              <Music className="h-8 w-8 text-purple-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">{data.track.title}</h2>
                <p className="text-gray-400">by {data.artist_profile.name}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">License Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Artist:</span>
                    <span className="text-white">{data.artist_profile.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Licensed To:</span>
                    <span className="text-white">{data.buyer_profile.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Genre:</span>
                    <span className="text-white">{data.track.genre}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">
                      {Math.floor(data.track.duration / 60)}:{String(data.track.duration % 60).padStart(2, '0')}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">License Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={isValid ? 'text-green-400 font-semibold' : 'text-red-400 font-semibold'}>
                      {isValid ? 'Active' : 'Expired'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Issued:</span>
                    <span className="text-white">{new Date(data.created_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Expires:</span>
                    <span className="text-white">{new Date(data.expires_at).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Content Pieces:</span>
                    <span className="text-white">{data.usage_count}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Youtube className="h-5 w-5 text-red-400" />
                  <span className="text-sm text-gray-400">Total Views</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {data.total_views.toLocaleString()}
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="h-5 w-5 text-blue-400" />
                  <span className="text-sm text-gray-400">Total Plays</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  {data.total_plays.toLocaleString()}
                </div>
              </div>

              <div className="bg-white/5 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-gray-400">Artist Earned</span>
                </div>
                <div className="text-2xl font-bold text-white">
                  £{(data.total_royalties_earned * 0.70).toFixed(2)}
                </div>
              </div>
            </div>

            {/* Approved Platforms */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Approved Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {data.platforms_allowed.map((platform) => (
                  <span
                    key={platform}
                    className="px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 text-sm font-medium capitalize"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Verification Info */}
        <div className={`${isValid ? 'bg-green-500/10 border-green-500/20' : 'bg-red-500/10 border-red-500/20'} border rounded-xl p-6`}>
          <h3 className={`text-lg font-semibold ${isValid ? 'text-green-400' : 'text-red-400'} mb-3`}>
            {isValid ? 'Copyright Protected' : 'License Expired'}
          </h3>
          <ul className={`space-y-2 text-sm ${isValid ? 'text-green-200' : 'text-red-200'}`}>
            {isValid ? (
              <>
                <li>✓ This content uses properly licensed music from V3BMusic.AI</li>
                <li>✓ Artist receives ongoing royalties for every view (70% share)</li>
                <li>✓ Platform maintains 30% commission for licensing services</li>
                <li>✓ All payments are blockchain-verified and transparent</li>
                <li>✓ Content is cleared for commercial use on approved platforms</li>
              </>
            ) : (
              <>
                <li>✗ This license has expired and is no longer valid</li>
                <li>✗ Content may need to be removed or re-licensed</li>
                <li>✗ Continued use may result in copyright claims</li>
                <li>• Contact V3BMusic.AI to renew this license</li>
              </>
            )}
          </ul>
        </div>

        {/* Powered By */}
        <div className="mt-8 text-center">
          <p className="text-gray-400 text-sm mb-2">Powered by</p>
          <div className="flex items-center justify-center space-x-2">
            <Shield className="h-6 w-6 text-purple-400" />
            <span className="text-2xl font-bold text-white">V3BMusic.AI</span>
          </div>
          <p className="text-gray-500 text-xs mt-2">
            Blockchain-Verified Music Licensing & Continuous Royalty Tracking
          </p>
        </div>
      </div>
    </div>
  );
}
