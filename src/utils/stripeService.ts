import { loadStripe } from "@stripe/stripe-js";
import { auth, db } from "../firebase";
import { doc, getDoc, updateDoc, serverTimestamp } from "firebase/firestore";

// Initialize Stripe
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

// Stripe service class for MYSTRONIUM platform
export class StripeService {
  private static instance: StripeService;
  private stripe: any = null;

  private constructor() {
    this.initializeStripe();
  }

  public static getInstance(): StripeService {
    if (!StripeService.instance) {
      StripeService.instance = new StripeService();
    }
    return StripeService.instance;
  }

  private async initializeStripe() {
    try {
      this.stripe = await stripePromise;
      if (import.meta.env.DEV) {
        console.log("💳 MYSTRONIUM STRIPE: Initialized successfully");
      }
    } catch (error) {
      console.error("❌ MYSTRONIUM STRIPE: Initialization failed:", error);
    }
  }

  // Create checkout session for subscription
  async createCheckoutSession(
    priceId: string,
    successUrl: string,
    cancelUrl: string,
  ) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      if (import.meta.env.DEV) {
        console.log(
          "💳 MYSTRONIUM STRIPE: Creating checkout session for user:",
          user.email,
        );
      }

      const response = await fetch("/.netlify/functions/stripe-webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "create-checkout-session",
          priceId,
          userId: user.uid,
          successUrl,
          cancelUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create checkout session");
      }

      const { sessionId } = await response.json();

      if (import.meta.env.DEV) {
        console.log(
          "✅ MYSTRONIUM STRIPE: Checkout session created:",
          sessionId,
        );
      }

      return sessionId;
    } catch (error) {
      console.error(
        "❌ MYSTRONIUM STRIPE: Checkout session creation failed:",
        error,
      );
      throw error;
    }
  }

  // Redirect to Stripe checkout
  async redirectToCheckout(sessionId: string) {
    try {
      if (!this.stripe) {
        await this.initializeStripe();
      }

      const { error } = await this.stripe.redirectToCheckout({ sessionId });

      if (error) {
        throw error;
      }

      if (import.meta.env.DEV) {
        console.log("🔄 MYSTRONIUM STRIPE: Redirecting to checkout...");
      }
    } catch (error) {
      console.error("❌ MYSTRONIUM STRIPE: Checkout redirect failed:", error);
      throw error;
    }
  }

  // Create customer portal session
  async createPortalSession(customerId: string, returnUrl: string) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      if (import.meta.env.DEV) {
        console.log(
          "💳 MYSTRONIUM STRIPE: Creating portal session for user:",
          user.email,
        );
      }

      const response = await fetch("/.netlify/functions/stripe-webhook", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: "create-portal-session",
          customerId,
          returnUrl,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create portal session");
      }

      const { url } = await response.json();

      if (import.meta.env.DEV) {
        console.log("✅ MYSTRONIUM STRIPE: Portal session created");
      }

      return url;
    } catch (error) {
      console.error(
        "❌ MYSTRONIUM STRIPE: Portal session creation failed:",
        error,
      );
      throw error;
    }
  }

  // Get user subscription status
  async getUserSubscription() {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      const userDoc = doc(db, "users", user.uid);
      const userSnapshot = await getDoc(userDoc);

      if (!userSnapshot.exists()) {
        throw new Error("User document not found");
      }

      const userData = userSnapshot.data();

      if (import.meta.env.DEV) {
        console.log("📊 MYSTRONIUM STRIPE: User subscription data:", {
          subscription: userData.subscription,
          status: userData.subscriptionStatus,
          vaultCredits: userData.vaultCredits,
          customerId: userData.stripeCustomerId,
        });
      }

      return {
        subscription: userData.subscription || "free",
        status: userData.subscriptionStatus || "free",
        vaultCredits: userData.vaultCredits || 0,
        customerId: userData.stripeCustomerId,
        subscriptionId: userData.stripeSubscriptionId,
        currentPeriodEnd: userData.currentPeriodEnd,
      };
    } catch (error) {
      console.error(
        "❌ MYSTRONIUM STRIPE: Failed to get user subscription:",
        error,
      );
      throw error;
    }
  }

  // Update user subscription locally (for immediate UI updates)
  async updateUserSubscriptionLocally(subscriptionData: any) {
    try {
      const user = auth.currentUser;
      if (!user) {
        throw new Error("User not authenticated");
      }

      const userDoc = doc(db, "users", user.uid);
      await updateDoc(userDoc, {
        ...subscriptionData,
        updatedAt: serverTimestamp(),
      });

      if (import.meta.env.DEV) {
        console.log("✅ MYSTRONIUM STRIPE: User subscription updated locally");
      }
    } catch (error) {
      console.error(
        "❌ MYSTRONIUM STRIPE: Failed to update user subscription locally:",
        error,
      );
      throw error;
    }
  }

  // Check if Stripe is properly configured
  isStripeConfigured(): boolean {
    const hasPublishableKey = !!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    const hasSecretKey = !!import.meta.env.VITE_STRIPE_SECRET_KEY;
    const hasWebhookSecret = !!import.meta.env.VITE_STRIPE_WEBHOOK_SECRET;

    if (import.meta.env.DEV) {
      console.log("🔧 MYSTRONIUM STRIPE: Configuration check:", {
        hasPublishableKey,
        hasSecretKey,
        hasWebhookSecret,
        configured: hasPublishableKey && hasSecretKey && hasWebhookSecret,
      });
    }

    return hasPublishableKey && hasSecretKey && hasWebhookSecret;
  }

  // Get available subscription plans
  getSubscriptionPlans() {
    return [
      {
        id: "basic",
        name: "Basic Creator",
        price: 9.99,
        vaultCredits: 50,
        features: [
          "Access to all creation tools",
          "50 Vault Credits per month",
          "Basic support",
          "Standard export quality",
        ],
      },
      {
        id: "premium",
        name: "Premium Creator",
        price: 19.99,
        vaultCredits: 150,
        features: [
          "Everything in Basic",
          "150 Vault Credits per month",
          "Priority support",
          "High-quality exports",
          "Advanced analytics",
          "Custom branding",
        ],
      },
      {
        id: "enterprise",
        name: "Enterprise",
        price: 49.99,
        vaultCredits: 500,
        features: [
          "Everything in Premium",
          "500 Vault Credits per month",
          "Dedicated support",
          "Custom integrations",
          "White-label options",
          "Team management",
        ],
      },
    ];
  }
}

// Export singleton instance
export const stripeService = StripeService.getInstance();
