import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Users, Crown } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import toast from 'react-hot-toast';

const Referral = () => {
  const { currentUser } = useAuth();
  const { userProfile } = useUser();
  const [copied, setCopied] = useState(false);
  
  const inviteCode = currentUser 
    ? `VAULT-${currentUser.uid.substring(0, 6).toUpperCase()}`
    : 'VAULT-SAMPLE';

  const referralLink = `https://mystronium.com/register?ref=${inviteCode}`;

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast.success('Copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      toast.error('Failed to copy');
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <Gift className="mr-3 w-10 h-10 text-pink-400" />
              Referral Program
            </h1>
            <p className="text-gray-400">Invite friends and earn rewards together</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Referral Info */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold text-white mb-6">How It Works</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Share Your Code</h3>
                    <p className="text-gray-400 text-sm">Send your unique referral code to friends</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Friends Sign Up</h3>
                    <p className="text-gray-400 text-sm">They register using your referral code</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="bg-pink-600 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <div>
                    <h3 className="text-white font-medium mb-1">Earn Rewards</h3>
                    <p className="text-gray-400 text-sm">Get 1 month free Premium when 3 friends upgrade</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-gradient-to-r from-pink-600/20 to-purple-600/20 p-4 rounded-lg border border-pink-500/30">
                <h3 className="text-pink-300 font-medium mb-2 flex items-center">
                  <Crown className="w-4 h-4 mr-2" />
                  Bonus Rewards
                </h3>
                <ul className="text-pink-200 text-sm space-y-1">
                  <li>• Your friends get 50% off their first month</li>
                  <li>• You get 1 month free Premium for every 3 referrals</li>
                  <li>• Unlimited referrals = unlimited free months</li>
                  <li>• Referrals stack with existing subscriptions</li>
                </ul>
              </div>
            </div>

            {/* Referral Code */}
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                <h2 className="text-xl font-bold text-white mb-4">Your Referral Code</h2>
                
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-mono font-bold text-pink-400">{inviteCode}</span>
                    <button
                      onClick={() => copyToClipboard(inviteCode)}
                      className="bg-pink-600 text-white p-2 rounded hover:bg-pink-700 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <label className="block text-white font-medium mb-2">Referral Link</label>
                    <div className="flex">
                      <input
                        type="text"
                        value={referralLink}
                        readOnly
                        className="flex-1 bg-gray-800 text-white p-3 rounded-l-lg border border-gray-600 text-sm"
                      />
                      <button
                        onClick={() => copyToClipboard(referralLink)}
                        className={`px-4 py-3 rounded-r-lg font-medium transition-all ${
                          copied 
                            ? 'bg-green-600 text-white' 
                            : 'bg-pink-600 text-white hover:bg-pink-700'
                        }`}
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2" />
                  Your Stats
                </h2>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <p className="text-2xl font-bold text-pink-400">0</p>
                    <p className="text-gray-400 text-sm">Referrals</p>
                  </div>
                  <div className="text-center">
                    <p className="text-2xl font-bold text-purple-400">0</p>
                    <p className="text-gray-400 text-sm">Rewards Earned</p>
                  </div>
                </div>

                <div className="mt-4 bg-gray-700/50 p-3 rounded-lg">
                  <p className="text-gray-300 text-sm text-center">
                    Progress: 0/3 referrals for your next free month
                  </p>
                  <div className="w-full bg-gray-600 rounded-full h-2 mt-2">
                    <div className="bg-pink-600 h-2 rounded-full" style={{ width: '0%' }}></div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                <h3 className="text-white font-medium mb-3">Share on Social</h3>
                <div className="grid grid-cols-2 gap-3">
                  <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors text-sm">
                    Twitter
                  </button>
                  <button className="bg-blue-800 text-white py-2 px-4 rounded hover:bg-blue-900 transition-colors text-sm">
                    Facebook
                  </button>
                  <button className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition-colors text-sm">
                    WhatsApp
                  </button>
                  <button className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 transition-colors text-sm">
                    Email
                  </button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Referral;