import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

console.log("VITE ENV:", import.meta.env);

// Environment variable validation with comprehensive logging
const validateEnvVars = () => {
  const required = [
    "VITE_FIREBASE_API_KEY",
    "VITE_FIREBASE_AUTH_DOMAIN",
    "VITE_FIREBASE_PROJECT_ID",
    "VITE_FIREBASE_STORAGE_BUCKET",
    "VITE_FIREBASE_MESSAGING_SENDER_ID",
    "VITE_FIREBASE_APP_ID",
    "VITE_FIREBASE_MEASUREMENT_ID",
    "VITE_FIREBASE_DATABASE_URL",
    "VITE_RECAPTCHA_SITE_KEY",
  ];

  // For display/debugging only
  const envVars = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    databaseURL:
      import.meta.env.VITE_FIREBASE_DATABASE_URL ||
      "https://mystronium-default-rtdb.firebaseio.com",
    recaptchaSiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
  };

  // Enhanced debugging for production
  console.log("🔍 MYSTRONIUM DEBUG: Environment variables check:");
  console.log("Environment mode:", import.meta.env.MODE);
  console.log("Is development:", import.meta.env.DEV);
  console.log("Is production:", import.meta.env.PROD);
  console.log("All VITE_ env vars:", Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));
  required.forEach(key => {
    const value = import.meta.env[key];
    console.log(`${key}:`, value ? `${value.substring(0, 10)}...` : 'UNDEFINED');
  });

  const missing: string[] = [];
  const placeholderValues: string[] = [];

  // FIX: Validate directly from import.meta.env
  required.forEach((key) => {
    const value = import.meta.env[key];
    if (!value) {
      missing.push(key);
      console.log(`❌ Missing: ${key}`);
    } else if (
      value === "your_firebase_api_key_here" ||
      value === "your-firebase-api-key" ||
      value === "your-recaptcha-site-key" ||
      value.includes("your-") ||
      value === "your-firebase-auth-domain" ||
      value === "your-firebase-project-id" ||
      value === "your-firebase-storage-bucket" ||
      value === "your-firebase-messaging-sender-id" ||
      value === "your-firebase-app-id" ||
      value === "your-firebase-measurement-id"
    ) {
      placeholderValues.push(`${key}: ${value}`);
      console.log(`⚠️ Placeholder: ${key} = ${value}`);
    } else {
      console.log(`✅ Valid: ${key} = ${value.substring(0, 10)}...`);
    }
  });

  // In development, be more lenient and show warnings
  if (import.meta.env.DEV) {
    if (missing.length > 0) {
      console.warn(
        "⚠️ MYSTRONIUM DIAGNOSTIC: Missing Firebase environment variables:",
        missing,
      );
      console.warn(
        "📝 Configure your Firebase project at: https://console.firebase.google.com/",
      );
      console.warn(
        "📝 Update .env.local with your Firebase configuration values",
      );
      console.warn("🛠️ Running in demo mode with mock services for testing");
      return false;
    }
    
    if (placeholderValues.length > 0) {
      console.warn(
        "⚠️ MYSTRONIUM DIAGNOSTIC: Found placeholder values:",
        placeholderValues,
      );
      console.warn("🛠️ Running in demo mode with mock services for testing");
      return false;
    }

    console.log(
      "✅ MYSTRONIUM DIAGNOSTIC: All Firebase environment variables present",
    );
    console.log("🔧 Firebase configuration loaded successfully");
    console.log("🌐 Project ID:", envVars.projectId);
    console.log("🔐 Auth Domain:", envVars.authDomain);
    console.log("🗄️ Realtime Database:", envVars.databaseURL);
    console.log("🔒 App Check enabled with reCAPTCHA v3");
    return true;
  }

  // In production, be strict and throw errors for missing variables
  if (missing.length > 0) {
    console.error(
      "❌ MYSTRONIUM PRODUCTION ERROR: Missing required Firebase environment variables:",
      missing,
    );
    console.error("🔧 Please set these variables in your Netlify environment variables");
    console.error("🔧 Current environment variables available:", Object.keys(import.meta.env).filter(key => key.startsWith('VITE_')));
    throw new Error(
      `Missing required Firebase environment variables: ${missing.join(", ")}`,
    );
  }

  if (placeholderValues.length > 0) {
    console.error(
      "❌ MYSTRONIUM PRODUCTION ERROR: Found placeholder values in environment variables:",
      placeholderValues,
    );
    console.error("🔧 Please replace placeholder values with real Firebase credentials in Netlify");
    throw new Error(
      `Placeholder values found in environment variables: ${placeholderValues.join(", ")}`,
    );
  }

  console.log("✅ MYSTRONIUM PRODUCTION: All Firebase environment variables present");
  return true;
};

