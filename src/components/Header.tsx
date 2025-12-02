import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, LogOut, Music2, Home, ShoppingBag, LayoutDashboard, Shield, Play } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import GlobalLanguageSwitcher from './GlobalLanguageSwitcher';

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="bg-black/20 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-3">
            <Music2 className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Victor360
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <Home className="h-4 w-4" />
              <span>Home</span>
            </Link>
            <Link
              to="/marketplace"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Utility Store</span>
            </Link>
            <Link
              to="/demo"
              className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200 font-semibold"
            >
              <Play className="h-4 w-4" />
              <span>Live Demo</span>
            </Link>
            <Link
              to="/safety"
              className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
            >
              <Shield className="h-4 w-4" />
              <span>Safety</span>
            </Link>
            {isAuthenticated && user?.role === 'artist' && (
              <Link
                to="/dashboard"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors duration-200"
              >
                <LayoutDashboard className="h-4 w-4" />
                <span>Dashboard</span>
              </Link>
            )}
          </nav>

          <div className="flex items-center space-x-4">
            <GlobalLanguageSwitcher />

            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <User className="h-5 w-5 text-purple-400" />
                  <span className="text-sm text-gray-300">{user?.name}</span>
                  <span className="px-2 py-1 text-xs bg-purple-500/20 text-purple-300 rounded-full">
                    {user?.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="p-2 text-gray-400 hover:text-white transition-colors duration-200"
                >
                  <LogOut className="h-5 w-5" />
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-gradient-to-r from-purple-500 to-cyan-500 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 glow-primary btn-futuristic"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}