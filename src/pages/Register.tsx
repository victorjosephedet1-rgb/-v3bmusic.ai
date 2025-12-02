import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Register() {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState<'artist' | 'creator'>('creator');
  const [loading, setLoading] = useState(false);
  const { register, user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await register(email, password, name, role);
    } catch (error) {
      console.error('Registration failed:', error);
      // You might want to show an error message to the user here
    } finally {
      setLoading(false);
    }
  };

  // Redirect after successful registration
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
            <UserPlus className="h-8 w-8 text-purple-400" />
            <h2 className="text-3xl font-bold text-white">{t('auth.register.title')}</h2>
          </div>
          <p className="text-gray-400 mb-4">{t('auth.register.subtitle')}</p>
          <div className="p-4 bg-gradient-to-r from-v3b-purple/10 to-v3b-blue/10 border border-v3b-purple/20 rounded-lg">
            <p className="text-white text-sm mb-2">
              🌟 <strong>{t('auth.register.revolutionaryTitle')}</strong>
            </p>
            <ul className="text-xs text-gray-300 space-y-1 text-left">
              <li>• {t('auth.register.features.exclusiveTech')}</li>
              <li>• {t('auth.register.features.firstOfKind')}</li>
              <li>• {t('auth.register.features.patentPending')}</li>
              <li>• {t('auth.register.features.transparency')}</li>
            </ul>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-3">{t('auth.register.wantTo')}</label>
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
                  {t('auth.register.licenseMusic')}
                  <div className="text-xs mt-1">{t('auth.register.forCreators')}</div>
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
                  {t('auth.register.sellMusic')}
                  <div className="text-xs mt-1">{t('auth.register.forArtists')}</div>
                </button>
              </div>
            </div>

            {/* Name */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                {role === 'artist' ? t('auth.register.artistName') : t('auth.register.fullName')}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-3 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-v3b-purple focus:ring-2 focus:ring-v3b-purple/20"
                  placeholder={role === 'artist' ? t('auth.register.enterArtistName') : t('auth.register.enterFullName')}
                />
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
                  placeholder={t('auth.register.createPassword')}
                />
              </div>
              <p className="text-xs text-gray-400 mt-1">
                {t('auth.register.passwordSecurity')}
              </p>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 bg-gradient-to-r from-v3b-purple to-v3b-blue text-white rounded-lg font-medium hover:from-purple-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-v3b-purple/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            {loading ? t('auth.register.creatingAccount') : t('auth.register.createAccount')}
          </button>

          <div className="text-center">
            <p className="text-gray-400">
              {t('auth.register.alreadyHaveAccount')}{' '}
              <Link to="/login" className="text-v3b-purple hover:text-purple-300 transition-colors">
                {t('auth.register.signInHere')}
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}