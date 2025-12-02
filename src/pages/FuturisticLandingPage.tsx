import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle, ArrowRight, Sparkles, Shield, Zap, Video,
  Music2, ShoppingBag, Upload,Lock, Play,
  Users
} from 'lucide-react';

export default function FuturisticLandingPage() {
  const { t: _t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-slate-950">
      {/* Hero Section - Futuristic Studio */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background Grid */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-blue-950 to-purple-950"></div>
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `linear-gradient(to right, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                               linear-gradient(to bottom, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
              transform: `translateY(${scrollY * 0.5}px)`
            }}
          />
          {/* Animated Orbs */}
          <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        {/* Studio Scene with Diverse Team and Alien Lady */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

            {/* Left Side - Studio Scene */}
            <div className="relative">
              {/* Main Studio Image Container */}
              <div className="relative rounded-3xl overflow-hidden border-4 border-cyan-400/30 shadow-2xl shadow-cyan-500/20">
                {/* Real diverse studio scene */}
                <img
                  src="https://images.pexels.com/photos/7095037/pexels-photo-7095037.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Diverse team recording in futuristic studio"
                  className="w-full h-[600px] object-cover"
                />

                {/* Overlay gradient for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>


                {/* Studio Stats Overlay */}
                <div className="absolute bottom-6 left-6 right-6 flex gap-3">
                  <div className="flex-1 bg-slate-900/80 backdrop-blur-md rounded-xl p-3 border border-cyan-400/30">
                    <div className="flex items-center space-x-2">
                      <Users className="h-5 w-5 text-cyan-400" />
                      <div>
                        <p className="text-white font-bold text-lg">5000+</p>
                        <p className="text-slate-400 text-xs">Global Creators</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 bg-slate-900/80 backdrop-blur-md rounded-xl p-3 border border-purple-400/30">
                    <div className="flex items-center space-x-2">
                      <Music2 className="h-5 w-5 text-purple-400" />
                      <div>
                        <p className="text-white font-bold text-lg">10K+</p>
                        <p className="text-slate-400 text-xs">Audio Packs</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Side - Hero Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center px-5 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 backdrop-blur-sm rounded-full border border-cyan-400/30">
                <Sparkles className="h-5 w-5 text-cyan-400 mr-2" />
                <span className="text-cyan-300 text-sm font-semibold tracking-wide">
                  AI-POWERED MUSIC MARKETPLACE
                </span>
              </div>

              {/* Main Headline */}
              <h1 className="text-5xl md:text-7xl font-bold leading-tight animate-fade-in-up">
                <span className="block text-white mb-2" style={{animationDelay: '0.1s'}}>
                  Stop Deleting
                </span>
                <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent" style={{animationDelay: '0.2s'}}>
                  Videos Forever
                </span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl text-slate-300 leading-relaxed animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                The world's first <span className="text-cyan-400 font-semibold">AI-powered, blockchain-verified, Ethereum-based</span> audio marketplace where creators license viral-ready sounds instantly, and artists get paid in <span className="text-green-400 font-bold">2-5 seconds via crypto</span>.
              </p>

              {/* Key Benefits */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-slate-200">
                    <span className="font-semibold text-white">Instant Licensing</span> - Legal audio in 10 seconds
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-slate-200">
                    <span className="font-semibold text-white">Instant Payouts</span> - Artists paid in 2-5 seconds
                  </p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <p className="text-slate-200">
                    <span className="font-semibold text-white">Blockchain Transparency</span> - Zero disputes, full visibility
                  </p>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                <Link
                  to="/register"
                  className="group relative px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-xl font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/50 hover:scale-105 hover-glow"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <span className="relative flex items-center justify-center space-x-2">
                    <Sparkles className="h-5 w-5" />
                    <span>Get Launch Bundle £22</span>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>

                <Link
                  to="/marketplace"
                  className="px-8 py-4 glass-card glass-card-hover text-white rounded-xl font-bold text-lg border-2 border-white/20 transition-all duration-300"
                >
                  Browse Audio Packs
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap items-center gap-6 pt-4 text-sm text-slate-400">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>5,000+ Active Creators</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                  <span>195+ Countries</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                  <span>80% Artist Revenue</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-cyan-400/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-cyan-400 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* How It Works - Visual Timeline */}
      <section className="relative py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              How <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">V3BMusic.AI</span> Works
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Revolutionary technology fixing broken music industry systems
            </p>
          </div>

          {/* Timeline Steps */}
          <div className="relative">
            {/* Connection Line */}
            <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-cyan-500 to-green-500 transform -translate-y-1/2"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
              {/* Step 1: Upload */}
              <div className="group animate-fade-in-up" style={{animationDelay: '0.1s'}}>
                <div className="glass-card glass-card-hover rounded-2xl p-8 border-2 border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/30 hover-lift">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
                    <Upload className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-purple-500 rounded-full text-white font-bold text-xl mb-4">
                      1
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Artists Upload Packs</h3>
                  </div>
                  <p className="text-slate-400 text-center leading-relaxed">
                    Creators package 6-10 audio utilities (hooks, reactions, transitions) into viral-ready packs. Set pricing £7-£20.
                  </p>
                </div>
              </div>

              {/* Step 2: License */}
              <div className="group animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                <div className="glass-card glass-card-hover rounded-2xl p-8 border-2 border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/30 hover-lift">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
                    <ShoppingBag className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-cyan-500 rounded-full text-white font-bold text-xl mb-4">
                      2
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Creators License Instantly</h3>
                  </div>
                  <p className="text-slate-400 text-center leading-relaxed">
                    Browse packs, preview assets, purchase in seconds. AI generates legal license in 10 seconds. Use everywhere.
                  </p>
                </div>
              </div>

              {/* Step 3: Get Paid */}
              <div className="group animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                <div className="glass-card glass-card-hover rounded-2xl p-8 border-2 border-green-500/30 hover:border-green-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/30 hover-lift">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:rotate-12 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-center mb-4">
                    <div className="inline-flex items-center justify-center w-10 h-10 bg-green-500 rounded-full text-white font-bold text-xl mb-4">
                      3
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">Artists Paid Instantly</h3>
                  </div>
                  <p className="text-slate-400 text-center leading-relaxed">
                    80% revenue split. Money in account in 2-5 seconds. Blockchain ledger ensures transparency. Zero disputes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Stats */}
      <section className="py-24 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
                2-5s
              </div>
              <div className="text-slate-400 font-medium">Instant Payouts</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                195+
              </div>
              <div className="text-slate-400 font-medium">Countries Covered</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent mb-2">
                80%
              </div>
              <div className="text-slate-400 font-medium">Artist Revenue Share</div>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent mb-2">
                10s
              </div>
              <div className="text-slate-400 font-medium">License Generation</div>
            </div>
          </div>
        </div>
      </section>

      {/* For Creators vs Artists */}
      <section className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {/* For Content Creators */}
            <div className="group relative glass-card glass-card-hover rounded-3xl p-10 border-2 border-cyan-500/30 hover:border-cyan-500 transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/20 hover-lift animate-slide-in-left">
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-3xl group-hover:bg-cyan-500/20 transition-all duration-300"></div>

              <div className="relative">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl flex items-center justify-center">
                    <Video className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">For Content Creators</h3>
                    <p className="text-cyan-400">TikTok • Reels • YouTube • Ads</p>
                  </div>
                </div>

                <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                  Copyright-safe audio packs for viral content. Never worry about DMCA strikes again.
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
                  <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-lg p-4 border border-cyan-400/30">
                    <div className="flex items-start space-x-3">
                      <Sparkles className="h-6 w-6 text-cyan-400 flex-shrink-0 mt-1" />
                      <div>
                        <div className="text-white font-bold">Launch Bundle - Save £6</div>
                        <div className="text-green-400 text-sm">All 3 packs for £22</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/marketplace"
                  className="block w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-xl font-bold text-lg text-center hover:from-cyan-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-cyan-500/40"
                >
                  Browse Marketplace →
                </Link>
              </div>
            </div>

            {/* For Audio Creators */}
            <div className="group relative glass-card glass-card-hover rounded-3xl p-10 border-2 border-purple-500/30 hover:border-purple-500 transition-all duration-300 hover:shadow-2xl hover:shadow-purple-500/20 hover-lift animate-slide-in-right">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-300"></div>

              <div className="relative">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Music2 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold text-white">For Audio Creators</h3>
                    <p className="text-purple-400">Producers • Beat Makers • Sound Designers</p>
                  </div>
                </div>

                <p className="text-slate-300 mb-8 text-lg leading-relaxed">
                  Package sounds into utility packs. Set pricing. Get paid instantly. Keep 80% of every sale.
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
                  <div className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg p-4 border border-purple-400/30">
                    <div className="flex items-start space-x-3">
                      <Shield className="h-6 w-6 text-purple-400 flex-shrink-0 mt-1" />
                      <div>
                        <div className="text-white font-bold">Blockchain Royalty Ledger</div>
                        <div className="text-cyan-400 text-sm">Full transparency • Zero disputes</div>
                      </div>
                    </div>
                  </div>
                </div>

                <Link
                  to="/register"
                  className="block w-full py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-bold text-lg text-center hover:from-purple-700 hover:to-pink-700 transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-purple-500/40"
                >
                  Start Selling Packs →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900 via-blue-900 to-purple-900"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Ready to Join the<br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Music Revolution?
            </span>
          </h2>
          <p className="text-xl text-slate-200 mb-12 leading-relaxed">
            Stop losing money to broken systems. Start getting paid instantly for your work.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
            <Link
              to="/register"
              className="px-12 py-5 bg-white text-blue-900 rounded-xl font-bold text-xl hover:bg-slate-100 transition-all duration-300 shadow-2xl hover:scale-105 flex items-center space-x-3"
            >
              <span>Get Started Free</span>
              <ArrowRight className="h-6 w-6" />
            </Link>
            <Link
              to="/marketplace"
              className="px-12 py-5 bg-white/10 backdrop-blur-sm text-white rounded-xl font-bold text-xl border-2 border-white/30 hover:bg-white/20 transition-all duration-300"
            >
              Explore Marketplace
            </Link>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-slate-300">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>80% revenue share</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <span>Instant payouts</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 bg-slate-950 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-white font-bold text-lg mb-4 flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-cyan-400" />
                <span>V3BMusic.AI</span>
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                The world's first pack-based audio utility marketplace for short-form creators.
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Platform</h4>
              <ul className="space-y-2 text-sm">
                <li><Link to="/marketplace" className="text-slate-400 hover:text-cyan-400 transition-colors">Browse Marketplace</Link></li>
                <li><Link to="/register" className="text-slate-400 hover:text-cyan-400 transition-colors">Sign Up</Link></li>
                <li><Link to="/login" className="text-slate-400 hover:text-cyan-400 transition-colors">Login</Link></li>
                <li><Link to="/safety" className="text-slate-400 hover:text-cyan-400 transition-colors">Safety Center</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="/legal/terms-of-service.html" className="text-slate-400 hover:text-cyan-400 transition-colors">Terms of Service</a></li>
                <li><a href="/legal/privacy-policy.html" className="text-slate-400 hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
                <li><a href="/legal/cookie-policy.html" className="text-slate-400 hover:text-cyan-400 transition-colors">Cookie Policy</a></li>
                <li><a href="/legal/dmca-policy.html" className="text-slate-400 hover:text-cyan-400 transition-colors">DMCA Policy</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold mb-4">Contact</h4>
              <ul className="space-y-2 text-sm">
                <li className="text-slate-400">General Inquiries:</li>
                <li><a href="mailto:info@v3bmusic.ai" className="text-cyan-400 hover:text-cyan-300 transition-colors">info@v3bmusic.ai</a></li>
                <li className="text-slate-400 mt-3">Partnerships:</li>
                <li><a href="mailto:partnership@v3bmusic.ai" className="text-cyan-400 hover:text-cyan-300 transition-colors">partnership@v3bmusic.ai</a></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <p className="text-slate-500 text-sm text-center md:text-left">
                © 2025 V3BMusic.AI. All rights reserved. Founded by Victor Joseph Edet, CEO of Victor360 Brand Limited.
              </p>
              <div className="flex items-center space-x-4 text-sm text-slate-500">
                <span>🇬🇧 UK Registered</span>
                <span>•</span>
                <span>GDPR Compliant</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
