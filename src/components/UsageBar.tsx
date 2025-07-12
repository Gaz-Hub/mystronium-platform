import React from 'react';
import { useUsageCheck } from '../hooks/useUsage';
import { useAdmin } from '../contexts/AdminContext';
import { AlertTriangle, Zap, Crown, Sparkles } from 'lucide-react';

const UsageBar = () => {
  const { usage, max, locked } = useUsageCheck();
  const { godModeEnabled } = useAdmin();

  // Show God Mode indicator when enabled
  if (godModeEnabled) {
    return (
      <div className="p-2 text-center text-sm bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-purple-500/50 rounded-lg">
        <div className="flex items-center justify-center space-x-2">
          <Crown className="w-4 h-4 text-yellow-400" />
          <Sparkles className="w-4 h-4 text-yellow-400" />
          <span className="text-yellow-400 font-bold">GOD MODE ACTIVE - Unlimited Access</span>
        </div>
      </div>
    );
  }

  if (max === Infinity) {
    return (
      <div className="p-2 text-center text-sm bg-green-900/20 border border-green-500/30 rounded-lg">
        <div className="flex items-center justify-center space-x-2">
          <Zap className="w-4 h-4 text-green-400" />
          <span className="text-green-400 font-medium">Unlimited Usage</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-2 text-center text-sm rounded-lg border ${
      locked 
        ? 'bg-red-900/20 border-red-500/30' 
        : usage <= 2 
        ? 'bg-yellow-900/20 border-yellow-500/30'
        : 'bg-blue-900/20 border-blue-500/30'
    }`}>
      {locked ? (
        <div className="flex items-center justify-center space-x-2">
          <AlertTriangle className="w-4 h-4 text-red-400" />
          <span className="text-red-400 font-bold">Usage limit reached. Upgrade to unlock more.</span>
        </div>
      ) : (
        <span className={`${usage <= 2 ? 'text-yellow-400' : 'text-blue-400'}`}>
          Usage: {usage}/{max} credits remaining
        </span>
      )}
    </div>
  );
};

export default UsageBar;