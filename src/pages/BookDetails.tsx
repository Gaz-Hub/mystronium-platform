import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { doc, getDoc, updateDoc, increment } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Star, ShoppingCart, Download, User, Calendar } from 'lucide-react';
import { loadStripe } from '@stripe/stripe-js';
import toast from 'react-hot-toast';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

interface Book {
  id: string;
  title: string;
  author: string;
  authorId: string;
  description: string;
  price: number;
  coverUrl?: string;
  fileUrl?: string;
  genre: string;
  featured: boolean;
  sales: number;
  rating: number;
  reviews: Review[];
  createdAt: Date;
  preview?: string;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: Date;
}

const BookDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    if (id) {
      loadBook(id);
    }
  }, [id]);

  const loadBook = async (bookId: string) => {
    try {
      const bookDoc = await getDoc(doc(db, 'books', bookId));
      if (bookDoc.exists()) {
        const bookData = {
          ...bookDoc.data(),
          id: bookDoc.id,
          createdAt: bookDoc.data().createdAt?.toDate() || new Date()
        } as Book;
        setBook(bookData);
      } else {
        toast.error('Book not found');
        navigate('/bookstore');
      }
    } catch (error) {
      console.error('Error loading book:', error);
      toast.error('Failed to load book');
    }
    setLoading(false);
  };

  const handlePurchase = async () => {
    if (!currentUser) {
      toast.error('Please log in to purchase');
      navigate('/login');
      return;
    }

    if (!book) return;

    setPurchasing(true);
    try {
      // In a real app, you'd call your backend to create a Stripe checkout session
      // For demo purposes, we'll simulate the purchase
      toast.success('Redirecting to checkout...');
      
      // Simulate Stripe checkout
      setTimeout(async () => {
        try {
          // Update book sales
          await updateDoc(doc(db, 'books', book.id), {
            sales: increment(1)
          });

          // In a real app, you'd also:
          // 1. Create a purchase record
          // 2. Give user access to the book
          // 3. Update creator earnings
          
          toast.success('Purchase successful! Book added to your library.');
          setBook({ ...book, sales: book.sales + 1 });
        } catch (error) {
          console.error('Error completing purchase:', error);
          toast.error('Purchase failed. Please try again.');
        }
        setPurchasing(false);
      }, 2000);
      
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error('Purchase failed. Please try again.');
      setPurchasing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Book Not Found</h2>
          <p className="text-gray-400">The book you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Book Cover and Purchase */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600 sticky top-24">
              <div className="mb-6">
                {book.coverUrl ? (
                  <img 
                    src={book.coverUrl} 
                    alt={book.title}
                    className="w-full rounded-lg shadow-lg"
                  />
                ) : (
                  <div className="w-full aspect-[3/4] bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                    <BookOpen className="w-16 h-16 text-white" />
                  </div>
                )}
              </div>

              <div className="text-center mb-6">
                <div className="text-3xl font-bold text-white mb-2">£{book.price.toFixed(2)}</div>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                    {book.rating.toFixed(1)}
                  </div>
                  <div>{book.sales} sales</div>
                </div>
              </div>

              <button
                onClick={handlePurchase}
                disabled={purchasing}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all flex items-center justify-center mb-4"
              >
                {purchasing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <ShoppingCart className="mr-2 w-4 h-4" />
                    Buy Now
                  </>
                )}
              </button>

              <div className="text-center text-gray-400 text-sm">
                <p>Instant download after purchase</p>
                <p>30-day money-back guarantee</p>
              </div>
            </div>
          </div>

          {/* Book Details */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
              <div className="mb-4">
                <h1 className="text-3xl font-bold text-white mb-2">{book.title}</h1>
                <div className="flex items-center space-x-4 text-gray-400">
                  <div className="flex items-center">
                    <User className="w-4 h-4 mr-1" />
                    by {book.author}
                  </div>
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    {book.createdAt.toLocaleDateString()}
                  </div>
                  <span className="bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-sm">
                    {book.genre}
                  </span>
                </div>
              </div>

              <div className="prose prose-invert max-w-none">
                <p className="text-gray-300 leading-relaxed">{book.description}</p>
              </div>
            </div>

            {/* Preview */}
            {book.preview && (
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                <h2 className="text-xl font-bold text-white mb-4">Preview</h2>
                <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
                  <div className="prose prose-invert max-w-none">
                    <p className="text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {book.preview}
                    </p>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-gray-500 italic">...continue reading after purchase</p>
                  </div>
                </div>
              </div>
            )}

            {/* Reviews */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
              <h2 className="text-xl font-bold text-white mb-4">Reviews</h2>
              
              {book.reviews && book.reviews.length > 0 ? (
                <div className="space-y-4">
                  {book.reviews.map((review) => (
                    <div key={review.id} className="bg-gray-700/50 p-4 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium">{review.userName}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-gray-400 text-sm">
                          {review.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-300">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Star className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 italic">No reviews yet</p>
                  <p className="text-gray-600 text-sm">Be the first to review this book!</p>
                </div>
              )}
            </div>

            {/* Author Info */}
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
              <h2 className="text-xl font-bold text-white mb-4">About the Author</h2>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                  <User className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-medium">{book.author}</h3>
                  <p className="text-gray-400 text-sm">MYSTRONIUM Creator</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default BookDetails;