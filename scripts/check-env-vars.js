#!/usr/bin/env node

console.log('🔍 MYSTRONIUM ENVIRONMENT VARIABLE CHECKER');
console.log('==========================================');

console.log('\n📋 Required Firebase Environment Variables:');
console.log('-------------------------------------------');

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

console.log('These variables should be set in your Netlify environment variables:');
console.log('');

requiredVars.forEach(varName => {
  console.log(`${varName}=your_value_here`);
});

console.log('\n💡 To check if variables are being read:');
console.log('1. Open your live Netlify site');
console.log('2. Open browser console (F12)');
console.log('3. Look for "VITE ENV:" log message');
console.log('4. Check for Firebase initialization messages');

console.log('\n🔧 To fix missing variables:');
console.log('1. Go to Netlify Dashboard → Site Settings → Environment Variables');
console.log('2. Add any missing variables from the list above');
console.log('3. Clear cache and redeploy');

console.log('\n🎯 Quick Test:');
console.log('If you see "demo-api-key" in the console, your environment variables are not being read properly.'); 