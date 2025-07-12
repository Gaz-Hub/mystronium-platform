const stripe = require('stripe')(process.env.VITE_STRIPE_SECRET_KEY);
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK
let firebaseApp;
try {
  if (!admin.apps.length) {
    firebaseApp = admin.initializeApp({
      credential: admin.credential.cert({
        projectId: process.env.VITE_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n')
      }),
      databaseURL: process.env.VITE_FIREBASE_DATABASE_URL
    });
  } else {
    firebaseApp = admin.app();
  }
} catch (error) {
  console.error('Firebase Admin initialization error:', error);
}

const db = firebaseApp ? firebaseApp.firestore() : null;

// Webhook signature validation
const verifyWebhookSignature = (payload, signature) => {
  try {
    const webhookSecret = process.env.VITE_STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error('Missing VITE_STRIPE_WEBHOOK_SECRET');
      return false;
    }
    
    const event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
    return event;
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message);
    return false;
  }
};

// Update user subscription in Firestore
const updateUserSubscription = async (customerId, subscription) => {
  if (!db) {
    console.error('Firestore not available');
    return;
  }

  try {
    // Find user by Stripe customer ID
    const usersRef = db.collection('users');
    const snapshot = await usersRef.where('stripeCustomerId', '==', customerId).get();
    
    if (snapshot.empty) {
      console.log('No user found with customer ID:', customerId);
      return;
    }

    const userDoc = snapshot.docs[0];
    const userData = userDoc.data();
    
    // Update subscription status
    const subscriptionData = {
      subscription: subscription.status === 'active' ? 'premium' : 'free',
      stripeSubscriptionId: subscription.id,
      stripeCustomerId: customerId,
      subscriptionStatus: subscription.status,
      currentPeriodEnd: new Date(subscription.current_period_end * 1000),
      updatedAt: admin.firestore.FieldValue.serverTimestamp()
    };

    // Add vault credits for premium subscriptions
    if (subscription.status === 'active') {
      subscriptionData.vaultCredits = (userData.vaultCredits || 0) + 10;
    }

    await userDoc.ref.update(subscriptionData);
    
    console.log('Updated subscription for user:', userData.email, subscriptionData);
  } catch (error) {
    console.error('Error updating user subscription:', error);
  }
};

// Handle invoice payment
const handleInvoicePayment = async (invoice) => {
  console.log('Processing invoice payment:', invoice.id);
  
  if (invoice.subscription) {
    const subscription = await stripe.subscriptions.retrieve(invoice.subscription);
    await updateUserSubscription(invoice.customer, subscription);
  }
};

// Handle subscription events
const handleSubscriptionEvent = async (subscription) => {
  console.log('Processing subscription event:', subscription.id, subscription.status);
  await updateUserSubscription(subscription.customer, subscription);
};

// Handle checkout session completion
const handleCheckoutSessionCompleted = async (session) => {
  console.log('Processing checkout session completion:', session.id);
  
  if (session.subscription) {
    const subscription = await stripe.subscriptions.retrieve(session.subscription);
    await updateUserSubscription(session.customer, subscription);
  }
  
  // Update user with Stripe customer ID if not already set
  if (session.customer && session.metadata?.userId) {
    try {
      const userRef = db.collection('users').doc(session.metadata.userId);
      await userRef.update({
        stripeCustomerId: session.customer,
        updatedAt: admin.firestore.FieldValue.serverTimestamp()
      });
      console.log('Updated user with Stripe customer ID:', session.metadata.userId);
    } catch (error) {
      console.error('Error updating user with customer ID:', error);
    }
  }
};

// Create checkout session
const createCheckoutSession = async (priceId, userId, successUrl, cancelUrl) => {
  try {
    console.log('Creating checkout session for user:', userId, 'price:', priceId);
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: {
        userId: userId
      },
      customer_email: userId // This will be updated with actual email from Firestore
    });

    console.log('Checkout session created:', session.id);
    return session;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

// Create customer portal session
const createPortalSession = async (customerId, returnUrl) => {
  try {
    console.log('Creating portal session for customer:', customerId);
    
    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: returnUrl,
    });

    console.log('Portal session created:', session.id);
    return session;
  } catch (error) {
    console.error('Error creating portal session:', error);
    throw error;
  }
};

// Main webhook handler
exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, Stripe-Signature',
    'Access-Control-Allow-Methods': 'POST, OPTIONS'
  };

  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    };
  }

  // Validate request method
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  try {
    console.log('🔔 MYSTRONIUM STRIPE WEBHOOK: Processing event');
    
    // Check if this is a direct API call or webhook
    const signature = event.headers['stripe-signature'];
    
    if (signature) {
      // This is a Stripe webhook
      console.log('📋 Event type: Stripe webhook');
      
      if (!signature) {
        console.error('Missing Stripe signature header');
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Missing signature' })
        };
      }

      const stripeEvent = verifyWebhookSignature(event.body, signature);
      if (!stripeEvent) {
        return {
          statusCode: 400,
          headers,
          body: JSON.stringify({ error: 'Invalid signature' })
        };
      }

      console.log('✅ Webhook signature verified');
      console.log('📦 Event type:', stripeEvent.type);
      console.log('🆔 Event ID:', stripeEvent.id);

      // Handle different event types
      switch (stripeEvent.type) {
        case 'invoice.payment_succeeded':
          await handleInvoicePayment(stripeEvent.data.object);
          break;
          
        case 'invoice.payment_failed':
          console.log('Payment failed for invoice:', stripeEvent.data.object.id);
          break;
          
        case 'customer.subscription.created':
        case 'customer.subscription.updated':
        case 'customer.subscription.deleted':
          await handleSubscriptionEvent(stripeEvent.data.object);
          break;
          
        case 'checkout.session.completed':
          await handleCheckoutSessionCompleted(stripeEvent.data.object);
          break;
          
        case 'payment_intent.succeeded':
          console.log('Payment intent succeeded:', stripeEvent.data.object.id);
          break;
          
        case 'payment_intent.payment_failed':
          console.log('Payment intent failed:', stripeEvent.data.object.id);
          break;
          
        default:
          console.log('Unhandled event type:', stripeEvent.type);
      }

      console.log('✅ MYSTRONIUM STRIPE WEBHOOK: Event processed successfully');

      return {
        statusCode: 200,
        headers,
        body: JSON.stringify({ received: true })
      };
    } else {
      // This is a direct API call from frontend
      console.log('📋 Event type: Direct API call');
      
      const body = JSON.parse(event.body);
      const { action } = body;

      switch (action) {
        case 'create-checkout-session':
          const { priceId, userId, successUrl, cancelUrl } = body;
          const session = await createCheckoutSession(priceId, userId, successUrl, cancelUrl);
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ sessionId: session.id })
          };

        case 'create-portal-session':
          const { customerId, returnUrl } = body;
          const portalSession = await createPortalSession(customerId, returnUrl);
          return {
            statusCode: 200,
            headers,
            body: JSON.stringify({ url: portalSession.url })
          };

        default:
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Invalid action' })
          };
      }
    }

  } catch (error) {
    console.error('❌ MYSTRONIUM STRIPE WEBHOOK ERROR:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Webhook processing failed',
        message: error.message 
      })
    };
  }
}; 