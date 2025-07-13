import React from "react";
import { motion } from "framer-motion";
import { DollarSign, CreditCard, TrendingUp, Clock } from "lucide-react";

const Payouts = () => {
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
            <div className="text-6xl mb-6">💸</div>
            <h1 className="text-4xl font-bold mb-4 text-white">
              Creator Payouts
            </h1>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
              Direct creator earnings through Stripe Connect integration is
              coming soon. You'll be able to earn directly from your creations
              with instant payouts.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="bg-gray-700/50 p-6 rounded-lg">
                <DollarSign className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">Instant Payouts</h3>
                <p className="text-gray-400 text-sm">
                  Get paid immediately when someone buys your book
                </p>
              </div>

              <div className="bg-gray-700/50 p-6 rounded-lg">
                <CreditCard className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">Multiple Methods</h3>
                <p className="text-gray-400 text-sm">
                  Bank transfer, PayPal, or crypto payments
                </p>
              </div>

              <div className="bg-gray-700/50 p-6 rounded-lg">
                <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">Analytics</h3>
                <p className="text-gray-400 text-sm">
                  Detailed earnings reports and tax documents
                </p>
              </div>
            </div>

            <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500/30 mb-6">
              <div className="flex items-center justify-center mb-2">
                <Clock className="w-5 h-5 text-blue-400 mr-2" />
                <span className="text-blue-300 font-medium">
                  Coming in Q2 2025
                </span>
              </div>
              <p className="text-blue-200 text-sm">
                We're working with Stripe to implement direct creator payouts.
                Join our waitlist to be notified when it launches!
              </p>
            </div>

            <button className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all">
              Join Payout Waitlist
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Payouts;
