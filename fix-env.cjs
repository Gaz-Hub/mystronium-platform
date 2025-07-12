const fs = require('fs');
const path = require('path');

console.log('🔧 MYSTRONIUM ENVIRONMENT FIXER');
console.log('=====================================\n');

const envLocalPath = path.join(__dirname, '.env.local');

// Step 1: Check current status
console.log('📋 Step 1: Checking current environment...');
const envExists = fs.existsSync(envLocalPath);

if (!envExists) {
  console.log('❌ .env.local not found - creating template...');
  require('./create-env.cjs');
  return;
}

// Step 2: Read and analyze current file
console.log('\n📋 Step 2: Analyzing current .env.local...');
const content = fs.readFileSync(envLocalPath, 'utf8');
const lines = content.split('\n').filter(line => line.trim() && !line.startsWith('#'));

const requiredVars = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN', 
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_STORAGE_BUCKET',
  'VITE_FIREBASE_MESSAGING_SENDER_ID',
  'VITE_FIREBASE_APP_ID',
  'VITE_FIREBASE_MEASUREMENT_ID',
  'VITE_FIREBASE_DATABASE_URL',
  'VITE_RECAPTCHA_SITE_KEY',
  'VITE_STRIPE_PUBLISHABLE_KEY',
  'VITE_STRIPE_SECRET_KEY',
  'VITE_STRIPE_WEBHOOK_SECRET',
  'VITE_ADMIN_SECRET'
];

const foundVars = [];
const missingVars = [];

requiredVars.forEach(varName => {
  const hasVar = content.includes(varName + '=');
  if (hasVar) {
    foundVars.push(varName);
  } else {
    missingVars.push(varName);
  }
});

console.log(`   Found: ${foundVars.length}/${requiredVars.length} variables`);
console.log(`   Missing: ${missingVars.length} variables`);

if (missingVars.length === 0) {
  console.log('✅ All required variables found!');
  console.log('\n📋 Step 3: Checking variable values...');
  
  // Check if variables have real values or placeholders
  let hasPlaceholders = false;
  lines.forEach(line => {
    if (line.includes('your_') || line.includes('placeholder')) {
      hasPlaceholders = true;
    }
  });
  
  if (hasPlaceholders) {
    console.log('⚠️  Found placeholder values - need real configuration!');
    console.log('\n💡 To fix:');
    console.log('   1. Open .env.local in your text editor');
    console.log('   2. Replace all "your_*" values with real configuration');
    console.log('   3. Save and restart dev server');
  } else {
    console.log('✅ Variables appear to have real values!');
    console.log('\n🎉 Environment setup looks good!');
    console.log('   Restart your dev server: npm run dev');
  }
  
} else {
  console.log('\n📋 Step 3: Fixing missing variables...');
  
  // Create backup
  const backupPath = path.join(__dirname, '.env.local.backup');
  fs.copyFileSync(envLocalPath, backupPath);
  console.log(`   Backup created: ${backupPath}`);
  
  // Add missing variables
  let newContent = content;
  missingVars.forEach(varName => {
    let defaultValue = '';
    
    if (varName.includes('FIREBASE_API_KEY')) {
      defaultValue = 'your_firebase_api_key_here';
    } else if (varName.includes('AUTH_DOMAIN')) {
      defaultValue = 'your_project_id.firebaseapp.com';
    } else if (varName.includes('PROJECT_ID')) {
      defaultValue = 'your_project_id';
    } else if (varName.includes('STORAGE_BUCKET')) {
      defaultValue = 'your_project_id.appspot.com';
    } else if (varName.includes('MESSAGING_SENDER_ID')) {
      defaultValue = 'your_sender_id';
    } else if (varName.includes('APP_ID')) {
      defaultValue = 'your_app_id';
    } else if (varName.includes('MEASUREMENT_ID')) {
      defaultValue = 'your_measurement_id';
    } else if (varName.includes('DATABASE_URL')) {
      defaultValue = 'https://your_project_id.firebaseio.com';
    } else if (varName.includes('RECAPTCHA_SITE_KEY')) {
      defaultValue = 'your_recaptcha_site_key';
    } else if (varName.includes('STRIPE_PUBLISHABLE_KEY')) {
      defaultValue = 'pk_test_your_publishable_key';
    } else if (varName.includes('STRIPE_SECRET_KEY')) {
      defaultValue = 'sk_test_your_secret_key';
    } else if (varName.includes('STRIPE_WEBHOOK_SECRET')) {
      defaultValue = 'whsec_your_webhook_secret';
    } else if (varName.includes('ADMIN_SECRET')) {
      defaultValue = 'your_admin_secret_here';
    }
    
    newContent += `\n${varName}=${defaultValue}`;
  });
  
  // Write updated file
  fs.writeFileSync(envLocalPath, newContent, 'utf8');
  console.log('✅ Added missing variables to .env.local');
  
  console.log('\n📋 Step 4: Next steps...');
  console.log('   1. Open .env.local in your text editor');
  console.log('   2. Replace all "your_*" values with real configuration');
  console.log('   3. Save the file');
  console.log('   4. Restart your development server: npm run dev');
  
  console.log('\n🔗 Get your configuration from:');
  console.log('   • Firebase: https://console.firebase.google.com/');
  console.log('   • Stripe: https://dashboard.stripe.com/apikeys');
  console.log('   • reCAPTCHA: https://www.google.com/recaptcha/admin');
}

console.log('\n=====================================');
console.log('🔧 ENVIRONMENT FIXER COMPLETE'); 