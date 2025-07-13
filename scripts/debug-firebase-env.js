#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 MYSTRONIUM FIREBASE ENVIRONMENT DEBUGGER');
console.log('===========================================');

// Check netlify.toml for environment variables
const netlifyPath = path.join(__dirname, '..', 'netlify.toml');
let netlifyContent = '';

if (fs.existsSync(netlifyPath)) {
  netlifyContent = fs.readFileSync(netlifyPath, 'utf8');
  console.log('\n📋 Netlify.toml Environment Variables:');
  console.log('--------------------------------------');
  
  const envMatches = netlifyContent.match(/VITE_[A-Z_]+ = "[^"]*"/g) || [];
  const placeholderCount = (netlifyContent.match(/your-/g) || []).length;
  
  if (placeholderCount > 0) {
    console.log(`❌ Found ${placeholderCount} placeholder values in netlify.toml`);
    console.log('💡 These need to be replaced with real values');
  } else {
    console.log('✅ No placeholder values found in netlify.toml');
  }
  
  console.log(`📊 Found ${envMatches.length} VITE_ environment variables`);
} else {
  console.log('❌ netlify.toml not found');
}

// Required Firebase variables
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

console.log('\n🔧 Required Firebase Environment Variables:');
console.log('------------------------------------------');

const missingVars = [];
const placeholderVars = [];

requiredVars.forEach(varName => {
  const match = netlifyContent.match(new RegExp(`${varName} = "[^"]*"`));
  if (match) {
    const value = match[0].split('=')[1].trim().replace(/"/g, '');
    if (value.includes('your-') || value.includes('placeholder')) {
      console.log(`❌ ${varName}: PLACEHOLDER VALUE (${value})`);
      placeholderVars.push(varName);
    } else {
      console.log(`✅ ${varName}: ${value.substring(0, 20)}...`);
    }
  } else {
    console.log(`❌ ${varName}: MISSING`);
    missingVars.push(varName);
  }
});

console.log('\n💡 Solutions:');
console.log('-------------');

if (missingVars.length > 0) {
  console.log('1. Add missing variables to Netlify Dashboard:');
  missingVars.forEach(varName => {
    console.log(`   ${varName}=your_real_value_here`);
  });
}

if (placeholderVars.length > 0) {
  console.log('2. Replace placeholder values in Netlify Dashboard:');
  placeholderVars.forEach(varName => {
    console.log(`   ${varName}=your_real_value_here`);
  });
}

console.log('\n🔗 Get your values from:');
console.log('• Firebase Console → Project Settings → General → Your apps');
console.log('• Google reCAPTCHA Console → Settings → Site keys');

console.log('\n🎯 Quick Fix Steps:');
console.log('1. Go to Netlify Dashboard → Site Settings → Environment Variables');
console.log('2. Add/update the variables listed above with real values');
console.log('3. Clear cache and redeploy: Deploys → Trigger deploy → Clear cache');
console.log('4. Check browser console for Firebase initialization messages');

console.log('\n📊 Summary:');
console.log(`• Missing variables: ${missingVars.length}`);
console.log(`• Placeholder variables: ${placeholderVars.length}`);
console.log(`• Total issues: ${missingVars.length + placeholderVars.length}`);

if (missingVars.length + placeholderVars.length === 0) {
  console.log('✅ All Firebase environment variables appear to be properly configured!');
} else {
  console.log('❌ Firebase environment variables need to be fixed before deployment will work.');
} 