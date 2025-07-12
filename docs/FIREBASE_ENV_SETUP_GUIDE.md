# 🔥 Firebase Environment Variables Setup Guide

## 🚨 **Current Issue: Missing Firebase Environment Variables**

Your MYSTRONIUM™ platform is running in **demo mode** because Firebase environment variables are not configured. This guide will help you set up the proper environment variables.

---

## 📋 **Step-by-Step Setup**

### **Step 1: Create .env.local File**

1. **In your project root directory**, create a new file named `.env.local`
2. **Copy the content below** and replace the placeholder values with your actual Firebase configuration

### **Step 2: Get Your Firebase Configuration**

1. **Go to Firebase Console:** https://console.firebase.google.com/
2. **Select your project** (or create a new one)
3. **Go to Project Settings** (gear icon)
4. **Scroll down to "Your apps"** section
5. **Click on your web app** (or create one)
6. **Copy the configuration values**

### **Step 3: Create .env.local File**

Create a file named `.env.local` in your project root with this content:

```bash
# MYSTRONIUM™ Firebase Configuration
# Replace the values below with your actual Firebase project configuration

# Core Firebase Configuration (Required)
VITE_FIREBASE_API_KEY=your_actual_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:your_app_id
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com

# App Check Configuration (Required for production)
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here

# AI API Keys (Optional - for full functionality)
VITE_OPENAI_API_KEY=your_openai_api_key_here
VITE_MISTRAL_API_KEY=your_mistral_api_key_here
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Stripe Configuration (Optional - for payments)
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here

# VAULT Endpoints (Optional - for advanced features)
VITE_VAULT_API_ENDPOINT=https://your_vault_api_endpoint.com
VITE_VAULT_API_KEY=your_vault_api_key_here

# Additional Configuration (Optional)
VITE_APP_ENVIRONMENT=development
VITE_APP_VERSION=1.0.0
VITE_DEBUG_MODE=true
```

---

## 🔧 **How to Get Firebase Values**

### **From Firebase Console:**

1. **API Key:** Found in Project Settings > General > Your apps > Web app
2. **Auth Domain:** Usually `your-project-id.firebaseapp.com`
3. **Project ID:** Your Firebase project ID
4. **Storage Bucket:** Usually `your-project-id.appspot.com`
5. **Messaging Sender ID:** Found in Project Settings
6. **App ID:** Found in Project Settings > Your apps
7. **Measurement ID:** Found in Project Settings (if using Analytics)
8. **Database URL:** Found in Realtime Database section

### **Example Configuration:**
```bash
VITE_FIREBASE_API_KEY=AIzaSyC1234567890abcdefghijklmnopqrstuvwxyz
VITE_FIREBASE_AUTH_DOMAIN=mystronium-platform.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mystronium-platform
VITE_FIREBASE_STORAGE_BUCKET=mystronium-platform.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789012
VITE_FIREBASE_APP_ID=1:123456789012:web:abcdef1234567890
VITE_FIREBASE_MEASUREMENT_ID=G-XXXXXXXXXX
VITE_FIREBASE_DATABASE_URL=https://mystronium-platform.firebaseio.com
```

---

## 🎯 **Quick Setup Options**

### **Option 1: Demo Mode (Current - Working)**
Your app is already working in demo mode. You can continue developing without Firebase for now.

### **Option 2: Minimal Firebase Setup**
If you only want basic Firebase functionality, just set these required variables:
```bash
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### **Option 3: Full Setup**
Set all variables for complete functionality including AI, Stripe, and advanced features.

---

## ✅ **After Setting Up Environment Variables**

1. **Save the .env.local file**
2. **Restart your development server:**
   ```bash
   # Stop the current server (Ctrl+C)
   # Then restart:
   npm run dev
   ```
3. **Check the browser console** for Firebase initialization messages
4. **Test authentication** by trying to register/login

---

## 🔍 **Verification Steps**

### **Check if Firebase is Working:**
1. Open browser console (F12)
2. Look for Firebase initialization messages
3. Try to register a new user
4. Check if Firestore operations work

### **Expected Console Output:**
```
✅ Firebase initialized successfully
✅ Authentication service available
✅ Firestore service available
✅ Storage service available
```

---

## 🚨 **Troubleshooting**

### **If Firebase Still Shows as "Not Available":**
1. **Check file name:** Must be exactly `.env.local`
2. **Check file location:** Must be in project root (same level as package.json)
3. **Restart server:** Environment variables require server restart
4. **Check syntax:** No spaces around `=` in variable definitions

### **If You Get Firebase Errors:**
1. **Verify API key** is correct
2. **Check project ID** matches your Firebase project
3. **Ensure Firebase services** are enabled in console
4. **Check Firestore rules** are properly configured

---

## 📞 **Need Help?**

If you're having trouble setting up Firebase:
1. **Follow the Firebase Setup Guide:** `FIREBASE_SETUP_GUIDE.md`
2. **Check the diagnostic page:** Visit `/diagnostic` in your app
3. **Review Firebase console:** Ensure all services are enabled

---

**Your platform will work perfectly in demo mode until you set up Firebase!** 