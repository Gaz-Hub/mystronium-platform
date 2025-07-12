# MYSTRONIUM™ Platform - Environment Setup Guide

## 🔧 Firebase Configuration Required

### Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project" or select existing project
3. Enable the following services:
   - **Authentication** (Email/Password)
   - **Firestore Database**
   - **Storage**
   - **Realtime Database** (optional)

### Step 2: Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to **Your apps** section
3. Click **Add app** → **Web** (</>) 
4. Register app with name "MYSTRONIUM Platform"
5. Copy the configuration object

### Step 3: Create Environment File

Create a `.env.local` file in your project root:

```bash
# Firebase Configuration (REQUIRED)
VITE_FIREBASE_API_KEY=your_actual_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com

# AI API Keys (Optional - for full functionality)
VITE_MISTRAL_API_KEY=your_mistral_api_key_here
VITE_REPLICATE_API_TOKEN=your_replicate_api_token_here
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Payment Processing (Optional)
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key_here

# Development Settings
VITE_APP_ENV=development
VITE_DEBUG_MODE=true
```

### Step 4: Firebase Security Rules

#### Firestore Rules
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users can read/write their own data
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    // Admin users have full access
    match /{document=**} {
      allow read, write: if request.auth != null && 
        get(/databases/$(database)/documents/users/$(request.auth.uid)).data.admin == true;
    }
  }
}
```

#### Storage Rules
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### Step 5: Authentication Setup

1. In Firebase Console, go to **Authentication**
2. Click **Get started**
3. Enable **Email/Password** provider
4. Add your email `garetharjohns@gmail.com` as an admin user

## 🧪 Testing Authentication

### Test Admin Access

1. **Start the development server**:
   ```bash
   npm run dev
   ```

2. **Open the application**: http://localhost:5173

3. **Register/Login with `garetharjohns@gmail.com`**:
   - Go to `/register` or `/login`
   - Use your email and password
   - You should see admin privileges automatically assigned

4. **Verify Admin Access**:
   - Go to `/admin` route
   - Toggle God Mode
   - Check admin panel functionality

### Expected Console Output

When you login with `garetharjohns@gmail.com`, you should see:
```
✅ Firebase initialized successfully
👑 Admin user detected: garetharjohns@gmail.com
```

## 🚨 Troubleshooting

### Common Issues

#### 1. "Missing Firebase environment variables"
**Solution**: Create `.env.local` file with your Firebase config

#### 2. "Firebase initialization failed"
**Solution**: Check your Firebase project settings and API keys

#### 3. "Admin user not detected"
**Solution**: 
- Verify email is exactly `garetharjohns@gmail.com`
- Check Firestore rules allow write access
- Ensure user document is created in Firestore

#### 4. "Authentication not working"
**Solution**:
- Enable Email/Password authentication in Firebase Console
- Check if user exists in Authentication section
- Verify Firestore rules

### Development Mode

If environment variables are missing, the app will:
- Show helpful warnings in console
- Run with mock Firebase services
- Allow testing UI without real Firebase connection
- Display "Demo mode" messages

### Production Mode

In production, missing environment variables will:
- Throw errors and prevent app startup
- Require all Firebase configuration
- Enable full functionality

## 🔒 Security Notes

- **Never commit `.env.local`** to version control
- **Use different Firebase projects** for development/production
- **Restrict API keys** in Firebase Console
- **Monitor usage** in Firebase Console
- **Set up proper security rules** before production

## 📞 Support

If you encounter issues:
1. Check browser console for errors
2. Verify Firebase project configuration
3. Test with different browsers
4. Check network tab for API calls
5. Verify environment variables are loaded

---

**Next Steps**: Once Firebase is configured, test all AI modules and admin features! 