// Environment Diagnostic Utility for MYSTRONIUM™ Platform
// Use this to check environment variables on your live Netlify site

export const checkEnvironmentVariables = () => {
  console.log('🔧 MYSTRONIUM ENVIRONMENT DIAGNOSTIC');
  console.log('=====================================');

  // Check Firebase Variables
  console.log('\n🔥 FIREBASE VARIABLES:');
  console.log('VITE_FIREBASE_API_KEY:', import.meta.env.VITE_FIREBASE_API_KEY ? '✅ SET' : '❌ MISSING');
  console.log('VITE_FIREBASE_AUTH_DOMAIN:', import.meta.env.VITE_FIREBASE_AUTH_DOMAIN ? '✅ SET' : '❌ MISSING');
  console.log('VITE_FIREBASE_PROJECT_ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID ? '✅ SET' : '❌ MISSING');
  console.log('VITE_FIREBASE_STORAGE_BUCKET:', import.meta.env.VITE_FIREBASE_STORAGE_BUCKET ? '✅ SET' : '❌ MISSING');
  console.log('VITE_FIREBASE_MESSAGING_SENDER_ID:', import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ? '✅ SET' : '❌ MISSING');
  console.log('VITE_FIREBASE_APP_ID:', import.meta.env.VITE_FIREBASE_APP_ID ? '✅ SET' : '❌ MISSING');
  console.log('VITE_FIREBASE_MEASUREMENT_ID:', import.meta.env.VITE_FIREBASE_MEASUREMENT_ID ? '✅ SET' : '❌ MISSING');
  console.log('VITE_FIREBASE_DATABASE_URL:', import.meta.env.VITE_FIREBASE_DATABASE_URL ? '✅ SET' : '❌ MISSING');

  // Check Stripe Variables
  console.log('\n💳 STRIPE VARIABLES:');
  console.log('VITE_STRIPE_PUBLISHABLE_KEY:', import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY ? '✅ SET' : '❌ MISSING');
  console.log('VITE_STRIPE_SECRET_KEY:', import.meta.env.VITE_STRIPE_SECRET_KEY ? '✅ SET' : '❌ MISSING');
  console.log('VITE_STRIPE_WEBHOOK_SECRET:', import.meta.env.VITE_STRIPE_WEBHOOK_SECRET ? '✅ SET' : '❌ MISSING');

  // Check Admin Variables
  console.log('\n👑 ADMIN VARIABLES:');
  console.log('VITE_ADMIN_SECRET:', import.meta.env.VITE_ADMIN_SECRET ? '✅ SET' : '❌ MISSING');

  // Check reCAPTCHA Variables
  console.log('\n🤖 RECAPTCHA VARIABLES:');
  console.log('RECAPTCHA_SITE_KEY:', import.meta.env.RECAPTCHA_SITE_KEY ? '✅ SET' : '❌ MISSING');

  // Check Data Connect Variables (if using)
  console.log('\n🗄️ DATA CONNECT VARIABLES:');
  console.log('VITE_DATA_CONNECT_PROJECT_ID:', import.meta.env.VITE_DATA_CONNECT_PROJECT_ID ? '✅ SET' : '❌ MISSING');
  console.log('VITE_DATA_CONNECT_REGION:', import.meta.env.VITE_DATA_CONNECT_REGION ? '✅ SET' : '❌ MISSING');
  console.log('VITE_DATA_CONNECT_INSTANCE_NAME:', import.meta.env.VITE_DATA_CONNECT_INSTANCE_NAME ? '✅ SET' : '❌ MISSING');
  console.log('VITE_DATA_CONNECT_DATABASE_NAME:', import.meta.env.VITE_DATA_CONNECT_DATABASE_NAME ? '✅ SET' : '❌ MISSING');
  console.log('VITE_DATA_CONNECT_USER:', import.meta.env.VITE_DATA_CONNECT_USER ? '✅ SET' : '❌ MISSING');
  console.log('VITE_DATA_CONNECT_PASSWORD:', import.meta.env.VITE_DATA_CONNECT_PASSWORD ? '✅ SET' : '❌ MISSING');
  console.log('VITE_DATA_CONNECT_CONNECTION_NAME:', import.meta.env.VITE_DATA_CONNECT_CONNECTION_NAME ? '✅ SET' : '❌ MISSING');

  // Environment Info
  console.log('\n🌍 ENVIRONMENT INFO:');
  console.log('Mode:', import.meta.env.MODE);
  console.log('Dev:', import.meta.env.DEV);
  console.log('Base URL:', import.meta.env.BASE_URL);

  // Summary
  const firebaseVars = [
    'VITE_FIREBASE_API_KEY',
    'VITE_FIREBASE_AUTH_DOMAIN',
    'VITE_FIREBASE_PROJECT_ID',
    'VITE_FIREBASE_STORAGE_BUCKET',
    'VITE_FIREBASE_MESSAGING_SENDER_ID',
    'VITE_FIREBASE_APP_ID',
    'VITE_FIREBASE_MEASUREMENT_ID',
    'VITE_FIREBASE_DATABASE_URL'
  ];

  const stripeVars = [
    'VITE_STRIPE_PUBLISHABLE_KEY',
    'VITE_STRIPE_SECRET_KEY',
    'VITE_STRIPE_WEBHOOK_SECRET'
  ];

  const missingFirebase = firebaseVars.filter(varName => !import.meta.env[varName]);
  const missingStripe = stripeVars.filter(varName => !import.meta.env[varName]);

  console.log('\n📊 SUMMARY:');
  console.log('Firebase Variables Missing:', missingFirebase.length);
  console.log('Stripe Variables Missing:', missingStripe.length);

  if (missingFirebase.length > 0) {
    console.log('❌ MISSING FIREBASE VARIABLES:', missingFirebase);
  }

  if (missingStripe.length > 0) {
    console.log('❌ MISSING STRIPE VARIABLES:', missingStripe);
  }

  if (missingFirebase.length === 0 && missingStripe.length === 0) {
    console.log('✅ ALL CRITICAL VARIABLES ARE SET!');
  } else {
    console.log('⚠️ ADD MISSING VARIABLES TO NETLIFY ENVIRONMENT SETTINGS');
  }

  console.log('\n=====================================');
  console.log('🔧 END DIAGNOSTIC');
};

// Auto-run diagnostic when imported
if (typeof window !== 'undefined') {
  // Only run in browser
  setTimeout(() => {
    checkEnvironmentVariables();
  }, 1000);
}

export default checkEnvironmentVariables; 