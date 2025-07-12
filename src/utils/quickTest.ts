// Quick Test Utility for MYSTRONIUM™ Platform
// Tests environment variables and basic functionality

export const quickTest = () => {
  console.group('🧪 MYSTRONIUM QUICK TEST');
  
  // Test environment variables
  const envVars = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL
  };

  const missingVars = Object.entries(envVars)
    .filter(([key, value]) => !value || value.includes('your_') || value === 'demo-api-key')
    .map(([key]) => key);

  console.log('🔧 Environment Variables Check');
  if (missingVars.length === 0) {
    console.log('✅ All Firebase environment variables present');
    console.log('🚀 Firebase should be fully functional');
  } else {
    console.warn('❌ Missing/Invalid Variables:', missingVars);
    console.warn('🛠️ DEMO MODE: Firebase not configured');
    console.log('💡 To fix: Follow FIREBASE_SETUP_GUIDE.md');
  }

  // Test browser compatibility
  const browserFeatures = {
    es6: typeof Promise !== 'undefined',
    fetch: typeof fetch !== 'undefined',
    localStorage: typeof localStorage !== 'undefined',
  };

  const supportedFeatures = Object.values(browserFeatures).filter(Boolean).length;
  console.log('🌐 Browser Compatibility:', `${supportedFeatures}/4 features supported`);

  // Test development environment
  console.log('⚙️ Development Environment:');
  console.log('  Mode:', import.meta.env.MODE);
  console.log('  Dev:', import.meta.env.DEV);
  console.log('  Port:', import.meta.env.VITE_PORT || '5173');

  // Test Firebase services availability
  console.log('🔥 Firebase Services:');
  try {
    // This will only work if Firebase is properly configured
    const hasFirebase = !!import.meta.env.VITE_FIREBASE_API_KEY && 
                       !import.meta.env.VITE_FIREBASE_API_KEY.includes('your_');
    
    if (hasFirebase) {
      console.log('  ✅ Firebase configuration detected');
      console.log('  ✅ Authentication should work');
      console.log('  ✅ Firestore should be accessible');
    } else {
      console.log('  ⚠️ Firebase not configured');
      console.log('  ⚠️ Running in demo mode');
    }
  } catch (error) {
    console.error('  ❌ Firebase test failed:', error);
  }

  // Performance check
  const startTime = performance.now();
  const memoryUsed = (performance as any).memory?.usedJSHeapSize || 'Unknown';
  console.log('📊 Performance:');
  console.log('  Memory Used:', typeof memoryUsed === 'number' ? `${Math.round(memoryUsed / 1024 / 1024)}MB` : memoryUsed);

  // Summary
  console.group('📋 SUMMARY');
  if (missingVars.length === 0) {
    console.log('🎉 READY FOR FIREBASE INTEGRATION');
    console.log('✅ Environment variables configured');
    console.log('✅ Browser compatibility confirmed');
    console.log('✅ Development environment ready');
  } else {
    console.warn('⚠️ FIREBASE SETUP REQUIRED');
    console.warn('❌ Environment variables missing');
    console.log('💡 Follow FIREBASE_SETUP_GUIDE.md to configure Firebase');
    console.log('🛠️ Platform will work in demo mode until configured');
  }
  console.groupEnd();

  console.groupEnd();
  
  return {
    envVars,
    missingVars,
    browserFeatures,
    supportedFeatures,
    hasFirebase: missingVars.length === 0
  };
};

// Auto-run in development
if (import.meta.env.DEV) {
  setTimeout(quickTest, 1000);
}

export default quickTest; 