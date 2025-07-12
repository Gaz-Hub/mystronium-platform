const fs = require('fs');
const path = require('path');

console.log('🔍 MYSTRONIUM ENVIRONMENT CHECKER');
console.log('=====================================\n');

// Check if .env.local exists
const envLocalPath = path.join(__dirname, '.env.local');
const envLocalExists = fs.existsSync(envLocalPath);

console.log('📁 File Status:');
console.log(`   .env.local exists: ${envLocalExists ? '✅' : '❌'}`);
console.log(`   Path: ${envLocalPath}`);

if (envLocalExists) {
  const content = fs.readFileSync(envLocalPath, 'utf8');
  const lines = content.split('\n').filter(line => line.trim());
  
  console.log(`   Lines: ${lines.length}`);
  console.log(`   Size: ${content.length} characters`);
  
  // Check for required variables
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
  
  console.log('\n🔧 Required Variables Check:');
  let foundCount = 0;
  
  requiredVars.forEach(varName => {
    const hasVar = content.includes(varName + '=');
    const status = hasVar ? '✅' : '❌';
    console.log(`   ${varName}: ${status}`);
    if (hasVar) foundCount++;
  });
  
  console.log(`\n📊 Summary: ${foundCount}/${requiredVars.length} variables found`);
  
  if (foundCount === 0) {
    console.log('\n⚠️  WARNING: No environment variables found!');
    console.log('   The file may be empty or have incorrect format.');
  } else if (foundCount < requiredVars.length) {
    console.log('\n⚠️  WARNING: Some variables are missing!');
  } else {
    console.log('\n✅ All required variables found!');
  }
  
  // Check for common issues
  console.log('\n🔍 Format Check:');
  const hasQuotes = content.includes('"') || content.includes("'");
  const hasSpaces = /^\s/.test(content) || /\s+$/.test(content);
  const hasEmptyLines = content.includes('\n\n');
  
  console.log(`   Contains quotes: ${hasQuotes ? '❌' : '✅'}`);
  console.log(`   Leading/trailing spaces: ${hasSpaces ? '❌' : '✅'}`);
  console.log(`   Empty lines: ${hasEmptyLines ? '❌' : '✅'}`);
  
} else {
  console.log('\n❌ .env.local file not found!');
  console.log('   Creating template file...');
}

console.log('\n=====================================');
console.log('🔍 END ENVIRONMENT CHECK'); 