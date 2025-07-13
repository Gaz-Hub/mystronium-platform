import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight, Crown, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { useUser } from "../contexts/UserContext";
import toast from "react-hot-toast";

const Success = () => {
  const { updateUserProfile } = useUser();

  useEffect(() => {
    // Simulate successful subscription upgrade
    const upgradeSubscription = async () => {
      try {
        // In a real app, this would be handled by Stripe webhooks
        await updateUserProfile({ subscription: "premium" });
        toast.success("Your subscription has been activated!");
      } catch (error) {
        console.error("Error updating subscription:", error);
      }
    };

    upgradeSubscription();
  }, [updateUserProfile]);

  return (
    <div className="min-h-screen bg-dark text-white flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md mx-auto px-6"
      >
        <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-green-500/30">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="mb-6"
          >
            <CheckCircle className="w-16 h-16 text-green-400 mx-auto" />
          </motion.div>

          <h1 className="text-3xl font-bold text-white mb-4">
            Payment Successful!
          </h1>
          <p className="text-gray-300 mb-6">
            Welcome to MYSTRONIUM Premium! You now have access to unlimited AI
            tools and premium features. Start creating amazing content right
            away.
          </p>

          <div className="bg-gradient-to-r from-yellow-600/20 to-orange-600/20 p-4 rounded-lg border border-yellow-500/30 mb-6">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Crown className="w-5 h-5 text-yellow-400" />
              <span className="text-yellow-300 font-medium">
                Premium Features Unlocked
              </span>
            </div>
            <ul className="text-yellow-200 text-sm space-y-1">
              <li>• Unlimited Vault Engine generations</li>
              <li>• GPT-4o access in Ghostscribe</li>
              <li>• Premium voice options in Narrata</li>
              <li>• High-resolution exports</li>
              <li>• Priority support</li>
            </ul>
          </div>

          <div className="space-y-3">
            <Link
              to="/ghostscribe"
              className="block w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
            >
              Start Writing with Ghostscribe
            </Link>

            <Link
              to="/vault"
              className="block w-full bg-gradient-to-r from-cyan-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-cyan-700 hover:to-blue-700 transition-all"
            >
              Generate Art with Vault Engine
            </Link>

            <Link
              to="/dashboard"
              className="flex items-center justify-center text-gray-400 hover:text-white transition-colors mt-4"
            >
              Go to Dashboard
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Success;
