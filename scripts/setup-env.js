#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 MYSTRONIUM™ - Setting up .env.local with real Firebase config');
console.log('===============================================================\n');

const envContent = `# 🔐 MYSTRONIUM™ PRODUCTION ENVIRONMENT

# 🔥 FIREBASE CONFIG (REAL VALUES)
VITE_FIREBASE_API_KEY=AIzaSyApc8w_aWw4wDQfNdDZDH399959sXXvKMU
VITE_FIREBASE_AUTH_DOMAIN=mystronium.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mystronium
VITE_FIREBASE_STORAGE_BUCKET=mystronium.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=619999317107
VITE_FIREBASE_APP_ID=1:619999317107:web:c78192df8faca1417dee06
VITE_FIREBASE_MEASUREMENT_ID=G-9Y36LLR71P
VITE_FIREBASE_REGION=nam5
VITE_FIREBASE_DATABASE_URL=https://mystronium-default-rtdb.firebaseio.com

# 🎯 RECAPTCHA (App Check)
VITE_RECAPTCHA_SITE_KEY=6LfJ5oArAAAAAA06lO2iqW3PsZeGe6hD-4jQyQOa

# 🧠 AI API KEYS (Optional - for full functionality)
VITE_MISTRAL_KEY=your_mistral_api_key_here
VITE_ELEVENLABS_KEY=your_elevenlabs_api_key_here
VITE_REPLICATE_KEY=your_replicate_api_token_here

# 💳 STRIPE CONFIG (Optional - for payments)
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
VITE_STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here

# 🔧 PRODUCTION SETTINGS
VITE_APP_ENV=production
VITE_DEBUG_MODE=false`;

const envPath = path.join(__dirname, '..', '.env.local');

try {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local created successfully with real Firebase configuration!');
  console.log('🌐 Project: mystronium');
  console.log('🔐 Auth Domain: mystronium.firebaseapp.com');
  console.log('🎯 reCAPTCHA: Configured');
  console.log('\n📋 Next steps:');
  console.log('1. Restart your development server: npm run dev');
  console.log('2. Check browser console for Firebase initialization messages');
  console.log('3. Test login with your admin credentials');
  console.log('4. Verify real-time data is working');
  console.log('\n🎉 Your platform is now off demo mode!');
} catch (error) {
  console.log('❌ Error creating .env.local:', error.message);
  console.log('\n📝 Please create .env.local manually with the content above.');
} 