import { useUser } from "../contexts/UserContext";
import { useAdmin } from "../contexts/AdminContext";

export function useUsageCheck() {
  const { userProfile, updateUserProfile } = useUser();
  const { godModeEnabled } = useAdmin();

  const max = userProfile?.subscription === "free" ? 5 : Infinity;
  const usage = userProfile?.vaultCredits || 0;
  const locked = userProfile?.subscription === "free" && usage <= 0;

  const incrementUsage = async () => {
    // Don't increment usage in God Mode
    if (godModeEnabled) return;

    if (
      userProfile &&
      userProfile.subscription === "free" &&
      userProfile.vaultCredits > 0
    ) {
      await updateUserProfile({
        vaultCredits: userProfile.vaultCredits - 1,
      });
    }
  };

  return {
    locked: godModeEnabled ? false : locked,
    incrementUsage,
    usage: godModeEnabled
      ? Infinity
      : userProfile?.subscription === "free"
        ? userProfile.vaultCredits
        : Infinity,
    max: godModeEnabled ? Infinity : max,
  };
}
