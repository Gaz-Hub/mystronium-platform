#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔧 MYSTRONIUM NETLIFY ENVIRONMENT SETUP');
console.log('========================================');

// Read .env.local file
const envPath = path.join(__dirname, '.env.local');
let envVars = {};

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    const [key, ...valueParts] = line.split('=');
    if (key && valueParts.length > 0) {
      const value = valueParts.join('=').trim();
      if (value && !value.startsWith('#')) {
        envVars[key.trim()] = value.replace(/^["']|["']$/g, ''); // Remove quotes
      }
    }
  });
  console.log('✅ Found .env.local file');
} else {
  console.log('❌ No .env.local file found');
  console.log('💡 Create .env.local with your API keys first');
  process.exit(1);
}

// Read netlify.toml
const netlifyPath = path.join(__dirname, 'netlify.toml');
let netlifyContent = fs.readFileSync(netlifyPath, 'utf8');

// Replace placeholder values with actual values
let replacements = 0;
Object.entries(envVars).forEach(([key, value]) => {
  const placeholder = `"your-${key.toLowerCase().replace('vite_', '').replace(/_/g, '-')}"`;
  const actualValue = `"${value}"`;
  
  if (netlifyContent.includes(placeholder)) {
    netlifyContent = netlifyContent.replace(new RegExp(placeholder, 'g'), actualValue);
    replacements++;
    console.log(`✅ Replaced ${key} with actual value`);
  }
});

// Write updated netlify.toml
fs.writeFileSync(netlifyPath, netlifyContent);

console.log(`\n🎉 Updated netlify.toml with ${replacements} environment variables`);
console.log('📝 Next steps:');
console.log('1. Review netlify.toml to ensure all values are correct');
console.log('2. Commit and push to trigger Netlify deployment');
console.log('3. Check Netlify dashboard for successful deployment');

// Show summary of what was set
console.log('\n📋 Environment Variables Set:');
Object.keys(envVars).forEach(key => {
  if (key.startsWith('VITE_')) {
    console.log(`  ${key}: ${envVars[key].substring(0, 10)}...`);
  }
}); 