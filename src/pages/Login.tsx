import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LogIn, Mail, Lock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'artist' | 'creator'>('creator');
  const [loading, setLoading] = useState(false);
  const { login, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await login(email, password, role);
    } catch (error) {
      console.error('Login failed:', error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  // Redirect after successful login
  React.useEffect(() => {
    if (user) {
      navigate(user.role === 'artist' ? '/dashboard' : '/marketplace');
    }
  }, [user, navigate]);

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 min-h-[80vh]">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-3 mb-3">
            <LogIn className="h-8 w-8 text-purple-400" />
            <h2 className="text-3xl font-bold text-white">{t('auth.login.title')}</h2>
          </div>
          <p className="text-gray-400">{t('auth.login.subtitle')}</p>
          <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <p className="text-blue-200 text-sm">
              🔒 {t('auth.login.securityNotice')}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">{t('auth.login.roleSelection')}</label>
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() => setRole('creator')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200 font-medium ${
                    role === 'creator'
                      ? 'border-v3b-purple bg-v3b-purple/10 text-white'
                      : 'border-gray-600 bg-white/5 text-gray-400'
                  }`}
                >
                  {t('auth.login.contentCreator')}
                </button>
                <button
                  type="button"
                  onClick={() => setRole('artist')}
                  className={`flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200 font-medium ${
                    role === 'artist'
                      ? 'border-v3b-blue bg-v3b-blue/10 text-white'
                      : 'border-gray-600 bg-white/5 text-gray-400'
                  }`}
                >
                  {t('auth.login.musicArtist')}
                </button>
              </div>
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                {t('auth.login.emailAddress')}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-v3b-purple focus:ring-2 focus:ring-v3b-purple/20"
                  placeholder={t('auth.login.enterEmail')}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                {t('common.password')}
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-v3b-purple focus:ring-2 focus:ring-v3b-purple/20"
                  placeholder={t('auth.login.enterPassword')}
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-v3b-purple to-v3b-blue text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-v3b-purple/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? t('auth.login.signingIn') : t('navigation.signIn')}
          </button>

          <div className="text-center">
            <p className="text-gray-400">
              {t('auth.login.noAccount')}{' '}
              <Link to="/register" className="text-v3b-purple hover:text-purple-300 transition-colors">
                {t('auth.login.signUpHere')}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}