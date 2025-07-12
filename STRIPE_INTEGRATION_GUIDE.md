# MYSTRONIUM™ Stripe Integration Guide

## 🔧 **Complete Stripe Setup for MYSTRONIUM™ Creator Platform**

### **Overview**
This guide covers the complete Stripe integration for the MYSTRONIUM™ Creator Platform, including webhook setup, subscription management, and deployment configuration.

---

## 📋 **Prerequisites**

### **1. Stripe Account Setup**
- ✅ Stripe account created
- ✅ Stripe Dashboard access
- ✅ API keys generated
- ✅ Webhook endpoint configured

### **2. Firebase Project**
- ✅ Firebase project in europe-west1
- ✅ Email/Password Authentication enabled
- ✅ Firestore database configured
- ✅ Security rules updated

### **3. Netlify Deployment**
- ✅ Netlify account and project
- ✅ Environment variables configured
- ✅ Functions directory setup

---

## 🚀 **Step 1: Stripe Dashboard Configuration**

### **1.1 Create Subscription Products**

Navigate to **Stripe Dashboard > Products** and create the following products:

#### **Basic Creator Plan**
```
Product Name: Basic Creator
Price: $9.99/month
Billing: Recurring
Currency: USD
```

#### **Premium Creator Plan**
```
Product Name: Premium Creator
Price: $19.99/month
Billing: Recurring
Currency: USD
```

#### **Enterprise Plan**
```
Product Name: Enterprise
Price: $49.99/month
Billing: Recurring
Currency: USD
```

### **1.2 Configure Webhook Endpoint**

1. Go to **Stripe Dashboard > Developers > Webhooks**
2. Click **"Add endpoint"**
3. Configure the webhook:

```
Endpoint URL: https://mystronium.com/.netlify/functions/stripe-webhook
Events to send:
✅ invoice.payment_succeeded
✅ invoice.payment_failed
✅ customer.subscription.created
✅ customer.subscription.updated
✅ customer.subscription.deleted
✅ checkout.session.completed
✅ payment_intent.succeeded
✅ payment_intent.payment_failed
API Version: 2025-05-28.basil
```

4. Copy the **Signing Secret** (starts with `whsec_`)

### **1.3 Get API Keys**

From **Stripe Dashboard > Developers > API keys**:
- Copy **Publishable Key** (starts with `pk_`)
- Copy **Secret Key** (starts with `sk_`)

---

## 🔐 **Step 2: Netlify Environment Variables**

### **2.1 Required Environment Variables**

Add these to your **Netlify Dashboard > Site Settings > Environment Variables**:

#### **Stripe Configuration**
```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_... (or pk_live_...)
VITE_STRIPE_SECRET_KEY=sk_test_... (or sk_live_...)
VITE_STRIPE_WEBHOOK_SECRET=whsec_...
```

#### **Firebase Admin SDK (for serverless functions)**
```
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

#### **Existing Firebase Variables**
```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
VITE_FIREBASE_MEASUREMENT_ID=...
VITE_FIREBASE_DATABASE_URL=...
VITE_RECAPTCHA_SITE_KEY=...
```

### **2.2 Environment Variable Validation**

The platform will automatically validate these variables and provide diagnostic information in the browser console.

---

## 🔧 **Step 3: Firebase Admin SDK Setup**

### **3.1 Generate Service Account Key**

1. Go to **Firebase Console > Project Settings > Service Accounts**
2. Click **"Generate new private key"**
3. Download the JSON file
4. Extract the following values:
   - `client_email`
   - `private_key`
   - `project_id`

### **3.2 Update Environment Variables**

Add the extracted values to Netlify environment variables:
```
FIREBASE_CLIENT_EMAIL=firebase-adminsdk-...@your-project.iam.gserviceaccount.com
FIREBASE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
```

---

## 📝 **Step 4: Update Price IDs**

### **4.1 Get Stripe Price IDs**

From your Stripe Dashboard, copy the price IDs for each plan:
- Basic Creator: `price_...`
- Premium Creator: `price_...`
- Enterprise: `price_...`

### **4.2 Update Frontend Code**

Update the price ID mapping in `src/components/SubscriptionManager.tsx`:

```typescript
const priceIdMap: { [key: string]: string } = {
  basic: 'price_1ABC123...', // Replace with actual Basic plan price ID
  premium: 'price_1DEF456...', // Replace with actual Premium plan price ID
  enterprise: 'price_1GHI789...' // Replace with actual Enterprise plan price ID
};
```

---

## 🚀 **Step 5: Deploy to Netlify**

### **5.1 Build and Deploy**

```bash
# Build the project
npm run build

