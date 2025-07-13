#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 MYSTRONIUM NETLIFY ENVIRONMENT FIX');
console.log('=====================================');

// Check current netlify.toml
const netlifyPath = path.join(__dirname, '..', 'netlify.toml');
let netlifyContent = fs.readFileSync(netlifyPath, 'utf8');

console.log('\n📋 Current Netlify Environment Variables:');
console.log('----------------------------------------');

// Extract environment variables from netlify.toml
const envMatches = netlifyContent.match(/VITE_[A-Z_]+ = "[^"]*"/g) || [];
const recaptchaMatch = netlifyContent.match(/VITE_RECAPTCHA_SITE_KEY = "[^"]*"/);

if (recaptchaMatch) {
  console.log('✅ VITE_RECAPTCHA_SITE_KEY found in netlify.toml');
  console.log('   Value:', recaptchaMatch[0].split('=')[1].trim().replace(/"/g, ''));
} else {
  console.log('❌ VITE_RECAPTCHA_SITE_KEY missing from netlify.toml');
}

// Check for placeholder values
const placeholderCount = (netlifyContent.match(/your-/g) || []).length;
if (placeholderCount > 0) {
  console.log(`⚠️  Found ${placeholderCount} placeholder values in netlify.toml`);
} else {
  console.log('✅ No placeholder values found in netlify.toml');
}

console.log('\n🔧 Required Environment Variables for Firebase:');
console.log('---------------------------------------------');
const requiredVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN', 
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_MEASUREMENT_ID',
  'VITE_FIREBASE_DATABASE_URL',
  'VITE_RECAPTCHA_SITE_KEY'
];

requiredVars.forEach(varName => {
  const match = netlifyContent.match(new RegExp(`${varName} = "[^"]*"`));
  if (match) {
    const value = match[0].split('=')[1].trim().replace(/"/g, '');
    if (value.includes('your-') || value.includes('placeholder')) {
      console.log(`❌ ${varName}: PLACEHOLDER VALUE`);
    } else {
      console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
    }
  } else {
    console.log(`❌ ${varName}: MISSING`);
  }
});

console.log('\n💡 Manual Fix Instructions:');
console.log('--------------------------');
console.log('1. Go to Netlify Dashboard → Site Settings → Environment Variables');
console.log('2. Add these variables (if missing):');
console.log('');
console.log('   VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here');
console.log('   VITE_FIREBASE_API_KEY=your_firebase_api_key_here');
console.log('   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com');
console.log('   VITE_FIREBASE_PROJECT_ID=your_project_id');
console.log('   VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com');
console.log('   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id');
console.log('   VITE_FIREBASE_APP_ID=your_app_id');
console.log('   VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id');
console.log('   VITE_FIREBASE_DATABASE_URL=https://your_project-default-rtdb.firebaseio.com');
console.log('');
console.log('3. Clear cache and redeploy: Deploys → Trigger deploy → Clear cache and deploy site');
console.log('');
console.log('🔗 Get your values from:');
console.log('• Firebase Console → Project Settings → General → Your apps');
console.log('• Google reCAPTCHA Console → Settings → Site keys');
console.log('');
console.log('🎯 Quick Fix:');
console.log('If you have RECAPTCHA_SITE_KEY in Netlify, rename it to VITE_RECAPTCHA_SITE_KEY'); 