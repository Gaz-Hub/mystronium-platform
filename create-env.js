const fs = require('fs');
const path = require('path');

console.log('🚀 MYSTRONIUM ENVIRONMENT CREATOR');
console.log('=====================================\n');

const envLocalPath = path.join(__dirname, '.env.local');

// Check if file already exists
if (fs.existsSync(envLocalPath)) {
  console.log('⚠️  .env.local already exists!');
  console.log('   Backing up existing file...');
  
  const backupPath = path.join(__dirname, '.env.local.backup');
  fs.copyFileSync(envLocalPath, backupPath);
  console.log(`   Backup created: ${backupPath}`);
}

// Create the template content
const template = `# MYSTRONIUM™ Platform Environment Variables
# Replace the placeholder values with your actual Firebase and Stripe configuration

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com

# reCAPTCHA Configuration
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key
VITE_STRIPE_SECRET_KEY=sk_test_your_secret_key
VITE_STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Admin Configuration
VITE_ADMIN_SECRET=your_admin_secret_here

# Instructions:
# 1. Replace all "your_*" values with your actual configuration
# 2. Get Firebase config from: https://console.firebase.google.com/
# 3. Get Stripe keys from: https://dashboard.stripe.com/apikeys
# 4. Get reCAPTCHA key from: https://www.google.com/recaptcha/admin
# 5. Save this file and restart your development server
`;

// Write the template
try {
  fs.writeFileSync(envLocalPath, template, 'utf8');
  console.log('✅ .env.local template created successfully!');
  console.log(`   Path: ${envLocalPath}`);
  console.log(`   Size: ${template.length} characters`);
  
  console.log('\n📋 Next Steps:');
  console.log('   1. Open .env.local in your text editor');
  console.log('   2. Replace all "your_*" values with real configuration');
  console.log('   3. Save the file');
  console.log('   4. Restart your development server (npm run dev)');
  
  console.log('\n🔗 Helpful Links:');
  console.log('   • Firebase Console: https://console.firebase.google.com/');
  console.log('   • Stripe Dashboard: https://dashboard.stripe.com/apikeys');
  console.log('   • reCAPTCHA Admin: https://www.google.com/recaptcha/admin');
  
} catch (error) {
  console.error('❌ Error creating .env.local:', error.message);
  console.log('\n💡 Manual Creation:');
  console.log('   Create a file named ".env.local" in the project root');
  console.log('   Copy and paste the template content above');
}

console.log('\n=====================================');
console.log('🚀 ENVIRONMENT CREATOR COMPLETE'); 