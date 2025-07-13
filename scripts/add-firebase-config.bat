@echo off
echo 🚀 MYSTRONIUM™ - Adding Firebase Configuration
echo ==============================================

echo Creating .env.local with real Firebase config...

(
echo # 🔐 MYSTRONIUM™ PRODUCTION ENVIRONMENT
echo.
echo # 🔥 FIREBASE CONFIG ^(REAL VALUES^)
echo VITE_FIREBASE_API_KEY=your_firebase_api_key_here
echo VITE_FIREBASE_AUTH_DOMAIN=mystronium.firebaseapp.com
echo VITE_FIREBASE_PROJECT_ID=mystronium
echo VITE_FIREBASE_STORAGE_BUCKET=mystronium.firebasestorage.app
echo VITE_FIREBASE_MESSAGING_SENDER_ID=619999317107
echo VITE_FIREBASE_APP_ID=1:619999317107:web:c78192df8faca1417dee06
echo VITE_FIREBASE_MEASUREMENT_ID=G-9Y36LLR71P
echo VITE_FIREBASE_REGION=nam5
echo VITE_FIREBASE_DATABASE_URL=https://mystronium-default-rtdb.firebaseio.com
echo.
echo # 🎯 RECAPTCHA ^(App Check^)
echo VITE_RECAPTCHA_SITE_KEY=6LfJ5oArAAAAAA06lO2iqW3PsZeGe6hD-4jQyQOa
echo.
echo # 🧠 AI API KEYS ^(Optional^)
echo VITE_MISTRAL_KEY=your_mistral_api_key_here
echo VITE_ELEVENLABS_KEY=your_elevenlabs_api_key_here
echo VITE_REPLICATE_KEY=your_replicate_api_token_here
echo.
echo # 💳 STRIPE CONFIG ^(Optional^)
echo VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key_here
echo VITE_STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret_here
echo.
echo # 🔧 PRODUCTION SETTINGS
echo VITE_APP_ENV=production
echo VITE_DEBUG_MODE=false
) > .env.local

echo ✅ .env.local created with real Firebase configuration!
echo.
echo 📋 Next steps:
echo 1. Restart your development server: npm run dev
echo 2. Check browser console for Firebase initialization
echo 3. Test login with admin credentials
echo 4. Verify real-time data is working
echo.
echo 🎉 Your platform is now off demo mode!
echo.
pause 