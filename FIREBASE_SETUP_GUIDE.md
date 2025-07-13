# 🔥 Firebase Setup Guide for Netlify Deployment

## 🚨 **Current Issue**
Your Firebase configuration is using placeholder values instead of real credentials, causing `auth/invalid-api-key` errors and "Missing required Firebase environment variables" errors.

## 📋 **Step-by-Step Fix**

### **Step 1: Get Your Real Firebase Credentials**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project → Project Settings (gear icon)
3. Under "Your apps", select your web app
4. Copy the configuration object:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyC...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123",
  measurementId: "G-ABC123"
};
```

5. Get your reCAPTCHA site key from [Google reCAPTCHA Console](https://www.google.com/recaptcha/admin)

### **Step 2: Fix Netlify Environment Variables**

**Option A: Netlify Dashboard (Recommended)**
1. Go to your Netlify dashboard
2. Site settings → Build & deploy → Environment → Environment variables
3. **Add/Update these variables with your real values**:

```
VITE_FIREBASE_API_KEY=your_real_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_real_sender_id
VITE_FIREBASE_APP_ID=your_real_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_real_measurement_id
VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
VITE_RECAPTCHA_SITE_KEY=your_real_recaptcha_site_key
```

**Option B: Update netlify.toml**
Replace the placeholder values in your `netlify.toml` file with real values.

### **Step 3: Clear Cache and Redeploy**
- In Netlify: Deploys → Trigger deploy → Clear cache and deploy site

### **Step 4: Check Firebase Console**
- Go to Authentication → Sign-in method → Authorized domains
- Add your Netlify domain (e.g., `your-site.netlify.app`)

### **Step 5: Test Your Live Site**
- Visit your Netlify site after deployment
- Open browser console (F12) and check for Firebase errors
- Try to use Firebase features (login, database, etc.)

---

## 🔍 **Troubleshooting**

### **Common Errors & Solutions**

1. **"Missing required Firebase environment variables"**
   - ✅ Check that all variables are set in Netlify (not just in netlify.toml)
   - ✅ Ensure `VITE_RECAPTCHA_SITE_KEY` is included
   - ✅ Clear build cache and redeploy

2. **"auth/invalid-api-key"**
   - ✅ Verify API key is correct and not a placeholder
   - ✅ Check that variables are set in Netlify dashboard

3. **"domain not authorized"**
   - ✅ Add your Netlify domain to Firebase Auth authorized domains

---

## 🎯 **Alternative: Supabase Setup**

If Firebase continues to cause issues, here's how to switch to Supabase:

### **Step 1: Create Supabase Project**
1. Go to [supabase.com](https://supabase.com)
2. Create new project
3. Note your project URL and anon key

### **Step 2: Update Environment Variables**
In Netlify dashboard, replace Firebase variables with:
```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### **Step 3: Update Code**
Replace Firebase imports with Supabase:
```javascript
import { createClient } from '@supabase/supabase-js'
const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

---

**You can now follow this guide for a Netlify-only deployment. If you want, I can walk you through the Supabase migration as well. Let me know how you'd like to proceed!** 