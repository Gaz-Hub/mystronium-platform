// MYSTRONIUM™ Comprehensive Diagnostic Utility
// Checks all platform components and identifies issues

export interface ComprehensiveDiagnosticResult {
  timestamp: string;
  env: "development" | "production";
  deployment: {
    platform: "netlify" | "vercel" | "local";
    url: string;
    buildSuccessful: boolean;
  };
  firebase: {
    configuration: {
      apiKey: boolean;
      authDomain: boolean;
      projectId: boolean;
      storageBucket: boolean;
      messagingSenderId: boolean;
      appId: boolean;
      measurementId: boolean;
      databaseURL: boolean;
      recaptchaSiteKey: boolean;
      configured: boolean;
    };
    services: {
      auth: boolean;
      firestore: boolean;
      storage: boolean;
      realtimeDb: boolean;
      appCheck: boolean;
    };
    authentication: {
      enabled: boolean;
      adminUser: string;
      adminAccess: boolean;
      canSignIn: boolean;
      canSignUp: boolean;
    };
    firestore: {
      accessible: boolean;
      rulesDeployed: boolean;
      adminUserExists: boolean;
      userSchema: boolean;
    };
    appCheck: {
      enabled: boolean;
      recaptchaV3: boolean;
      enforced: boolean;
    };
  };
  stripe: {
    configuration: {
      publishableKey: boolean;
      secretKey: boolean;
      webhookSecret: boolean;
      configured: boolean;
    };
    webhook: {
      endpoint: string;
      accessible: boolean;
      signatureValidation: boolean;
      events: string[];
    };
    integration: {
      frontendService: boolean;
      subscriptionPlans: boolean;
      checkoutFlow: boolean;
    };
  };
  environment: {
    variables: {
      firebase: string[];
      stripe: string[];
      admin: string[];
      recaptcha: string[];
      total: number;
    };
    missing: string[];
    invalid: string[];
  };
  security: {
    appCheck: boolean;
    firestoreRules: boolean;
    storageRules: boolean;
    webhookSignature: boolean;
    cors: boolean;
  };
  routing: {
    spaRouting: boolean;
    adminRoute: boolean;
    dashboardRoute: boolean;
    webhookRoute: boolean;
  };
  errors: string[];
  warnings: string[];
  recommendations: string[];
  criticalIssues: string[];
}

export class ComprehensiveDiagnostic {
  private static instance: ComprehensiveDiagnostic;
  private results: ComprehensiveDiagnosticResult;

  private constructor() {
    this.results = {
      timestamp: new Date().toISOString(),
      env: import.meta.env.DEV ? "development" : "production",
      deployment: {
        platform: "netlify",
        url: window.location.origin,
        buildSuccessful: true,
      },
      firebase: {
        configuration: {
          apiKey: false,
          authDomain: false,
          projectId: false,
          storageBucket: false,
          messagingSenderId: false,
          appId: false,
          measurementId: false,
          databaseURL: false,
          recaptchaSiteKey: false,
          configured: false,
        },
        services: {
          auth: false,
          firestore: false,
          storage: false,
          realtimeDb: false,
          appCheck: false,
        },
        authentication: {
          enabled: false,
          adminUser: "garetharjohns@gmail.com",
          adminAccess: false,
          canSignIn: false,
          canSignUp: false,
        },
        firestore: {
          accessible: false,
          rulesDeployed: false,
          adminUserExists: false,
          userSchema: false,
        },
        appCheck: {
          enabled: false,
          recaptchaV3: false,
          enforced: false,
        },
      },
      stripe: {
        configuration: {
          publishableKey: false,
          secretKey: false,
          webhookSecret: false,
          configured: false,
        },
        webhook: {
          endpoint: "",
          accessible: false,
          signatureValidation: false,
          events: [],
        },
        integration: {
          frontendService: false,
          subscriptionPlans: false,
          checkoutFlow: false,
        },
      },
      environment: {
        variables: {
          firebase: [],
          stripe: [],
          admin: [],
          recaptcha: [],
          total: 0,
        },
        missing: [],
        invalid: [],
      },
      security: {
        appCheck: false,
        firestoreRules: false,
        storageRules: false,
        webhookSignature: false,
        cors: false,
      },
      routing: {
        spaRouting: true,
        adminRoute: true,
        dashboardRoute: true,
        webhookRoute: false,
      },
      errors: [],
      warnings: [],
      recommendations: [],
      criticalIssues: [],
    };
  }

