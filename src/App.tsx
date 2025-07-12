import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { UserProvider } from './contexts/UserContext';
import { AdminProvider } from './contexts/AdminContext';
import { CreditProtectionProvider } from './components/CreditProtectionProvider';
import LoginStreakInitializer from './components/LoginStreakInitializer';
import Navbar from './components/Navbar';
import CreditWarningBanner from './components/CreditWarningBanner';
import FirebaseDiagnostic from './components/FirebaseDiagnostic';
import { testCurrentState } from './utils/testCurrentState';
import { quickTest } from './utils/quickTest';
import { checkEnvironmentVariables } from './utils/environmentDiagnostic';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Profile from './pages/Profile';
import Ghostscribe from './pages/Ghostscribe';
import Vault from './pages/Vault';
import Narrata from './pages/Narrata';
import Codex from './pages/Codex';
import Marketplace from './pages/Marketplace';
import Store from './pages/Store';
import About from './pages/About';
import Contact from './pages/Contact';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import HowItWorks from './pages/HowItWorks';
import ComingSoon from './pages/ComingSoon';
import AdminPanel from './pages/AdminPanel';
import BookBuilder from './pages/BookBuilder';
import BookDetails from './pages/BookDetails';
import Bookstore from './pages/Bookstore';
import MyBooks from './pages/MyBooks';
import CartoonStudio from './pages/CartoonStudio';
import ComicCreator from './pages/ComicCreator';
import CodexFusion from './pages/CodexFusion';
import CreatorBackend from './pages/CreatorBackend';
import CreatorDashboard from './pages/CreatorDashboard';
import MobileApp from './pages/MobileApp';
import Payouts from './pages/Payouts';
import Referral from './pages/Referral';
import Sell from './pages/Sell';
import Success from './pages/Success';
import Cancel from './pages/Cancel';
import Refund from './pages/Refund';
import VaultCrates from './pages/VaultCrates';
import VaultCards from './pages/VaultCards';
import Books from './pages/Books';
import Comics from './pages/Comics';
import ReadComic from './pages/ReadComic';
import Archivist from './pages/Archivist';
import Library from './pages/Library';
import ReadBook from './pages/ReadBook';
import Chat from './pages/Chat';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import CreditShop from './pages/CreditShop';
import Universe from './pages/Universe';
import Diagnostic from './pages/Diagnostic';
import ProtectedRoute from './components/ProtectedRoute';
import ErrorBoundary from './components/ErrorBoundary';
import AnimatedBackground from './components/AnimatedBackground';

function App() {
  useEffect(() => {
    // Run comprehensive diagnostic tests on app load
    if (import.meta.env.DEV) {
      testCurrentState();
      quickTest();
    }
    
    // Always run environment diagnostic (both dev and production)
    checkEnvironmentVariables();
  }, []);

  return (
    <ErrorBoundary>
      <AuthProvider>
        <UserProvider>
          <AdminProvider>
            <CreditProtectionProvider>
              <LoginStreakInitializer>
                <div className="min-h-screen bg-gray-900 relative">
                  <AnimatedBackground />
                  <Navbar />
                  <CreditWarningBanner />
                  {/* Firebase Diagnostic - Only show in development */}
                  {import.meta.env.DEV && <FirebaseDiagnostic />}
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/dashboard" element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/universe" element={
                      <ProtectedRoute>
                        <Universe />
                      </ProtectedRoute>
                    } />
                    <Route path="/profile" element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } />
                    <Route path="/ghostscribe" element={<Ghostscribe />} />
                    <Route path="/vault" element={<Vault />} />
                    <Route path="/narrata" element={<Narrata />} />
                    <Route path="/codex" element={<Codex />} />
                    <Route path="/marketplace" element={<Marketplace />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/terms" element={<Terms />} />
                    <Route path="/privacy" element={<Privacy />} />
                    <Route path="/how-it-works" element={<HowItWorks />} />
                    
                    {/* Coming Soon Routes */}
                    <Route path="/codex-db" element={<ComingSoon />} />
                    <Route path="/cartoon-engine" element={<ComingSoon />} />
                    <Route path="/analytics" element={<ComingSoon />} />
                    
                    {/* New Routes */}
                    <Route path="/creator-dashboard" element={
                      <ProtectedRoute>
                        <CreatorDashboard />
                      </ProtectedRoute>
                    } />
                    <Route path="/vault-cards" element={
                      <ProtectedRoute>
                        <VaultCards />
                      </ProtectedRoute>
                    } />
                    <Route path="/books" element={
                      <ProtectedRoute>
                        <Books />
                      </ProtectedRoute>
                    } />
                    <Route path="/archivist" element={<Archivist />} />
                    <Route path="/library" element={
                      <ProtectedRoute>
                        <Library />
                      </ProtectedRoute>
                    } />
                    <Route path="/read/:bookId" element={
                      <ProtectedRoute>
                        <ReadBook />
                      </ProtectedRoute>
                    } />
                    
                    <Route path="/admin" element={
                      <ProtectedRoute>
                        <AdminPanel />
                      </ProtectedRoute>
                    } />
                    <Route path="/book-builder" element={<BookBuilder />} />
                    <Route path="/book/:id" element={<BookDetails />} />
                    <Route path="/bookstore" element={<Bookstore />} />
                    <Route path="/my-books" element={
                      <ProtectedRoute>
                        <MyBooks />
                      </ProtectedRoute>
                    } />
                    <Route path="/cartoon-studio" element={<CartoonStudio />} />
                    <Route path="/comic-creator" element={<ComicCreator />} />
                    <Route path="/codex-fusion" element={<CodexFusion />} />
                    <Route path="/creator-backend" element={
                      <ProtectedRoute>
                        <CreatorBackend />
                      </ProtectedRoute>
                    } />
                    <Route path="/mobile-app" element={<MobileApp />} />
                    <Route path="/payouts" element={
                      <ProtectedRoute>
                        <Payouts />
                      </ProtectedRoute>
                    } />
                    <Route path="/referral" element={
                      <ProtectedRoute>
                        <Referral />
                      </ProtectedRoute>
                    } />
                    <Route path="/sell" element={<Sell />} />
                    <Route path="/success" element={<Success />} />
                    <Route path="/cancel" element={<Cancel />} />
                    <Route path="/refund" element={<Refund />} />
                    <Route path="/vault-crates" element={<VaultCrates />} />
                    <Route path="/comics" element={<Comics />} />
                    <Route path="/comic-builder" element={<Comics />} />
                    <Route path="/read-comic/:id" element={<ReadComic />} />
                    <Route path="/chat" element={
                      <ProtectedRoute>
                        <Chat />
                      </ProtectedRoute>
                    } />
                    <Route path="/diagnostic" element={<Diagnostic />} />
                    <Route path="/credit-shop" element={<CreditShop />} />
                    <Route path="/terms-of-service" element={<TermsOfService />} />
                    <Route path="/privacy-policy" element={<PrivacyPolicy />} />
                  </Routes>
                </div>
              </LoginStreakInitializer>
            </CreditProtectionProvider>
          </AdminProvider>
        </UserProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;