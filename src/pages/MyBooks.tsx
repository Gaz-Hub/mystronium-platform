import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { BookOpen, Plus, Edit, Trash2, Eye, DollarSign } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import toast from "react-hot-toast";

interface BookProject {
  id: string;
  title: string;
  author: string;
  description: string;
  chapters: number;
  totalWords: number;
  status: "draft" | "in-progress" | "completed";
  createdAt: Date;
  lastModified: Date;
}

const MyBooks = () => {
  const { currentUser } = useAuth();
  const { userProfile } = useUser();
  const navigate = useNavigate();
  const [newBookTitle, setNewBookTitle] = useState("");
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Load book projects from localStorage
  const [bookProjects, setBookProjects] = useState<BookProject[]>(() => {
    const saved = localStorage.getItem("mystronium_book_projects");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return parsed.map((book: any) => ({
          ...book,
          createdAt: new Date(book.createdAt),
          lastModified: new Date(book.lastModified),
        }));
      } catch (error) {
        console.error("Error loading book projects:", error);
        return [];
      }
    }
    return [];
  });

  // Save to localStorage whenever projects change
  React.useEffect(() => {
    localStorage.setItem(
      "mystronium_book_projects",
      JSON.stringify(bookProjects),
    );
  }, [bookProjects]);

  const createNewBook = () => {
    if (!newBookTitle.trim()) {
      toast.error("Please enter a book title");
      return;
    }

    const newProject: BookProject = {
      id: Date.now().toString(),
      title: newBookTitle.trim(),
      author: userProfile?.displayName || "Anonymous",
      description: "",
      chapters: 0,
      totalWords: 0,
      status: "draft",
      createdAt: new Date(),
      lastModified: new Date(),
    };

    setBookProjects((prev) => [newProject, ...prev]);
    setNewBookTitle("");
    setShowCreateForm(false);
    toast.success("New book project created!");
  };

  const deleteProject = (id: string) => {
    const project = bookProjects.find((p) => p.id === id);
    if (!project) return;

    if (
      window.confirm(
        `Are you sure you want to delete "${project.title}"? This cannot be undone.`,
      )
    ) {
      setBookProjects((prev) => prev.filter((p) => p.id !== id));
      // Also remove from localStorage if it's the current book
      const currentBook = localStorage.getItem("mystronium_book");
      if (currentBook) {
        try {
          const parsed = JSON.parse(currentBook);
          if (parsed.title === project.title) {
            localStorage.removeItem("mystronium_book");
          }
        } catch (error) {
          console.error("Error checking current book:", error);
        }
      }
      toast.success("Book project deleted");
    }
  };

  const openBook = (project: BookProject) => {
    // Set this book as the current working book
    const bookData = {
      title: project.title,
      author: project.author,
      description: project.description,
      chapters: [],
      totalWords: 0,
      createdAt: project.createdAt,
      lastModified: project.lastModified,
    };

    localStorage.setItem("mystronium_book", JSON.stringify(bookData));
    navigate("/book-builder");
  };

  const publishedBooks = [
    {
      id: "1",
      title: "My First Fantasy Novel",
      status: "published",
      price: "£4.99",
      sales: 23,
      earnings: 91.77, // 80% of sales
      createdAt: new Date("2024-12-15"),
    },
    {
      id: "2",
      title: "The Cyberpunk Chronicles",
      status: "pending",
      price: "£6.99",
      sales: 0,
      earnings: 0,
      createdAt: new Date("2024-12-20"),
    },
    {
      id: "3",
      title: "Draft: Untitled Romance",
      status: "draft",
      price: "£3.99",
      sales: 0,
      earnings: 0,
      createdAt: new Date("2024-12-22"),
    },
  ];

  const getStatusBadge = (status: BookProject["status"]) => {
    const styles = {
      draft: "bg-gray-600/20 text-gray-400",
      "in-progress": "bg-blue-600/20 text-blue-400",
      completed: "bg-green-600/20 text-green-400",
    };

    return (
      <span
        className={`px-2 py-1 rounded text-xs font-medium ${styles[status]}`}
      >
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  const totalWords = bookProjects.reduce(
    (sum, book) => sum + book.totalWords,
    0,
  );
  const completedBooks = bookProjects.filter(
    (book) => book.status === "completed",
  ).length;

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Login Required</h2>
          <p className="text-gray-400">Please log in to view your books.</p>
        </div>
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
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2 flex items-center">
                <BookOpen className="mr-3 w-10 h-10 text-green-400" />
                My Books
              </h1>
              <p className="text-gray-400">
                Manage your book projects and drafts
              </p>
            </div>

            <button
              onClick={() => setShowCreateForm(!showCreateForm)}
              className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all flex items-center"
            >
              <Plus className="mr-2 w-4 h-4" />
              New Book Project
            </button>
          </div>

          {/* Create New Book Form */}
          {showCreateForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600 mb-8"
            >
              <h2 className="text-xl font-bold text-white mb-4">
                Create New Book Project
              </h2>
              <div className="flex space-x-4">
                <input
                  type="text"
                  value={newBookTitle}
                  onChange={(e) => setNewBookTitle(e.target.value)}
                  placeholder="Enter book title..."
                  className="flex-1 bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none"
                  onKeyPress={(e) => e.key === "Enter" && createNewBook()}
                />
                <button
                  onClick={createNewBook}
                  disabled={!newBookTitle.trim()}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
                >
                  Create
                </button>
                <button
                  onClick={() => {
                    setShowCreateForm(false);
                    setNewBookTitle("");
                  }}
                  className="bg-gray-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Total Projects</span>
              </div>
              <p className="text-2xl font-bold text-blue-400">
                {bookProjects.length}
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="w-5 h-5 text-green-400" />
                <span className="text-white font-medium">Completed</span>
              </div>
              <p className="text-2xl font-bold text-green-400">
                {completedBooks}
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
              <div className="flex items-center space-x-2 mb-2">
                <Edit className="w-5 h-5 text-yellow-400" />
                <span className="text-white font-medium">Total Words</span>
              </div>
              <p className="text-2xl font-bold text-yellow-400">
                {totalWords.toLocaleString()}
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
              <div className="flex items-center space-x-2 mb-2">
                <Eye className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium">In Progress</span>
              </div>
              <p className="text-2xl font-bold text-purple-400">
                {
                  bookProjects.filter((book) => book.status === "in-progress")
                    .length
                }
              </p>
            </div>
          </div>

          {/* Books List */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
            <h2 className="text-xl font-bold text-white mb-6">
              Your Book Projects
            </h2>

            {bookProjects.length > 0 ? (
              <div className="space-y-4">
                {bookProjects.map((book, index) => (
                  <motion.div
                    key={book.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-gray-700/30 p-4 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-white font-bold text-lg">
                            {book.title}
                          </h3>
                          {getStatusBadge(book.status)}
                        </div>

                        <div className="grid md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <span className="text-gray-400">Chapters:</span>
                            <p className="text-white font-medium">
                              {book.chapters}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-400">Words:</span>
                            <p className="text-white font-medium">
                              {book.totalWords.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <span className="text-gray-400">Created:</span>
                            <p className="text-white font-medium">
                              {book.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => openBook(book)}
                          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition-colors"
                          title="Open in Book Builder"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteProject(book.id)}
                          className="bg-red-600 text-white p-2 rounded hover:bg-red-700 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  No books yet
                </h3>
                <p className="text-gray-400 mb-6">
                  Start creating and publishing your first book!
                </p>
                <Link
                  to="/ghostscribe"
                  className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
                >
                  Create First Project
                </Link>
              </div>
            )}
          </div>

          {/* Quick Actions */}
          {bookProjects.length > 0 && (
            <motion.div
              className="mt-8 bg-gradient-to-r from-green-600/20 to-blue-600/20 p-6 rounded-xl border border-green-500/30"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              <h3 className="text-lg font-bold text-white mb-4">
                Quick Actions
              </h3>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link
                  to="/ghostscribe"
                  className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition-colors"
                >
                  Generate Content
                </Link>
                <Link
                  to="/vault"
                  className="bg-cyan-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-cyan-700 transition-colors"
                >
                  Create Art
                </Link>
                <Link
                  to="/book-builder"
                  className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
                >
                  Open Book Builder
                </Link>
                <Link
                  to="/sell"
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-700 transition-colors"
                >
                  Publish & Sell
                </Link>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default MyBooks;
