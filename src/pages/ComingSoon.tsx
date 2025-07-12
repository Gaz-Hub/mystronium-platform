import React from 'react';
import { motion } from 'framer-motion';
import { Construction, ArrowLeft, Clock, Star } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

interface ComingSoonProps {
  feature?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({ feature }) => {
  const location = useLocation();
  
  const getFeatureInfo = () => {
    const path = location.pathname;
    
    switch (path) {
      case '/codex-db':
        return {
          name: 'Codex Database',
          icon: '🗄️',
          description: 'Advanced lore management with AI-powered connections and timeline tracking',
          eta: 'Q2 2025'
        };
      case '/cartoon-engine':
        return {
          name: 'Cartoon Engine',
          icon: '🎬',
          description: 'Transform your books into animated cartoons with AI video generation',
          eta: 'Q3 2025'
        };
      case '/creator-dashboard':
        return {
          name: 'Creator Dashboard',
          icon: '📊',
          description: 'Advanced analytics, earnings tracking, and creator insights',
          eta: 'Q2 2025'
        };
      case '/analytics':
        return {
          name: 'Analytics Suite',
          icon: '📈',
          description: 'Deep insights into your content performance and audience engagement',
          eta: 'Q2 2025'
        };
      default:
        return {
          name: feature || 'Feature',
          icon: '🚧',
          description: 'This exciting new feature is currently under development',
          eta: 'Coming Soon'
        };
    }
  };

  const featureInfo = getFeatureInfo();

  return (
    <div className="min-h-screen bg-dark text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl mx-auto px-6"
      >
        <div className="bg-gray-800/50 backdrop-blur-sm p-12 rounded-xl border border-gray-600">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-8xl mb-6"
          >
            {featureInfo.icon}
          </motion.div>
          
          <h1 className="text-4xl font-bold text-white mb-4">{featureInfo.name}</h1>
          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            {featureInfo.description}
          </p>
          
          <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500/30 mb-8">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-blue-300 font-medium">Expected Launch: {featureInfo.eta}</span>
            </div>
            <p className="text-blue-200 text-sm">
              We're working hard to bring you this feature. Join our newsletter to be notified when it launches!
            </p>
          </div>

          <div className="space-y-4">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center mx-auto">
              <Star className="mr-2 w-4 h-4" />
              Get Notified When Ready
            </button>
            
            <Link
              to="/"
              className="flex items-center justify-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Return to Home
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ComingSoon;