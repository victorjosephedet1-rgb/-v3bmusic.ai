import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Download, CheckCircle, FileText, Clock, AlertCircle, Music, Sparkles } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import ClearanceCodeDisplay from '../components/ClearanceCodeDisplay';

interface LicenseData {
  id: string;
  track: {
    id: string;
    title: string;
    artist: string;
    file_url: string;
    duration: number;
  };
  artist_profile: {
    name: string;
    blockchain_wallet: string;
  };
  amount_paid: number;
  currency: string;
  license_type: string;
  license_data: any;
  download_url: string;
  created_at: string;
  blockchain_tx_id: string | null;
  payout_status: string;
}

interface ClearanceData {
  clearance_code: string;
  verification_url: string;
  platforms_allowed: string[];
  total_views: number;
  total_royalties_earned: number;
  usage_count: number;
}

export default function LicenseDownload() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [license, setLicense] = useState<LicenseData | null>(null);
  const [clearance, setClearance] = useState<ClearanceData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const sessionId = searchParams.get('session_id');

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!sessionId) {
      setError('No session ID provided');
      setLoading(false);
      return;
    }

    fetchLicense();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId, user]);

  const fetchLicense = async () => {
    try {
      const { data, error } = await supabase
        .from('track_licenses')
        .select(`
          id,
          amount_paid,
          currency,
          license_type,
          license_data,
          download_url,
          download_count,
          created_at,
          blockchain_tx_id,
          payout_status,
          track:audio_snippets(id, title, artist, file_url, duration),
          artist_profile:profiles!track_licenses_artist_id_fkey(name, blockchain_wallet)
        `)
        .eq('stripe_session_id', sessionId)
        .eq('buyer_id', user?.id)
        .maybeSingle();

      if (error) throw error;

      if (!data) {
        setError('License not found. Your purchase may still be processing.');
        setLoading(false);
        return;
      }

      setLicense(data as any);

      const { data: clearanceData } = await supabase
        .from('digital_clearance_codes')
        .select('*')
        .eq('license_id', data.id)
        .maybeSingle();

      if (clearanceData) {
        setClearance(clearanceData as any);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching license:', err);
      setError('Failed to load license. Please try again.');
      setLoading(false);
    }
  };

  const handleDownload = async () => {
    if (!license) return;

    setDownloading(true);

    try {
      const fileUrl = license.download_url || license.track.file_url;

      if (!fileUrl) {
        throw new Error('Download URL not available');
      }

      const { data: { publicUrl } } = supabase.storage
        .from('audio-files')
        .getPublicUrl(fileUrl);

      const link = document.createElement('a');
      link.href = publicUrl;
      link.download = `${license.track.title} - Licensed.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      await supabase
        .from('track_licenses')
        .update({
          download_count: (license as any).download_count + 1,
          last_downloaded_at: new Date().toISOString(),
        })
        .eq('id', license.id);

      setDownloading(false);
    } catch (err) {
      console.error('Download error:', err);
      alert('Failed to download file. Please contact support.');
      setDownloading(false);
    }
  };

  const generateLicensePDF = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Clock className="h-16 w-16 text-purple-400 mx-auto mb-4 animate-spin" />
          <h2 className="text-2xl font-bold text-white mb-2">Loading your license...</h2>
          <p className="text-gray-400">Please wait while we retrieve your purchase</p>
        </div>
      </div>
    );
  }

  if (error || !license) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center max-w-md">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Unable to Load License</h2>
          <p className="text-gray-400 mb-6">{error || 'The requested license could not be found.'}</p>
          <button
            onClick={() => navigate('/marketplace')}
            className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Return to Marketplace
          </button>
        </div>
      </div>
    );
  }

  const expiresAt = new Date(license.created_at);
  expiresAt.setMonth(expiresAt.getMonth() + (license.license_data?.duration_months || 12));

  return (
    <div className="min-h-screen pt-8 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Success Header */}
        <div className="text-center mb-8">
          <CheckCircle className="h-16 w-16 text-green-400 mx-auto mb-4 animate-pulse" />
          <h1 className="text-4xl font-bold text-white mb-2">Purchase Complete!</h1>
          <p className="text-xl text-gray-300">Your track is ready for download</p>

          {license.blockchain_tx_id && (
            <div className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-lg">
              <Sparkles className="h-5 w-5 text-green-400" />
              <span className="text-green-300 text-sm">Blockchain verified</span>
            </div>
          )}
        </div>

        {/* Instant Payout Status */}
        {license.payout_status === 'completed' && (
          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 mb-6 text-center">
            <p className="text-green-300 font-medium">
              ✓ Artist received instant payout (70% of purchase price)
            </p>
          </div>
        )}

        {/* License Details */}
        <div className="bg-white/5 backdrop-blur-lg rounded-xl border border-white/10 overflow-hidden mb-8">
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center space-x-3 mb-2">
              <Music className="h-8 w-8 text-purple-400" />
              <div>
                <h2 className="text-2xl font-bold text-white">{license.track.title}</h2>
                <p className="text-gray-400">by {license.artist_profile.name}</p>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">License ID: {license.id}</p>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Purchase Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">License Type:</span>
                    <span className="text-white">{license.license_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Amount Paid:</span>
                    <span className="text-white">£{license.amount_paid.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Duration:</span>
                    <span className="text-white">{Math.floor(license.track.duration / 60)}:{String(license.track.duration % 60).padStart(2, '0')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Purchased:</span>
                    <span className="text-white">{new Date(license.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-white mb-3">License Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Valid Until:</span>
                    <span className="text-white">{expiresAt.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Territory:</span>
                    <span className="text-white">{license.license_data?.territory || 'Worldwide'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-green-400 font-medium">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Downloads:</span>
                    <span className="text-white">Unlimited</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Allowed Platforms</h3>
              <div className="flex flex-wrap gap-2">
                {(license.license_data?.platforms || ['youtube', 'tiktok', 'instagram', 'twitch']).map((platform: string) => (
                  <span key={platform} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm capitalize">
                    {platform}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Usage Rights</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Commercial use allowed on all specified platforms</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Unlimited monetized content during license period</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Attribution to artist recommended but not required</span>
                </li>
                <li className="flex items-start space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300">Copyright-safe and cleared for global distribution</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleDownload}
                disabled={downloading}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 rounded-lg text-white hover:from-green-600 hover:to-blue-600 transition-all duration-200 flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="h-5 w-5" />
                <span>{downloading ? 'Downloading...' : 'Download Audio File'}</span>
              </button>
              <button
                onClick={generateLicensePDF}
                className="flex items-center justify-center space-x-2 px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-200 flex-1"
              >
                <FileText className="h-5 w-5" />
                <span>Print License PDF</span>
              </button>
            </div>
          </div>
        </div>

        {/* Digital Clearance Code */}
        {clearance && (
          <div className="mb-8">
            <ClearanceCodeDisplay
              clearanceCode={clearance.clearance_code}
              verificationUrl={clearance.verification_url}
              trackTitle={license.track.title}
              artistName={license.artist_profile.name}
              platformsAllowed={clearance.platforms_allowed}
              totalViews={clearance.total_views}
              totalRoyaltiesEarned={clearance.total_royalties_earned}
              usageCount={clearance.usage_count}
            />
          </div>
        )}

        {/* Important Notes */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">Important Notes</h3>
          <ul className="space-y-2 text-sm text-blue-200">
            <li>• Your license is stored securely and can be accessed anytime from your account</li>
            <li>• The artist received 70% of the purchase price instantly via blockchain-verified transfer</li>
            <li>• Artist continues to receive 70% of ongoing royalties from every view your content generates</li>
            <li>• Use your clearance code in all content descriptions for automatic royalty tracking</li>
            <li>• This license is non-transferable and tied to your account</li>
            <li>• You can re-download the audio file at any time during the license period</li>
            <li>• For extended usage rights or licensing questions, contact our support team</li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => navigate('/marketplace')}
            className="px-8 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Browse More Tracks
          </button>
        </div>
      </div>
    </div>
  );
}
