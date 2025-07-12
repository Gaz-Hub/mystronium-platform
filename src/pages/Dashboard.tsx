import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { useAdmin } from '../contexts/AdminContext';
import { 
  BookOpen, 
  Palette, 
  Mic, 
  FileText, 
  TrendingUp, 
  Zap, 
  Crown, 
  Star,
  Calendar,
  Target,
  Award,
  Gift,
  Users,
  Activity,
  BarChart3,
  Globe,
  Sparkles,
  Shield,
  Sword,
  Gem
} from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface UserStats {
  booksCreated: number;
  cardsGenerated: number;
  narrationsCreated: number;
  codexEntries: number;
  loginStreak: number;
  totalCredits: number;
  usedCredits: number;
  achievements: string[];
}

const Dashboard = () => {
  const { currentUser } = useAuth();
  const { userProfile } = useUser();
  const { godModeEnabled } = useAdmin();
  const [stats, setStats] = useState<UserStats>({
    booksCreated: 3,
    cardsGenerated: 12,
    narrationsCreated: 5,
    codexEntries: 8,
    loginStreak: 7,
    totalCredits: godModeEnabled ? Infinity : (userProfile?.vaultCredits || 0),
    usedCredits: 15,
    achievements: ['First Book', 'Card Collector', 'Voice Master']
  });

  const [recentActivity, setRecentActivity] = useState([
    { type: 'book', title: 'Digital Dreams', time: '2 hours ago', icon: '📚' },
    { type: 'card', title: 'Mythic Dragon', time: '4 hours ago', icon: '🎨' },
    { type: 'narration', title: 'Chapter 1 Audio', time: '6 hours ago', icon: '🎙️' },
    { type: 'codex', title: 'Anunnaki Lore', time: '1 day ago', icon: '📜' }
  ]);

  const [vaultCards, setVaultCards] = useState([
    { id: 1, name: 'Mythic Dragon', rarity: 'mythic', power: 12, image: '🐉' },
    { id: 2, name: 'Anunnaki Temple', rarity: 'ultra', power: 10, image: '🏛️' },
    { id: 3, name: 'Digital Forest', rarity: 'rare', power: 8, image: '🌲' },
    { id: 4, name: 'Conspiracy Symbol', rarity: 'common', power: 5, image: '🔮' }
  ]);

  useEffect(() => {
    if (godModeEnabled) {
      setStats(prev => ({ ...prev, totalCredits: Infinity }));
    }
  }, [godModeEnabled]);

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'mythic': return 'text-yellow-400';
      case 'ultra': return 'text-purple-400';
      case 'rare': return 'text-blue-400';
      case 'common': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getRarityBg = (rarity: string) => {
    switch (rarity) {
      case 'mythic': return 'bg-yellow-600/20 border-yellow-500/30';
      case 'ultra': return 'bg-purple-600/20 border-purple-500/30';
      case 'rare': return 'bg-blue-600/20 border-blue-500/30';
      case 'common': return 'bg-gray-600/20 border-gray-500/30';
      default: return 'bg-gray-600/20 border-gray-500/30';
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Welcome Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <Sparkles className="mr-3 w-10 h-10 text-yellow-400" />
            Welcome to MYSTRONIUM™
          </h1>
          <p className="text-gray-400 text-glyph mb-2">
            Nothing → Book → Cartoon → Script
          </p>
          <p className="text-blue-400">
            {currentUser?.displayName || currentUser?.email?.split('@')[0] || 'Creator'}
          </p>
        </motion.div>

        {/* God Mode Indicator */}
        {godModeEnabled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 cinematic-card p-4 glow-effect"
          >
            <div className="flex items-center justify-center space-x-2">
              <Crown className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-bold text-lg">⚡ GOD MODE ACTIVE</span>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-center text-yellow-300 text-sm mt-1">
              Unlimited access to all features
            </p>
          </motion.div>
        )}

        {/* Quick Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="cinematic-card p-6"
          >
            <div className="flex items-center space-x-3 mb-3">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-gray-400 text-sm">Books Created</p>
                <p className="text-2xl font-bold text-blue-400">{stats.booksCreated}</p>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-blue-400 h-2 rounded-full" style={{ width: `${(stats.booksCreated / 10) * 100}%` }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="cinematic-card p-6"
          >
            <div className="flex items-center space-x-3 mb-3">
              <Palette className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-gray-400 text-sm">Cards Generated</p>
                <p className="text-2xl font-bold text-purple-400">{stats.cardsGenerated}</p>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-purple-400 h-2 rounded-full" style={{ width: `${(stats.cardsGenerated / 20) * 100}%` }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="cinematic-card p-6"
          >
            <div className="flex items-center space-x-3 mb-3">
              <Mic className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Narrations</p>
                <p className="text-2xl font-bold text-green-400">{stats.narrationsCreated}</p>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-green-400 h-2 rounded-full" style={{ width: `${(stats.narrationsCreated / 15) * 100}%` }} />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="cinematic-card p-6"
          >
            <div className="flex items-center space-x-3 mb-3">
              <FileText className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-gray-400 text-sm">Codex Entries</p>
                <p className="text-2xl font-bold text-yellow-400">{stats.codexEntries}</p>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${(stats.codexEntries / 25) * 100}%` }} />
            </div>
          </motion.div>
        </div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="cinematic-card p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Activity className="mr-2 w-5 h-5" />
              Recent Activity
            </h2>
            <div className="space-y-3">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-700/50 rounded-lg">
                  <span className="text-2xl">{activity.icon}</span>
                  <div className="flex-1">
                    <p className="text-white font-medium">{activity.title}</p>
                    <p className="text-gray-400 text-sm">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vault Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="cinematic-card p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Gem className="mr-2 w-5 h-5" />
              Vault Collection
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {vaultCards.map((card) => (
                <div
                  key={card.id}
                  className={`p-3 rounded-lg border ${getRarityBg(card.rarity)} cursor-pointer transition-transform hover:scale-105`}
                >
                  <div className="text-center">
                    <div className="text-3xl mb-2">{card.image}</div>
                    <p className={`text-sm font-medium ${getRarityColor(card.rarity)}`}>
                      {card.name}
                    </p>
                    <p className="text-xs text-gray-400">Power: {card.power}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link
              to="/vault"
              className="w-full mt-4 btn-cinematic flex items-center justify-center"
            >
              <Palette className="mr-2 w-4 h-4" />
              Generate More Cards
            </Link>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="cinematic-card p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Zap className="mr-2 w-5 h-5" />
              Quick Actions
            </h2>
            <div className="space-y-3">
              <Link
                to="/ghostscribe"
                className="flex items-center space-x-3 p-3 bg-blue-600/20 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 transition-colors"
              >
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span className="text-white">Start Writing</span>
              </Link>
              
              <Link
                to="/vault"
                className="flex items-center space-x-3 p-3 bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors"
              >
                <Palette className="w-5 h-5 text-purple-400" />
                <span className="text-white">Generate Art</span>
              </Link>
              
              <Link
                to="/narrata"
                className="flex items-center space-x-3 p-3 bg-green-600/20 border border-green-500/30 rounded-lg hover:bg-green-600/30 transition-colors"
              >
                <Mic className="w-5 h-5 text-green-400" />
                <span className="text-white">Create Narration</span>
              </Link>
              
              <Link
                to="/codex"
                className="flex items-center space-x-3 p-3 bg-yellow-600/20 border border-yellow-500/30 rounded-lg hover:bg-yellow-600/30 transition-colors"
              >
                <FileText className="w-5 h-5 text-yellow-400" />
                <span className="text-white">Build Codex</span>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Bottom Stats */}
        <div className="grid md:grid-cols-2 gap-8 mt-8">
          {/* Login Streak & Credits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="cinematic-card p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Target className="mr-2 w-5 h-5" />
              Progress & Rewards
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span className="text-white">Login Streak</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">🔥</span>
                  <span className="text-yellow-400 font-bold">{stats.loginStreak} days</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-white">Vault Credits</span>
                </div>
                <span className="text-yellow-400 font-bold">
                  {godModeEnabled ? '∞' : stats.totalCredits}
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Award className="w-5 h-5 text-purple-400" />
                  <span className="text-white">Achievements</span>
                </div>
                <span className="text-purple-400 font-bold">{stats.achievements.length}</span>
              </div>
            </div>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="cinematic-card p-6"
          >
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Award className="mr-2 w-5 h-5" />
              Recent Achievements
            </h2>
            <div className="space-y-3">
              {stats.achievements.map((achievement, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 bg-yellow-600/10 border border-yellow-500/20 rounded">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className="text-yellow-300 text-sm">{achievement}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;