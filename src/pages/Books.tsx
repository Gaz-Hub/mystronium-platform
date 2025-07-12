import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { BookOpen, Star, Eye, Download, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

interface UserBook {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl?: string;
  chapters: number;
  totalWords: number;
  status: 'draft' | 'published' | 'in-review';
  createdAt: Date;
  rating?: number;
  views?: number;
}

const Books = () => {
  const { currentUser } = useAuth();
  const [books, setBooks] = useState<UserBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadUserBooks();
    }
  }, [currentUser]);

  const loadUserBooks = async () => {
    if (!currentUser) return;

    try {
      // Load user's created books
      const booksQuery = query(
        collection(db, 'books'),
        where('authorId', '==', currentUser.uid)
      );
      const booksSnapshot = await getDocs(booksQuery);
      const userBooks = booksSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate() || new Date()
      })) as UserBook[];
      
      setBooks(userBooks);
    } catch (error) {
      console.error('Error loading user books:', error);
    }
    setLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const styles = {
      draft: 'bg-gray-600/20 text-gray-400',
      published: 'bg-green-600/20 text-green-400',
      'in-review': 'bg-yellow-600/20 text-yellow-400'
    };

    return (
      <span className={`px-2 py-1 rounded text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                <BookOpen className="mr-3 w-10 h-10 text-gold" />
                Your Literary Vault
              </h1>
              <p className="text-gray-400">Manage your created books and literary works</p>
            </div>
            
            <Link
              to="/book-builder"
              className="bg-gradient-to-r from-gold to-lumen-blue text-black px-6 py-3 rounded-lg font-medium hover:from-yellow-400 hover:to-cyan-300 transition-all flex items-center"
            >
              <Plus className="mr-2 w-4 h-4" />
              Create New Book
            </Link>
          </div>

          {books.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-8xl mb-6">📚</div>
              <h3 className="text-2xl font-bold text-white mb-4">Your Vault Awaits</h3>
              <p className="text-gray-400 mb-8 max-w-md mx-auto">
                Begin your journey as a digital scribe. Use Ghostscribe™ to forge your first literary creation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/ghostscribe"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Start Writing
                </Link>
                <Link
                  to="/book-builder"
                  className="bg-gradient-to-r from-gold to-lumen-blue text-black px-8 py-3 rounded-lg font-medium hover:from-yellow-400 hover:to-cyan-300 transition-all"
                >
                  Build a Book
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {books.map((book, index) => (
                <motion.div
                  key={book.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700 hover:border-gold/50 transition-all overflow-hidden"
                >
                  <div className="relative">
                    {book.coverUrl ? (
                      <img 
                        src={book.coverUrl} 
                        alt={book.title}
                        className="w-full h-48 object-cover"
                      />
                    ) : (
                      <div className="w-full h-48 bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                        <BookOpen className="w-16 h-16 text-white" />
                      </div>
                    )}
                    
                    <div className="absolute top-2 right-2">
                      {getStatusBadge(book.status)}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-white font-bold text-lg mb-2 line-clamp-2">{book.title}</h3>
                    <p className="text-gray-400 text-sm mb-3">by {book.author}</p>
                    
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">{book.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-xs text-gray-400 mb-4">
                      <div>
                        <span className="block">Chapters:</span>
                        <span className="text-white font-medium">{book.chapters}</span>
                      </div>
                      <div>
                        <span className="block">Words:</span>
                        <span className="text-white font-medium">{book.totalWords.toLocaleString()}</span>
                      </div>
                      {book.rating && (
                        <div>
                          <span className="block">Rating:</span>
                          <div className="flex items-center">
                            <Star className="w-3 h-3 text-yellow-400 fill-current mr-1" />
                            <span className="text-white font-medium">{book.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      )}
                      {book.views && (
                        <div>
                          <span className="block">Views:</span>
                          <span className="text-white font-medium">{book.views}</span>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <Link
                        to={`/book-builder?edit=${book.id}`}
                        className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors text-center text-sm"
                      >
                        Edit
                      </Link>
                      {book.status === 'published' && (
                        <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors">
                          <Download className="w-4 h-4" />
                        </button>
                      )}
                      <button className="bg-gray-600 text-white p-2 rounded-lg hover:bg-gray-700 transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Books;