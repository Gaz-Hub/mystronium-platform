# 🚀 MYSTRONIUM™ Local Development Setup

## Quick Start

### 1. Environment Configuration
```bash
# Copy the environment template
cp env.template .env.local

# Edit .env.local with your Firebase configuration
# Get your Firebase config from: https://console.firebase.google.com/
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

### 4. Access the Platform
- **Local URL**: http://localhost:5173
- **Firebase Diagnostic**: Available in development mode (top-right corner)

## 🔥 Firebase Setup

### Step 1: Create Firebase Project
1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing
3. Enable Authentication (Email/Password)
4. Enable Firestore Database
5. Enable Storage (optional)

### Step 2: Get Configuration
1. Go to Project Settings
2. Scroll to "Your apps" section
3. Click "Add app" → Web app
4. Copy the configuration object

### Step 3: Configure Environment Variables
Edit `.env.local` with your Firebase config:
```env
VITE_FIREBASE_API_KEY=your_actual_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123456789:web:your_app_id
VITE_FIREBASE_DATABASE_URL=https://your_project.firebaseio.com
```

### Step 4: Deploy Firestore Rules
```bash
# Login to Firebase (if not already logged in)
firebase login

# Initialize Firebase (if not already initialized)
firebase init firestore

# Deploy security rules
firebase deploy --only firestore:rules
```

## 🔐 Authentication Testing

### Admin User Setup
The platform automatically sets admin privileges for `garetharjohns@gmail.com`:

1. **Register/Login** with `garetharjohns@gmail.com`
2. **Admin Panel** will be accessible at `/admin`
3. **God Mode** controls will be available

### Test Accounts
- **Admin**: `garetharjohns@gmail.com` / `testpassword123`
- **Regular User**: Any email / password combination

## 🛠️ Development Features

### Firebase Diagnostic
- **Location**: Top-right corner (development mode only)
- **Features**:
  - Test authentication
  - Check environment variables
  - Monitor user profile creation
  - Debug Firebase connections

### Demo Mode
- **When**: Missing Firebase configuration
- **Features**: Mock services with fallback content
- **Purpose**: Development without Firebase setup

### God Mode
- **Access**: Admin panel (`/admin`)
- **Features**:
  - Bypass credit limits
  - Unlimited access to all features
  - System controls and monitoring

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React contexts (Auth, User, Admin)
├── pages/             # Route components
├── hooks/             # Custom React hooks
├── utils/             # Utility functions
├── firebase.ts        # Firebase configuration
└── vite-env.d.ts      # TypeScript environment types
```

## 🔧 Available Routes

### Core Routes
- `/` - Home page
- `/dashboard` - User dashboard with stats
- `/universe` - User timeline and creative universe
- `/admin` - Admin panel (requires admin privileges)

### AI Modules
- `/ghostscribe` - AI book writing
- `/vault` - AI art generation
- `/narrata` - AI voice narration
- `/codex` - Lore and world-building

### User Management
- `/login` - User authentication
- `/register` - User registration
- `/profile` - User profile management

## 🚨 Troubleshooting

### Common Issues

#### 1. Firebase Connection Failed
```
❌ Firebase services not available
```
**Solution**: Check `.env.local` configuration

#### 2. Authentication Errors
```
❌ Login failed: auth/user-not-found
```
**Solution**: Enable Email/Password authentication in Firebase Console

#### 3. Firestore Permission Denied
```
❌ User profile test failed: Missing or insufficient permissions
```
**Solution**: Deploy Firestore security rules

#### 4. Environment Variables Missing
```
⚠️ Missing environment variables: VITE_FIREBASE_API_KEY
```
**Solution**: Copy `env.template` to `.env.local` and configure

### Development Commands
```bash
# Start development server
npm run dev

# Build for production
npm run build

# Type checking
npm run type-check

# Lint code
npm run lint
```

## 🎯 Testing Checklist

### ✅ Basic Functionality
- [ ] Platform loads without errors
- [ ] Navigation works between routes
- [ ] Firebase diagnostic shows correct status
- [ ] Authentication works (register/login)

### ✅ Admin Features
- [ ] Admin user can access `/admin`
- [ ] God Mode toggle works
- [ ] Admin privileges are set correctly
- [ ] System stats display properly

### ✅ User Features
- [ ] Dashboard displays user stats
- [ ] Universe timeline shows events
- [ ] Credit system works
- [ ] User profile creation successful

### ✅ Firebase Integration
- [ ] Environment variables loaded
- [ ] Authentication state managed
- [ ] Firestore operations work
- [ ] Security rules deployed

## 🚀 Production Deployment

### Vercel Deployment
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Firebase Hosting
```bash
# Build the project
npm run build

# Deploy to Firebase
firebase deploy --only hosting
```

## 📞 Support

For issues or questions:
1. Check the Firebase Diagnostic panel
2. Review console logs for errors
3. Verify environment configuration
4. Test with the provided admin account

---

**MYSTRONIUM™ Platform** - Ready for local development! 🚀 