import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";
import toast from "react-hot-toast";

export const useLoginStreak = () => {
  const { currentUser } = useAuth();
  const { userProfile, updateUserProfile } = useUser();
  const [streakChecked, setStreakChecked] = useState(false);

  useEffect(() => {
    if (currentUser && userProfile && !streakChecked) {
      checkAndUpdateStreak();
      setStreakChecked(true);
    }
  }, [currentUser, userProfile, streakChecked]);

  const checkAndUpdateStreak = async () => {
    if (!currentUser || !userProfile) return;

    const now = new Date();
    const lastLogin = userProfile.lastLogin;
    const daysDiff = Math.floor(
      (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60 * 24),
    );

    let newStreak = userProfile.loginStreak;
    let shouldUnlockCrate = false;

    if (daysDiff === 1) {
      // Consecutive day login
      newStreak += 1;
      if (newStreak % 3 === 0) {
        shouldUnlockCrate = true;
      }
    } else if (daysDiff > 1) {
      // Streak broken
      newStreak = 1;
    }
    // If daysDiff === 0, it's the same day, no change needed

    if (newStreak !== userProfile.loginStreak || daysDiff > 0) {
      await updateUserProfile({
        loginStreak: newStreak,
        lastLogin: now,
      });

      if (shouldUnlockCrate) {
        toast.success(
          `🎁 Login streak reward! You've unlocked a Vault Crate! (${newStreak} days)`,
        );
        // In a real app, you'd add the crate to their inventory
      } else if (newStreak > userProfile.loginStreak) {
        toast.success(`🔥 Login streak: ${newStreak} days!`);
      }
    }
  };

  return { streakChecked };
};
