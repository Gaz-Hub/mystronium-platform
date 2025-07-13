import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ChevronLeft, ChevronRight, BookOpen, ArrowLeft } from "lucide-react";
import ProtectedRoute from "../components/ProtectedRoute";

interface BookContent {
  id: string;
  title: string;
  author: string;
  content: string;
  chapters: Array<{
    title: string;
    content: string;
  }>;
}

const ReadBook = () => {
  const { bookId } = useParams<{ bookId: string }>();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [book, setBook] = useState<BookContent | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);

  const WORDS_PER_PAGE = 300;

  useEffect(() => {
    if (bookId && currentUser) {
      loadBook();
    }
  }, [bookId, currentUser]);

  const loadBook = async () => {
    if (!bookId || !currentUser) return;

    try {
      // Check if user owns this book
      const purchaseDoc = await getDoc(
        doc(db, "purchases", `${currentUser.uid}_${bookId}`),
      );
      if (!purchaseDoc.exists()) {
        navigate("/library");
        return;
      }

      // Load book content
      const bookDoc = await getDoc(doc(db, "books", bookId));
      if (bookDoc.exists()) {
        setBook({ ...bookDoc.data(), id: bookDoc.id } as BookContent);
      }
    } catch (error) {
      console.error("Error loading book:", error);
      navigate("/library");
    }
    setLoading(false);
  };

  const getPages = () => {
    if (!book) return [];

    const fullText = book.chapters
      ? book.chapters
          .map((ch) => `${ch.title}\n\n${ch.content}`)
          .join("\n\n---\n\n")
      : book.content;

    const words = fullText.split(/\s+/);
    const pages = [];

    for (let i = 0; i < words.length; i += WORDS_PER_PAGE) {
      pages.push(words.slice(i, i + WORDS_PER_PAGE).join(" "));
    }

    return pages;
  };

  const pages = getPages();
  const totalPages = pages.length;

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
      </div>
    );
  }

  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Book Not Found</h2>
          <p className="text-gray-400">
            This book is not available in your library.
          </p>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-dark text-white">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <button
                onClick={() => navigate("/library")}
                className="flex items-center text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Library
              </button>

              <div className="text-center">
                <h1 className="text-2xl font-bold text-white">{book.title}</h1>
                <p className="text-gray-400">by {book.author}</p>
              </div>

              <div className="text-gray-400 text-sm">
                Page {currentPage + 1} of {totalPages}
              </div>
            </div>

            {/* Book Content */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-600 min-h-[600px] relative">
              <div className="p-8">
                <div className="prose prose-invert max-w-none">
                  <div className="text-gray-300 leading-relaxed whitespace-pre-wrap text-lg">
                    {pages[currentPage] || "Content not available"}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 0}
                  className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 mr-1" />
                  Previous
                </button>

                <div className="flex items-center space-x-2">
                  {Array.from({ length: Math.min(totalPages, 10) }, (_, i) => {
                    const pageIndex = Math.floor(currentPage / 10) * 10 + i;
                    if (pageIndex >= totalPages) return null;

                    return (
                      <button
                        key={pageIndex}
                        onClick={() => setCurrentPage(pageIndex)}
                        className={`w-8 h-8 rounded text-sm font-medium transition-colors ${
                          currentPage === pageIndex
                            ? "bg-blue-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {pageIndex + 1}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={nextPage}
                  disabled={currentPage === totalPages - 1}
                  className="flex items-center bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${((currentPage + 1) / totalPages) * 100}%`,
                  }}
                ></div>
              </div>
              <div className="text-center text-gray-400 text-sm mt-2">
                {Math.round(((currentPage + 1) / totalPages) * 100)}% complete
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default ReadBook;
