# 🔥 Firebase Setup Guide for Netlify Deployment

## 🚨 **Current Issue**
Your Firebase configuration is using placeholder values instead of real credentials, causing `auth/invalid-api-key` errors.

## 📋 **Step-by-Step Fix**

### **Step 1: Create Firebase Project**

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or "Add project"
3. Name your project (e.g., "mystronium-platform")
4. Choose your region (recommend: `us-central1` for consistency)
5. Complete the setup

### **Step 2: Get Firebase Configuration**

1. In Firebase Console, click the gear icon ⚙️ → "Project settings"
2. Scroll down to "Your apps" section
3. Click "Add app" → "Web" (</>)
4. Register your app with a nickname (e.g., "mystronium-web")
5. Copy the configuration object that looks like this:

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

### **Step 3: Set Netlify Environment Variables**

**Option A: Use the Netlify Dashboard**
1. Go to your Netlify dashboard
2. Site settings → Environment variables
3. Add each variable from your Firebase config, using the `VITE_` prefix:

```
VITE_FIREBASE_API_KEY=your_real_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_DATABASE_URL=https://your_project_id-default-rtdb.firebaseio.com
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

**Option B: Use the Setup Script**
```sh
node setup-netlify-env.js
```
This will update `netlify.toml` with your real values (if you have a file with your real values).

### **Step 4: Clear Netlify Build Cache and Redeploy**
- In Netlify: Deploys → Trigger deploy → Clear cache and deploy site.

### **Step 5: Check Firebase Console**
- Make sure your Netlify domain (e.g., `your-site.netlify.app`) is in Firebase Auth → Sign-in method → Authorized domains.
- Check that all Firebase services (Auth, Firestore, etc.) are in the same region.

---

### **If You Still Get Errors**
- Double-check for typos in variable names or values.
- Make sure you are not using placeholder values anywhere.
- Check the browser console and Netlify deploy logs for specific error messages.

---

### **Switching to Supabase (if desired)**
- Create a Supabase project, copy the URL and anon key.
- Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Netlify environment variables.
- Update your code to use Supabase as shown in your original message.

---

**You can now follow this guide for a Netlify-only deployment. If you want, I can walk you through the Supabase migration as well. Let me know how you'd like to proceed!** 