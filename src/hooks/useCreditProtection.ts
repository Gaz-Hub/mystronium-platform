import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { useAdmin } from "../contexts/AdminContext";
import toast from "react-hot-toast";

interface CreditProtectionConfig {
  dailyFreeLimit: number;
  warningThreshold: number;
  emergencyThreshold: number;
  adminAlertThreshold: number;
}

interface UsageStats {
  dailyApiCalls: number;
  totalSpend: number;
  revenue: number;
  lastReset: Date;
}

export const useCreditProtection = () => {
  const { currentUser } = useAuth();
  const { userProfile } = useUser();
  const { godModeEnabled } = useAdmin();
  const [config] = useState<CreditProtectionConfig>({
    dailyFreeLimit: 10, // Free users get 10 API calls per day
    warningThreshold: 0.8, // Warn when 80% of daily limit reached
    emergencyThreshold: 0.9, // Emergency mode at 90%
    adminAlertThreshold: 1000, // Alert admin if daily spend > £1000
  });

  const [usageStats, setUsageStats] = useState<UsageStats>({
    dailyApiCalls: 0,
    totalSpend: 0,
    revenue: 0,
    lastReset: new Date(),
  });

  const [protectionActive, setProtectionActive] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);

  useEffect(() => {
    // Reset daily counters at midnight
    const now = new Date();
    const lastReset = usageStats.lastReset;

    if (now.getDate() !== lastReset.getDate()) {
      setUsageStats((prev) => ({
        ...prev,
        dailyApiCalls: 0,
        lastReset: now,
      }));
    }
  }, [usageStats.lastReset]);

  useEffect(() => {
    // God Mode bypasses all protection
    if (godModeEnabled) {
      setEmergencyMode(false);
      setProtectionActive(false);
      return;
    }

    // Check if we need to activate protection
    if (userProfile?.subscription === "free") {
      const usageRatio = usageStats.dailyApiCalls / config.dailyFreeLimit;

      if (usageRatio >= config.emergencyThreshold) {
        setEmergencyMode(true);
        setProtectionActive(true);
        toast.error(
          "🚨 Daily limit reached! Upgrade to continue using AI tools.",
        );
      } else if (usageRatio >= config.warningThreshold) {
        setProtectionActive(true);
        toast(
          `⚠️ You've used ${Math.round(usageRatio * 100)}% of your daily limit.`,
          {
            icon: "⚠️",
            style: {
              background: "#f59e0b",
              color: "white",
            },
          },
        );
      }
    }

    // Admin alerts for high spend
    if (usageStats.totalSpend > config.adminAlertThreshold) {
      console.warn("🚨 ADMIN ALERT: Daily spend threshold exceeded");
      // In a real app, this would send an alert to admins
    }
  }, [usageStats, userProfile, config, godModeEnabled]);

  const canUseCredits = (amount: number = 1): boolean => {
    if (!currentUser) return false;

    // God Mode bypasses all restrictions
    if (godModeEnabled) return true;

    // Premium/Pro users have unlimited access
    if (userProfile?.subscription !== "free") return true;

    // Check if emergency mode is active
    if (emergencyMode) return false;

    // Check daily limits for free users
    if (usageStats.dailyApiCalls + amount > config.dailyFreeLimit) {
      toast.error(
        "Daily limit reached! Upgrade to Premium for unlimited access.",
      );
      return false;
    }

    return true;
  };

  const recordUsage = (cost: number = 0.1) => {
    // Don't record usage in God Mode
    if (godModeEnabled) return;

    setUsageStats((prev) => ({
      ...prev,
      dailyApiCalls: prev.dailyApiCalls + 1,
      totalSpend: prev.totalSpend + cost,
    }));
  };

  const getRemainingCredits = (): number => {
    // God Mode has infinite credits
    if (godModeEnabled) return Infinity;

    if (userProfile?.subscription !== "free") return Infinity;
    return Math.max(0, config.dailyFreeLimit - usageStats.dailyApiCalls);
  };

  const getUsagePercentage = (): number => {
    // God Mode has 0% usage
    if (godModeEnabled) return 0;

    if (userProfile?.subscription !== "free") return 0;
    return Math.min(
      100,
      (usageStats.dailyApiCalls / config.dailyFreeLimit) * 100,
    );
  };

  const resetEmergencyMode = () => {
    setEmergencyMode(false);
    setProtectionActive(false);
  };

  const forceDisableHighCostFeatures = () => {
    // God Mode bypasses this restriction
    if (godModeEnabled) return;

    // This would disable expensive features like high-res image generation
    setEmergencyMode(true);
    toast.error(
      "🚨 High-cost features temporarily disabled due to usage limits.",
    );
  };

  return {
    canUseCredits,
    recordUsage,
    getRemainingCredits,
    getUsagePercentage,
    protectionActive,
    emergencyMode,
    resetEmergencyMode,
    forceDisableHighCostFeatures,
    usageStats,
    config,
  };
};
