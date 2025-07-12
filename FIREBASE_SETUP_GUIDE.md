# 🔥 MYSTRONIUM™ Firebase Setup Guide

## ✅ **Your Firebase Project is Ready!**

Your Firebase project is already configured with all the necessary services:

### **🗄️ Database Configuration**
- **Realtime Database**: `mystronium-default-rtdb` (us-central1)
- **Cloud Firestore**: nam5 (North America multi-region)
- **Security Rules**: Custom rules for users, public, collectibles, content, and admin data

### **🔐 Authentication Setup**
- **Identity Platform**: Email sign-in enabled
- **Authorized Domains**:
  - `localhost` (development)
  - Firebase Hosting URLs
  - Netlify URLs
  - `mystronium.com` (custom domain)

### **📊 Analytics**
- **Google Analytics**: Property ID `496299772`

---

## **🚀 Environment Variables Setup**

### **1. Create `.env.local` File**
Create a `.env.local` file in your project root with these values:

```env
# 🔥 FIREBASE CONFIG
VITE_FIREBASE_API_KEY=your-actual-api-key
VITE_FIREBASE_AUTH_DOMAIN=mystronium.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mystronium
VITE_FIREBASE_STORAGE_BUCKET=mystronium.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=G-496299772
VITE_FIREBASE_REGION=nam5
VITE_FIREBASE_DATABASE_URL=https://mystronium-default-rtdb.firebaseio.com

# 🔒 RECAPTCHA
VITE_RECAPTCHA_SITE_KEY=your-recaptcha-site-key

# 💳 STRIPE CONFIG
VITE_STRIPE_PUBLISHABLE_KEY=your-stripe-publishable-key
VITE_STRIPE_SECRET_KEY=your-stripe-secret-key
VITE_STRIPE_WEBHOOK_SECRET=your-stripe-webhook-secret

# 🧠 AI API KEYS
VITE_OPENAI_API_KEY=your-openai-api-key
VITE_MISTRAL_API_KEY=your-mistral-api-key
VITE_REPLICATE_KEY=your-replicate-api-token
VITE_HUGGINGFACE_KEY=your-huggingface-access-token
```

### **2. Get Your Firebase Config Values**

1. **Go to Firebase Console**: https://console.firebase.google.com/
2. **Select your project**: `mystronium`
3. **Go to Project Settings** (gear icon)
4. **Scroll to "Your apps"** section
5. **Copy the config values** from your web app

---

## **🔧 Firebase Services Status**

### **✅ Ready Services:**
- **Authentication**: Email sign-in enabled
- **Firestore**: nam5 region with custom security rules
- **Realtime Database**: `mystronium-default-rtdb` in us-central1
- **Storage**: Configured for file uploads
- **App Check**: reCAPTCHA v3 integration
- **Analytics**: Google Analytics linked

### **🔒 Security Rules**
Your Firestore has custom security rules for:
- **users**: User profile data
- **public**: Public content
- **collectibles**: NFT/collectible data
- **content**: User-generated content
- **admin**: Administrative data

---

## **🌐 Domain Configuration**

### **Authorized Domains:**
- `localhost` (development)
- `mystronium.com` (production)
- Firebase Hosting URLs
- Netlify URLs

### **Custom Domain Setup:**
1. **DNS Configuration**: Point `mystronium.com` to your hosting provider
2. **Firebase Hosting**: Configure custom domain in Firebase Console
3. **SSL Certificate**: Automatic SSL provisioning

---

## **🚀 Deployment Configuration**

### **For Netlify:**
1. **Environment Variables**: Add all variables from `.env.local` to Netlify dashboard
2. **Build Command**: `npm run build`
3. **Publish Directory**: `dist`
4. **Domain**: `mystronium.com`

### **For Firebase Hosting:**
1. **Install Firebase CLI**: `npm install -g firebase-tools`
2. **Login**: `firebase login`
3. **Initialize**: `firebase init hosting`
4. **Deploy**: `firebase deploy`

---

## **🔍 Testing Your Setup**

### **1. Development Testing:**
```bash
npm run dev
```
- Check browser console for Firebase initialization messages
- Verify all services are connected
- Test authentication flow

### **2. Production Testing:**
- Deploy to Netlify/Firebase Hosting
- Test all features with real Firebase services
- Verify analytics tracking

---

## **📊 Monitoring & Analytics**

### **Firebase Console:**
- **Authentication**: User sign-ups and sign-ins
- **Firestore**: Database usage and performance
- **Storage**: File uploads and downloads
- **Analytics**: User behavior and engagement

### **Google Analytics:**
- **Property ID**: `496299772`
- **Real-time data**: User activity monitoring
- **Custom events**: Track MYSTRONIUM™ specific actions

---

## **🔧 Troubleshooting**

### **Common Issues:**

1. **"Firebase not initialized"**
   - Check `.env.local` file exists
   - Verify all environment variables are set
   - Restart development server

2. **"Permission denied"**
   - Check Firestore security rules
   - Verify user authentication status
   - Review database permissions

3. **"Domain not authorized"**
   - Add domain to Firebase Console
   - Check DNS configuration
   - Wait for SSL certificate provisioning

### **Support:**
- **Firebase Documentation**: https://firebase.google.com/docs
- **MYSTRONIUM™ Support**: Check diagnostic tools in the app
- **Console Logs**: Check browser console for detailed error messages

---

## **🎉 Ready to Launch!**

Your MYSTRONIUM™ platform is now fully configured with:
- ✅ Real-time database for live updates
- ✅ Secure Firestore with custom rules
- ✅ Email authentication system
- ✅ File storage for uploads
- ✅ Analytics tracking
- ✅ Custom domain support

**Next Steps:**
1. Update your `.env.local` with real values
2. Test the platform locally
3. Deploy to production
4. Monitor performance and usage

---

**Firebase Project**: `mystronium`  
**Region**: nam5 (North America multi-region)  
**Database**: `mystronium-default-rtdb` (us-central1)  
**Analytics**: Property ID `496299772`  
**Status**: ✅ **READY FOR PRODUCTION** 