// Firebase configuration with nam5 region and comprehensive setup
const getFirebaseConfig = () => {
  const hasValidConfig = validateEnvVars();

  // Only use demo config in development mode
  if (!hasValidConfig && import.meta.env.DEV) {
    console.warn("🛠️ MYSTRONIUM DIAGNOSTIC: Using demo Firebase config for development");
    return {
      apiKey: "demo-api-key",
      authDomain: "demo.firebaseapp.com",
      projectId: "demo-project",
      storageBucket: "demo.appspot.com",
      messagingSenderId: "123456789",
      appId: "1:123456789:web:demo",
      measurementId: "G-DEMO123",
      databaseURL: "https://mystronium-default-rtdb.firebaseio.com",
    };
  }

  // In production, always use real environment variables
  if (!hasValidConfig && !import.meta.env.DEV) {
    throw new Error("Firebase configuration validation failed in production");
  }

  return {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
    databaseURL:
      import.meta.env.VITE_FIREBASE_DATABASE_URL ||
      "https://mystronium-default-rtdb.firebaseio.com",
  };
};

// Initialize Firebase with App Check and comprehensive error handling
let app: any;
let auth: any;
let db: any;
let storage: any;
let realtimeDb: any;
let appCheck: any;

try {
  const firebaseConfig = getFirebaseConfig();

  if (import.meta.env.DEV) {
    console.log("🚀 MYSTRONIUM DIAGNOSTIC: Initializing Firebase...");
    console.log("📋 Config:", {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain,
      hasApiKey:
        !!firebaseConfig.apiKey && firebaseConfig.apiKey !== "demo-api-key",
      region: "nam5",
    });
  }

  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  realtimeDb = getDatabase(app);

  // Configure Firestore for nam5 region
  if (db && !import.meta.env.DEV) {
    // Firestore will use nam5 region as configured in Firebase Console
    // The region is set when creating the database in Firebase Console
  }

  // Initialize App Check with reCAPTCHA v3
  if (import.meta.env.VITE_RECAPTCHA_SITE_KEY) {
    try {
      appCheck = initializeAppCheck(app, {
        provider: new ReCaptchaV3Provider(
          import.meta.env.VITE_RECAPTCHA_SITE_KEY,
        ),
        isTokenAutoRefreshEnabled: true,
      });

      if (import.meta.env.DEV) {
        console.log(
          "🔒 MYSTRONIUM DIAGNOSTIC: App Check initialized with reCAPTCHA v3",
        );
      }
    } catch (appCheckError) {
      console.warn(
        "⚠️ MYSTRONIUM DIAGNOSTIC: App Check initialization failed:",
        appCheckError,
      );
    }
  } else if (import.meta.env.DEV) {
    console.warn(
      "⚠️ MYSTRONIUM DIAGNOSTIC: VITE_RECAPTCHA_SITE_KEY not found - App Check disabled",
    );
  }

  // Configure Firestore for nam5 region
  if (db && !import.meta.env.DEV) {
    // In production, Firestore will use the nam5 region
    // This is configured in the Firebase Console
  }

  if (import.meta.env.DEV) {
    console.log("✅ MYSTRONIUM DIAGNOSTIC: Firebase initialized successfully");
    console.log("🔧 Services available:", {
      auth: !!auth,
      db: !!db,
      storage: !!storage,
      realtimeDb: !!realtimeDb,
      appCheck: !!appCheck,
    });
    console.log("🌍 Region: nam5");
  }
} catch (error) {
  if (import.meta.env.DEV) {
    console.warn(
      "🛠️ MYSTRONIUM DIAGNOSTIC: Firebase initialization failed, using mock services",
    );
    console.warn("❌ Error details:", error);

    // Mock services for development
    app = {} as any;
    auth = {} as any;
    db = {} as any;
    storage = {} as any;
    realtimeDb = {} as any;
    appCheck = {} as any;
  } else {
    throw new Error(`Firebase initialization failed: ${error}`);
  }
}

