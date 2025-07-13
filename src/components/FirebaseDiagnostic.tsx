import React, { useEffect, useState } from "react";
import { auth, db } from "../firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
  Unsubscribe,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  runFullDiagnostic,
  logDiagnosticResult,
  DiagnosticResult,
} from "../utils/diagnostic";

const FirebaseDiagnostic: React.FC = () => {
  const [diagnostics, setDiagnostics] = useState<string[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [testEmail] = useState("garetharjohns@gmail.com");
  const [testPassword] = useState("testpassword123");
  const [diagnosticResult, setDiagnosticResult] =
    useState<DiagnosticResult | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const logDiagnostic = (message: string) => {
    console.log(`🔍 DIAGNOSTIC: ${message}`);
    setDiagnostics((prev) => [
      ...prev,
      `${new Date().toLocaleTimeString()}: ${message}`,
    ]);
  };

  const testFirebaseConnection = (): Unsubscribe | undefined => {
    logDiagnostic("Starting Firebase diagnostic...");

    try {
      // Test Firebase initialization
      if (auth && db) {
        logDiagnostic("✅ Firebase services initialized");
      } else {
        logDiagnostic("❌ Firebase services not available");
        logDiagnostic(
          "🛠️ Running in demo mode - check .env.local configuration",
        );
        logDiagnostic(
          "📝 Configure Firebase project at: https://console.firebase.google.com/",
        );
        return;
      }

      // Test environment variables
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
        .filter(([, value]) => !value || value.includes("your_"))
        .map(([key]) => key);

      if (missingVars.length > 0) {
        logDiagnostic(
          `⚠️ Missing environment variables: ${missingVars.join(", ")}`,
        );
        logDiagnostic("🛠️ Running in demo mode");
        logDiagnostic("📝 Update .env.local with your Firebase configuration");
      } else {
        logDiagnostic("✅ All environment variables present");
        logDiagnostic(`🌐 Project: ${envVars.projectId}`);
        logDiagnostic(`🔐 Auth Domain: ${envVars.authDomain}`);
      }

      // Test authentication state
      logDiagnostic("Testing authentication state...");

      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          logDiagnostic(`✅ User authenticated: ${user.email}`);
          setCurrentUser(user);
          testUserProfile(user);
        } else {
          logDiagnostic("ℹ️ No user authenticated");
          setCurrentUser(null);
        }
      });

      return unsubscribe;
    } catch (error) {
      logDiagnostic(`❌ Firebase connection test failed: ${error}`);
      return;
    }
  };

  const testUserProfile = async (user: User) => {
    try {
      logDiagnostic(`Testing user profile for: ${user.email}`);

      const userDoc = doc(db, "users", user.uid);
      const userSnap = await getDoc(userDoc);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        logDiagnostic(
          `✅ User profile exists: ${JSON.stringify(userData, null, 2)}`,
        );

        if (userData.admin) {
          logDiagnostic("👑 Admin privileges confirmed");
        } else {
          logDiagnostic("ℹ️ User has standard privileges");
        }
      } else {
        logDiagnostic("⚠️ User profile does not exist, creating...");
        await createUserProfile(user);
      }
    } catch (error: any) {
      logDiagnostic(`❌ User profile test failed: ${error.message || error}`);
      logDiagnostic(`🔧 Error code: ${error.code || "unknown"}`);
      if (error.code === "permission-denied") {
        logDiagnostic("🔒 Firestore rules may be blocking access");
        logDiagnostic(
          "📝 Deploy rules: firebase deploy --only firestore:rules",
        );
      }
    }
  };

  const createUserProfile = async (user: User) => {
    try {
      const userDoc = doc(db, "users", user.uid);
      const userData = {
        email: user.email,
        admin: user.email === "garetharjohns@gmail.com",
        tier: "free",
        credits: 0,
        usage: { words: 0, arts: 0, audio: 0 },
        username: user.displayName || "User",
        createdAt: new Date(),
        lastLogin: new Date(),
        subscription: "free",
        vaultCredits: 5,
        voiceCredits: 5,
        textCredits: 10,
        loginStreak: 0,
        totalUsage: 0,
        isActive: true,
      };

      await setDoc(userDoc, userData, { merge: true });
      logDiagnostic("✅ User profile created successfully");

      if (userData.admin) {
        logDiagnostic("👑 Admin profile created for garetharjohns@gmail.com");
      }
    } catch (error) {
      logDiagnostic(`❌ User profile creation failed: ${error}`);
    }
  };

  const testRegistration = async () => {
    try {
      logDiagnostic("Testing user registration...");

      const result = await createUserWithEmailAndPassword(
        auth,
        testEmail,
        testPassword,
      );
      logDiagnostic(`✅ Registration successful: ${result.user.email}`);

      return result.user;
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        logDiagnostic("ℹ️ User already exists, testing login...");
        return await testLogin();
      } else {
        logDiagnostic(`❌ Registration failed: ${error.message}`);
        return null;
      }
    }
  };

  const testLogin = async () => {
    try {
      logDiagnostic("Testing user login...");

      const result = await signInWithEmailAndPassword(
        auth,
        testEmail,
        testPassword,
      );
      logDiagnostic(`✅ Login successful: ${result.user.email}`);

      return result.user;
    } catch (error: any) {
      logDiagnostic(`❌ Login failed: ${error.message}`);
      return null;
    }
  };

  const testLogout = async () => {
    try {
      logDiagnostic("Testing user logout...");

      await signOut(auth);
      logDiagnostic("✅ Logout successful");
    } catch (error: any) {
      logDiagnostic(`❌ Logout failed: ${error.message}`);
    }
  };

  useEffect(() => {
    const unsubscribe = testFirebaseConnection();

    // Run full diagnostic on mount
    const runDiagnostic = async () => {
      setIsRunning(true);
      const result = await runFullDiagnostic();
      setDiagnosticResult(result);
      logDiagnosticResult(result);
      setIsRunning(false);
    };

    runDiagnostic();

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, []);

  const runDiagnostic = async () => {
    setIsRunning(true);
    setDiagnostics([]);
    const result = await runFullDiagnostic();
    setDiagnosticResult(result);
    logDiagnosticResult(result);
    logDiagnostic("Full diagnostic completed - check console for details");
    setIsRunning(false);
  };

  const clearLogs = () => {
    setDiagnostics([]);
  };

  return (
    <div className="fixed top-4 right-4 w-96 bg-gray-900 border border-gray-600 rounded-lg p-4 text-white text-sm z-50 max-h-96 overflow-y-auto">
      <h3 className="text-lg font-bold mb-2">🔍 Firebase Diagnostic</h3>

      <div className="space-y-2 mb-4">
        <button
          onClick={runDiagnostic}
          disabled={isRunning}
          className={`w-full px-3 py-1 rounded text-xs ${
            isRunning
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {isRunning ? "Running..." : "Run Full Diagnostic"}
        </button>

        <button
          onClick={testRegistration}
          disabled={isRunning}
          className={`w-full px-3 py-1 rounded text-xs ${
            isRunning
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          Test Registration
        </button>

        <button
          onClick={testLogin}
          disabled={isRunning}
          className={`w-full px-3 py-1 rounded text-xs ${
            isRunning
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          Test Login
        </button>

        <button
          onClick={testLogout}
          disabled={isRunning}
          className={`w-full px-3 py-1 rounded text-xs ${
            isRunning
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-red-600 hover:bg-red-700"
          }`}
        >
          Test Logout
        </button>

        <button
          onClick={clearLogs}
          className="w-full bg-gray-600 hover:bg-gray-700 px-3 py-1 rounded text-xs"
        >
          Clear Logs
        </button>
      </div>

      {diagnosticResult && (
        <div className="space-y-2 mb-4">
          <div className="font-semibold">Quick Status:</div>
          <div className="text-xs space-y-1">
            <div>
              Config:{" "}
              {diagnosticResult.firebaseConfig.hasValidConfig ? "✅" : "❌"}
            </div>
            <div>
              Auth: {diagnosticResult.firebaseServices.auth ? "✅" : "❌"}
            </div>
            <div>
              Firestore: {diagnosticResult.firebaseServices.db ? "✅" : "❌"}
            </div>
            <div>
              User:{" "}
              {diagnosticResult.authentication.isAuthenticated ? "✅" : "❌"}
            </div>
            <div>
              Admin: {diagnosticResult.authentication.isAdmin ? "👑" : "👤"}
            </div>
            <div>Routes: {diagnosticResult.routes.admin ? "✅" : "❌"}</div>
          </div>
          {diagnosticResult.errors.length > 0 && (
            <div className="text-red-400 text-xs">
              Errors: {diagnosticResult.errors.length}
            </div>
          )}
          {diagnosticResult.warnings.length > 0 && (
            <div className="text-yellow-400 text-xs">
              Warnings: {diagnosticResult.warnings.length}
            </div>
          )}
        </div>
      )}

      <div className="space-y-1">
        <div className="font-semibold">Current User:</div>
        <div className="text-xs bg-gray-800 p-2 rounded">
          {currentUser ? (
            <>
              <div>Email: {currentUser.email}</div>
              <div>UID: {currentUser.uid}</div>
              <div>
                Admin:{" "}
                {currentUser.email === "garetharjohns@gmail.com" ? "Yes" : "No"}
              </div>
            </>
          ) : (
            "Not authenticated"
          )}
        </div>
      </div>

      <div className="mt-4">
        <div className="font-semibold mb-2">Diagnostic Log:</div>
        <div className="bg-black p-2 rounded text-xs max-h-32 overflow-y-auto">
          {diagnostics.length === 0 ? (
            <div className="text-gray-500">
              No logs yet. Run diagnostic to see results.
            </div>
          ) : (
            diagnostics.map((log, index) => (
              <div key={index} className="mb-1">
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FirebaseDiagnostic;
