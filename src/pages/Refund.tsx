import React from "react";
import { motion } from "framer-motion";
import { CreditCard, AlertCircle, CheckCircle } from "lucide-react";

const Refund = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <CreditCard className="mr-3 w-10 h-10 text-green-400" />
              Refund Policy
            </h1>
            <p className="text-gray-400">Last updated: January 2025</p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600 space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <AlertCircle className="mr-2 w-6 h-6 text-yellow-400" />
                General Policy
              </h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  All MYSTRONIUM™ AI plans and digital products are generally
                  non-refundable unless legally required or in specific
                  circumstances outlined below.
                </p>
                <div className="bg-yellow-900/20 border border-yellow-500/50 p-4 rounded-lg">
                  <p className="text-yellow-300">
                    <strong>Important:</strong> Due to the nature of
                    AI-generated content and digital products, most sales are
                    final upon delivery.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Subscription Cancellations
              </h2>
              <div className="text-gray-300 space-y-4">
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    Users can cancel subscriptions at any time before the next
                    billing cycle
                  </li>
                  <li>
                    Cancellation takes effect at the end of the current billing
                    period
                  </li>
                  <li>
                    No partial refunds for unused time within a billing period
                  </li>
                  <li>
                    Access to premium features continues until subscription
                    expires
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center">
                <CheckCircle className="mr-2 w-6 h-6 text-green-400" />
                Eligible Refund Scenarios
              </h2>
              <div className="text-gray-300 space-y-4">
                <p>Refunds may be processed in the following cases:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Proven billing errors or duplicate charges</li>
                  <li>
                    Technical issues preventing access to paid features for more
                    than 48 hours
                  </li>
                  <li>Unauthorized charges (subject to investigation)</li>
                  <li>Service unavailability for extended periods</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Marketplace Purchases
              </h2>
              <div className="text-gray-300 space-y-4">
                <p>
                  For books and digital content purchased through our
                  marketplace:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>
                    All sales are final once the digital product is delivered
                  </li>
                  <li>Refunds only for technical delivery failures</li>
                  <li>Content disputes should be reported within 24 hours</li>
                  <li>
                    Creators set their own refund policies for their content
                  </li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                How to Request a Refund
              </h2>
              <div className="text-gray-300 space-y-4">
                <p>If you believe you qualify for a refund:</p>
                <ol className="list-decimal list-inside space-y-2 ml-4">
                  <li>Contact our support team within 7 days of the charge</li>
                  <li>Provide your account email and transaction details</li>
                  <li>Explain the reason for your refund request</li>
                  <li>Allow 3-5 business days for review and processing</li>
                </ol>

                <div className="bg-gray-700/50 p-4 rounded-lg mt-6">
                  <p>
                    <strong>Contact Support:</strong>
                  </p>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:billing@mystronium.com"
                      className="text-blue-400 hover:underline"
                    >
                      billing@mystronium.com
                    </a>
                  </p>
                  <p>Subject: "Refund Request - [Your Account Email]"</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-white mb-4">
                Processing Time
              </h2>
              <div className="text-gray-300 space-y-4">
                <p>Approved refunds will be processed as follows:</p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>Credit card refunds: 3-5 business days</li>
                  <li>PayPal refunds: 1-2 business days</li>
                  <li>Bank transfers: 5-7 business days</li>
                </ul>
                <p className="text-sm text-gray-400 mt-4">
                  Refund processing times may vary depending on your financial
                  institution.
                </p>
              </div>
            </section>

            <div className="bg-blue-600/20 p-4 rounded-lg border border-blue-500/30">
              <p className="text-blue-300 text-sm">
                <strong>Questions?</strong> Our support team is here to help
                with any billing or refund questions. We aim to resolve all
                issues fairly and promptly.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Refund;