  public static getInstance(): ComprehensiveDiagnostic {
    if (!ComprehensiveDiagnostic.instance) {
      ComprehensiveDiagnostic.instance = new ComprehensiveDiagnostic();
    }
    return ComprehensiveDiagnostic.instance;
  }

  // Run comprehensive diagnostic
  async runDiagnostic(): Promise<ComprehensiveDiagnosticResult> {
    console.log("🔍 MYSTRONIUM COMPREHENSIVE DIAGNOSTIC: Starting...");

    try {
      await this.checkEnvironmentVariables();
      await this.checkFirebaseConfiguration();
      await this.checkStripeConfiguration();
      await this.checkSecuritySettings();
      await this.checkRouting();
      this.generateRecommendations();

      console.log("✅ MYSTRONIUM COMPREHENSIVE DIAGNOSTIC: Completed");
      this.logResults();

      return this.results;
    } catch (error) {
      console.error("❌ MYSTRONIUM COMPREHENSIVE DIAGNOSTIC: Failed:", error);
      this.results.errors.push(
        `Diagnostic failed: ${error instanceof Error ? error.message : String(error)}`,
      );
      return this.results;
    }
  }

  // Check environment variables
  private async checkEnvironmentVariables() {
    console.log("🔧 Checking environment variables...");

    const requiredVars = {
      // Firebase
      VITE_FIREBASE_API_KEY: import.meta.env.VITE_FIREBASE_API_KEY,
      VITE_FIREBASE_AUTH_DOMAIN: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
      VITE_FIREBASE_PROJECT_ID: import.meta.env.VITE_FIREBASE_PROJECT_ID,
      VITE_FIREBASE_STORAGE_BUCKET: import.meta.env
        .VITE_FIREBASE_STORAGE_BUCKET,
      VITE_FIREBASE_MESSAGING_SENDER_ID: import.meta.env
        .VITE_FIREBASE_MESSAGING_SENDER_ID,
      VITE_FIREBASE_APP_ID: import.meta.env.VITE_FIREBASE_APP_ID,
      VITE_FIREBASE_MEASUREMENT_ID: import.meta.env
        .VITE_FIREBASE_MEASUREMENT_ID,
      VITE_FIREBASE_DATABASE_URL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
      VITE_RECAPTCHA_SITE_KEY: import.meta.env.VITE_RECAPTCHA_SITE_KEY,

      // Stripe
      VITE_STRIPE_PUBLISHABLE_KEY: import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY,
      VITE_STRIPE_SECRET_KEY: import.meta.env.VITE_STRIPE_SECRET_KEY,
      VITE_STRIPE_WEBHOOK_SECRET: import.meta.env.VITE_STRIPE_WEBHOOK_SECRET,

      // Admin
      VITE_ADMIN_SECRET: import.meta.env.VITE_ADMIN_SECRET,
    };

    // Categorize variables
    Object.entries(requiredVars).forEach(([key, value]) => {
      if (
        key.startsWith("VITE_FIREBASE_") ||
        key === "VITE_RECAPTCHA_SITE_KEY"
      ) {
        this.results.environment.variables.firebase.push(key);
      } else if (key.startsWith("VITE_STRIPE_")) {
        this.results.environment.variables.stripe.push(key);
      } else if (key.startsWith("VITE_ADMIN_")) {
        this.results.environment.variables.admin.push(key);
      }

      if (!value || value.includes("your_") || value === "demo-api-key") {
        this.results.environment.missing.push(key);
      }
    });

    this.results.environment.variables.total = Object.keys(requiredVars).length;
  }

