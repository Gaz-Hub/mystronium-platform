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

console.log('\n💡 To fix this, you need to:');
console.log('1. Get your real Firebase credentials from Firebase Console');
console.log('2. Replace the placeholder values in netlify.toml');
console.log('3. Or set them in Netlify Dashboard (recommended)');

console.log('\n🔗 Get your credentials from:');
console.log('• Firebase Console → Project Settings → General → Your apps');
console.log('• Google reCAPTCHA Console → Settings → Site keys');

console.log('\n📝 Example of what your netlify.toml should look like:');
console.log('----------------------------------------------------');
console.log('[context.production.environment]');
console.log('  VITE_FIREBASE_API_KEY = "AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz"');
console.log('  VITE_FIREBASE_AUTH_DOMAIN = "your-project.firebaseapp.com"');
console.log('  VITE_FIREBASE_PROJECT_ID = "your-project"');
console.log('  VITE_FIREBASE_STORAGE_BUCKET = "your-project.appspot.com"');
console.log('  VITE_FIREBASE_MESSAGING_SENDER_ID = "123456789"');
console.log('  VITE_FIREBASE_APP_ID = "1:123456789:web:abc123def456"');
console.log('  VITE_FIREBASE_MEASUREMENT_ID = "G-ABC123DEF4"');
console.log('  VITE_FIREBASE_DATABASE_URL = "https://your-project-default-rtdb.firebaseio.com"');
console.log('  VITE_RECAPTCHA_SITE_KEY = "6LfJ5oArAAAAAA06lO2iqW3PsZeGe6hD-4jQyQOa"');

console.log('\n🎯 Quick Actions:');
console.log('1. Go to Netlify Dashboard → Environment Variables (easiest)');
console.log('2. Or manually edit netlify.toml with real values');
console.log('3. Clear cache and redeploy after making changes'); 