// Enhanced error handling for Firebase services
const ensureFirebaseServices = () => {
  if (!auth || !db) {
    if (import.meta.env.DEV) {
      console.warn("⚠️ MYSTRONIUM DIAGNOSTIC: Firebase services not available");
      console.warn("🔧 Check your .env.local configuration");
    }
    return false;
  }
  return true;
};

// Admin configuration
const ADMIN_EMAIL = "garetharjohns@gmail.com";

// User profile setup with comprehensive schema validation and Stripe integration
const setupUserProfile = async (user: any) => {
  if (!ensureFirebaseServices() || !user) {
    if (import.meta.env.DEV) {
      console.warn(
        "⚠️ MYSTRONIUM DIAGNOSTIC: Cannot setup user profile - missing db or user",
      );
    }
    return;
  }

  try {
    if (import.meta.env.DEV) {
      console.log(
        "👤 MYSTRONIUM DIAGNOSTIC: Setting up user profile for:",
        user.email,
      );
    }

    const userDoc = doc(db, "users", user.uid);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName || "Gareth Johns",
      admin: user.email === ADMIN_EMAIL,
      creator: user.email === ADMIN_EMAIL,
      subscription: "free",
      vaultCredits: 1,
      loginStreak: 1,
      lastLogin: new Date(),
      createdAt: new Date(),
      books: {},
      artworks: {},
      voiceNarrations: {},
      // Stripe integration fields
      stripeCustomerId: null,
      stripeSubscriptionId: null,
      subscriptionStatus: "free",
      currentPeriodEnd: null,
      updatedAt: new Date(),
    };

    await setDoc(userDoc, userData, { merge: true });

    if (import.meta.env.DEV) {
      console.log("✅ MYSTRONIUM DIAGNOSTIC: User profile setup successful");
      console.log("💳 Stripe integration ready for:", user.email);

      if (userData.admin) {
        console.log(
          "👑 MYSTRONIUM DIAGNOSTIC: Admin user detected:",
          user.email,
        );
        console.log("🔧 Admin privileges:", {
          email: user.email,
          uid: user.uid,
          admin: userData.admin,
          creator: userData.creator,
          subscription: userData.subscription,
          vaultCredits: userData.vaultCredits,
          stripeEnabled: !!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
        });
      }
    }
  } catch (error: any) {
    if (import.meta.env.DEV) {
      console.warn(
        "⚠️ MYSTRONIUM DIAGNOSTIC: User profile setup failed:",
        error,
      );
      console.warn(
        "🔧 This may be due to missing Firebase configuration or Firestore rules",
      );
      console.warn("🔧 Error details:", error.message);

      if (error.code === "permission-denied") {
        console.warn("🔒 Firestore security rules are blocking access");
        console.warn(
          "📋 Ensure rules allow authenticated users to write to users/{uid}",
        );
      }
    }
  }
};

// Auth state listener with diagnostic logging
if (auth) {
  onAuthStateChanged(auth, (user) => {
    if (import.meta.env.DEV) {
      if (user) {
        console.log(
          "🔐 MYSTRONIUM DIAGNOSTIC: User authenticated:",
          user.email,
        );
        console.log("🆔 User UID:", user.uid);
        console.log("👑 Admin check:", user.email === ADMIN_EMAIL);
        console.log("🔒 App Check status:", appCheck ? "Enabled" : "Disabled");
      } else {
        console.log("🔓 MYSTRONIUM DIAGNOSTIC: No user authenticated");
      }
    }

    setupUserProfile(user);
  });
} else if (import.meta.env.DEV) {
  console.warn(
    "⚠️ MYSTRONIUM DIAGNOSTIC: Auth service not available - running in demo mode",
  );
}

// Export the service check function for use in other components
export { ensureFirebaseServices };

export { auth, db, storage, realtimeDb, appCheck };
export default app;
