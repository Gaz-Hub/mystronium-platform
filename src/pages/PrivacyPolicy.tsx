import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Eye, Lock, Database } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <Shield className="mr-3 w-10 h-10 text-blue-400" />
            Privacy Policy
          </h1>
          <p className="text-gray-400">Last updated: January 2025</p>
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Eye className="mr-2 w-6 h-6 text-green-400" />
              Information We Collect
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                At MYSTRONIUM™, we collect information to provide you with the best AI-powered creative tools. 
                The information we collect includes:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Account Information:</strong> Email address, display name, and authentication data</li>
                <li><strong>Usage Data:</strong> How you interact with our AI tools (Ghostscribe, Vault Engine, Narrata, Codex Forge)</li>
                <li><strong>Content Data:</strong> Books, artwork, voice recordings, and lore entries you create</li>
                <li><strong>Payment Information:</strong> Billing details processed securely through Stripe</li>
                <li><strong>Technical Data:</strong> IP address, browser type, device information, and usage analytics</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Database className="mr-2 w-6 h-6 text-purple-400" />
              How We Use Your Information
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>We use your information to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide and improve our AI-powered creative tools</li>
                <li>Process payments and manage subscriptions</li>
                <li>Personalize your experience and recommendations</li>
                <li>Communicate with you about updates and features</li>
                <li>Ensure platform security and prevent abuse</li>
                <li>Analyze usage patterns to improve our services</li>
                <li>Facilitate the bookstore and creator marketplace</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
              <Lock className="mr-2 w-6 h-6 text-yellow-400" />
              Data Protection & Security
            </h2>
            <div className="text-gray-300 space-y-4">
              <p>
                We implement industry-standard security measures to protect your data:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>End-to-end encryption for sensitive data</li>
                <li>Secure authentication through Firebase</li>
                <li>Regular security audits and monitoring</li>
                <li>Compliance with GDPR and other privacy regulations</li>
                <li>Limited access to personal data by authorized personnel only</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Third-Party Services</h2>
            <div className="text-gray-300 space-y-4">
              <p>We integrate with trusted third-party services:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>OpenAI:</strong> For GPT-4o text generation in Ghostscribe</li>
                <li><strong>Mistral AI:</strong> For alternative text generation</li>
                <li><strong>Replicate:</strong> For SDXL image generation in Vault Engine</li>
                <li><strong>ElevenLabs:</strong> For voice synthesis in Narrata</li>
                <li><strong>Stripe:</strong> For secure payment processing</li>
                <li><strong>Firebase:</strong> For authentication and data storage</li>
              </ul>
              <p>
                Each service has its own privacy policy, and we ensure they meet our security standards.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Your Rights</h2>
            <div className="text-gray-300 space-y-4">
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Access your personal data</li>
                <li>Correct inaccurate information</li>
                <li>Delete your account and associated data</li>
                <li>Export your created content</li>
                <li>Opt out of marketing communications</li>
                <li>Request data portability</li>
              </ul>
              <p>
                To exercise these rights, contact us at <a href="mailto:privacy@mystronium.com" className="text-blue-400 hover:underline">privacy@mystronium.com</a>
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Content Ownership</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                <strong>You retain full ownership</strong> of all content you create using MYSTRONIUM tools:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Books written with Ghostscribe</li>
                <li>Artwork generated with Vault Engine</li>
                <li>Voice recordings from Narrata</li>
                <li>Lore entries in Codex Forge</li>
                <li>Comics created with Comic Creator</li>
              </ul>
              <p>
                We only store your content to provide the service and never claim ownership or use it for other purposes.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Cookies & Analytics</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                We use cookies and similar technologies to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Remember your preferences and settings</li>
                <li>Analyze site usage and performance</li>
                <li>Provide personalized experiences</li>
                <li>Ensure security and prevent fraud</li>
              </ul>
              <p>
                You can control cookie settings through your browser preferences.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Changes to This Policy</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                We may update this privacy policy from time to time. We will notify you of any material changes by:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Posting the updated policy on this page</li>
                <li>Sending an email notification to registered users</li>
                <li>Displaying a notice on the platform</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Contact Us</h2>
            <div className="text-gray-300 space-y-4">
              <p>
                If you have any questions about this privacy policy or our data practices, please contact us:
              </p>
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <p><strong>Email:</strong> <a href="mailto:privacy@mystronium.com" className="text-blue-400 hover:underline">privacy@mystronium.com</a></p>
                <p><strong>Support:</strong> <a href="mailto:support@mystronium.com" className="text-blue-400 hover:underline">support@mystronium.com</a></p>
                <p><strong>Address:</strong> MYSTRONIUM™ Platform, Digital Creative Services</p>
              </div>
            </div>
          </section>
        </div>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicy;