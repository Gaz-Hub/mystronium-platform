#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 MYSTRONIUM NETLIFY CONFIG UPDATER');
console.log('====================================');

const netlifyPath = path.join(__dirname, '..', 'netlify.toml');
let netlifyContent = fs.readFileSync(netlifyPath, 'utf8');

console.log('\n📋 Current Status:');
console.log('------------------');

// Check for placeholder values
const placeholderCount = (netlifyContent.match(/your-/g) || []).length;
console.log(`Found ${placeholderCount} placeholder values in netlify.toml`);

if (placeholderCount === 0) {
  console.log('✅ No placeholder values found - config looks good!');
  process.exit(0);
}

console.log('\n❌ ISSUE: Your netlify.toml contains placeholder values instead of real Firebase credentials.');
console.log('This is why you\'re getting "Missing required Firebase environment variables" errors.');

console.log('\n💡 SOLUTION: You have two options:');
console.log('');
console.log('OPTION 1 (Recommended): Use Netlify Dashboard');
console.log('1. Go to Netlify Dashboard → Site Settings → Environment Variables');
console.log('2. Add these variables with your real values:');
console.log('');
console.log('   VITE_FIREBASE_API_KEY=your_real_firebase_api_key');
console.log('   VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com');
console.log('   VITE_FIREBASE_PROJECT_ID=your_project_id');
console.log('   VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com');
console.log('   VITE_FIREBASE_MESSAGING_SENDER_ID=your_real_sender_id');
console.log('   VITE_FIREBASE_APP_ID=your_real_app_id');
console.log('   VITE_FIREBASE_MEASUREMENT_ID=your_real_measurement_id');
console.log('   VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com');
console.log('   VITE_RECAPTCHA_SITE_KEY=your_real_recaptcha_site_key');
console.log('');
console.log('3. Clear cache and redeploy');

console.log('\nOPTION 2: Update netlify.toml file');
console.log('1. Get your Firebase credentials from Firebase Console');
console.log('2. Manually replace placeholder values in netlify.toml');
console.log('3. Commit and push changes');

console.log('\n🔗 Get your credentials from:');
console.log('• Firebase Console → Project Settings → General → Your apps');
console.log('• Google reCAPTCHA Console → Settings → Site keys');

console.log('\n🎯 Quick Test:');
console.log('After fixing, visit your live site and check browser console for Firebase initialization messages.'); 