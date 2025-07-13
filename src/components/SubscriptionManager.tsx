import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { stripeService } from "../utils/stripeService";
import { Check, Crown, Star, Zap } from "lucide-react";

interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  vaultCredits: number;
  features: string[];
}

interface UserSubscription {
  subscription: string;
  status: string;
  vaultCredits: number;
  customerId: string | null;
  subscriptionId: string | null;
  currentPeriodEnd: Date | null;
}

const SubscriptionManager: React.FC = () => {
  const { user } = useAuth();
  const [userSubscription, setUserSubscription] =
    useState<UserSubscription | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [plans] = useState<SubscriptionPlan[]>(
    stripeService.getSubscriptionPlans(),
  );

  useEffect(() => {
    if (user) {
      loadUserSubscription();
    }
  }, [user]);

  const loadUserSubscription = async () => {
    try {
      setLoading(true);
      const subscription = await stripeService.getUserSubscription();
      setUserSubscription(subscription);
    } catch (error) {
      console.error("Failed to load subscription:", error);
      setError("Failed to load subscription data");
    } finally {
      setLoading(false);
    }
  };

  const handleSubscribe = async (planId: string) => {
    try {
      setLoading(true);
      setError(null);

      // Map plan IDs to Stripe price IDs (you'll need to create these in your Stripe dashboard)
      const priceIdMap: { [key: string]: string } = {
        basic: "price_basic_monthly", // Replace with actual Stripe price ID
        premium: "price_premium_monthly", // Replace with actual Stripe price ID
        enterprise: "price_enterprise_monthly", // Replace with actual Stripe price ID
      };

      const priceId = priceIdMap[planId];
      if (!priceId) {
        throw new Error("Invalid plan selected");
      }

      const successUrl = `${window.location.origin}/dashboard?subscription=success`;
      const cancelUrl = `${window.location.origin}/dashboard?subscription=cancelled`;

      const sessionId = await stripeService.createCheckoutSession(
        priceId,
        successUrl,
        cancelUrl,
      );
      await stripeService.redirectToCheckout(sessionId);
    } catch (error) {
      console.error("Subscription error:", error);
      setError("Failed to start subscription process");
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    try {
      setLoading(true);
      setError(null);

      if (!userSubscription?.customerId) {
        throw new Error("No active subscription found");
      }

      const returnUrl = `${window.location.origin}/dashboard`;
      const portalUrl = await stripeService.createPortalSession(
        userSubscription.customerId,
        returnUrl,
      );
      window.location.href = portalUrl;
    } catch (error) {
      console.error("Portal error:", error);
      setError("Failed to open billing portal");
    } finally {
      setLoading(false);
    }
  };

  const getPlanIcon = (planId: string) => {
    switch (planId) {
      case "basic":
        return <Star className="w-6 h-6 text-blue-500" />;
      case "premium":
        return <Crown className="w-6 h-6 text-purple-500" />;
      case "enterprise":
        return <Zap className="w-6 h-6 text-yellow-500" />;
      default:
        return <Star className="w-6 h-6 text-gray-500" />;
    }
  };

  const isCurrentPlan = (planId: string) => {
    return userSubscription?.subscription === planId;
  };

  const isStripeConfigured = stripeService.isStripeConfigured();

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Subscription Management
          </h2>
          <p className="text-gray-600">
            Please log in to manage your subscription.
          </p>
        </div>
      </div>
    );
  }

  if (!isStripeConfigured) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Subscription Management
          </h2>
          <p className="text-gray-600">
            Stripe is not configured. Please contact support.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          MYSTRONIUM™ Creator Plans
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Choose the perfect plan for your creative journey
        </p>

        {userSubscription && (
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Current Subscription
            </h3>
            <div className="flex items-center justify-center space-x-4 text-sm">
              <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                {userSubscription.subscription.charAt(0).toUpperCase() +
                  userSubscription.subscription.slice(1)}
              </span>
              <span className="text-gray-600">
                {userSubscription.vaultCredits} Vault Credits
              </span>
              {userSubscription.currentPeriodEnd && (
                <span className="text-gray-600">
                  Renews:{" "}
                  {new Date(
                    userSubscription.currentPeriodEnd,
                  ).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-red-800">{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <div
            key={plan.id}
            className={`relative bg-white rounded-xl shadow-lg border-2 p-6 transition-all duration-200 hover:shadow-xl ${
              isCurrentPlan(plan.id)
                ? "border-purple-500 bg-purple-50"
                : "border-gray-200 hover:border-purple-300"
            }`}
          >
            {isCurrentPlan(plan.id) && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Current Plan
                </span>
              </div>
            )}

            <div className="text-center mb-6">
              <div className="flex justify-center mb-4">
                {getPlanIcon(plan.id)}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {plan.name}
              </h3>
              <div className="text-3xl font-bold text-gray-900 mb-1">
                ${plan.price}
                <span className="text-lg font-normal text-gray-600">
                  /month
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                {plan.vaultCredits} Vault Credits
              </p>
            </div>

            <ul className="space-y-3 mb-6">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="text-center">
              {isCurrentPlan(plan.id) ? (
                <button
                  onClick={handleManageSubscription}
                  disabled={loading}
                  className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Loading..." : "Manage Subscription"}
                </button>
              ) : (
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  disabled={loading}
                  className="w-full bg-gray-900 text-white py-2 px-4 rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {loading ? "Processing..." : "Subscribe Now"}
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          What are Vault Credits?
        </h3>
        <p className="text-gray-700 mb-4">
          Vault Credits are the currency of the MYSTRONIUM™ Creator Platform.
          They allow you to:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li>• Generate high-quality AI content and artwork</li>
          <li>• Access premium creation tools and templates</li>
          <li>• Export your creations in various formats</li>
          <li>• Unlock advanced features and analytics</li>
        </ul>
      </div>
    </div>
  );
};

export default SubscriptionManager;
