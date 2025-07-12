@echo off
echo 🔄 MYSTRONIUM DEV SERVER RESTART
echo =====================================
echo.

echo 📋 Step 1: Stopping any running dev servers...
taskkill /f /im node.exe 2>nul
echo ✅ Stopped Node.js processes

echo.
echo 📋 Step 2: Waiting 2 seconds...
timeout /t 2 /nobreak >nul

echo.
echo 📋 Step 3: Starting development server...
echo 🚀 Starting: npm run dev
echo.

npm run dev

echo.
echo =====================================
echo �� RESTART COMPLETE 