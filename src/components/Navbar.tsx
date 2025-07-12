import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { useAdmin } from '../contexts/AdminContext';
import { LogOut, User, Crown, Zap, Shield, Settings } from 'lucide-react';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const { userProfile } = useUser();
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getDisplayName = () => {
    if (userProfile?.displayName) return userProfile.displayName;
    if (currentUser?.displayName) return currentUser.displayName;
    if (currentUser?.email) return currentUser.email.split('@')[0];
    return 'User';
  };

  return (
    <nav className="bg-gray-900 border-b border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold text-gold flex items-center">
          <svg width="32" height="32" viewBox="0 0 32 32" className="text-gold mr-2">
            <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M10 16l4 4 8-8" stroke="currentColor" strokeWidth="2"/>
          </svg>
          MYSTRONIUM™
        </Link>
        
        <div className="hidden md:flex space-x-8">
          <Link to="/ghostscribe" className="text-white hover:text-gold transition-colors">
            Ghostscribe
          </Link>
          <Link to="/vault" className="text-white hover:text-gold transition-colors">
            Vault Engine
          </Link>
          <Link to="/narrata" className="text-white hover:text-gold transition-colors">
            Narrata
          </Link>
          <Link to="/codex" className="text-white hover:text-gold transition-colors">
            Codex Forge
          </Link>
          <Link to="/comics" className="text-white hover:text-gold transition-colors">
            Comic Builder
          </Link>
          <Link to="/bookstore" className="text-white hover:text-gold transition-colors">
            Bookstore
          </Link>
          <Link to="/credit-shop" className="text-white hover:text-gold transition-colors">
            Credits
          </Link>
          <Link to="/store" className="text-white hover:text-gold transition-colors">
            Pricing
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <div className="flex items-center space-x-4">
              {userProfile?.subscription && userProfile.subscription !== 'free' && (
                <div className="flex items-center space-x-1">
                  {userProfile.subscription === 'premium' ? (
                    <Crown className="w-4 h-4 text-yellow-400" />
                  ) : (
                    <Zap className="w-4 h-4 text-purple-400" />
                  )}
                  <span className="text-xs text-gray-400 capitalize">
                    {userProfile.subscription.replace('-', ' ')}
                  </span>
                </div>
              )}
              
              {isAdmin && (
                <Link to="/admin" className="text-red-400 hover:text-red-300 transition-colors">
                  <Shield className="w-5 h-5" />
                </Link>
              )}
              
              <div className="relative group">
                <button className="flex items-center space-x-2 text-white hover:text-gold transition-colors">
                  <User className="w-5 h-5" />
                  <span>{getDisplayName()}</span>
                </button>
                
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-600 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link to="/dashboard" className="block px-4 py-2 text-white hover:bg-gray-700 rounded-t-lg">
                    Dashboard
                  </Link>
                  <Link to="/profile" className="block px-4 py-2 text-white hover:bg-gray-700">
                    Profile
                  </Link>
                  <Link to="/my-books" className="block px-4 py-2 text-white hover:bg-gray-700">
                    My Books
                  </Link>
                  <Link to="/creator-backend" className="block px-4 py-2 text-white hover:bg-gray-700">
                    Creator Backend
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-400 hover:bg-gray-700 rounded-b-lg flex items-center"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <>
              <Link 
                to="/login" 
                className="px-4 py-2 text-white hover:text-gold transition-colors"
              >
                Login
              </Link>
              <Link 
                to="/register" 
                className="px-4 py-2 bg-gradient-to-r from-gold to-lumen-blue text-black rounded-lg hover:from-yellow-400 hover:to-cyan-300 transition-all font-medium"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;