#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 MYSTRONIUM™ Firebase Setup Helper');
console.log('=====================================\n');

console.log('📋 Follow these steps to take your platform off demo mode:\n');

console.log('1️⃣  Create Firebase Project:');
console.log('   • Go to: https://console.firebase.google.com/');
console.log('   • Click "Create a project"');
console.log('   • Name: mystronium-platform');
console.log('   • Enable Google Analytics (optional)');
console.log('   • Click "Create project"\n');

console.log('2️⃣  Enable Services:');
console.log('   • Authentication → Get started → Email/Password → Enable');
console.log('   • Firestore Database → Create database → Test mode');
console.log('   • Storage → Get started → Test mode\n');

console.log('3️⃣  Add Admin User:');
console.log('   • Authentication → Users → Add user');
console.log('   • Email: garetharjohns@gmail.com');
console.log('   • Password: testpassword123\n');

console.log('4️⃣  Get Configuration:');
console.log('   • Project Settings (gear icon)');
console.log('   • Your apps → Add app → Web');
console.log('   • App nickname: MYSTRONIUM Web App');
console.log('   • Copy the config object\n');

console.log('5️⃣  Create .env.local file with your config values\n');

// Check if .env.local already exists
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  console.log('⚠️  .env.local already exists!');
  console.log('   Please update it with your real Firebase values.\n');
} else {
  console.log('📝 Creating .env.local template...');
  
  const envTemplate = `# 🔐 MYSTRONIUM™ PRODUCTION ENVIRONMENT

# 🔥 FIREBASE CONFIG (REPLACE WITH YOUR VALUES)
VITE_FIREBASE_API_KEY=your_actual_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_REGION=nam5
VITE_FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com

# 🎯 RECAPTCHA (Optional - for App Check)
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key

# 🧠 AI API KEYS (Optional)
VITE_MISTRAL_KEY=your_mistral_api_key
VITE_ELEVENLABS_KEY=your_elevenlabs_api_key
VITE_REPLICATE_KEY=your_replicate_api_token

# 💳 STRIPE CONFIG (Optional)
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
VITE_STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

# 🔧 PRODUCTION SETTINGS
VITE_APP_ENV=production
VITE_DEBUG_MODE=false`;

  try {
    fs.writeFileSync(envPath, envTemplate);
    console.log('✅ .env.local template created!');
    console.log('   Now replace the placeholder values with your real Firebase config.\n');
  } catch (error) {
    console.log('❌ Error creating .env.local:', error.message);
    console.log('   Please create the file manually.\n');
  }
}

console.log('6️⃣  Deploy Security Rules:');
console.log('   firebase deploy --only firestore:rules,storage\n');

console.log('7️⃣  Restart Development Server:');
console.log('   npm run dev\n');

console.log('🎯 GOAL: Replace placeholder values with real Firebase configuration');
console.log('⏱️  ESTIMATED TIME: 10-15 minutes\n');

console.log('📞 Need help? Check FIREBASE_SETUP_NOW.md for detailed instructions.'); 