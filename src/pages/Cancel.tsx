import React from 'react';
import { motion } from 'framer-motion';
import { XCircle, ArrowLeft, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

const Cancel = () => {
  return (
    <div className="min-h-screen bg-dark text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto px-6"
      >
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-red-500/30">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-6"
          >
            <XCircle className="w-16 h-16 text-red-400 mx-auto" />
          </motion.div>
          
          <h1 className="text-3xl font-bold text-white mb-4">Payment Cancelled</h1>
          <p className="text-gray-300 mb-6">
            Your purchase was not completed. No charges have been made to your account.
            You can try again anytime or continue using MYSTRONIUM with your current plan.
          </p>
          
          <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500/30 mb-6">
            <p className="text-blue-300 text-sm">
              <strong>Need help?</strong> Contact our support team if you experienced any issues during checkout.
            </p>
          </div>
          
          <div className="space-y-3">
            <Link
              to="/store"
              className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Try Again
            </Link>
            
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

export default Cancel;