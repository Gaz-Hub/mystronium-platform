import React from 'react';
import { motion } from 'framer-motion';
import { Smartphone, Download, Bell, Wifi } from 'lucide-react';

const MobileApp = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600">
            <div className="text-6xl mb-6">📱</div>
            <h1 className="text-4xl font-bold mb-4 text-white">MYSTRONIUM Mobile</h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              The MYSTRONIUM mobile app is in development. Create on the go with 
              push notifications, offline writing, and exclusive mobile features.
            </p>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-700/50 p-6 rounded-lg">
                <Smartphone className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">Native Apps</h3>
                <p className="text-gray-400 text-sm">iOS and Android apps with full feature parity</p>
              </div>

              <div className="bg-gray-700/50 p-6 rounded-lg">
                <Wifi className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">Offline Mode</h3>
                <p className="text-gray-400 text-sm">Write and create without internet connection</p>
              </div>

              <div className="bg-gray-700/50 p-6 rounded-lg">
                <Bell className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">Smart Notifications</h3>
                <p className="text-gray-400 text-sm">Daily writing reminders and inspiration</p>
              </div>

              <div className="bg-gray-700/50 p-6 rounded-lg">
                <Download className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">Quick Actions</h3>
                <p className="text-gray-400 text-sm">Voice memos, photo inspiration, quick notes</p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-lg border border-blue-500/30 mb-6">
              <h3 className="text-blue-300 font-bold mb-4">Mobile-Exclusive Features:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-left">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Camera integration for instant art references
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Voice-to-text for hands-free writing
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    Location-based story inspiration
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    Augmented reality character viewer
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                    Daily creative challenges
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                    Social sharing to Instagram/TikTok
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                    Biometric security for drafts
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                    Collaborative editing with friends
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h4 className="text-white font-bold mb-2">📱 iOS App</h4>
                <p className="text-gray-400 text-sm mb-3">
                  Native iOS app with Apple Pencil support, Shortcuts integration, and widgets
                </p>
                <div className="bg-blue-600/20 px-3 py-1 rounded text-blue-300 text-xs">
                  Beta: Summer 2025
                </div>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h4 className="text-white font-bold mb-2">🤖 Android App</h4>
                <p className="text-gray-400 text-sm mb-3">
                  Material Design 3, Google Assistant integration, and adaptive icons
                </p>
                <div className="bg-green-600/20 px-3 py-1 rounded text-green-300 text-xs">
                  Beta: Fall 2025
                </div>
              </div>
            </div>

            <div className="bg-purple-600/20 p-4 rounded-lg border border-purple-500/30 mb-6">
              <p className="text-purple-300 font-medium">
                📲 Pre-register now to get early access and exclusive mobile-only collectibles!
              </p>
              <p className="text-purple-200 text-sm mt-2">
                First 1,000 users get a legendary "Mobile Pioneer" badge and premium features for free.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all">
                Pre-register for iOS
              </button>
              <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all">
                Pre-register for Android
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default MobileApp;