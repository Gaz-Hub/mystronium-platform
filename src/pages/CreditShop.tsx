import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { loadStripe } from '@stripe/stripe-js';
import { Zap, CreditCard, Star, Crown, ShoppingCart } from 'lucide-react';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

interface CreditPack {
  id: string;
  credits: number;
  price: number;
  originalPrice?: number;
  popular?: boolean;
  bonus?: number;
  priceId: string;
}

const CreditShop = () => {
  const { currentUser } = useAuth();
  const { userProfile, updateUserProfile } = useUser();
  const [loading, setLoading] = useState<string | null>(null);

  const creditPacks: CreditPack[] = [
    {
      id: 'starter',
      credits: 100,
      price: 3.99,
      priceId: 'price_credits_100',
    },
    {
      id: 'popular',
      credits: 500,
      price: 14.99,
      originalPrice: 19.95,
      popular: true,
      bonus: 50,
      priceId: 'price_credits_500',
    },
    {
      id: 'power',
      credits: 1000,
      price: 24.99,
      originalPrice: 39.90,
      bonus: 200,
      priceId: 'price_credits_1000',
    },
    {
      id: 'ultimate',
      credits: 2000,
      price: 39.99,
      originalPrice: 79.80,
      bonus: 500,
      priceId: 'price_credits_2000',
    }
  ];

  const handlePurchase = async (pack: CreditPack) => {
    if (!currentUser) {
      toast.error('Please log in to purchase credits');
      return;
    }

    if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
      toast.error('Payment system is not configured. Please contact support.');
      return;
    }

    setLoading(pack.id);

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // In a real app, you'd call your backend to create a checkout session
      // For demo purposes, we'll simulate the purchase
      toast.success('Redirecting to Stripe checkout...');
      
      // Simulate successful purchase
      setTimeout(async () => {
        try {
          const totalCredits = pack.credits + (pack.bonus || 0);
          const currentCredits = userProfile?.vaultCredits || 0;
          
          await updateUserProfile({ 
            vaultCredits: currentCredits + totalCredits 
          });
          
          toast.success(`🎉 Successfully purchased ${totalCredits} Vault Credits!`);
          setLoading(null);
        } catch (error) {
          console.error('Error updating credits:', error);
          toast.error('Purchase successful but failed to update credits. Please contact support.');
          setLoading(null);
        }
      }, 2000);

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <Zap className="mr-3 w-10 h-10 text-cyan-400" />
              Vault Credit Shop
            </h1>
            <p className="text-gray-400 text-lg">Power up your creativity • Generate unlimited art</p>
            {userProfile && (
              <div className="mt-4 inline-block bg-gray-800/50 px-6 py-3 rounded-lg">
                <span className="text-gray-400">Current Balance: </span>
                <span className="text-cyan-400 font-bold text-xl">
                  {userProfile.vaultCredits} Credits
                </span>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {creditPacks.map((pack, index) => (
              <motion.div
                key={pack.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`relative bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border-2 transition-all hover:scale-105 ${
                  pack.popular 
                    ? 'border-cyan-500/50 shadow-cyan-500/20' 
                    : 'border-gray-600 hover:border-cyan-500/50'
                }`}
              >
                {pack.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    {pack.credits.toLocaleString()} Credits
                  </h3>
                  {pack.bonus && (
                    <p className="text-cyan-400 text-sm font-medium mb-2">
                      +{pack.bonus} Bonus Credits!
                    </p>
                  )}
                  <div className="text-3xl font-bold text-white mb-1">
                    £{pack.price.toFixed(2)}
                  </div>
                  {pack.originalPrice && (
                    <div className="text-gray-400 line-through text-sm">
                      £{pack.originalPrice.toFixed(2)}
                    </div>
                  )}
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-300 text-sm">
                    <Zap className="w-4 h-4 text-cyan-400 mr-2" />
                    {pack.credits.toLocaleString()} Vault Engine generations
                  </div>
                  {pack.bonus && (
                    <div className="flex items-center text-cyan-300 text-sm">
                      <Star className="w-4 h-4 text-cyan-400 mr-2" />
                      {pack.bonus} bonus credits included
                    </div>
                  )}
                  <div className="flex items-center text-gray-300 text-sm">
                    <Crown className="w-4 h-4 text-yellow-400 mr-2" />
                    Never expires
                  </div>
                </div>

                <button
                  onClick={() => handlePurchase(pack)}
                  disabled={loading === pack.id}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center ${
                    loading === pack.id
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : pack.popular
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:from-cyan-700 hover:to-blue-700'
                      : 'bg-gradient-to-r from-gray-600 to-gray-700 text-white hover:from-gray-700 hover:to-gray-800'
                  }`}
                >
                  {loading === pack.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Buy Credits
                    </>
                  )}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Credit Usage Guide */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">How Credits Work</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🎨</div>
                <h3 className="text-white font-bold mb-2">Vault Engine</h3>
                <p className="text-gray-400 text-sm">1 credit = 1 high-quality AI image generation</p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="text-white font-bold mb-2">No Expiration</h3>
                <p className="text-gray-400 text-sm">Credits never expire and roll over indefinitely</p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-white font-bold mb-2">Instant Access</h3>
                <p className="text-gray-400 text-sm">Credits are added to your account immediately</p>
              </div>
            </div>
          </motion.div>

          {/* Subscription Alternative */}
          <motion.div
            className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-8 rounded-xl border border-purple-500/30 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">Need Unlimited Credits?</h3>
            <p className="text-gray-300 mb-6">
              Upgrade to Premium or Creator Pro for unlimited Vault Engine generations plus access to all premium features.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/store"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                View Subscription Plans
              </a>
              <a
                href="/vault"
                className="bg-gray-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-600 transition-all"
              >
                Use Vault Engine
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreditShop;