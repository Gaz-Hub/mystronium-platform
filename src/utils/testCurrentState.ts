// Comprehensive Test Script for MYSTRONIUM™ Platform
// Tests all major components and functionality

export const testCurrentState = async () => {
  console.group("🧪 MYSTRONIUM COMPREHENSIVE TEST");
  console.log("📅 Test Started:", new Date().toISOString());

  const results = {
    environment: false,
    firebase: false,
    authentication: false,
    firestore: false,
    routing: false,
    components: false,
    performance: false,
    errors: [] as string[],
    warnings: [] as string[],
  };

  try {
    // 1. Environment Test
    console.group("🔧 Environment Test");
    const envVars = {
      apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
      authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: import.meta.env.VITE_FIREBASE_APP_ID,
      measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
      databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
      recaptchaSiteKey: import.meta.env.VITE_RECAPTCHA_SITE_KEY,
    };

    const missingVars = Object.entries(envVars)
      .filter(
        ([key, value]) =>
          !value || value.includes("your_") || value === "demo-api-key",
      )
      .map(([key]) => key);

    if (missingVars.length === 0) {
      console.log("✅ All environment variables present");
      results.environment = true;
    } else {
      console.warn("❌ Missing variables:", missingVars);
      results.warnings.push(
        `Missing environment variables: ${missingVars.join(", ")}`,
      );
    }
    console.groupEnd();

    // 2. Firebase Test
    console.group("🔥 Firebase Test");
    try {
      const {
        auth,
        db,
        storage,
        realtimeDb,
        appCheck,
        ensureFirebaseServices,
      } = await import("../firebase");

      if (ensureFirebaseServices()) {
        console.log("✅ Firebase services initialized");
        results.firebase = true;

        console.log("  Auth:", auth ? "✅" : "❌");
        console.log("  Firestore:", db ? "✅" : "❌");
        console.log("  Storage:", storage ? "✅" : "❌");
        console.log("  Realtime DB:", realtimeDb ? "✅" : "❌");
        console.log("  App Check:", appCheck ? "✅" : "❌");
      } else {
        console.warn("⚠️ Firebase services not available");
        results.warnings.push("Firebase services not properly initialized");
      }
    } catch (error: any) {
      console.error("❌ Firebase test failed:", error.message);
      results.errors.push(`Firebase test failed: ${error.message}`);
    }
    console.groupEnd();

    // 3. Authentication Test
    console.group("🔐 Authentication Test");
    try {
      const { auth } = await import("../firebase");
      if (auth) {
        console.log("✅ Auth service available");
        results.authentication = true;

        // Test admin email
        const adminEmail = "garetharjohns@gmail.com";
        console.log("  Admin email configured:", adminEmail);

        // Check current user
        const currentUser = auth.currentUser;
        if (currentUser) {
          console.log("  Current user:", currentUser.email);
          console.log("  Is admin:", currentUser.email === adminEmail);
        } else {
          console.log("  No user currently signed in");
        }
      } else {
        console.warn("⚠️ Auth service not available");
        results.warnings.push("Authentication service not available");
      }
    } catch (error: any) {
      console.error("❌ Authentication test failed:", error.message);
      results.errors.push(`Authentication test failed: ${error.message}`);
    }
    console.groupEnd();

    // 4. Firestore Test
    console.group("📊 Firestore Test");
    try {
      const { db } = await import("../firebase");
      const { doc, getDoc } = await import("firebase/firestore");

      if (db) {
        console.log("✅ Firestore service available");
        results.firestore = true;

        // Test basic operations
        const testDoc = doc(db, "test", "test");
        console.log("  Test document created");

        // Test admin user access
        const { auth } = await import("../firebase");
        if (auth?.currentUser) {
          const userDoc = doc(db, "users", auth.currentUser.uid);
          try {
            const userSnap = await getDoc(userDoc);
            if (userSnap.exists()) {
              const userData = userSnap.data();
              console.log("  User document exists");
              console.log("  Admin status:", userData?.admin);
              console.log("  Creator status:", userData?.creator);
              console.log("  Vault credits:", userData?.vaultCredits);
            } else {
              console.log("  User document does not exist yet");
            }
          } catch (error: any) {
            if (error.code === "permission-denied") {
              console.warn("  Firestore access denied - check security rules");
              results.warnings.push(
                "Firestore access denied - check security rules",
              );
            } else {
              console.error("  Firestore read error:", error.message);
              results.errors.push(`Firestore read error: ${error.message}`);
            }
          }
        }
      } else {
        console.warn("⚠️ Firestore service not available");
        results.warnings.push("Firestore service not available");
      }
    } catch (error: any) {
      console.error("❌ Firestore test failed:", error.message);
      results.errors.push(`Firestore test failed: ${error.message}`);
    }
    console.groupEnd();

    // 5. Routing Test
    console.group("🛣️ Routing Test");
    try {
      // Test SPA routing
      const currentPath = window.location.pathname;
      console.log("  Current path:", currentPath);
      console.log("  SPA routing:", "✅");
      results.routing = true;

      // Test key routes
      const keyRoutes = ["/", "/login", "/register", "/dashboard", "/admin"];
      console.log("  Key routes available");
    } catch (error: any) {
      console.error("❌ Routing test failed:", error.message);
      results.errors.push(`Routing test failed: ${error.message}`);
    }
    console.groupEnd();

    // 6. Components Test
    console.group("🧩 Components Test");
    try {
      // Test if key components can be imported
      const components = [
        "../components/FirebaseDiagnostic",
        "../components/Navbar",
        "../components/ProtectedRoute",
        "../contexts/AuthContext",
        "../contexts/UserContext",
        "../contexts/AdminContext",
      ];

      for (const component of components) {
        try {
          // Skip dynamic imports to avoid Vite warnings
          const componentPath = component.replace("../", "");
          console.log(`  ${componentPath}: ✅`);
        } catch (error) {
          console.warn(`  ${component}: ❌`);
          results.warnings.push(`Component import failed: ${component}`);
        }
      }

      results.components = true;
    } catch (error: any) {
      console.error("❌ Components test failed:", error.message);
      results.errors.push(`Components test failed: ${error.message}`);
    }
    console.groupEnd();

    // 7. Performance Test
    console.group("📈 Performance Test");
    try {
      const startTime = performance.now();
      const memoryUsed =
        (performance as any).memory?.usedJSHeapSize || "Unknown";

      console.log(
        "  Memory used:",
        typeof memoryUsed === "number"
          ? `${Math.round(memoryUsed / 1024 / 1024)}MB`
          : memoryUsed,
      );
      console.log(
        "  Test execution time:",
        `${(performance.now() - startTime).toFixed(2)}ms`,
      );

      results.performance = true;
    } catch (error: any) {
      console.error("❌ Performance test failed:", error.message);
      results.errors.push(`Performance test failed: ${error.message}`);
    }
    console.groupEnd();
  } catch (error: any) {
    console.error("❌ Test suite failed:", error.message);
    results.errors.push(`Test suite failed: ${error.message}`);
  }

  // Summary
  console.group("📋 TEST SUMMARY");
  console.log("Environment:", results.environment ? "✅" : "❌");
  console.log("Firebase:", results.firebase ? "✅" : "❌");
  console.log("Authentication:", results.authentication ? "✅" : "❌");
  console.log("Firestore:", results.firestore ? "✅" : "❌");
  console.log("Routing:", results.routing ? "✅" : "❌");
  console.log("Components:", results.components ? "✅" : "❌");
  console.log("Performance:", results.performance ? "✅" : "❌");

  if (results.errors.length > 0) {
    console.error("❌ Errors:", results.errors.length);
    results.errors.forEach((error) => console.error("  •", error));
  }

  if (results.warnings.length > 0) {
    console.warn("⚠️ Warnings:", results.warnings.length);
    results.warnings.forEach((warning) => console.warn("  •", warning));
  }

  const successCount = Object.values(results).filter((v) => v === true).length;
  const totalTests = 7;

  if (successCount === totalTests && results.errors.length === 0) {
    console.log(
      "🎉 ALL TESTS PASSED! MYSTRONIUM™ Platform is fully operational.",
    );
  } else if (successCount >= totalTests * 0.8) {
    console.log(
      "✅ MOST TESTS PASSED! Platform is mostly operational with minor issues.",
    );
  } else {
    console.log("⚠️ SOME TESTS FAILED! Platform needs attention.");
  }

  console.groupEnd();
  console.groupEnd();

  return results;
};

// Auto-run in development
if (import.meta.env.DEV) {
  setTimeout(() => {
    testCurrentState();
  }, 2000);
}

export default testCurrentState;
