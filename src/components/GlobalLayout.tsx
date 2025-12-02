import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
// import BrandLogo from './BrandLogo';
import GlobalLanguageSwitcher from './GlobalLanguageSwitcher';
import { useAuth } from '../contexts/AuthContext';
import DatabaseStatus from './DatabaseStatus';

interface GlobalLayoutProps {
  children: React.ReactNode;
}

const GlobalLayout: React.FC<GlobalLayoutProps> = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <div className="min-h-screen"> 
      {/* Executive Header */}
      <header className="fixed top-0 left-0 w-full px-4 md:px-6 py-3 md:py-4 z-50 bg-slate-900/90 backdrop-blur-xl border-b border-slate-700/50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            V3BMusic.Ai
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-6">
            <Link to="/marketplace" className="text-slate-300 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-slate-800/50">
              {t('navigation.marketplace')}
            </Link>
            <Link to="/guidelines" className="text-slate-300 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-slate-800/50">
              {t('navigation.guidelines')}
            </Link>
            <Link to="/dashboard" className="text-slate-300 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-slate-800/50">
              {t('navigation.sellMusic')}
            </Link>
            <Link to="/dashboard" className="text-slate-300 hover:text-white text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-slate-800/50">
              {t('navigation.dashboard')}
            </Link>
            {user?.email === 'admin@v3bmusic.com' && (
              <Link to="/admin" className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors px-3 py-2 rounded-lg hover:bg-blue-500/20">
                {t('navigation.adminPortal')}
              </Link>
            )}
          </nav>
          
          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-slate-300 hover:text-white transition-colors"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center space-x-3">
            <GlobalLanguageSwitcher />
            <DatabaseStatus />
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-semibold text-white">
                    {user?.name?.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-slate-300 text-sm font-medium">{user?.name}</span>
                  <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full font-medium">
                    {user?.role}
                  </span>
                </div>
                <button 
                  onClick={logout}
                  className="btn-ghost btn-professional"
                >
                  {t('navigation.signOut')}
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <Link 
                  to="/login"
                  className="btn-ghost btn-professional"
                >
                  {t('navigation.signIn')}
                </Link>
                <Link 
                  to="/register"
                  className="btn-primary btn-professional"
                >
                  {t('navigation.getStarted')}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-xl border-b border-slate-700/50">
            <nav className="px-4 py-4 space-y-2">
              <Link 
                to="/marketplace"
                className="mobile-nav-item text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('navigation.marketplace')}
              </Link>
              <Link 
                to="/guidelines"
                className="mobile-nav-item text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('navigation.guidelines')}
              </Link>
              <Link 
                to="/dashboard"
                className="mobile-nav-item text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors block"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t('navigation.dashboard')}
              </Link>
              
              {/* Mobile Auth */}
              <div className="pt-4 border-t border-slate-700/50 space-y-2">
                <div className="px-3 py-2">
                  <GlobalLanguageSwitcher />
                </div>
                {isAuthenticated ? (
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 px-3 py-2">
                      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-semibold text-white">
                        {user?.name?.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-slate-300 text-sm font-medium">{user?.name}</span>
                      <span className="px-2 py-1 text-xs bg-blue-500/20 text-blue-300 rounded-full font-medium">
                        {user?.role}
                      </span>
                    </div>
                    <button 
                      onClick={() => {
                        logout();
                        setMobileMenuOpen(false);
                      }}
                      className="mobile-nav-item text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors block w-full text-left"
                    >
                      {t('navigation.signOut')}
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Link 
                      to="/login"
                      className="mobile-nav-item text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors block"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('navigation.signIn')}
                    </Link>
                    <Link 
                      to="/register"
                      className="mobile-nav-item btn-primary rounded-lg transition-colors block text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {t('navigation.getStarted')}
                    </Link>
                  </div>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16 md:pt-20">
        {children}
      </main>

      {/* Executive Footer */}
      <footer className="bg-slate-900/90 backdrop-blur-xl text-white py-16 px-6 border-t border-slate-700/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="mb-6">
                <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  V3BMusic.Ai
                </span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-4">
                {t('footer.description')}
              </p>
              <p className="text-slate-500 text-xs">
                {t('footer.copyright', { year: new Date().getFullYear() })}
              </p>
            </div>
            
            <div>
              <h3 className="text-heading text-white font-semibold mb-4">Platform</h3>
              <div className="space-y-3">
                <Link to="/marketplace" className="block text-slate-400 hover:text-white text-sm transition-colors">
                  Marketplace
                </Link>
                <Link to="/dashboard" className="block text-slate-400 hover:text-white text-sm transition-colors">
                  Dashboard
                </Link>
                <Link to="/guidelines" className="block text-slate-400 hover:text-white text-sm transition-colors">
                  Guidelines
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-heading text-white font-semibold mb-4">Company</h3>
              <div className="space-y-3">
                <div className="text-slate-400 text-sm">Victor360 Brand</div>
                <div className="text-slate-400 text-sm">AI Solutions</div>
                <div className="text-slate-400 text-sm">Global Platform</div>
              </div>
              <Link
                to="/register"
                className="btn-primary btn-professional mt-6 inline-block"
              >
                Get Started
              </Link>
            </div>
          </div>
          
          <div className="text-center text-slate-500 text-xs mt-12 pt-8 border-t border-slate-700/50">
            {t('footer.builtBy')}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default GlobalLayout;