# Deploy to Netlify (if using CLI)
netlify deploy --prod
```

### **5.2 Verify Deployment**

1. Check that the webhook endpoint is accessible:
   ```
   https://your-site.netlify.app/.netlify/functions/stripe-webhook
   ```

2. Test the webhook endpoint:
   ```bash
   curl -X POST https://your-site.netlify.app/.netlify/functions/stripe-webhook \
     -H "Content-Type: application/json" \
     -d '{"action":"test"}'
   ```

---

## 🧪 **Step 6: Testing the Integration**

### **6.1 Test Webhook Events**

1. Go to **Stripe Dashboard > Webhooks**
2. Select your webhook endpoint
3. Click **"Send test webhook"**
4. Choose event types to test:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `invoice.payment_succeeded`

### **6.2 Test Frontend Integration**

1. Navigate to your live site
2. Log in with `garetharjohns@gmail.com`
3. Go to subscription management page
4. Test subscription flow (use Stripe test cards)

### **6.3 Test Cards for Development**

Use these Stripe test card numbers:
```
Success: 4242 4242 4242 4242
Decline: 4000 0000 0000 0002
Requires Authentication: 4000 0025 0000 3155
```

---

## 🔍 **Step 7: Monitoring and Debugging**

### **7.1 Netlify Function Logs**

Monitor function logs in **Netlify Dashboard > Functions**:
- Check for webhook processing errors
- Monitor subscription updates
- Verify Firebase integration

### **7.2 Browser Console Diagnostics**

The platform includes comprehensive diagnostic logging:
- Stripe initialization status
- Webhook event processing
- User subscription updates
- Error reporting

### **7.3 Firebase Console Monitoring**

Monitor in **Firebase Console > Firestore**:
- User document updates
- Subscription status changes
- Vault credits allocation

---

## 🛡️ **Step 8: Security Considerations**

### **8.1 Webhook Security**

- ✅ Webhook signature verification implemented
- ✅ Environment variable protection
- ✅ CORS configuration
- ✅ Error handling and logging

### **8.2 Firebase Security Rules**

Ensure your Firestore security rules allow:
```javascript
// Allow authenticated users to read/write their own data
match /users/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}

// Allow admin users additional access
match /users/{userId} {
  allow read, write: if request.auth != null && 
    get(/databases/$(database.name)/documents/users/$(request.auth.uid)).data.admin == true;
}
```

### **8.3 App Check Enforcement**

- ✅ reCAPTCHA v3 integration
- ✅ App Check enabled for Firestore
- ✅ App Check enabled for Storage
- ✅ App Check enabled for Cloud Functions

---

## 📊 **Step 9: Production Checklist**

### **9.1 Pre-Launch Verification**

- [ ] Stripe webhook endpoint responding
- [ ] Test subscriptions working
- [ ] User data updating correctly
- [ ] Vault credits allocation working
- [ ] Error handling implemented
- [ ] Logging configured
- [ ] Security rules tested

### **9.2 Go-Live Steps**

1. **Switch to Live Stripe Keys**
   - Update `VITE_STRIPE_PUBLISHABLE_KEY` to live key
   - Update `VITE_STRIPE_SECRET_KEY` to live key
   - Update webhook endpoint to production URL

2. **Update Price IDs**
   - Replace test price IDs with live price IDs
   - Verify subscription plans in Stripe Dashboard

3. **Final Testing**
   - Test with real payment methods
   - Verify webhook processing
   - Check user experience flow

---

## 🆘 **Troubleshooting**

### **Common Issues**

#### **Webhook Not Receiving Events**
- Check webhook endpoint URL
- Verify webhook is active in Stripe Dashboard
- Check Netlify function logs
- Ensure environment variables are set

#### **Subscription Not Updating**
- Check Firebase Admin SDK configuration
- Verify Firestore security rules
- Check user document structure
- Monitor function execution logs

#### **Frontend Errors**
- Check browser console for errors
- Verify Stripe publishable key
- Check network requests to webhook endpoint
- Validate user authentication

### **Debug Commands**

```bash
# Test webhook endpoint
curl -X POST https://your-site.netlify.app/.netlify/functions/stripe-webhook \
  -H "Content-Type: application/json" \
  -d '{"action":"test"}'

# Check environment variables
echo $VITE_STRIPE_PUBLISHABLE_KEY
echo $VITE_STRIPE_SECRET_KEY
echo $VITE_STRIPE_WEBHOOK_SECRET
```

---

## 📞 **Support**

### **For Technical Issues**
- Check Netlify function logs
- Review browser console diagnostics
- Verify Stripe Dashboard webhook events
- Check Firebase Console for data updates

### **For Stripe Issues**
- Contact Stripe Support
- Check Stripe Documentation
- Verify API version compatibility

### **For Firebase Issues**
- Check Firebase Console
- Verify service account permissions
- Review security rules

---

## 🎉 **Success Criteria**

Your Stripe integration is successful when:

1. ✅ Users can subscribe to plans
2. ✅ Webhook events are processed correctly
3. ✅ User subscriptions update in Firestore
4. ✅ Vault credits are allocated properly
5. ✅ Users can manage subscriptions via portal
6. ✅ All security measures are in place
7. ✅ Error handling works correctly
8. ✅ Monitoring and logging are active

---

**Last Updated:** Current Session  
**Platform:** MYSTRONIUM™ Creator Platform  
**Status:** Ready for Production Deployment 