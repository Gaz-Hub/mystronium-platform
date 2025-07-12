import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAdmin } from '../contexts/AdminContext';
import { useAuth } from '../contexts/AuthContext';
import { Toggle } from '../components/ui/toggle';
import { 
  Shield, 
  ToggleLeft, 
  ToggleRight, 
  TrendingUp, 
  DollarSign, 
  AlertTriangle,
  Users,
  BookOpen,
  Zap,
  Settings,
  CreditCard,
  Ban,
  RefreshCw,
  Crown,
  Sparkles,
  Eye,
  Activity,
  Database,
  Server,
  Lock,
  Unlock,
  BarChart3,
  Globe,
  Cpu,
  HardDrive
} from 'lucide-react';
import toast from 'react-hot-toast';

interface SystemStats {
  dailyUsers: number;
  totalApiCalls: number;
  stripeRevenue: number;
  totalSpend: number;
  mostUsedTool: string;
  activeUsers: number;
  serverLoad: number;
  databaseSize: number;
  uptime: number;
}

interface ModuleStatus {
  ghostscribe: boolean;
  vault: boolean;
  narrata: boolean;
  codex: boolean;
  marketplace: boolean;
  battle: boolean;
  community: boolean;
}

const AdminPanel = () => {
  const { isAdmin, godModeEnabled, toggleGodMode } = useAdmin();
  const { currentUser } = useAuth();
  const [modules, setModules] = useState<ModuleStatus>({
    ghostscribe: true,
    vault: true,
    narrata: true,
    codex: true,
    marketplace: true,
    battle: true,
    community: true
  });
  
  const [stats, setStats] = useState<SystemStats>({
    dailyUsers: 1247,
    totalApiCalls: 15623,
    stripeRevenue: 8945.67,
    totalSpend: 3421.89,
    mostUsedTool: 'Ghostscribe',
    activeUsers: 89,
    serverLoad: 67,
    databaseSize: 2.4,
    uptime: 99.8
  });

  const [creditWarning, setCreditWarning] = useState(false);
  const [selectedUser, setSelectedUser] = useState('');
  const [systemAlerts, setSystemAlerts] = useState<string[]>([]);

  useEffect(() => {
    // Check if spend > income
    if (stats.totalSpend > stats.stripeRevenue * 0.7) {
      setCreditWarning(true);
      setSystemAlerts(prev => [...prev, 'High API spend detected']);
    }
  }, [stats]);

  const toggleModule = (module: keyof ModuleStatus) => {
    if (!isAdmin) return;
    
    setModules(prev => ({
      ...prev,
      [module]: !prev[module]
    }));
    
    toast.success(`${module} ${modules[module] ? 'disabled' : 'enabled'}`, {
      icon: modules[module] ? '🔴' : '🟢',
      style: {
        background: modules[module] ? '#dc2626' : '#059669',
        color: 'white',
      },
    });
  };

  const resetUserStreak = () => {
    if (!selectedUser.trim()) {
      toast.error('Please enter a user email');
      return;
    }
    toast.success(`Reset login streak for ${selectedUser}`);
    setSelectedUser('');
  };

  const suspendUser = () => {
    if (!selectedUser.trim()) {
      toast.error('Please enter a user email');
      return;
    }
    toast.success(`Suspended user: ${selectedUser}`);
    setSelectedUser('');
  };

  const emergencyShutdown = () => {
    if (window.confirm('🚨 EMERGENCY SHUTDOWN: This will disable ALL AI modules and services. Continue?')) {
      setModules({
        ghostscribe: false,
        vault: false,
        narrata: false,
        codex: false,
        marketplace: false,
        battle: false,
        community: false
      });
      toast.error('🚨 EMERGENCY SHUTDOWN ACTIVATED - All systems offline');
      setSystemAlerts(prev => [...prev, 'Emergency shutdown initiated']);
    }
  };

  const handleGodModeToggle = () => {
    toggleGodMode();
    toast.success(`⚡ GOD MODE ${godModeEnabled ? 'DISABLED' : 'ENABLED'}`, {
      icon: godModeEnabled ? '👑' : '⚡',
      style: {
        background: godModeEnabled ? '#dc2626' : '#059669',
        color: 'white',
      },
    });
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-dark flex items-center justify-center">
        <motion.div 
          className="text-center cinematic-card p-8"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <Shield className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Access Denied</h2>
          <p className="text-gray-400">You don't have admin privileges.</p>
          <p className="text-sm text-gray-500 mt-2">Contact garetharjohns@gmail.com for access</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
              <Shield className="mr-3 w-10 h-10 text-red-400" />
              🛡️ MYSTRONIUM™ ADMIN CONTROL PANEL
            </h1>
            <p className="text-gray-400 text-glyph">Platform management and oversight</p>
          </div>

          {/* God Mode Control Panel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-8 cinematic-card p-6 glow-effect"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Crown className={`w-8 h-8 ${godModeEnabled ? 'text-yellow-400' : 'text-gray-400'}`} />
                  <Sparkles className={`w-6 h-6 ${godModeEnabled ? 'text-yellow-400' : 'text-gray-400'}`} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">⚡ GOD MODE</h2>
                  <p className={`text-sm font-medium ${godModeEnabled ? 'text-yellow-400' : 'text-gray-400'}`}>
                    {godModeEnabled ? '⚡ ACTIVE - Unlimited Access' : '💤 INACTIVE - Normal Mode'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Toggle
                  checked={godModeEnabled}
                  onCheckedChange={handleGodModeToggle}
                  className="scale-150"
                />
                <div className="text-right">
                  <div className={`text-sm font-medium ${godModeEnabled ? 'text-yellow-400' : 'text-gray-400'}`}>
                    {godModeEnabled ? 'ENABLED' : 'DISABLED'}
                  </div>
                  <div className="text-xs text-gray-500">
                    {godModeEnabled ? 'Bypass all limits' : 'Normal restrictions'}
                  </div>
                </div>
              </div>
            </div>
            
            {godModeEnabled && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-purple-500/30"
              >
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                  <div className="bg-purple-600/20 p-3 rounded border border-purple-500/30">
                    <div className="text-purple-300 font-medium">✓ Unlimited Credits</div>
                  </div>
                  <div className="bg-blue-600/20 p-3 rounded border border-blue-500/30">
                    <div className="text-blue-300 font-medium">✓ Bypass Rate Limits</div>
                  </div>
                  <div className="bg-green-600/20 p-3 rounded border border-green-500/30">
                    <div className="text-green-300 font-medium">✓ Admin Tools</div>
                  </div>
                  <div className="bg-yellow-600/20 p-3 rounded border border-yellow-500/30">
                    <div className="text-yellow-300 font-medium">✓ Premium Features</div>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* System Alerts */}
          {systemAlerts.length > 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 bg-red-900/20 border border-red-500 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-2 mb-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-red-300 font-bold">🚨 SYSTEM ALERTS</span>
              </div>
              <div className="space-y-1">
                {systemAlerts.map((alert, index) => (
                  <p key={index} className="text-red-200 text-sm">• {alert}</p>
                ))}
              </div>
            </motion.div>
          )}

          {/* Credit Warning */}
          {creditWarning && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-8 bg-red-900/20 border border-red-500 p-4 rounded-lg"
            >
              <div className="flex items-center space-x-2">
                <AlertTriangle className="w-5 h-5 text-red-400" />
                <span className="text-red-300 font-bold">⚠️ CREDIT WARNING</span>
              </div>
              <p className="text-red-200 text-sm mt-2">
                API spend (£{stats.totalSpend}) is approaching revenue threshold. Consider rate limiting.
              </p>
            </motion.div>
          )}

          {/* Enhanced System Stats */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="cinematic-card p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Daily Users</span>
              </div>
              <p className="text-2xl font-bold text-blue-400">{stats.dailyUsers.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">{stats.activeUsers} currently active</p>
            </div>

            <div className="cinematic-card p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Zap className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">API Calls</span>
              </div>
              <p className="text-2xl font-bold text-yellow-400">{stats.totalApiCalls.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">Most used: {stats.mostUsedTool}</p>
            </div>

            <div className="cinematic-card p-6">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">Revenue</span>
              </div>
              <p className="text-2xl font-bold text-green-400">£{stats.stripeRevenue.toLocaleString()}</p>
              <p className="text-gray-400 text-sm">Stripe payments</p>
            </div>

            <div className="cinematic-card p-6">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium">API Spend</span>
              </div>
              <p className="text-2xl font-bold text-purple-400">£{stats.totalSpend.toLocaleString()}</p>
              <p className={`text-sm ${stats.totalSpend > stats.stripeRevenue * 0.7 ? 'text-red-400' : 'text-gray-400'}`}>
                {((stats.totalSpend / stats.stripeRevenue) * 100).toFixed(1)}% of revenue
              </p>
            </div>
          </div>

          {/* Additional System Stats */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="cinematic-card p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <span className="text-white font-medium">Server Load</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="flex-1 bg-gray-700 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${stats.serverLoad}%` }}
                  />
                </div>
                <span className="text-cyan-400 font-medium">{stats.serverLoad}%</span>
              </div>
            </div>

            <div className="cinematic-card p-6">
              <div className="flex items-center space-x-2 mb-2">
                <HardDrive className="w-5 h-5 text-orange-400" />
                <span className="text-white font-medium">Database Size</span>
              </div>
              <p className="text-2xl font-bold text-orange-400">{stats.databaseSize} GB</p>
              <p className="text-gray-400 text-sm">Firestore usage</p>
            </div>

            <div className="cinematic-card p-6">
              <div className="flex items-center space-x-2 mb-2">
                <Activity className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">Uptime</span>
              </div>
              <p className="text-2xl font-bold text-green-400">{stats.uptime}%</p>
              <p className="text-gray-400 text-sm">System availability</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Enhanced Module Controls */}
            <div className="cinematic-card p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Settings className="mr-2 w-5 h-5" />
                AI Module Controls
              </h2>
              
              <div className="space-y-4">
                {Object.entries(modules).map(([module, enabled]) => (
                  <div key={module} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">
                        {module === 'ghostscribe' && '👻'}
                        {module === 'vault' && '🎨'}
                        {module === 'narrata' && '🎙️'}
                        {module === 'codex' && '📜'}
                        {module === 'marketplace' && '🏪'}
                        {module === 'battle' && '⚔️'}
                        {module === 'community' && '👥'}
                      </div>
                      <span className="text-white font-medium capitalize">{module}</span>
                    </div>
                    <button
                      onClick={() => toggleModule(module as keyof ModuleStatus)}
                      className={`flex items-center space-x-2 px-3 py-1 rounded-lg transition-colors ${
                        enabled ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                      }`}
                    >
                      {enabled ? <ToggleRight className="w-4 h-4" /> : <ToggleLeft className="w-4 h-4" />}
                      <span className="text-sm">{enabled ? 'Enabled' : 'Disabled'}</span>
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={emergencyShutdown}
                className="w-full mt-6 bg-red-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
              >
                <Ban className="mr-2 w-4 h-4" />
                🚨 Emergency Shutdown
              </button>
            </div>

            {/* Enhanced User Management */}
            <div className="cinematic-card p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center">
                <Users className="mr-2 w-5 h-5" />
                User Management
              </h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">User Email</label>
                  <input
                    type="email"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                    placeholder="user@example.com"
                    className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={resetUserStreak}
                    className="bg-yellow-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-yellow-700 transition-colors flex items-center justify-center"
                  >
                    <RefreshCw className="mr-2 w-4 h-4" />
                    Reset Streak
                  </button>
                  
                  <button
                    onClick={suspendUser}
                    className="bg-red-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <Ban className="mr-2 w-4 h-4" />
                    Suspend User
                  </button>
                </div>

                <div className="bg-blue-600/20 p-3 rounded-lg border border-blue-500/30">
                  <h3 className="text-blue-300 font-medium mb-2">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <button className="bg-blue-600 text-white py-1 px-3 rounded hover:bg-blue-700">
                      Grant Credits
                    </button>
                    <button className="bg-purple-600 text-white py-1 px-3 rounded hover:bg-purple-700">
                      Unlock Cards
                    </button>
                    <button className="bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700">
                      Upgrade Plan
                    </button>
                    <button className="bg-orange-600 text-white py-1 px-3 rounded hover:bg-orange-700">
                      View Profile
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="mt-8 cinematic-card p-6">
            <h2 className="text-xl font-bold text-white mb-4">Recent System Activity</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <span className="text-white">High API usage detected - Vault Engine</span>
                <span className="text-red-400 text-sm">2 minutes ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <span className="text-white">New premium subscription</span>
                <span className="text-green-400 text-sm">5 minutes ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <span className="text-white">Book published: "Digital Dreams"</span>
                <span className="text-blue-400 text-sm">8 minutes ago</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                <span className="text-white">User reported content issue</span>
                <span className="text-yellow-400 text-sm">12 minutes ago</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminPanel;