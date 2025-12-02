import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle, ArrowRight, Sparkles, Shield, Zap, TrendingUp, Video,
  Music2, ShoppingBag, Upload, Globe, Clock, DollarSign, Lock, Play
} from 'lucide-react';
import {
  BlockchainIllustration,
  InstantPayoutIllustration,
  LicensingIllustration,
  GlobalRoyaltyIllustration,
  AIRecommendationIllustration,
  AudioWaveformIllustration,
  UploadCloudIllustration,
  SecureShieldIllustration
} from '../components/CustomIllustrations';

export default function EnhancedLandingPage() {
  const { t } = useTranslation();
  const [activeStat, setActiveStat] = useState(0);

  const stats = [
    { value: '2-5 sec', label: 'Instant Payouts', icon: Zap, color: 'text-green-400' },
    { value: '195+', label: 'Countries Covered', icon: Globe, color: 'text-blue-400' },
    { value: '80%', label: 'Artist Revenue Share', icon: DollarSign, color: 'text-purple-400' },
    { value: '10 sec', label: 'License Generation', icon: Clock, color: 'text-cyan-400' }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStat((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section with Value Proposition */}
      <section className="relative px-4 md:px-6 py-24 md:py-32 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/50 to-purple-900/50">
          <div className="absolute inset-0 opacity-30">
            <AudioWaveformIllustration className="w-full h-full" animate={true} />
          </div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-full border border-purple-500/30 mb-8 animate-float">
              <span className="text-purple-300 text-sm font-medium">
                World's First Pack-Based Audio Marketplace
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight animate-fadeInUp">
              <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-green-400 bg-clip-text text-transparent">
                Stop Deleting Videos.
              </span>
              <br />
              <span className="text-white">
                Start Using Legal Audio.
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Viral hooks, meme reactions, and brand kits — all copyright-safe.
              <br />
              <span className="text-cyan-400 font-semibold">Instant licensing. Instant payouts. Zero hassle.</span>
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Link
                to="/register"
                className="group px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-cyan-700 transition-all duration-200 flex items-center space-x-2 shadow-lg hover:shadow-2xl hover:scale-105"
              >
                <span>Get Launch Bundle £22</span>
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/marketplace"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold text-lg hover:bg-white/20 transition-all duration-200 border border-white/20"
              >
                Browse Marketplace
              </Link>
            </div>

            {/* Rotating Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                const isActive = activeStat === index;
                return (
                  <div
                    key={index}
                    className={`card-professional p-6 transition-all duration-500 ${
                      isActive ? 'ring-2 ring-cyan-400 scale-105' : ''
                    }`}
                  >
                    <Icon className={`h-8 w-8 ${stat.color} mx-auto mb-3 ${isActive ? 'animate-bounce' : ''}`} />
                    <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                    <div className="text-sm text-slate-400">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features - Self-Explanatory with Illustrations */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              How V3BMusic.AI Works
            </h2>
            <p className="text-xl text-slate-300">
              Revolutionary technology that fixes broken music industry systems
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Instant Payouts */}
            <div className="card-elevated p-8">
              <div className="flex justify-center mb-6">
                <InstantPayoutIllustration className="w-64 h-64" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="h-8 w-8 text-green-400" />
                <h3 className="text-2xl font-bold text-white">Instant Payouts</h3>
              </div>
              <p className="text-slate-300 mb-6">
                Money in your account within <span className="text-green-400 font-bold">2-5 seconds</span> of a sale.
                Not weeks. Not months. <span className="font-semibold">Seconds.</span>
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <div className="text-red-400 font-semibold mb-1">Traditional Systems</div>
                  <div className="text-slate-400">6+ months wait</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <div className="text-green-400 font-semibold mb-1">V3BMusic.AI</div>
                  <div className="text-slate-400">2-5 seconds</div>
                </div>
              </div>
            </div>

            {/* Blockchain Transparency */}
            <div className="card-elevated p-8">
              <div className="flex justify-center mb-6">
                <BlockchainIllustration className="w-64 h-64" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-8 w-8 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">Blockchain Ledger</h3>
              </div>
              <p className="text-slate-300 mb-6">
                Every payment recorded on <span className="text-purple-400 font-bold">Ethereum blockchain</span>.
                100% transparent, immutable, and verifiable. No disputes. No "lost" payments.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <div className="text-red-400 font-semibold mb-1">Traditional Systems</div>
                  <div className="text-slate-400">Black box accounting</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <div className="text-green-400 font-semibold mb-1">V3BMusic.AI</div>
                  <div className="text-slate-400">Full transparency</div>
                </div>
              </div>
            </div>

            {/* 10-Second Licensing */}
            <div className="card-elevated p-8">
              <div className="flex justify-center mb-6">
                <LicensingIllustration className="w-64 h-64" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <Clock className="h-8 w-8 text-cyan-400" />
                <h3 className="text-2xl font-bold text-white">10-Second Licensing</h3>
              </div>
              <p className="text-slate-300 mb-6">
                AI generates legal licenses in <span className="text-cyan-400 font-bold">10 seconds</span>.
                Download instantly and start creating. No paperwork. No delays.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <div className="text-red-400 font-semibold mb-1">Traditional Systems</div>
                  <div className="text-slate-400">Weeks of paperwork</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <div className="text-green-400 font-semibold mb-1">V3BMusic.AI</div>
                  <div className="text-slate-400">10 seconds</div>
                </div>
              </div>
            </div>

            {/* Global Royalty Tracking */}
            <div className="card-elevated p-8">
              <div className="flex justify-center mb-6">
                <GlobalRoyaltyIllustration className="w-64 h-64" />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                <Globe className="h-8 w-8 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Global Tracking</h3>
              </div>
              <p className="text-slate-300 mb-6">
                Real-time royalty collection from <span className="text-blue-400 font-bold">195+ countries</span>.
                Track every play, every payment, everywhere in the world.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-3">
                  <div className="text-red-400 font-semibold mb-1">Traditional Systems</div>
                  <div className="text-slate-400">Limited territories</div>
                </div>
                <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                  <div className="text-green-400 font-semibold mb-1">V3BMusic.AI</div>
                  <div className="text-slate-400">195+ countries</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Creators vs Artists */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* For Content Creators */}
            <div className="card-professional p-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                  <Video className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">For Content Creators</h3>
                  <p className="text-cyan-400">TikTok, Reels, YouTube, Ads</p>
                </div>
              </div>

              <p className="text-slate-300 mb-8 text-lg">
                Get viral-ready audio packs with instant licensing. Never worry about copyright strikes again.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold">Viral Hook Starter Kit</div>
                    <div className="text-slate-400 text-sm">8 assets • £7 launch price</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold">Meme Reaction Arsenal</div>
                    <div className="text-slate-400 text-sm">10 assets • £9 launch price</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold">60-Second Brand Kit</div>
                    <div className="text-slate-400 text-sm">6 assets • £12 launch price</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-cyan-500/20 border border-purple-500/30 rounded-lg p-4 flex items-start space-x-3">
                  <Sparkles className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-bold">Launch Bundle - Save £6</div>
                    <div className="text-green-400 text-sm">All 3 packs for £22 (regular £28)</div>
                  </div>
                </div>
              </div>

              <Link
                to="/marketplace"
                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-semibold text-lg hover:from-cyan-700 hover:to-blue-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <ShoppingBag className="h-5 w-5" />
                <span>Browse Marketplace</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* For Audio Creators */}
            <div className="card-professional p-10">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <Music2 className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-white">For Audio Creators</h3>
                  <p className="text-purple-400">Producers, Beat Makers, Sound Designers</p>
                </div>
              </div>

              <p className="text-slate-300 mb-8 text-lg">
                Package your sounds into utility packs. Set your price. Get paid instantly. Keep 80% of every sale.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold">Create Audio Packs</div>
                    <div className="text-slate-400 text-sm">6-10 assets per pack (hooks, reactions, transitions)</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold">Set Your Pricing</div>
                    <div className="text-slate-400 text-sm">£7-£20 per pack • You keep 80% of every sale</div>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-semibold">Instant Payouts</div>
                    <div className="text-slate-400 text-sm">Money in 2-5 seconds via Stripe Connect</div>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-lg p-4 flex items-start space-x-3">
                  <Shield className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                  <div>
                    <div className="text-white font-bold">Blockchain Royalty Ledger</div>
                    <div className="text-cyan-400 text-sm">Full transparency • Zero disputes • Verifiable payments</div>
                  </div>
                </div>
              </div>

              <Link
                to="/register"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg"
              >
                <Upload className="h-5 w-5" />
                <span>Start Selling Packs</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Security */}
      <section className="py-20 bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <SecureShieldIllustration className="w-48 h-48 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Enterprise-Grade Security
            </h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Your money, your rights, and your data protected with military-grade encryption and blockchain technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Lock className="h-8 w-8 text-green-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Encrypted Payments</h4>
              <p className="text-slate-400">
                Bank-level encryption for all transactions. Your financial data never leaves secure servers.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Smart Contract Protection</h4>
              <p className="text-slate-400">
                Automated royalty splits executed on blockchain. No human errors. No payment delays.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-cyan-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-cyan-400" />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Copyright Verified</h4>
              <p className="text-slate-400">
                Every asset verified for copyright clearance. Instant DMCA takedown if needed.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-gradient-to-br from-purple-900 via-blue-900 to-cyan-900">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Ready to Join the Revolution?
          </h2>
          <p className="text-xl text-slate-200 mb-12">
            Stop losing money to broken systems. Start getting paid instantly for your work.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/register"
              className="px-10 py-5 bg-white text-purple-900 rounded-xl font-bold text-xl hover:bg-slate-100 transition-all duration-200 flex items-center space-x-2 shadow-2xl hover:scale-105"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-6 w-6" />
            </Link>
            <Link
              to="/marketplace"
              className="px-10 py-5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-xl hover:bg-white/20 transition-all duration-200 border-2 border-white/30"
            >
              Explore Marketplace
            </Link>
          </div>

          <p className="text-slate-300 mt-8">
            No credit card required • 80% revenue share • Instant payouts
          </p>
        </div>
      </section>
    </div>
  );
}
