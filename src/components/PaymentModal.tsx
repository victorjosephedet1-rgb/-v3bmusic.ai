import React, { useState } from 'react';
import { X, CreditCard, Lock, ShoppingCart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

interface PaymentModalProps {
  snippet: {
    id: string;
    title: string;
    artist: string;
    price: number;
    duration: number;
  };
  onClose: () => void;
}

export default function PaymentModal({ snippet, onClose }: PaymentModalProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  // const navigate = useNavigate();

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setError('Please log in to continue');
        return;
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
            productType: 'track',
            trackId: snippet.id,
            licenseType: 'Content Creator License',
            price: snippet.price,
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
      setError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  const artistEarning = snippet.price * 0.7;
  const platformFee = snippet.price * 0.3;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl border border-white/20 max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <div className="flex items-center space-x-3">
            <ShoppingCart className="h-6 w-6 text-purple-400" />
            <h2 className="text-xl font-bold text-white">License Snippet</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-white/10 rounded-lg transition-colors"
          >
            <X className="h-6 w-6 text-gray-400" />
          </button>
        </div>

        {/* Snippet Details */}
        <div className="p-6 border-b border-white/10">
          <h3 className="text-lg font-semibold text-white mb-2">{snippet.title}</h3>
          <p className="text-gray-400 mb-4">by {snippet.artist}</p>
          
          <div className="bg-white/5 rounded-lg p-4 mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Duration:</span>
              <span className="text-white">{snippet.duration} seconds</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Artist earns:</span>
              <span className="text-green-400">${artistEarning.toFixed(2)} (70%)</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-gray-300">Platform fee:</span>
              <span className="text-gray-400">${platformFee.toFixed(2)} (30%)</span>
            </div>
            <div className="border-t border-white/10 pt-2 mt-2">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-white">Total:</span>
                <span className="text-2xl font-bold text-white">${snippet.price.toFixed(2)}</span>
              </div>
            </div>
          </div>

          <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
            <p className="text-blue-300 text-sm">
              <Lock className="h-4 w-4 inline mr-1" />
              Includes full commercial license and copyright protection
            </p>
          </div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handlePayment} className="p-6">
          {error && (
            <div className="mb-4 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <div className="bg-white/5 rounded-lg p-4 mb-4">
            <div className="flex items-center space-x-3 mb-3">
              <CreditCard className="h-5 w-5 text-gray-400" />
              <p className="text-gray-300 text-sm">Secure Stripe checkout</p>
            </div>
            <p className="text-gray-400 text-xs">
              Click below to proceed to Stripe's secure payment page. Your license will be available immediately after payment.
            </p>
          </div>

          <div className="mt-6 space-y-3">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-lg font-medium hover:from-green-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-green-400/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
              {loading ? 'Redirecting to Stripe...' : `Pay $${snippet.price.toFixed(2)} with Stripe`}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2 px-4 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
          </div>

          <p className="text-xs text-gray-400 text-center mt-4">
            Payments are processed securely by Stripe. Your license will be available instantly.
          </p>
        </form>
      </div>
    </div>
  );
}