# MYSTRONIUM™ Platform - Production Deployment Guide

## 🚀 Quick Start

### 1. Environment Variables Setup

Create a `.env.local` file in the root directory with the following variables:

```bash
# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:abcdef123456
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com

# AI API Keys
VITE_MISTRAL_API_KEY=your_mistral_api_key_here
VITE_REPLICATE_API_TOKEN=your_replicate_api_token_here
VITE_ELEVENLABS_API_KEY=your_elevenlabs_api_key_here

# Payment Processing
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here

# Optional: Analytics and Monitoring
VITE_GOOGLE_ANALYTICS_ID=G-XXXXXXXXXX
VITE_SENTRY_DSN=https://your_sentry_dsn_here

# Development Settings
VITE_APP_ENV=production
VITE_DEBUG_MODE=false
```

### 2. API Keys Required

#### Firebase
- Create a new Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
- Enable Authentication, Firestore, Storage, and Realtime Database
- Copy configuration from Project Settings > General > Your Apps

#### Mistral AI
- Sign up at [mistral.ai](https://mistral.ai)
- Get API key from dashboard
- Used for Ghostscribe text generation

#### Replicate
- Sign up at [replicate.com](https://replicate.com)
- Get API token from account settings
- Used for Vault Engine image generation

#### ElevenLabs
- Sign up at [elevenlabs.io](https://elevenlabs.io)
- Get API key from profile settings
- Used for Narrata voice generation

#### Stripe
- Create account at [stripe.com](https://stripe.com)
- Get publishable key from dashboard
- Used for payment processing

### 3. Firebase Security Rules

Update your Firestore security rules:

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

### 4. Deployment Options

#### Vercel (Recommended)
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

#### Netlify
```bash
# Build the project
npm run build

# Deploy dist folder to Netlify
```

#### Firebase Hosting
```bash
# Install Firebase CLI
npm i -g firebase-tools

# Login and initialize
firebase login
firebase init hosting

# Build and deploy
npm run build
firebase deploy
```

### 5. Production Checklist

- [ ] All environment variables set
- [ ] Firebase project configured
- [ ] API keys obtained and configured
- [ ] Security rules updated
- [ ] Domain configured (optional)
- [ ] SSL certificate enabled
- [ ] Analytics configured (optional)
- [ ] Error monitoring set up (optional)

### 6. Admin Access

The platform automatically grants admin access to `garetharjohns@gmail.com`. To add more admins:

1. Go to `/admin` route
2. Use the admin panel to manage users
3. Or manually update Firestore user documents

### 7. Performance Optimization

- Images are optimized with WebP format
- Code splitting implemented
- Lazy loading for components
- CDN-ready static assets

### 8. Security Features

- Firebase Authentication
- Role-based access control
- API key protection
- XSS prevention
- CSRF protection

### 9. Monitoring

- Error boundaries implemented
- Toast notifications for user feedback
- Console logging removed for production
- Performance monitoring ready

### 10. Support

For deployment issues:
- Check Firebase console for errors
- Verify API keys are valid
- Ensure environment variables are set
- Check browser console for client-side errors

## 🎯 Zero-Cost Deployment

This platform is designed for zero upfront cost deployment:
- Vercel: Free tier available
- Firebase: Generous free tier
- API costs: Pay-per-use model
- No server maintenance required

## 🔧 Customization

The platform is fully customizable:
- Modify themes in `src/index.css`
- Update branding in components
- Customize AI prompts in `src/utils/promptTemplates.ts`
- Add new features using the modular architecture 