import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '../firebase';
import { BookOpen, Upload, DollarSign, TrendingUp, Eye, Edit, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ProtectedRoute from '../components/ProtectedRoute';

interface CreatorBook {
  id: string;
  title: string;
  description: string;
  price: number;
  genre: string;
  coverUrl?: string;
  fileUrl?: string;
  preview?: string;
  sales: number;
  revenue: number;
  approved: boolean;
  featured: boolean;
  createdAt: Date;
}

const CreatorBackend = () => {
  const { currentUser } = useAuth();
  const { userProfile } = useUser();
  const [books, setBooks] = useState<CreatorBook[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [totalEarnings, setTotalEarnings] = useState(0);

  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(2.99);
  const [genre, setGenre] = useState('fantasy');
  const [preview, setPreview] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const genres = [
    'fantasy', 'sci-fi', 'romance', 'mystery', 'thriller', 
    'horror', 'adventure', 'drama', 'comedy', 'non-fiction'
  ];

  useEffect(() => {
    if (currentUser) {
      loadCreatorBooks();
    }
  }, [currentUser]);

  const loadCreatorBooks = async () => {
    if (!currentUser) return;

    try {
      const booksQuery = query(
        collection(db, 'books'),
        where('authorId', '==', currentUser.uid)
      );
      const booksSnapshot = await getDocs(booksQuery);
      const booksData = booksSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as CreatorBook[];
      
      setBooks(booksData);
      
      // Calculate total earnings (80% of revenue goes to creator)
      const earnings = booksData.reduce((total, book) => total + (book.revenue * 0.8), 0);
      setTotalEarnings(earnings);
    } catch (error) {
      console.error('Error loading creator books:', error);
      toast.error('Failed to load your books');
    }
    setLoading(false);
  };

  const submitBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !userProfile) return;

    if (!title.trim() || !description.trim() || !preview.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setSubmitting(true);
    try {
      const bookData = {
        title,
        description,
        price,
        genre,
        preview,
        author: userProfile.displayName || currentUser.email?.split('@')[0] || 'Anonymous',
        authorId: currentUser.uid,
        sales: 0,
        revenue: 0,
        rating: 0,
        reviews: [],
        approved: false,
        featured: false,
        createdAt: new Date()
      };

      await addDoc(collection(db, 'books'), bookData);
      
      // Reset form
      setTitle('');
      setDescription('');
      setPrice(2.99);
      setGenre('fantasy');
      setPreview('');
      setShowSubmitForm(false);
      
      toast.success('Book submitted for review!');
      loadCreatorBooks();
    } catch (error) {
      console.error('Error submitting book:', error);
      toast.error('Failed to submit book');
    }
    setSubmitting(false);
  };

  const withdrawEarnings = () => {
    if (totalEarnings < 10) {
      toast.error('Minimum withdrawal amount is £10');
      return;
    }

    // In a real app, this would integrate with Stripe Connect
    toast.success('Withdrawal request submitted! Funds will be transferred within 2-3 business days.');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <BookOpen className="mr-3 w-10 h-10 text-green-400" />
              Creator Backend
            </h1>
            <p className="text-gray-400">Manage your books and track your earnings</p>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <a
                href="/credit-shop"
                className="bg-cyan-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-cyan-700 transition-colors"
              >
                Buy Vault Credits
              </a>
              <a
                href="/store"
                className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition-colors"
              >
                Upgrade Plan
              </a>
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Published Books</span>
              </div>
              <p className="text-2xl font-bold text-blue-400">
                {books.filter(book => book.approved).length}
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">Total Sales</span>
              </div>
              <p className="text-2xl font-bold text-green-400">
                {books.reduce((total, book) => total + book.sales, 0)}
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
              <div className="flex items-center space-x-2 mb-2">
                <DollarSign className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">Total Earnings</span>
              </div>
              <p className="text-2xl font-bold text-yellow-400">
                £{totalEarnings.toFixed(2)}
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium">Pending Review</span>
              </div>
              <p className="text-2xl font-bold text-purple-400">
                {books.filter(book => !book.approved).length}
              </p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Books Management */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white">Your Books</h2>
                  <button
                    onClick={() => setShowSubmitForm(!showSubmitForm)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    Submit New Book
                  </button>
                </div>

                {showSubmitForm && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mb-6 p-4 bg-gray-700/50 rounded-lg border border-gray-600"
                  >
                    <form onSubmit={submitBook} className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-white font-medium mb-2">Title *</label>
                          <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none"
                            placeholder="Enter book title..."
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-white font-medium mb-2">Genre</label>
                          <select
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none"
                          >
                            {genres.map(g => (
                              <option key={g} value={g}>
                                {g.charAt(0).toUpperCase() + g.slice(1)}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Description *</label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="w-full h-24 bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none resize-none"
                          placeholder="Describe your book..."
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Preview (First Chapter) *</label>
                        <textarea
                          value={preview}
                          onChange={(e) => setPreview(e.target.value)}
                          className="w-full h-32 bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none resize-none"
                          placeholder="Enter the first chapter or preview text..."
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">Price (£)</label>
                        <input
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(parseFloat(e.target.value))}
                          min="0.99"
                          max="99.99"
                          step="0.01"
                          className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none"
                        />
                      </div>

                      <div className="flex space-x-2">
                        <button
                          type="submit"
                          disabled={submitting}
                          className="bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
                        >
                          {submitting ? 'Submitting...' : 'Submit for Review'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowSubmitForm(false)}
                          className="bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </motion.div>
                )}

                <div className="space-y-4">
                  {books.length > 0 ? (
                    books.map((book) => (
                      <div key={book.id} className="bg-gray-700/50 p-4 rounded-lg border border-gray-600">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-bold">{book.title}</h3>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              book.approved 
                                ? 'bg-green-600/20 text-green-400' 
                                : 'bg-yellow-600/20 text-yellow-400'
                            }`}>
                              {book.approved ? 'Published' : 'Pending Review'}
                            </span>
                            {book.featured && (
                              <span className="bg-purple-600/20 text-purple-400 px-2 py-1 rounded text-xs font-medium">
                                Featured
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <p className="text-gray-400 text-sm mb-3">{book.description}</p>
                        
                        <div className="grid grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Price:</span>
                            <p className="text-white font-medium">£{book.price.toFixed(2)}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Sales:</span>
                            <p className="text-white font-medium">{book.sales}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Revenue:</span>
                            <p className="text-white font-medium">£{book.revenue.toFixed(2)}</p>
                          </div>
                          <div>
                            <span className="text-gray-400">Your Share:</span>
                            <p className="text-green-400 font-medium">£{(book.revenue * 0.8).toFixed(2)}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-gray-500 italic">No books submitted yet</p>
                      <p className="text-gray-600 text-sm">Click "Submit New Book" to get started</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Earnings & Withdrawal */}
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <DollarSign className="w-5 h-5 mr-2" />
                  Earnings
                </h2>
                
                <div className="space-y-4">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm">Available Balance</p>
                      <p className="text-3xl font-bold text-green-400">£{totalEarnings.toFixed(2)}</p>
                      <p className="text-gray-500 text-xs mt-1">80% of total sales revenue</p>
                    </div>
                  </div>

                  <button
                    onClick={withdrawEarnings}
                    disabled={totalEarnings < 10}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
                  >
                    Withdraw Earnings
                  </button>

                  <div className="text-xs text-gray-400 space-y-1">
                    <p>• Minimum withdrawal: £10</p>
                    <p>• Processing time: 2-3 business days</p>
                    <p>• You earn 80% of each sale</p>
                    <p>• MYSTRONIUM keeps 20% platform fee</p>
                    <p>• Payments via Stripe Connect</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                <h2 className="text-xl font-bold text-white mb-4">Creator Tips</h2>
                
                <div className="space-y-3 text-sm">
                  <div className="bg-blue-600/20 p-3 rounded-lg">
                    <p className="text-blue-400 font-medium">📚 Quality Content</p>
                    <p className="text-gray-300">Well-written books with engaging previews sell better</p>
                  </div>
                  
                  <div className="bg-green-600/20 p-3 rounded-lg">
                    <p className="text-green-400 font-medium">🎨 Eye-catching Covers</p>
                    <p className="text-gray-300">Use Vault Engine to create professional book covers</p>
                  </div>
                  
                  <div className="bg-purple-600/20 p-3 rounded-lg">
                    <p className="text-purple-400 font-medium">💰 Smart Pricing</p>
                    <p className="text-gray-300">£2.99-£9.99 is the sweet spot for most genres</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
};

export default CreatorBackend;