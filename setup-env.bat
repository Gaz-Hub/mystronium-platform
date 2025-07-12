@echo off
echo 🚀 MYSTRONIUM ENVIRONMENT SETUP
echo =====================================
echo.

echo 📋 Step 1: Checking current environment...
node check-env.js

echo.
echo 📋 Step 2: Fixing environment variables...
node fix-env.js

echo.
echo 📋 Step 3: Final environment check...
node check-env.js

echo.
echo 📋 Step 4: Restarting development server...
echo.
echo ⚠️  IMPORTANT: If you see any "your_*" values above,
echo    you need to edit .env.local with real configuration!
echo.
echo 🔗 Get your configuration from:
echo    • Firebase: https://console.firebase.google.com/
echo    • Stripe: https://dashboard.stripe.com/apikeys
echo    • reCAPTCHA: https://www.google.com/recaptcha/admin
echo.

pause

echo.
echo 🚀 Starting development server...
npm run dev

echo.
echo =====================================
echo 🚀 SETUP COMPLETE 