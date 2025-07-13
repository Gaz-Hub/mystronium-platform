#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 MYSTRONIUM FIREBASE DIAGNOSTIC');
console.log('==================================');

// Check for .env.local file
const envLocalPath = path.join(__dirname, '..', '.env.local');
const envTemplatePath = path.join(__dirname, '..', 'env.template');
const netlifyPath = path.join(__dirname, '..', 'netlify.toml');

console.log('\n📁 File Check:');
console.log('---------------');

if (fs.existsSync(envLocalPath)) {
  console.log('✅ .env.local exists');
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  const lines = envContent.split('\n');
  const firebaseVars = lines.filter(line => 
    line.startsWith('VITE_FIREBASE_') && !line.startsWith('#')
  );
  
  console.log(`📊 Found ${firebaseVars.length} Firebase environment variables`);
  
  firebaseVars.forEach(line => {
    const [key, value] = line.split('=');
    if (value && !value.includes('your_') && !value.includes('placeholder')) {
      console.log(`  ✅ ${key}: ${value.substring(0, 20)}...`);
    } else {
      console.log(`  ❌ ${key}: PLACEHOLDER VALUE`);
    }
  });
} else {
  console.log('❌ .env.local does not exist');
  console.log('💡 Create .env.local with your Firebase credentials');
}

// Check netlify.toml
if (fs.existsSync(netlifyPath)) {
  console.log('\n🌐 Netlify Configuration:');
  console.log('-------------------------');
  
  const netlifyContent = fs.readFileSync(netlifyPath, 'utf8');
  const placeholderCount = (netlifyContent.match(/your-/g) || []).length;
  
  if (placeholderCount > 0) {
    console.log(`⚠️  Found ${placeholderCount} placeholder values in netlify.toml`);
    console.log('💡 Run: node setup-netlify-env.js to update with real values');
  } else {
    console.log('✅ netlify.toml appears to have real values');
  }
}

// Check Firebase configuration in source
const firebaseSourcePath = path.join(__dirname, '..', 'src', 'firebase.ts');
if (fs.existsSync(firebaseSourcePath)) {
  console.log('\n🔧 Firebase Source Code:');
  console.log('----------------------');
  
  const sourceContent = fs.readFileSync(firebaseSourcePath, 'utf8');
  
  if (sourceContent.includes('import.meta.env.VITE_FIREBASE_')) {
    console.log('✅ Firebase config uses environment variables correctly');
  } else {
    console.log('❌ Firebase config may not be using environment variables');
  }
  
  if (sourceContent.includes('validateEnvVars')) {
    console.log('✅ Environment validation is implemented');
  } else {
    console.log('⚠️  No environment validation found');
  }
}

// Recommendations
console.log('\n💡 Recommendations:');
console.log('------------------');

if (!fs.existsSync(envLocalPath)) {
  console.log('1. Create .env.local file with your Firebase credentials');
  console.log('2. Get credentials from Firebase Console → Project Settings → General');
}

if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8');
  if (envContent.includes('your_') || envContent.includes('placeholder')) {
    console.log('1. Replace placeholder values in .env.local with real Firebase credentials');
  }
}

console.log('2. Run: node setup-netlify-env.js to update netlify.toml');
console.log('3. Set environment variables in Netlify dashboard');
console.log('4. Test locally with: npm run dev');
console.log('5. Deploy to Netlify and check browser console for errors');

console.log('\n🔗 Useful Links:');
console.log('----------------');
console.log('• Firebase Console: https://console.firebase.google.com/');
console.log('• Netlify Dashboard: https://app.netlify.com/');
console.log('• Firebase Setup Guide: FIREBASE_SETUP_GUIDE.md');

console.log('\n✨ Next Steps:');
console.log('--------------');
console.log('1. Follow the FIREBASE_SETUP_GUIDE.md for detailed instructions');
console.log('2. Create your Firebase project and get real credentials');
console.log('3. Update .env.local with actual values');
console.log('4. Run the setup script and deploy'); 