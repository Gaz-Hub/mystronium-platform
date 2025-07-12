import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { loadStripe } from '@stripe/stripe-js';
import { Crown, Zap, Check, Star, CreditCard } from 'lucide-react';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || '');

const Store = () => {
  const { currentUser } = useAuth();
  const { userProfile } = useUser();
  const [loading, setLoading] = useState<string | null>(null);

  const plans = [
    {
      id: 'free',
      name: 'Free',
      price: '£0',
      period: 'forever',
      icon: <Star className="w-8 h-8 text-gray-400" />,
      features: [
        '3 Vault Engine credits per day',
        'Basic Ghostscribe access (Mistral AI)',
        'Basic Narrata voice synthesis',
        'Personal use only',
        'Community support'
      ],
      buttonText: 'Current Plan',
      disabled: true,
      current: userProfile?.subscription === 'free'
    },
    {
      id: 'premium',
      name: 'Premium',
      price: '£9.99',
      period: 'month',
      icon: <Crown className="w-8 h-8 text-yellow-400" />,
      popular: true,
      features: [
        'Unlimited Vault Engine generations',
        'GPT-4o access in Ghostscribe',
        'Premium voice options in Narrata',
        'High-resolution exports',
        'Limited commercial use',
        'Priority support'
      ],
      buttonText: 'Upgrade to Premium',
      priceId: 'price_premium_monthly',
      current: userProfile?.subscription === 'premium'
    },
    {
      id: 'creator-pro',
      name: 'Creator Pro',
      price: '£19.99',
      period: 'month',
      icon: <Zap className="w-8 h-8 text-purple-400" />,
      features: [
        'Everything in Premium',
        'Full commercial usage rights',
        'API access for integrations',
        'Custom voice cloning',
        'Advanced analytics',
        'White-label options',
        'Dedicated support'
      ],
      buttonText: 'Upgrade to Creator Pro',
      priceId: 'price_creator_pro_monthly',
      current: userProfile?.subscription === 'creator-pro'
    }
  ];

  const handlePurchase = async (plan: any) => {
    if (!currentUser) {
      toast.error('Please log in to upgrade your plan');
      return;
    }

    if (plan.disabled || plan.current) {
      return;
    }

    if (!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY) {
      toast.error('Stripe is not configured. Please contact support.');
      return;
    }

    setLoading(plan.id);

    try {
      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error('Stripe failed to load');
      }

      // In a real app, you'd call your backend to create a checkout session
      // For demo purposes, we'll simulate the flow
      toast.success('Redirecting to Stripe checkout...');
      
      // Simulate Stripe checkout
      setTimeout(() => {
        toast.success(`Successfully upgraded to ${plan.name}!`);
        // In a real app, Stripe would redirect back to a success page
        window.location.href = '/success';
      }, 2000);

    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Payment failed. Please try again.');
    }

    setLoading(null);
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
              <CreditCard className="mr-3 w-10 h-10 text-green-400" />
              Subscription Plans
            </h1>
            <p className="text-gray-400 text-lg">Transcend mortal limitations • Unlock the Vault's true power</p>
            {userProfile && (
              <div className="mt-4 inline-block bg-gray-800/50 px-4 py-2 rounded-lg">
                <span className="text-gray-400">Current Plan: </span>
                <span className="text-white font-medium capitalize">
                  {userProfile.subscription.replace('-', ' ')}
                </span>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                className={`relative bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border-2 transition-all hover:scale-105 ${
                  plan.popular 
                    ? 'border-yellow-500/50 shadow-yellow-500/20' 
                    : plan.current
                    ? 'border-green-500/50 shadow-green-500/20'
                    : 'border-gray-600 hover:border-purple-500/50'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                {plan.current && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-green-600 to-emerald-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                      Current Plan
                    </span>
                  </div>
                )}

                <div className="text-center mb-6">
                  <div className="mb-4">{plan.icon}</div>
                  <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-white mb-1">
                    {plan.price}
                    {plan.period !== 'forever' && (
                      <span className="text-lg text-gray-400">/{plan.period}</span>
                    )}
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-start text-gray-300">
                      <Check className="w-5 h-5 text-green-400 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => handlePurchase(plan)}
                  disabled={plan.disabled || plan.current || loading === plan.id}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-all flex items-center justify-center ${
                    plan.current
                      ? 'bg-green-600 text-white cursor-default'
                      : plan.disabled
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : loading === plan.id
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : plan.popular
                      ? 'bg-gradient-to-r from-yellow-600 to-orange-600 text-white hover:from-yellow-700 hover:to-orange-700'
                      : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700'
                  }`}
                >
                  {loading === plan.id ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing...
                    </>
                  ) : plan.current ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Current Plan
                    </>
                  ) : (
                    plan.buttonText
                  )}
                </button>
              </motion.div>
            ))}
          </div>

          {/* Features Comparison */}
          <motion.div
            className="mt-16 bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Why Upgrade?</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-4xl mb-4">🚀</div>
                <h3 className="text-white font-bold mb-2">Unlimited Creation</h3>
                <p className="text-gray-400 text-sm">
                  Generate unlimited art, write endless stories, and create without limits
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">⚡</div>
                <h3 className="text-white font-bold mb-2">Premium AI Models</h3>
                <p className="text-gray-400 text-sm">
                  Access to GPT-4o, advanced voice synthesis, and high-quality image generation
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl mb-4">💼</div>
                <h3 className="text-white font-bold mb-2">Commercial Rights</h3>
                <p className="text-gray-400 text-sm">
                  Sell your creations, publish books, and monetize your AI-generated content
                </p>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <p className="text-gray-400 mb-4">
                Need credits instead? 
              </p>
              <a
                href="/credit-shop"
                className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-cyan-700 transition-all"
              >
                Buy Vault Credits
              </a>
            </div>
          </motion.div>

          {/* FAQ */}
          <motion.div
            className="mt-12 bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-white font-medium mb-2">Can I cancel anytime?</h3>
                <p className="text-gray-400 text-sm">Yes, you can cancel your subscription at any time. You'll retain access until the end of your billing period.</p>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Do I own the content I create?</h3>
                <p className="text-gray-400 text-sm">Absolutely! You retain full ownership of all content created using MYSTRONIUM tools.</p>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">What payment methods do you accept?</h3>
                <p className="text-gray-400 text-sm">We accept all major credit cards, PayPal, and other payment methods through Stripe.</p>
              </div>

              <div>
                <h3 className="text-white font-medium mb-2">Is there a free trial?</h3>
                <p className="text-gray-400 text-sm">Yes! The free plan gives you a taste of our tools with daily credits and basic features.</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Store;