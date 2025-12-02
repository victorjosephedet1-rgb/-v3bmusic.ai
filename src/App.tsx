import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { AudioProvider } from './contexts/AudioContext';
import { PackProvider } from './contexts/PackContext';
import { NotificationProvider } from './components/NotificationSystem';
import ErrorBoundary from './components/ErrorBoundary';
import SEOHead from './components/SEOHead';
import GlobalLayout from './components/GlobalLayout';
import FuturisticLandingPage from './pages/FuturisticLandingPage';
import CreatorMarketplace from './pages/CreatorMarketplace';
import CatalogOfGrievances from './components/CatalogOfGrievances';
import EnhancedArtistDashboard from './pages/EnhancedArtistDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import AdminPortal from './pages/AdminPortal';
import LicenseDownload from './pages/LicenseDownload';
import ArtistProfile from './pages/ArtistProfile';
import ClearanceVerification from './pages/ClearanceVerification';
import UsageGuidelines from './components/UsageGuidelines';
import LoadingScreen from './components/LoadingScreen';
import SafetyCenter from './pages/SafetyCenter';
import PlatformDemo from './pages/PlatformDemo';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <ErrorBoundary>
      <SEOHead />
      <GlobalLayout>
        <Routes>
          <Route path="/" element={<FuturisticLandingPage />} />
          <Route path="/marketplace" element={<CreatorMarketplace />} />
          <Route path="/catalog" element={<CatalogOfGrievances />} />
          <Route path="/dashboard" element={<EnhancedArtistDashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<AdminPortal />} />
          <Route path="/guidelines" element={<UsageGuidelines />} />
          <Route path="/license-download" element={<LicenseDownload />} />
          <Route path="/license/:id" element={<LicenseDownload />} />
          <Route path="/artist/:slug" element={<ArtistProfile />} />
          <Route path="/verify/:code" element={<ClearanceVerification />} />
          <Route path="/safety" element={<SafetyCenter />} />
          <Route path="/demo" element={<PlatformDemo />} />
        </Routes>
      </GlobalLayout>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <HelmetProvider>
      <ErrorBoundary>
        <NotificationProvider>
          <AuthProvider>
            <Router>
              <AudioProvider>
                <PackProvider>
                  <AppContent />
                </PackProvider>
              </AudioProvider>
            </Router>
          </AuthProvider>
        </NotificationProvider>
      </ErrorBoundary>
    </HelmetProvider>
  );
}

export default App;