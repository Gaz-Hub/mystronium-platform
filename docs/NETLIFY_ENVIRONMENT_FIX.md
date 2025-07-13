# 🔧 MYSTRONIUM™ Platform - Netlify Environment Fix Guide

## 📅 **Date:** July 12, 2025 - 19:11 BST
## 🎯 **Goal:** Fix Environment Variables on Live Netlify Site

---

## 🚨 **Issue Diagnosis**

Your local development environment is working perfectly, but your live Netlify site may have environment variable issues causing:
- Firebase Authentication failures
- Stripe webhook errors
- Data Connect connection problems
- "Refused to connect" CSP violations (already fixed)

---

## 📋 **Step-by-Step Fix Process**

### **Step 1: Verify Local Environment**
Your local `.env.local` file should contain:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com

# Stripe Configuration
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_XXXXXXXXXXXXXXXXXXXX
VITE_STRIPE_SECRET_KEY=sk_test_XXXXXXXXXXXXXXXXXXXX
VITE_STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# Admin Configuration
VITE_ADMIN_SECRET=spiralcoremaster

# reCAPTCHA Configuration
RECAPTCHA_SITE_KEY=your_recaptcha_site_key

# Data Connect Configuration (if using)
VITE_DATA_CONNECT_PROJECT_ID=your_project
VITE_DATA_CONNECT_REGION=europe-west1
VITE_DATA_CONNECT_INSTANCE_NAME=your-cloud-sql-instance
VITE_DATA_CONNECT_DATABASE_NAME=your_database
VITE_DATA_CONNECT_USER=your_username
VITE_DATA_CONNECT_PASSWORD=your_password
VITE_DATA_CONNECT_CONNECTION_NAME=your_project:europe-west1:your-cloud-sql-instance
```

### **Step 2: Sync with Netlify Dashboard**

1. **Go to [Netlify Dashboard](https://app.netlify.com/)**
2. **Select your site** (`mystronium` or similar)
3. **Navigate to:** Settings → Environment Variables
4. **Add ALL variables** from your local `.env.local` file
5. **Ensure exact casing:** `VITE_FIREBASE_API_KEY` (not `vite_firebase_api_key`)

### **Step 3: Trigger New Deployment**

After adding environment variables:
1. **Go to Deploys tab**
2. **Click "Trigger deploy"** → "Deploy site"
3. **Wait for build to complete**
4. **Check build logs** for any errors

### **Step 4: Test Live Site**

1. **Visit your live site** (e.g., `https://mystronium.netlify.app`)
2. **Open browser console** (F12)
3. **Look for errors** like:
   - `VITE_FIREBASE_API_KEY is undefined`
   - `Firebase: Error (auth/invalid-api-key)`
   - `Stripe: Invalid publishable key`

### **Step 5: Verify Firebase Connection**

1. **Test authentication** - try to register/login
2. **Check admin access** - visit `/admin` with `garetharjohns@gmail.com`
3. **Test Stripe integration** - try a test payment
4. **Check diagnostic page** - visit `/diagnostic`

---

## 🔍 **Common Issues & Solutions**

### **Issue 1: "VITE_FIREBASE_API_KEY is undefined"**
**Solution:**
- Add `VITE_FIREBASE_API_KEY` to Netlify environment variables
- Ensure exact casing matches your local file

### **Issue 2: "Firebase: Error (auth/invalid-api-key)"**
**Solution:**
- Verify API key is correct in Firebase Console
- Check for extra spaces or characters in Netlify
- Ensure project ID matches Firebase project

### **Issue 3: "Stripe: Invalid publishable key"**
**Solution:**
- Add `VITE_STRIPE_PUBLISHABLE_KEY` to Netlify
- Verify key starts with `pk_test_` or `pk_live_`
- Check for typos in the key

### **Issue 4: Build Failures**
**Solution:**
- Check Netlify build logs for specific errors
- Ensure all required dependencies are in `package.json`
- Verify Node.js version compatibility

---

## 🧪 **Diagnostic Commands**

### **Check Environment Variables in Code**
```typescript
// Add this to your browser console to check variables
console.log('Firebase API Key:', import.meta.env.VITE_FIREBASE_API_KEY);
console.log('Firebase Project ID:', import.meta.env.VITE_FIREBASE_PROJECT_ID);
console.log('Stripe Key:', import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
```

### **Test Firebase Connection**
```typescript
// Add this to browser console
import { getAuth } from 'firebase/auth';
const auth = getAuth();
console.log('Firebase Auth:', auth);
```

---

## 📊 **Expected Results After Fix**

### **✅ Success Indicators:**
- **No console errors** about undefined environment variables
- **Firebase authentication** works (register/login)
- **Admin panel** accessible at `/admin`
- **Stripe payments** process correctly
- **Diagnostic page** shows all green checkmarks

### **❌ Failure Indicators:**
- **Console errors** about missing variables
- **Authentication failures** with Firebase errors
- **Admin panel** shows access denied
- **Payment failures** with Stripe errors

---

## 🚀 **Next Steps**

1. **Follow the steps above** to sync environment variables
2. **Test your live site** thoroughly
3. **Share any specific errors** from browser console or Netlify logs
4. **Confirm success** by testing all major features

---

## 📞 **Support Information**

If you encounter specific errors:
1. **Copy the exact error message**
2. **Note which feature is failing** (auth, payments, admin, etc.)
3. **Check Netlify build logs** for deployment issues
4. **Verify environment variables** are correctly set

Your platform is very close to being fully functional! Let's get those environment variables sorted. 🎉 