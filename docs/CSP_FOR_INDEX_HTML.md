# Content Security Policy for index.html

## 🔒 **Simple CSP Meta Tag for MYSTRONIUM™ Platform**

If you prefer to add the CSP directly to your `index.html` file instead of using Netlify `_headers`, use this meta tag:

```html
<meta http-equiv="Content-Security-Policy" 
  content="
    default-src 'self';
    script-src 'self' 'unsafe-eval' 'unsafe-inline' 
      https://www.gstatic.com 
      https://www.googleapis.com 
      https://www.google.com 
      https://www.recaptcha.net 
      https://www.google-analytics.com 
      https://js.stripe.com 
      https://www.googletagmanager.com;
    connect-src 'self' 
      https://firestore.googleapis.com 
      https://firebase.googleapis.com 
      https://www.googleapis.com 
      https://identitytoolkit.googleapis.com 
      https://securetoken.googleapis.com 
      https://www.recaptcha.net 
      https://api.stripe.com 
      https://js.stripe.com 
      https://us-central1-*.cloudfunctions.net 
      https://europe-west1-*.cloudfunctions.net;
    style-src 'self' 'unsafe-inline' fonts.googleapis.com;
    font-src 'self' fonts.gstatic.com;
    frame-src 'self' 
      https://www.google.com 
      https://www.recaptcha.net 
      https://js.stripe.com;
    img-src 'self' data: https://firebasestorage.googleapis.com;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
  ">
```

## 📍 **Where to Add:**

Add this meta tag in the `<head>` section of your `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    
    <!-- Add the CSP meta tag here -->
    <meta http-equiv="Content-Security-Policy" content="...">
    
    <title>MYSTRONIUM™ Creator Platform</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

## ✅ **What This CSP Allows:**

### **Scripts:**
- Your own scripts (`'self'`)
- Firebase SDK (`gstatic.com`, `googleapis.com`)
- reCAPTCHA (`recaptcha.net`)
- Stripe (`js.stripe.com`)
- Analytics (`google-analytics.com`, `googletagmanager.com`)

### **Connections:**
- Firebase services (Auth, Firestore, Storage)
- Stripe API and webhooks
- reCAPTCHA verification
- Google Cloud Functions

### **Styles & Fonts:**
- Google Fonts CSS (`fonts.googleapis.com`)
- Google Fonts files (`fonts.gstatic.com`)

### **Frames:**
- reCAPTCHA iframes
- Stripe payment forms
- Google services

### **Images:**
- Firebase Storage images
- Data URLs for inline images

## ⚠️ **Important Notes:**

1. **Replace `*` with your actual Firebase project ID** in the Cloud Functions URLs
2. **Test thoroughly** after adding the CSP
3. **Monitor browser console** for any CSP violations
4. **Adjust as needed** based on your specific requirements

## 🔧 **Testing:**

After adding the CSP:
1. Open browser developer tools
2. Check the Console tab for CSP violations
3. Test Firebase authentication
4. Test Stripe payments
5. Test reCAPTCHA functionality

## 📞 **If You See CSP Violations:**

Add the violating domains to the appropriate directive in the CSP. Common additions might include:
- Analytics domains
- Additional API endpoints
- Third-party services

---

**Note:** The Netlify `_headers` approach is generally preferred for production as it's more flexible and doesn't require code changes. 