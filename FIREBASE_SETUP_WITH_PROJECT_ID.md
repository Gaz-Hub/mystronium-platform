# MYSTRONIUM™ Firebase Setup Guide
## Project ID: 619999317107

### 🚀 **Quick Setup Steps**

#### **1. Get Firebase Configuration Values**

1. **Go to Firebase Console:**
   - Visit: https://console.firebase.google.com/
   - Select project: **619999317107**

2. **Get Web App Configuration:**
   - Click on the gear icon ⚙️ (Project Settings)
   - Scroll down to "Your apps" section
   - Click on your web app (or create one if needed)
   - Copy the configuration object

3. **Required Values to Copy:**
   ```
   apiKey: "your-api-key"
   authDomain: "619999317107.firebaseapp.com"
   projectId: "619999317107"
   storageBucket: "619999317107.appspot.com"
   messagingSenderId: "619999317107"
   appId: "1:619999317107:web:your-app-id"
   measurementId: "G-XXXXXXXXXX"
   databaseURL: "https://619999317107-default-rtdb.europe-west1.firebasedatabase.app"
   ```

#### **2. Set Environment Variables in Netlify**

1. **Go to Netlify Dashboard:**
   - Visit: https://app.netlify.com/
   - Select your MYSTRONIUM site

2. **Navigate to Environment Variables:**
   - Go to Site Settings → Environment Variables
   - Click "Add a variable" for each required variable

3. **Add These Variables:**

   **Required Firebase Variables:**
   ```
   VITE_FIREBASE_API_KEY = your-api-key
   VITE_FIREBASE_AUTH_DOMAIN = 619999317107.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID = 619999317107
   VITE_FIREBASE_STORAGE_BUCKET = 619999317107.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID = 619999317107
   VITE_FIREBASE_APP_ID = 1:619999317107:web:your-app-id
   VITE_FIREBASE_DATABASE_URL = https://619999317107-default-rtdb.europe-west1.firebasedatabase.app
   ```

   **App Check (Required):**
   ```
   VITE_RECAPTCHA_SITE_KEY = your-recaptcha-site-key
   ```

   **Optional (for full functionality):**
   ```
   VITE_MISTRAL_API_KEY = your-mistral-api-key
   VITE_STRIPE_PUBLISHABLE_KEY = your-stripe-publishable-key
   ```

#### **3. Configure Firebase Services**

1. **Authentication:**
   - Go to Authentication → Sign-in method
   - Enable Email/Password authentication
   - Add your admin email: `garetharjohns@gmail.com`

2. **Firestore Database:**
   - Go to Firestore Database
   - Create database in `europe-west1` region
   - Start in production mode

3. **Storage:**
   - Go to Storage
   - Create bucket in `europe-west1` region
   - Set security rules

4. **App Check:**
   - Go to App Check
   - Enable reCAPTCHA v3
   - Add your domain to allowed domains

#### **4. Deploy Security Rules**

1. **Firestore Rules:**
   ```bash
   firebase deploy --only firestore:rules
   ```

2. **Storage Rules:**
   ```bash
   firebase deploy --only storage
   ```

#### **5. Test the Connection**

1. **Visit your live site**
2. **Open browser console**
3. **Look for environment diagnostic output:**
   ```
   🔧 MYSTRONIUM ENVIRONMENT DIAGNOSTIC
   Environment Variables Status:
   ✅ VITE_FIREBASE_API_KEY: [SET]
   ✅ VITE_FIREBASE_PROJECT_ID: 619999317107
   ...
   ```

### 🔧 **Troubleshooting**

#### **Common Issues:**

1. **"Firebase not initialized" error:**
   - Check that all Firebase environment variables are set
   - Verify project ID matches: `619999317107`

2. **"Permission denied" errors:**
   - Deploy Firestore and Storage security rules
   - Check App Check configuration

3. **"App Check failed" errors:**
   - Verify reCAPTCHA site key is correct
   - Add your domain to App Check allowed domains

#### **Verification Steps:**

1. **Check Environment Variables:**
   - Visit `/diagnostic` page on your live site
   - Review console output for missing variables

2. **Test Authentication:**
   - Try registering with `garetharjohns@gmail.com`
   - Verify admin access at `/admin`

3. **Test Database Access:**
   - Create a test document in Firestore
   - Verify read/write permissions

### 📋 **Complete Environment Variable List**

For reference, here are ALL the environment variables you can set:

```
# Required Firebase
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=619999317107.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=619999317107
VITE_FIREBASE_STORAGE_BUCKET=619999317107.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=619999317107
VITE_FIREBASE_APP_ID=1:619999317107:web:your-app-id
VITE_FIREBASE_DATABASE_URL=https://619999317107-default-rtdb.europe-west1.firebasedatabase.app

# App Check
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key

# AI Services
VITE_MISTRAL_API_KEY=your-mistral-api-key
VITE_OPENAI_API_KEY=your-openai-api-key
VITE_ELEVENLABS_API_KEY=your-elevenlabs-api-key

# Payments
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key

# Platform
VITE_APP_ENVIRONMENT=production
VITE_APP_VERSION=1.0.0
VITE_DEBUG_MODE=false
```

### 🎯 **Next Steps**

1. **Set the environment variables in Netlify**
2. **Deploy Firebase security rules**
3. **Test the live site**
4. **Check console for diagnostic output**
5. **Verify all features work correctly**

### 📞 **Support**

If you encounter issues:
1. Check the `/diagnostic` page on your live site
2. Review browser console for error messages
3. Verify all environment variables are set correctly
4. Ensure Firebase project configuration matches

---

**Project ID:** 619999317107  
**Region:** europe-west1  
**Admin Email:** garetharjohns@gmail.com 