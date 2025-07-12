@echo off
echo 🚀 MYSTRONIUM™ - Creating .env.local file
echo =========================================

echo.
echo Creating .env.local file with Firebase configuration template...
echo.

(
echo # 🔐 MYSTRONIUM™ PRODUCTION ENVIRONMENT
echo.
echo # 🔥 FIREBASE CONFIG ^(REPLACE WITH YOUR VALUES^)
echo VITE_FIREBASE_API_KEY=your_actual_firebase_api_key_here
echo VITE_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
echo VITE_FIREBASE_PROJECT_ID=your_project_id
echo VITE_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
echo VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
echo VITE_FIREBASE_APP_ID=your_app_id
echo VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
echo VITE_FIREBASE_REGION=nam5
echo VITE_FIREBASE_DATABASE_URL=https://your_project_id.firebaseio.com
echo.
echo # 🎯 RECAPTCHA ^(Optional - for App Check^)
echo VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
echo.
echo # 🧠 AI API KEYS ^(Optional^)
echo VITE_MISTRAL_KEY=your_mistral_api_key
echo VITE_ELEVENLABS_KEY=your_elevenlabs_api_key
echo VITE_REPLICATE_KEY=your_replicate_api_token
echo.
echo # 💳 STRIPE CONFIG ^(Optional^)
echo VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
echo VITE_STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
echo.
echo # 🔧 PRODUCTION SETTINGS
echo VITE_APP_ENV=production
echo VITE_DEBUG_MODE=false
) > .env.local

echo ✅ .env.local file created successfully!
echo.
echo 📋 Next steps:
echo 1. Go to https://console.firebase.google.com/
echo 2. Create a new project
echo 3. Enable Authentication, Firestore, and Storage
echo 4. Get your Firebase configuration
echo 5. Replace the placeholder values in .env.local
echo 6. Run: firebase deploy --only firestore:rules,storage
echo 7. Run: npm run dev
echo.
echo 📖 For detailed instructions, see FIREBASE_SETUP_NOW.md
echo.
pause 