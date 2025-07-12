import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Scale, AlertTriangle, Crown } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <FileText className="mr-3 w-10 h-10 text-green-400" />
            Terms of Service
          </h1>
          <p className="text-gray-400">Last updated: January 2025</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Scale className="mr-2 w-6 h-6 text-blue-400" />
              Acceptance of Terms
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                By accessing and using MYSTRONIUM™ Platform ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
              <p>
                MYSTRONIUM™ is an AI-powered creative platform that provides tools for book writing (Ghostscribe), image generation (Vault Engine), voice synthesis (Narrata), lore building (Codex Forge), and comic creation.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">User Accounts</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                To access certain features of the Service, you must create an account. You agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide accurate, current, and complete information during registration</li>
                <li>Maintain the security of your password and account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Use the Service only for lawful purposes</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Crown className="mr-2 w-6 h-6 text-yellow-400" />
              Subscription Plans & Billing
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                MYSTRONIUM™ offers multiple subscription tiers:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Free:</strong> Limited access with daily credit limits</li>
                <li><strong>Premium (£9.99/month):</strong> Unlimited access to all AI tools</li>
                <li><strong>Creator Pro (£19.99/month):</strong> Premium features plus commercial usage rights</li>
              </ul>
              <p>
                Billing terms:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Subscriptions are billed monthly or annually in advance</li>
                <li>All payments are processed securely through Stripe</li>
                <li>Refunds are available within 30 days of purchase</li>
                <li>You may cancel your subscription at any time</li>
                <li>Upon cancellation, access continues until the end of the billing period</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Content Ownership & Usage Rights</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                <strong>Your Content:</strong> You retain full ownership of all content you create using MYSTRONIUM tools, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Books and stories written with Ghostscribe</li>
                <li>Images generated with Vault Engine</li>
                <li>Voice recordings from Narrata</li>
                <li>Lore entries and timelines in Codex Forge</li>
                <li>Comics created with Comic Creator</li>
              </ul>
              <p>
                <strong>Commercial Usage:</strong>
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Free users: Personal use only</li>
                <li>Premium users: Limited commercial use</li>
                <li>Creator Pro users: Full commercial usage rights</li>
              </ul>
              <p>
                <strong>Platform License:</strong> By using the Service, you grant MYSTRONIUM™ a limited license to store, display, and distribute your content solely for the purpose of providing the Service.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Bookstore & Creator Marketplace</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                The MYSTRONIUM Bookstore allows creators to sell their books:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Creators retain 80% of sales revenue</li>
                <li>MYSTRONIUM retains 20% as a platform fee</li>
                <li>All books must be approved before publication</li>
                <li>Content must be original and not infringe on others' rights</li>
                <li>Minimum withdrawal amount is £10</li>
                <li>Payments are processed within 2-3 business days</li>
              </ul>
              <p>
                Book submission requirements:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Original content only</li>
                <li>No plagiarism or copyright infringement</li>
                <li>No explicit adult content without proper categorization</li>
                <li>No hate speech or discriminatory content</li>
                <li>Professional quality and formatting</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <AlertTriangle className="mr-2 w-6 h-6 text-red-400" />
              Prohibited Uses
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                You may not use the Service to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Create content that is illegal, harmful, or violates others' rights</li>
                <li>Generate deepfakes or misleading content about real people</li>
                <li>Attempt to reverse engineer or hack the AI models</li>
                <li>Share account credentials or circumvent usage limits</li>
                <li>Create content that promotes violence, hatred, or discrimination</li>
                <li>Infringe on copyrights, trademarks, or other intellectual property</li>
                <li>Spam, harass, or abuse other users</li>
                <li>Use the Service for any automated or bulk operations without permission</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">AI Tool Limitations</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Our AI tools are provided "as is" and have inherent limitations:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Generated content may not always be accurate or appropriate</li>
                <li>AI models may occasionally produce unexpected results</li>
                <li>Service availability may be affected by third-party API limitations</li>
                <li>We do not guarantee the quality or suitability of generated content</li>
                <li>Users are responsible for reviewing and editing AI-generated content</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Privacy & Data Protection</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                Your privacy is important to us. Our data practices are governed by our Privacy Policy, which includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Secure storage of your personal information</li>
                <li>Limited data sharing with trusted third-party services</li>
                <li>Your right to access, modify, or delete your data</li>
                <li>Compliance with GDPR and other privacy regulations</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Limitation of Liability</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                MYSTRONIUM™ shall not be liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Any indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Damages resulting from AI-generated content</li>
                <li>Service interruptions or technical issues</li>
                <li>Third-party actions or content</li>
              </ul>
              <p>
                Our total liability shall not exceed the amount paid by you for the Service in the 12 months preceding the claim.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Termination</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                We may terminate or suspend your account if you:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Violate these Terms of Service</li>
                <li>Engage in prohibited activities</li>
                <li>Fail to pay subscription fees</li>
                <li>Abuse the Service or other users</li>
              </ul>
              <p>
                Upon termination, you will lose access to the Service, but you retain ownership of your created content.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Changes to Terms</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                We reserve the right to modify these terms at any time. We will notify users of material changes through:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Email notifications to registered users</li>
                <li>Prominent notices on the platform</li>
                <li>Updates to this page with revision dates</li>
              </ul>
              <p>
                Continued use of the Service after changes constitutes acceptance of the new terms.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Information</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                For questions about these Terms of Service, please contact us:
              </p>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <p><strong>Email:</strong> <a href="mailto:legal@mystronium.com" className="text-blue-400 hover:underline">legal@mystronium.com</a></p>
                <p><strong>Support:</strong> <a href="mailto:support@mystronium.com" className="text-blue-400 hover:underline">support@mystronium.com</a></p>
                <p><strong>Business:</strong> MYSTRONIUM™ Platform</p>
              </div>
            </div>
          </section>

          <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500/30">
            <p className="text-blue-300 text-sm">
              <strong>Note:</strong> These terms are effective as of January 2025. By using MYSTRONIUM™, you acknowledge that you have read, understood, and agree to be bound by these terms.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TermsOfService;