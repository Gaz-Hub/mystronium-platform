import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { BookOpen, Download, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

interface PurchasedBook {
  id: string;
  title: string;
  author: string;
  description: string;
  coverUrl?: string;
  fileUrl?: string;
  purchaseDate: Date;
  rating?: number;
}

const Library = () => {
  const { currentUser } = useAuth();
  const [books, setBooks] = useState<PurchasedBook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadPurchasedBooks();
    }
  }, [currentUser]);

  const loadPurchasedBooks = async () => {
    if (!currentUser) return;

    try {
      const purchasesQuery = query(
        collection(db, 'purchases'),
        where('userId', '==', currentUser.uid)
      );
      const purchasesSnapshot = await getDocs(purchasesQuery);
      const purchasedBooks = purchasesSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        purchaseDate: doc.data().purchaseDate?.toDate() || new Date()
      })) as PurchasedBook[];
      
      setBooks(purchasedBooks);
    } catch (error) {
      console.error('Error loading purchased books:', error);
    }
    setLoading(false);
  };

  const exportBook = (book: PurchasedBook, format: 'pdf' | 'txt') => {
    // In a real app, this would download the actual file
    const content = `${book.title}\nby ${book.author}\n\n${book.description}\n\n[Book content would be here...]`;
    const blob = new Blob([content], { type: format === 'pdf' ? 'application/pdf' : 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${book.title}.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
                <BookOpen className="mr-3 w-10 h-10 text-blue-400" />
                My Library
              </h1>
              <p className="text-gray-400">Your purchased books and digital collection</p>
              <div className="mt-4 text-sm text-gray-400">
                {books.length} book{books.length !== 1 ? 's' : ''} in your library
              </div>
            </div>

            {books.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">📚</div>
                <h3 className="text-xl font-bold text-white mb-2">Your Library is Empty</h3>
                <p className="text-gray-400 mb-6">
                  Purchase books from the Bookstore to start building your collection
                </p>
                <Link
                  to="/bookstore"
                  className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
                >
                  Browse Bookstore
                </Link>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.6 }}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-600 overflow-hidden hover:border-blue-500/50 transition-all"
                  >
                    <div className="relative">
                      {book.coverUrl ? (
                        <img 
                          src={book.coverUrl} 
                          alt={book.title}
                          className="w-full h-48 object-cover"
                        />
                      ) : (
                        <div className="w-full h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                          <BookOpen className="w-12 h-12 text-white" />
                        </div>
                      )}
                      
                      <div className="absolute top-2 right-2 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold">
                        Owned
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">{book.title}</h3>
                      <p className="text-gray-400 text-sm mb-2">by {book.author}</p>
                      
                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">{book.description}</p>
                      
                      {book.rating && (
                        <div className="flex items-center space-x-1 mb-3">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">{book.rating.toFixed(1)}</span>
                        </div>
                      )}

                      <div className="text-gray-400 text-xs mb-4">
                        Purchased: {book.purchaseDate.toLocaleDateString()}
                      </div>

                      <div className="space-y-2">
                        <Link
                          to={`/read/${book.id}`}
                          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Read Book
                        </Link>
                        
                        <div className="flex space-x-2">
                          <button
                            onClick={() => exportBook(book, 'txt')}
                            className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center text-sm"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            TXT
                          </button>
                          <button
                            onClick={() => exportBook(book, 'pdf')}
                            className="flex-1 bg-gray-600 text-white py-2 px-3 rounded-lg font-medium hover:bg-gray-700 transition-colors flex items-center justify-center text-sm"
                          >
                            <Download className="w-3 h-3 mr-1" />
                            PDF
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default Library;