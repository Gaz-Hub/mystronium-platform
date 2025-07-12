import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

// Initialize Firebase Admin
admin.initializeApp();

// App Check enforced function for protected operations
export const protectedFunction = functions
  .region('europe-west1')
  .https.onCall((data, context) => {
    // Verify App Check
    if (!context.app) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Function must be called from an App Check verified app."
      );
    }

    // Verify authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    return {
      message: "Function executed with App Check verified.",
      userId: context.auth.uid,
      timestamp: new Date().toISOString()
    };
  });

// User profile management function
export const createUserProfile = functions
  .region('europe-west1')
  .https.onCall(async (data, context) => {
    // Verify App Check
    if (!context.app) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Function must be called from an App Check verified app."
      );
    }

    // Verify authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    try {
      const { email, displayName } = data;
      const userId = context.auth.uid;
      const isAdmin = email === 'garetharjohns@gmail.com';

      const userData = {
        uid: userId,
        email: email,
        displayName: displayName || 'Gareth Johns',
        admin: isAdmin,
        creator: isAdmin,
        subscription: 'free',
        vaultCredits: 1,
        loginStreak: 1,
        lastLogin: new Date(),
        createdAt: new Date(),
        books: {},
        artworks: {},
        voiceNarrations: {}
      };

      await admin.firestore()
        .collection('users')
        .doc(userId)
        .set(userData, { merge: true });

      return {
        success: true,
        message: "User profile created successfully",
        userData: userData
      };
    } catch (error) {
      throw new functions.https.HttpsError(
        "internal",
        "Failed to create user profile",
        error
      );
    }
  });

// Admin function for user management
export const adminGetUsers = functions
  .region('europe-west1')
  .https.onCall(async (data, context) => {
    // Verify App Check
    if (!context.app) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Function must be called from an App Check verified app."
      );
    }

    // Verify authentication and admin status
    if (!context.auth || context.auth.token.email !== 'garetharjohns@gmail.com') {
      throw new functions.https.HttpsError(
        "permission-denied",
        "Admin access required."
      );
    }

    try {
      const usersSnapshot = await admin.firestore()
        .collection('users')
        .get();

      const users = usersSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      return {
        success: true,
        users: users,
        count: users.length
      };
    } catch (error) {
      throw new functions.https.HttpsError(
        "internal",
        "Failed to fetch users",
        error
      );
    }
  });

// Vault credits management function
export const updateVaultCredits = functions
  .region('europe-west1')
  .https.onCall(async (data, context) => {
    // Verify App Check
    if (!context.app) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Function must be called from an App Check verified app."
      );
    }

    // Verify authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    try {
      const { credits, operation } = data; // operation: 'add', 'subtract', 'set'
      const userId = context.auth.uid;

      const userRef = admin.firestore().collection('users').doc(userId);
      const userDoc = await userRef.get();

      if (!userDoc.exists) {
        throw new functions.https.HttpsError(
          "not-found",
          "User profile not found."
        );
      }

      const currentCredits = userDoc.data()?.vaultCredits || 0;
      let newCredits = currentCredits;

      switch (operation) {
        case 'add':
          newCredits = currentCredits + credits;
          break;
        case 'subtract':
          newCredits = Math.max(0, currentCredits - credits);
          break;
        case 'set':
          newCredits = credits;
          break;
        default:
          throw new functions.https.HttpsError(
            "invalid-argument",
            "Invalid operation. Use 'add', 'subtract', or 'set'."
          );
      }

      await userRef.update({
        vaultCredits: newCredits,
        lastUpdated: new Date()
      });

      return {
        success: true,
        message: `Vault credits ${operation}ed successfully`,
        previousCredits: currentCredits,
        newCredits: newCredits
      };
    } catch (error) {
      throw new functions.https.HttpsError(
        "internal",
        "Failed to update vault credits",
        error
      );
    }
  });

// Analytics function
export const logAnalytics = functions
  .region('europe-west1')
  .https.onCall(async (data, context) => {
    // Verify App Check
    if (!context.app) {
      throw new functions.https.HttpsError(
        "failed-precondition",
        "Function must be called from an App Check verified app."
      );
    }

    // Verify authentication
    if (!context.auth) {
      throw new functions.https.HttpsError(
        "unauthenticated",
        "User must be authenticated."
      );
    }

    try {
      const { event, properties } = data;
      const userId = context.auth.uid;

      await admin.firestore()
        .collection('analytics')
        .add({
          userId: userId,
          event: event,
          properties: properties || {},
          timestamp: new Date(),
          userAgent: context.rawRequest.headers['user-agent'] || 'unknown'
        });

      return {
        success: true,
        message: "Analytics event logged successfully"
      };
    } catch (error) {
      throw new functions.https.HttpsError(
        "internal",
        "Failed to log analytics event",
        error
      );
    }
  });

// Functions are already exported above 