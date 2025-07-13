import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  addDoc,
  updateDoc,
  doc,
  increment,
} from "firebase/firestore";
import { db } from "../firebase";
import { BookOpen, Star, Search, Filter, Crown } from "lucide-react";
import toast from "react-hot-toast";

interface Book {
  id: string;
  title: string;
  author: string;
  authorId: string;
  description: string;
  price: number;
  coverUrl?: string;
  genre: string;
  featured: boolean;
  sales: number;
  rating: number;
  createdAt: Date;
}

const Bookstore = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const genres = [
    "all",
    "fantasy",
    "sci-fi",
    "romance",
    "mystery",
    "thriller",
    "horror",
    "adventure",
    "drama",
    "comedy",
    "non-fiction",
  ];

  useEffect(() => {
    loadBooks();
  }, []);

  useEffect(() => {
    filterAndSortBooks();
  }, [books, searchTerm, selectedGenre, sortBy]);

  const loadBooks = async () => {
    try {
      const booksQuery = query(
        collection(db, "books"),
        where("approved", "==", true),
      );
      const booksSnapshot = await getDocs(booksQuery);
      const booksData = booksSnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Book[];

      setBooks(booksData);
    } catch (error) {
      console.error("Error loading books:", error);
      toast.error("Failed to load books");
    }
    setLoading(false);
  };

  const filterAndSortBooks = () => {
    let filtered = books;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(
        (book) =>
          book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
          book.description.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    // Filter by genre
    if (selectedGenre !== "all") {
      filtered = filtered.filter((book) => book.genre === selectedGenre);
    }

    // Sort books
    switch (sortBy) {
      case "featured":
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.sales - a.sales;
        });
        break;
      case "newest":
        filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "bestseller":
        filtered.sort((a, b) => b.sales - a.sales);
        break;
    }

    setFilteredBooks(filtered);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
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
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <BookOpen className="mr-3 w-10 h-10 text-blue-400" />
            MYSTRONIUM Bookstore
          </h1>
          <p className="text-gray-400">
            Discover amazing books created by our community
          </p>
        </div>

        {/* Filters and Search */}
        <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search books..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              {genres.map((genre) => (
                <option key={genre} value={genre}>
                  {genre === "all"
                    ? "All Genres"
                    : genre.charAt(0).toUpperCase() + genre.slice(1)}
                </option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-gray-800 text-white p-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="bestseller">Best Sellers</option>
              <option value="rating">Highest Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <div className="flex items-center text-gray-400">
              <Filter className="w-4 h-4 mr-2" />
              {filteredBooks.length} books found
            </div>
          </div>
        </div>

        {/* Books Grid */}
        {filteredBooks.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
              <motion.div
                key={book.id}
                className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-600 overflow-hidden hover:border-blue-500/50 transition-all"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Link to={`/book/${book.id}`}>
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

                    {book.featured && (
                      <div className="absolute top-2 left-2">
                        <div className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center">
                          <Crown className="w-3 h-3 mr-1" />
                          Featured
                        </div>
                      </div>
                    )}

                    <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
                      £{book.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
                      {book.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-2">
                      by {book.author}
                    </p>

                    <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                      {book.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-white text-sm">
                          {book.rating.toFixed(1)}
                        </span>
                      </div>

                      <div className="text-gray-400 text-xs">
                        {book.sales} sales
                      </div>
                    </div>

                    <div className="mt-3">
                      <span className="inline-block bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs">
                        {book.genre}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              No books found
            </h3>
            <p className="text-gray-400">
              Try adjusting your search or filters
            </p>
          </div>
        )}

        {/* Call to Action */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-8 rounded-xl border border-blue-500/30 text-center"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-white mb-4">
            Ready to Publish Your Book?
          </h3>
          <p className="text-gray-300 mb-6">
            Join our community of creators and start earning from your stories
          </p>
          <Link
            to="/creator"
            className="inline-flex items-center bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
          >
            <BookOpen className="mr-2 w-5 h-5" />
            Start Publishing
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Bookstore;
