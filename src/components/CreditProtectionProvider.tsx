import { createContext, useContext, ReactNode } from "react";
import { useCreditProtection } from "../hooks/useCreditProtection";

interface CreditProtectionContextProps {
  canUseCredits: (amount?: number) => boolean;
  recordUsage: (cost?: number) => void;
  getRemainingCredits: () => number;
  getUsagePercentage: () => number;
  protectionActive: boolean;
  emergencyMode: boolean;
  resetEmergencyMode: () => void;
  forceDisableHighCostFeatures: () => void;
  usageStats: any;
  config: any;
}

const CreditProtectionContext = createContext<
  CreditProtectionContextProps | undefined
>(undefined);

export const CreditProtectionProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const creditProtection = useCreditProtection();

  return (
    <CreditProtectionContext.Provider value={creditProtection}>
      {children}
    </CreditProtectionContext.Provider>
  );
};

export const useCreditProtectionContext = () => {
  const context = useContext(CreditProtectionContext);
  if (!context) {
    throw new Error(
      "useCreditProtectionContext must be used within a CreditProtectionProvider",
    );
  }
  return context;
};