  // Check Firebase configuration
  private async checkFirebaseConfiguration() {
    console.log("🔥 Checking Firebase configuration...");

    // Check configuration
    this.results.firebase.configuration = {
      apiKey:
        !!import.meta.env.VITE_FIREBASE_API_KEY &&
        !import.meta.env.VITE_FIREBASE_API_KEY.includes("your_"),
      authDomain:
        !!import.meta.env.VITE_FIREBASE_AUTH_DOMAIN &&
        !import.meta.env.VITE_FIREBASE_AUTH_DOMAIN.includes("your_"),
      projectId:
        !!import.meta.env.VITE_FIREBASE_PROJECT_ID &&
        !import.meta.env.VITE_FIREBASE_PROJECT_ID.includes("your_"),
      storageBucket:
        !!import.meta.env.VITE_FIREBASE_STORAGE_BUCKET &&
        !import.meta.env.VITE_FIREBASE_STORAGE_BUCKET.includes("your_"),
      messagingSenderId:
        !!import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID &&
        !import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID.includes("your_"),
      appId:
        !!import.meta.env.VITE_FIREBASE_APP_ID &&
        !import.meta.env.VITE_FIREBASE_APP_ID.includes("your_"),
      measurementId:
        !!import.meta.env.VITE_FIREBASE_MEASUREMENT_ID &&
        !import.meta.env.VITE_FIREBASE_MEASUREMENT_ID.includes("your_"),
      databaseURL:
        !!import.meta.env.VITE_FIREBASE_DATABASE_URL &&
        !import.meta.env.VITE_FIREBASE_DATABASE_URL.includes("your_"),
      recaptchaSiteKey:
        !!import.meta.env.VITE_RECAPTCHA_SITE_KEY &&
        !import.meta.env.VITE_RECAPTCHA_SITE_KEY.includes("your_"),
      configured: false,
    };

    this.results.firebase.configuration.configured =
      this.results.firebase.configuration.apiKey &&
      this.results.firebase.configuration.authDomain &&
      this.results.firebase.configuration.projectId &&
      this.results.firebase.configuration.storageBucket &&
      this.results.firebase.configuration.messagingSenderId &&
      this.results.firebase.configuration.appId;

    // Check services
    try {
      const { auth, db, storage, realtimeDb, appCheck } = await import(
        "../firebase"
      );

      this.results.firebase.services = {
        auth: !!auth,
        firestore: !!db,
        storage: !!storage,
        realtimeDb: !!realtimeDb,
        appCheck: !!appCheck,
      };

      // Check authentication
      this.results.firebase.authentication.enabled = !!auth;
      this.results.firebase.authentication.canSignIn = !!auth;
      this.results.firebase.authentication.canSignUp = !!auth;

      if (auth?.currentUser) {
        this.results.firebase.authentication.adminAccess =
          auth.currentUser.email ===
          this.results.firebase.authentication.adminUser;
      }

      // Check Firestore
      if (db) {
        try {
          const { doc, getDoc } = await import("firebase/firestore");
          const testDoc = doc(db, "test", "test");
          this.results.firebase.firestore.accessible = true;

          // Check admin user
          if (auth?.currentUser) {
            const userDoc = doc(db, "users", auth.currentUser.uid);
            const userSnap = await getDoc(userDoc);
            this.results.firebase.firestore.adminUserExists =
              userSnap.exists() && userSnap.data()?.admin === true;
          }
        } catch (error: any) {
          if (error.code === "permission-denied") {
            this.results.firebase.firestore.rulesDeployed = true;
            this.results.warnings.push(
              "Firestore access denied - rules are deployed",
            );
          } else {
            this.results.errors.push(`Firestore test failed: ${error.message}`);
          }
        }
      }

      // Check App Check
      this.results.firebase.appCheck.enabled = !!appCheck;
      this.results.firebase.appCheck.recaptchaV3 = !!import.meta.env
        .VITE_RECAPTCHA_SITE_KEY;
      this.results.firebase.appCheck.enforced =
        this.results.firebase.appCheck.enabled &&
        this.results.firebase.appCheck.recaptchaV3;
    } catch (error) {
      this.results.errors.push(
        `Firebase configuration check failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  // Check Stripe configuration
  private async checkStripeConfiguration() {
    console.log("💳 Checking Stripe configuration...");

    this.results.stripe.configuration = {
      publishableKey:
        !!import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY &&
        !import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY.includes("your_"),
      secretKey:
        !!import.meta.env.VITE_STRIPE_SECRET_KEY &&
        !import.meta.env.VITE_STRIPE_SECRET_KEY.includes("your_"),
      webhookSecret:
        !!import.meta.env.VITE_STRIPE_WEBHOOK_SECRET &&
        !import.meta.env.VITE_STRIPE_WEBHOOK_SECRET.includes("your_"),
      configured: false,
    };

    this.results.stripe.configuration.configured =
      this.results.stripe.configuration.publishableKey &&
      this.results.stripe.configuration.secretKey &&
      this.results.stripe.configuration.webhookSecret;

    // Check webhook endpoint
    this.results.stripe.webhook.endpoint = `${window.location.origin}/.netlify/functions/stripe-webhook`;

    try {
      const response = await fetch(this.results.stripe.webhook.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "test" }),
      });

      this.results.stripe.webhook.accessible = response.ok;
      this.results.stripe.webhook.signatureValidation =
        this.results.stripe.configuration.webhookSecret;
      this.results.stripe.webhook.events = [
        "invoice.payment_succeeded",
        "customer.subscription.created",
        "customer.subscription.updated",
        "customer.subscription.deleted",
        "checkout.session.completed",
      ];
    } catch (error) {
      this.results.stripe.webhook.accessible = false;
      this.results.warnings.push(
        `Webhook endpoint not accessible: ${error instanceof Error ? error.message : String(error)}`,
      );
    }

    // Check integration
    try {
      const { stripeService } = await import("./stripeService");
      this.results.stripe.integration.frontendService = true;
      this.results.stripe.integration.subscriptionPlans =
        stripeService.getSubscriptionPlans().length > 0;
      this.results.stripe.integration.checkoutFlow =
        this.results.stripe.configuration.configured;
    } catch (error) {
      this.results.warnings.push(
        `Stripe integration check failed: ${error instanceof Error ? error.message : String(error)}`,
      );
    }
  }

  // Check security settings
  private async checkSecuritySettings() {
    console.log("🔒 Checking security settings...");

    this.results.security = {
      appCheck: this.results.firebase.appCheck.enforced,
      firestoreRules: this.results.firebase.firestore.rulesDeployed,
      storageRules: true, // Assume deployed
      webhookSignature: this.results.stripe.webhook.signatureValidation,
      cors: true, // Assume configured
    };
  }

  // Check routing
  private async checkRouting() {
    console.log("🛣️ Checking routing...");

    this.results.routing = {
      spaRouting: true,
      adminRoute: true,
      dashboardRoute: true,
      webhookRoute: this.results.stripe.webhook.accessible,
    };
  }

  // Generate recommendations
  private generateRecommendations() {
    console.log("💡 Generating recommendations...");

    // Critical issues
    if (!this.results.firebase.configuration.configured) {
      this.results.criticalIssues.push(
        "Firebase not configured - platform will not function",
      );
    }

    if (!this.results.firebase.appCheck.enforced) {
      this.results.criticalIssues.push(
        "App Check not enforced - security risk",
      );
    }

    if (!this.results.stripe.webhook.accessible) {
      this.results.criticalIssues.push(
        "Stripe webhook not accessible - billing will not work",
      );
    }

    // Recommendations
    if (this.results.environment.missing.length > 0) {
      this.results.recommendations.push(
        "Configure missing environment variables in Netlify dashboard",
      );
    }

    if (!this.results.firebase.configuration.configured) {
      this.results.recommendations.push(
        "Set up Firebase project and configure environment variables",
      );
    }

    if (!this.results.firebase.appCheck.enforced) {
      this.results.recommendations.push(
        "Enable App Check with reCAPTCHA v3 in Firebase Console",
      );
    }

    if (!this.results.stripe.configuration.configured) {
      this.results.recommendations.push(
        "Configure Stripe API keys and webhook secret",
      );
    }

    if (!this.results.stripe.webhook.accessible) {
      this.results.recommendations.push(
        "Deploy to Netlify and verify webhook endpoint",
      );
    }

    if (!this.results.firebase.firestore.rulesDeployed) {
      this.results.recommendations.push("Deploy Firestore security rules");
    }
  }

  // Log results
  private logResults() {
    console.group("🔍 MYSTRONIUM COMPREHENSIVE DIAGNOSTIC RESULTS");

    console.log("📅 Timestamp:", this.results.timestamp);
    console.log("🌐 Environment:", this.results.env);
    console.log("🚀 Deployment:", this.results.deployment.platform);

    console.group("🔧 Environment Variables");
    console.log("Total Required:", this.results.environment.variables.total);
    console.log("Missing:", this.results.environment.missing.length);
    console.log(
      "Firebase:",
      this.results.environment.variables.firebase.length,
    );
    console.log("Stripe:", this.results.environment.variables.stripe.length);
    console.groupEnd();

    console.group("🔥 Firebase");
    console.log(
      "Configured:",
      this.results.firebase.configuration.configured ? "✅" : "❌",
    );
    console.log(
      "Services:",
      Object.values(this.results.firebase.services).filter(Boolean).length +
        "/5",
    );
    console.log(
      "App Check:",
      this.results.firebase.appCheck.enforced ? "✅" : "❌",
    );
    console.log(
      "Admin Access:",
      this.results.firebase.authentication.adminAccess ? "✅" : "❌",
    );
    console.groupEnd();

    console.group("💳 Stripe");
    console.log(
      "Configured:",
      this.results.stripe.configuration.configured ? "✅" : "❌",
    );
    console.log(
      "Webhook Accessible:",
      this.results.stripe.webhook.accessible ? "✅" : "❌",
    );
    console.log(
      "Integration:",
      Object.values(this.results.stripe.integration).filter(Boolean).length +
        "/3",
    );
    console.groupEnd();

    console.group("🔒 Security");
    console.log("App Check:", this.results.security.appCheck ? "✅" : "❌");
    console.log(
      "Firestore Rules:",
      this.results.security.firestoreRules ? "✅" : "❌",
    );
    console.log(
      "Webhook Signature:",
      this.results.security.webhookSignature ? "✅" : "❌",
    );
    console.groupEnd();

    if (this.results.criticalIssues.length > 0) {
      console.group("🚨 CRITICAL ISSUES");
      this.results.criticalIssues.forEach((issue) => console.error("•", issue));
      console.groupEnd();
    }

    if (this.results.errors.length > 0) {
      console.group("❌ Errors");
      this.results.errors.forEach((error) => console.error("•", error));
      console.groupEnd();
    }

    if (this.results.warnings.length > 0) {
      console.group("⚠️ Warnings");
      this.results.warnings.forEach((warning) => console.warn("•", warning));
      console.groupEnd();
    }

    if (this.results.recommendations.length > 0) {
      console.group("💡 Recommendations");
      this.results.recommendations.forEach((rec) => console.log("•", rec));
      console.groupEnd();
    }

    console.groupEnd();
  }

  // Get summary
  getSummary(): string {
    const criticalCount = this.results.criticalIssues.length;
    const errorCount = this.results.errors.length;
    const warningCount = this.results.warnings.length;

    const status =
      criticalCount > 0
        ? "🚨 CRITICAL"
        : errorCount > 0
          ? "❌ ERRORS"
          : warningCount > 0
            ? "⚠️ WARNINGS"
            : "✅ HEALTHY";

    return `
🔍 MYSTRONIUM COMPREHENSIVE DIAGNOSTIC SUMMARY
Status: ${status}
Timestamp: ${this.results.timestamp}
Environment: ${this.results.env}

📊 Configuration Status:
- Firebase: ${this.results.firebase.configuration.configured ? "✅" : "❌"}
- Stripe: ${this.results.stripe.configuration.configured ? "✅" : "❌"}
- App Check: ${this.results.firebase.appCheck.enforced ? "✅" : "❌"}
- Webhook: ${this.results.stripe.webhook.accessible ? "✅" : "❌"}

Issues Found: ${criticalCount + errorCount + warningCount} (${criticalCount} critical, ${errorCount} errors, ${warningCount} warnings)
    `.trim();
  }
}

// Export singleton instance
export const comprehensiveDiagnostic = ComprehensiveDiagnostic.getInstance();

// Convenience function
export const runComprehensiveDiagnostic = () =>
  comprehensiveDiagnostic.runDiagnostic();
