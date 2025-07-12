import React from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Users, Zap, Heart } from 'lucide-react';

const Chat = () => {
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
            <div className="text-6xl mb-6">💬</div>
            <h1 className="text-4xl font-bold mb-4 text-white">Live Creator Chat</h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Community chat and co-creation tools coming soon. 
              Connect, collaborate, and create together with fellow MYSTRONIUM creators.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 p-6 rounded-lg border border-green-500/30">
                <MessageCircle className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">Real-time Chat</h3>
                <p className="text-gray-300 text-sm">
                  Instant messaging with other creators, share ideas and get feedback
                </p>
              </div>

              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-6 rounded-lg border border-purple-500/30">
                <Users className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">Creator Rooms</h3>
                <p className="text-gray-300 text-sm">
                  Join topic-based rooms: Fantasy Writers, Sci-Fi Artists, Voice Actors
                </p>
              </div>

              <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 p-6 rounded-lg border border-blue-500/30">
                <Zap className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">Collaboration Tools</h3>
                <p className="text-gray-300 text-sm">
                  Co-write books, share art assets, and work on projects together
                </p>
              </div>

              <div className="bg-gradient-to-br from-orange-600/20 to-red-600/20 p-6 rounded-lg border border-orange-500/30">
                <Heart className="w-8 h-8 text-orange-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">Creator Support</h3>
                <p className="text-gray-300 text-sm">
                  Get help from experienced creators and share your knowledge
                </p>
              </div>
            </div>

            <div className="bg-gray-700/50 p-6 rounded-lg mb-6">
              <h3 className="text-white font-bold mb-4">Planned Chat Features:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm text-left">
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                    Voice and video calls
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                    Screen sharing for tutorials
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-purple-400 rounded-full mr-2"></span>
                    File sharing and previews
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-orange-400 rounded-full mr-2"></span>
                    Creator marketplace integration
                  </li>
                </ul>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-pink-400 rounded-full mr-2"></span>
                    AI-powered translation
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></span>
                    Moderation and safety tools
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full mr-2"></span>
                    Creator verification badges
                  </li>
                  <li className="flex items-center">
                    <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                    Community events and contests
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-green-600/20 p-4 rounded-lg border border-green-500/30 mb-6">
              <p className="text-green-300 font-medium">
                🚀 Coming Q3 2025 - Built with Discord-level performance
              </p>
              <p className="text-green-200 text-sm mt-2">
                We're building a creator-first chat experience that integrates seamlessly with all MYSTRONIUM tools.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all">
                Join Chat Beta
              </button>
              <button className="bg-gray-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-600 transition-all">
                Creator Discord
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Chat;