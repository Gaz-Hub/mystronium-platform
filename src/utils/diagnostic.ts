import { auth, db, ensureFirebaseServices } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged, User } from "firebase/auth";

export interface DiagnosticResult {
  timestamp: string;
  firebaseConfig: {
    hasValidConfig: boolean;
    missingVars: string[];
    projectId: string;
    authDomain: string;
  };
  firebaseServices: {
    auth: boolean;
    db: boolean;
    storage: boolean;
    realtimeDb: boolean;
  };
  authentication: {
    isAuthenticated: boolean;
    currentUser: User | null;
    isAdmin: boolean;
  };
  firestore: {
    canRead: boolean;
    canWrite: boolean;
    userProfileExists: boolean;
    adminStatus: boolean;
  };
  routes: {
    dashboard: boolean;
    admin: boolean;
    universe: boolean;
  };
  errors: string[];
  warnings: string[];
  recommendations: string[];
}

export const runFullDiagnostic = async (): Promise<DiagnosticResult> => {
  const result: DiagnosticResult = {
    timestamp: new Date().toISOString(),
    firebaseConfig: {
      hasValidConfig: false,
      missingVars: [],
      projectId: "",
      authDomain: "",
    },
    firebaseServices: {
      auth: false,
      db: false,
      storage: false,
      realtimeDb: false,
    },
    authentication: {
      isAuthenticated: false,
      currentUser: null,
      isAdmin: false,
    },
    firestore: {
      canRead: false,
      canWrite: false,
      userProfileExists: false,
      adminStatus: false,
    },
    routes: {
      dashboard: false,
      admin: false,
      universe: false,
    },
    errors: [],
    warnings: [],
    recommendations: [],
  };

  try {
    // Check Firebase configuration
    const envVars = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
    };

    const missingVars = Object.entries(envVars)
      .filter(([key, value]) => !value || value.includes("your_"))
      .map(([key]) => key);

    result.firebaseConfig = {
      hasValidConfig: missingVars.length === 0,
      missingVars,
      projectId: envVars.projectId || "",
      authDomain: envVars.authDomain || "",
    };

    if (missingVars.length > 0) {
      result.warnings.push(
        `Missing Firebase environment variables: ${missingVars.join(", ")}`,
      );
      result.recommendations.push(
        "Configure Firebase project at https://console.firebase.google.com/",
      );
      result.recommendations.push(
        "Update .env.local with your Firebase configuration values",
      );
    }

    // Check Firebase services
    result.firebaseServices = {
      auth: !!auth,
      db: !!db,
      storage: !!import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      realtimeDb: !!import.meta.env.VITE_FIREBASE_DATABASE_URL,
    };

    if (!auth || !db) {
      result.warnings.push(
        "Firebase services not available - running in demo mode",
      );
      result.recommendations.push(
        "Check Firebase configuration and environment variables",
      );
    }

    // Check authentication
    if (auth) {
      const currentUser = auth.currentUser;
      result.authentication = {
        isAuthenticated: !!currentUser,
        currentUser,
        isAdmin: currentUser?.email === "garetharjohns@gmail.com",
      };

      if (!currentUser) {
        result.recommendations.push(
          "Sign in with garetharjohns@gmail.com to test admin functionality",
        );
      }
    }

    // Check Firestore access
    if (db && auth?.currentUser) {
      try {
        const userDoc = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userDoc);

        result.firestore = {
          canRead: true,
          canWrite: true,
          userProfileExists: userSnap.exists(),
          adminStatus: userSnap.data()?.admin || false,
        };

        if (!userSnap.exists()) {
          result.warnings.push("User profile does not exist in Firestore");
          result.recommendations.push(
            "User profile will be created on next login",
          );
        }
      } catch (error: any) {
        result.errors.push(`Firestore access failed: ${error.message}`);
        result.firestore = {
          canRead: false,
          canWrite: false,
          userProfileExists: false,
          adminStatus: false,
        };

        if (error.code === "permission-denied") {
          result.recommendations.push(
            "Deploy Firestore rules: firebase deploy --only firestore:rules",
          );
        }
      }
    } else if (auth?.currentUser) {
      result.warnings.push("Firestore not available for user profile check");
    }

    // Check route accessibility
    result.routes = {
      dashboard: result.authentication.isAuthenticated,
      admin:
        result.authentication.isAuthenticated && result.authentication.isAdmin,
      universe: result.authentication.isAuthenticated,
    };

    if (!result.routes.admin && result.authentication.isAuthenticated) {
      result.recommendations.push(
        "Login with garetharjohns@gmail.com to access admin panel",
      );
    }
  } catch (error: any) {
    result.errors.push(`Diagnostic failed: ${error.message}`);
  }

  return result;
};

export const logDiagnosticResult = (result: DiagnosticResult) => {
  console.group("🔍 MYSTRONIUM DIAGNOSTIC REPORT");
  console.log("📅 Timestamp:", result.timestamp);

  console.group("🔥 Firebase Configuration");
  console.log("✅ Valid Config:", result.firebaseConfig.hasValidConfig);
  if (result.firebaseConfig.missingVars.length > 0) {
    console.warn("❌ Missing Variables:", result.firebaseConfig.missingVars);
  }
  console.log("🌐 Project ID:", result.firebaseConfig.projectId);
  console.log("🔐 Auth Domain:", result.firebaseConfig.authDomain);
  console.groupEnd();

  console.group("🔧 Firebase Services");
  console.log("Auth:", result.firebaseServices.auth ? "✅" : "❌");
  console.log("Firestore:", result.firebaseServices.db ? "✅" : "❌");
  console.log("Storage:", result.firebaseServices.storage ? "✅" : "❌");
  console.log("Realtime DB:", result.firebaseServices.realtimeDb ? "✅" : "❌");
  console.groupEnd();

  console.group("🔐 Authentication");
  console.log(
    "Authenticated:",
    result.authentication.isAuthenticated ? "✅" : "❌",
  );
  console.log("User:", result.authentication.currentUser?.email || "None");
  console.log("Admin:", result.authentication.isAdmin ? "👑" : "👤");
  console.groupEnd();

  console.group("📊 Firestore");
  console.log("Can Read:", result.firestore.canRead ? "✅" : "❌");
  console.log("Can Write:", result.firestore.canWrite ? "✅" : "❌");
  console.log(
    "Profile Exists:",
    result.firestore.userProfileExists ? "✅" : "❌",
  );
  console.log("Admin Status:", result.firestore.adminStatus ? "👑" : "👤");
  console.groupEnd();

  console.group("🛣️ Routes");
  console.log("Dashboard:", result.routes.dashboard ? "✅" : "❌");
  console.log("Admin:", result.routes.admin ? "✅" : "❌");
  console.log("Universe:", result.routes.universe ? "✅" : "❌");
  console.groupEnd();

  if (result.warnings.length > 0) {
    console.group("⚠️ Warnings");
    result.warnings.forEach((warning) => console.warn(warning));
    console.groupEnd();
  }

  if (result.recommendations.length > 0) {
    console.group("💡 Recommendations");
    result.recommendations.forEach((rec) => console.log("•", rec));
    console.groupEnd();
  }

  if (result.errors.length > 0) {
    console.group("❌ Errors");
    result.errors.forEach((error) => console.error(error));
    console.groupEnd();
  }

  console.groupEnd();
};
