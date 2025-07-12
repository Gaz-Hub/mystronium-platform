import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { TrendingUp, DollarSign, Eye, BookOpen, Users, Star } from 'lucide-react';
import ProtectedRoute from '../components/ProtectedRoute';

interface CreatorStats {
  totalBooks: number;
  totalSales: number;
  totalRevenue: number;
  totalViews: number;
  averageRating: number;
  monthlyGrowth: number;
}

const CreatorDashboard = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState<CreatorStats>({
    totalBooks: 0,
    totalSales: 0,
    totalRevenue: 0,
    totalViews: 0,
    averageRating: 0,
    monthlyGrowth: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadCreatorStats();
    }
  }, [currentUser]);

  const loadCreatorStats = async () => {
    if (!currentUser) return;

    try {
      // Load creator's books
      const booksQuery = query(
        collection(db, 'books'),
        where('authorId', '==', currentUser.uid)
      );
      const booksSnapshot = await getDocs(booksQuery);
      const books = booksSnapshot.docs.map(doc => doc.data());

      // Calculate stats
      const totalBooks = books.length;
      const totalSales = books.reduce((sum, book) => sum + (book.sales || 0), 0);
      const totalRevenue = books.reduce((sum, book) => sum + (book.revenue || 0), 0);
      const totalViews = books.reduce((sum, book) => sum + (book.views || 0), 0);
      const averageRating = books.length > 0 
        ? books.reduce((sum, book) => sum + (book.rating || 0), 0) / books.length 
        : 0;

      setStats({
        totalBooks,
        totalSales,
        totalRevenue,
        totalViews,
        averageRating,
        monthlyGrowth: 15.2 // Mock data
      });
    } catch (error) {
      console.error('Error loading creator stats:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
                <TrendingUp className="mr-3 w-10 h-10 text-green-400" />
                Creator Dashboard
              </h1>
              <p className="text-gray-400">Track your performance and grow your audience</p>
            </div>

            {/* Stats Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <span className="text-white font-medium">Published Books</span>
                </div>
                <p className="text-3xl font-bold text-blue-400">{stats.totalBooks}</p>
                <p className="text-gray-400 text-sm">Total published works</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-green-400" />
                  <span className="text-white font-medium">Total Sales</span>
                </div>
                <p className="text-3xl font-bold text-green-400">{stats.totalSales}</p>
                <p className="text-gray-400 text-sm">Books sold</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <DollarSign className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-medium">Revenue</span>
                </div>
                <p className="text-3xl font-bold text-yellow-400">£{stats.totalRevenue.toFixed(2)}</p>
                <p className="text-gray-400 text-sm">Total earnings</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Eye className="w-5 h-5 text-purple-400" />
                  <span className="text-white font-medium">Total Views</span>
                </div>
                <p className="text-3xl font-bold text-purple-400">{stats.totalViews.toLocaleString()}</p>
                <p className="text-gray-400 text-sm">Book page views</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Star className="w-5 h-5 text-orange-400" />
                  <span className="text-white font-medium">Average Rating</span>
                </div>
                <p className="text-3xl font-bold text-orange-400">{stats.averageRating.toFixed(1)}</p>
                <p className="text-gray-400 text-sm">Out of 5 stars</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-cyan-400" />
                  <span className="text-white font-medium">Monthly Growth</span>
                </div>
                <p className="text-3xl font-bold text-cyan-400">+{stats.monthlyGrowth}%</p>
                <p className="text-gray-400 text-sm">Sales growth</p>
              </motion.div>
            </div>

            {/* Charts Placeholder */}
            <div className="grid lg:grid-cols-2 gap-8 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
              >
                <h2 className="text-xl font-bold text-white mb-4">Sales Over Time</h2>
                <div className="h-64 bg-gray-700/50 rounded-lg flex items-center justify-center">
                  <p className="text-gray-400">Chart visualization coming soon</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
              >
                <h2 className="text-xl font-bold text-white mb-4">Top Performing Books</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <span className="text-white">Book Title 1</span>
                    <span className="text-green-400">£45.60</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <span className="text-white">Book Title 2</span>
                    <span className="text-green-400">£32.40</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                    <span className="text-white">Book Title 3</span>
                    <span className="text-green-400">£28.80</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
            >
              <h2 className="text-xl font-bold text-white mb-4">Quick Actions</h2>
              <div className="grid md:grid-cols-4 gap-4">
                <a
                  href="/creator-backend"
                  className="bg-blue-600 text-white p-4 rounded-lg text-center hover:bg-blue-700 transition-colors"
                >
                  <BookOpen className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">Publish New Book</span>
                </a>
                <a
                  href="/my-books"
                  className="bg-purple-600 text-white p-4 rounded-lg text-center hover:bg-purple-700 transition-colors"
                >
                  <Eye className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">Manage Books</span>
                </a>
                <a
                  href="/payouts"
                  className="bg-green-600 text-white p-4 rounded-lg text-center hover:bg-green-700 transition-colors"
                >
                  <DollarSign className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">Withdraw Earnings</span>
                </a>
                <a
                  href="/profile"
                  className="bg-gray-600 text-white p-4 rounded-lg text-center hover:bg-gray-700 transition-colors"
                >
                  <Users className="w-6 h-6 mx-auto mb-2" />
                  <span className="text-sm font-medium">Edit Profile</span>
                </a>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CreatorDashboard;