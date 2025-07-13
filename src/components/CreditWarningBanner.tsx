import { motion } from "framer-motion";
import { AlertTriangle, Zap, Crown } from "lucide-react";
import { useCreditProtectionContext } from "./CreditProtectionProvider";
import { useUser } from "../contexts/UserContext";
import { useAdmin } from "../contexts/AdminContext";
import { Link } from "react-router-dom";

const CreditWarningBanner = () => {
  const {
    protectionActive,
    emergencyMode,
    getRemainingCredits,
    getUsagePercentage,
  } = useCreditProtectionContext();
  const { userProfile } = useUser();
  const { godModeEnabled } = useAdmin();

  // Don't show for premium users
  if (userProfile?.subscription !== "free") return null;

  // Don't show if God Mode is enabled
  if (godModeEnabled) return null;

  // Don't show if no protection is active
  if (!protectionActive) return null;

  const remainingCredits = getRemainingCredits();
  const usagePercentage = getUsagePercentage();

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      className={`fixed top-20 left-0 right-0 z-40 mx-4 ${
        emergencyMode
          ? "bg-red-900/90 border-red-500"
          : "bg-yellow-900/90 border-yellow-500"
      } backdrop-blur-sm border rounded-lg p-4`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <AlertTriangle
            className={`w-5 h-5 ${emergencyMode ? "text-red-400" : "text-yellow-400"}`}
          />
          <div>
            <p
              className={`font-medium ${emergencyMode ? "text-red-300" : "text-yellow-300"}`}
            >
              {emergencyMode
                ? "🚨 Daily limit reached! AI tools are temporarily disabled."
                : `⚠️ You've used ${Math.round(usagePercentage)}% of your daily credits.`}
            </p>
            <p
              className={`text-sm ${emergencyMode ? "text-red-200" : "text-yellow-200"}`}
            >
              {emergencyMode
                ? "Upgrade to Premium for unlimited access to all AI tools."
                : `${remainingCredits} credits remaining today.`}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <Link
            to="/credit-shop"
            className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-cyan-700 transition-colors flex items-center"
          >
            <Zap className="w-4 h-4 mr-1" />
            Buy Credits
          </Link>
          <Link
            to="/store"
            className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:from-purple-700 hover:to-pink-700 transition-all flex items-center"
          >
            <Crown className="w-4 h-4 mr-1" />
            Upgrade Now
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default CreditWarningBanner;
