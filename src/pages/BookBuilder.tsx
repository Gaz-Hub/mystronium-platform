import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Plus,
  Download,
  Save,
  Edit,
  Trash2,
  Eye,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import toast from "react-hot-toast";
import ProtectedRoute from "../components/ProtectedRoute";

interface Chapter {
  id: string;
  title: string;
  text: string;
  wordCount: number;
  createdAt: Date;
}

interface Book {
  title: string;
  author: string;
  description: string;
  chapters: Chapter[];
  totalWords: number;
  createdAt: Date;
  lastModified: Date;
}

const BookBuilder = () => {
  const { currentUser } = useAuth();
  const { userProfile } = useUser();
  const [book, setBook] = useState<Book>({
    title: "",
    author: userProfile?.displayName || "Anonymous",
    description: "",
    chapters: [],
    totalWords: 0,
    createdAt: new Date(),
    lastModified: new Date(),
  });

  const [chapterTitle, setChapterTitle] = useState("");
  const [chapterText, setChapterText] = useState("");
  const [editingChapter, setEditingChapter] = useState<string | null>(null);
  const [previewMode, setPreviewMode] = useState(false);

  // Load book from localStorage on component mount
  useEffect(() => {
    const savedBook = localStorage.getItem("mystronium_book");
    if (savedBook) {
      try {
        const parsed = JSON.parse(savedBook);
        setBook({
          ...parsed,
          createdAt: new Date(parsed.createdAt),
          lastModified: new Date(parsed.lastModified),
          chapters: parsed.chapters.map((ch: any) => ({
            ...ch,
            createdAt: new Date(ch.createdAt),
          })),
        });
      } catch (error) {
        console.error("Error loading saved book:", error);
      }
    }
  }, []);

  // Save book to localStorage whenever it changes
  useEffect(() => {
    if (book.title || book.chapters.length > 0) {
      localStorage.setItem("mystronium_book", JSON.stringify(book));
    }
  }, [book]);

  const updateBookMeta = (field: keyof Book, value: string) => {
    setBook((prev) => ({
      ...prev,
      [field]: value,
      lastModified: new Date(),
    }));
  };

  const addChapter = () => {
    if (!chapterTitle.trim() || !chapterText.trim()) {
      toast.error("Please fill in both chapter title and text");
      return;
    }

    const wordCount = chapterText.trim().split(/\s+/).length;
    const newChapter: Chapter = {
      id: Date.now().toString(),
      title: chapterTitle.trim(),
      text: chapterText.trim(),
      wordCount,
      createdAt: new Date(),
    };

    setBook((prev) => ({
      ...prev,
      chapters: [...prev.chapters, newChapter],
      totalWords: prev.totalWords + wordCount,
      lastModified: new Date(),
    }));

    setChapterTitle("");
    setChapterText("");
    toast.success("Chapter added successfully!");
  };

  const updateChapter = (id: string) => {
    if (!chapterTitle.trim() || !chapterText.trim()) {
      toast.error("Please fill in both chapter title and text");
      return;
    }

    const wordCount = chapterText.trim().split(/\s+/).length;

    setBook((prev) => {
      const oldChapter = prev.chapters.find((ch) => ch.id === id);
      const oldWordCount = oldChapter?.wordCount || 0;

      return {
        ...prev,
        chapters: prev.chapters.map((ch) =>
          ch.id === id
            ? {
                ...ch,
                title: chapterTitle.trim(),
                text: chapterText.trim(),
                wordCount,
              }
            : ch,
        ),
        totalWords: prev.totalWords - oldWordCount + wordCount,
        lastModified: new Date(),
      };
    });

    setEditingChapter(null);
    setChapterTitle("");
    setChapterText("");
    toast.success("Chapter updated successfully!");
  };

  const deleteChapter = (id: string) => {
    const chapter = book.chapters.find((ch) => ch.id === id);
    if (!chapter) return;

    setBook((prev) => ({
      ...prev,
      chapters: prev.chapters.filter((ch) => ch.id !== id),
      totalWords: prev.totalWords - chapter.wordCount,
      lastModified: new Date(),
    }));

    toast.success("Chapter deleted");
  };

  const startEditingChapter = (chapter: Chapter) => {
    setEditingChapter(chapter.id);
    setChapterTitle(chapter.title);
    setChapterText(chapter.text);
  };

  const cancelEditing = () => {
    setEditingChapter(null);
    setChapterTitle("");
    setChapterText("");
  };

  const moveChapter = (index: number, direction: "up" | "down") => {
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= book.chapters.length) return;

    setBook((prev) => {
      const newChapters = [...prev.chapters];
      [newChapters[index], newChapters[newIndex]] = [
        newChapters[newIndex],
        newChapters[index],
      ];
      return {
        ...prev,
        chapters: newChapters,
        lastModified: new Date(),
      };
    });
  };

  const exportBook = (format: "txt" | "json") => {
    if (book.chapters.length === 0) {
      toast.error("Add some chapters first");
      return;
    }

    let content: string;
    let filename: string;
    let mimeType: string;

    if (format === "txt") {
      content = `${book.title}\nby ${book.author}\n\n${book.description}\n\n${"=".repeat(50)}\n\n`;
      content += book.chapters
        .map(
          (ch, i) =>
            `Chapter ${i + 1}: ${ch.title}\n\n${ch.text}\n\n${"=".repeat(30)}\n\n`,
        )
        .join("");
      filename = `${book.title || "mystronium_book"}.txt`;
      mimeType = "text/plain";
    } else {
      content = JSON.stringify(book, null, 2);
      filename = `${book.title || "mystronium_book"}.json`;
      mimeType = "application/json";
    }

    const blob = new Blob([content], { type: mimeType });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(link.href);

    toast.success(`Book exported as ${format.toUpperCase()}!`);
  };

  const clearBook = () => {
    if (
      window.confirm(
        "Are you sure you want to clear the entire book? This cannot be undone.",
      )
    ) {
      setBook({
        title: "",
        author: userProfile?.displayName || "Anonymous",
        description: "",
        chapters: [],
        totalWords: 0,
        createdAt: new Date(),
        lastModified: new Date(),
      });
      localStorage.removeItem("mystronium_book");
      toast.success("Book cleared");
    }
  };

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
              Book Builder
            </h1>
            <p className="text-gray-400">
              Organize your AI-generated content into a complete book
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Book Metadata */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                <h2 className="text-xl font-bold text-white mb-4">
                  Book Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Title
                    </label>
                    <input
                      type="text"
                      value={book.title}
                      onChange={(e) => updateBookMeta("title", e.target.value)}
                      className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none"
                      placeholder="Enter book title..."
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Author
                    </label>
                    <input
                      type="text"
                      value={book.author}
                      onChange={(e) => updateBookMeta("author", e.target.value)}
                      className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none"
                      placeholder="Author name..."
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Description
                    </label>
                    <textarea
                      value={book.description}
                      onChange={(e) =>
                        updateBookMeta("description", e.target.value)
                      }
                      className="w-full h-24 bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none resize-none"
                      placeholder="Book description..."
                    />
                  </div>
                </div>
              </div>

              {/* Book Stats */}
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                <h2 className="text-xl font-bold text-white mb-4">
                  Statistics
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Chapters:</span>
                    <span className="text-white font-medium">
                      {book.chapters.length}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Total Words:</span>
                    <span className="text-white font-medium">
                      {book.totalWords.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Est. Pages:</span>
                    <span className="text-white font-medium">
                      {Math.ceil(book.totalWords / 250)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Last Modified:</span>
                    <span className="text-white font-medium text-xs">
                      {book.lastModified.toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Export Options */}
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                <h2 className="text-xl font-bold text-white mb-4">Export</h2>

                <div className="space-y-3">
                  <button
                    onClick={() => exportBook("txt")}
                    disabled={book.chapters.length === 0}
                    className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Export as TXT
                  </button>

                  <button
                    onClick={() => exportBook("json")}
                    disabled={book.chapters.length === 0}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors flex items-center justify-center"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Export as JSON
                  </button>

                  <button
                    onClick={() => setPreviewMode(!previewMode)}
                    disabled={book.chapters.length === 0}
                    className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 transition-colors flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    {previewMode ? "Edit Mode" : "Preview Mode"}
                  </button>

                  <button
                    onClick={clearBook}
                    className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear Book
                  </button>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-2 space-y-6">
              {!previewMode ? (
                <>
                  {/* Chapter Editor */}
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Plus className="w-5 h-5 mr-2" />
                      {editingChapter ? "Edit Chapter" : "Add New Chapter"}
                    </h2>

                    <div className="space-y-4">
                      <div>
                        <label className="block text-white font-medium mb-2">
                          Chapter Title
                        </label>
                        <input
                          type="text"
                          value={chapterTitle}
                          onChange={(e) => setChapterTitle(e.target.value)}
                          className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none"
                          placeholder="Enter chapter title..."
                        />
                      </div>

                      <div>
                        <label className="block text-white font-medium mb-2">
                          Chapter Text
                        </label>
                        <textarea
                          value={chapterText}
                          onChange={(e) => setChapterText(e.target.value)}
                          className="w-full h-40 bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none resize-none"
                          placeholder="Write your chapter content here..."
                        />
                        <div className="text-right text-gray-400 text-sm mt-1">
                          Words:{" "}
                          {chapterText.trim()
                            ? chapterText.trim().split(/\s+/).length
                            : 0}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        {editingChapter ? (
                          <>
                            <button
                              onClick={() => updateChapter(editingChapter)}
                              disabled={
                                !chapterTitle.trim() || !chapterText.trim()
                              }
                              className="bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
                            >
                              Update Chapter
                            </button>
                            <button
                              onClick={cancelEditing}
                              className="bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={addChapter}
                            disabled={
                              !chapterTitle.trim() || !chapterText.trim()
                            }
                            className="bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
                          >
                            Add Chapter
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Chapters List */}
                  <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                    <h2 className="text-xl font-bold text-white mb-4">
                      Chapters ({book.chapters.length})
                    </h2>

                    <div className="space-y-4">
                      {book.chapters.length > 0 ? (
                        book.chapters.map((chapter, index) => (
                          <motion.div
                            key={chapter.id}
                            className="bg-gray-700/50 p-4 rounded-lg border border-gray-600"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <h3 className="text-white font-bold">
                                Chapter {index + 1}: {chapter.title}
                              </h3>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => moveChapter(index, "up")}
                                  disabled={index === 0}
                                  className="text-gray-400 hover:text-white disabled:opacity-30"
                                >
                                  ↑
                                </button>
                                <button
                                  onClick={() => moveChapter(index, "down")}
                                  disabled={index === book.chapters.length - 1}
                                  className="text-gray-400 hover:text-white disabled:opacity-30"
                                >
                                  ↓
                                </button>
                                <button
                                  onClick={() => startEditingChapter(chapter)}
                                  className="text-blue-400 hover:text-blue-300"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => deleteChapter(chapter.id)}
                                  className="text-red-400 hover:text-red-300"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            <p className="text-gray-300 text-sm mb-2 line-clamp-3">
                              {chapter.text}
                            </p>

                            <div className="flex justify-between text-xs text-gray-400">
                              <span>{chapter.wordCount} words</span>
                              <span>
                                {chapter.createdAt.toLocaleDateString()}
                              </span>
                            </div>
                          </motion.div>
                        ))
                      ) : (
                        <div className="text-center py-8">
                          <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                          <p className="text-gray-500 italic">
                            No chapters yet
                          </p>
                          <p className="text-gray-600 text-sm">
                            Add your first chapter above
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                /* Preview Mode */
                <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600">
                  <div className="prose prose-invert max-w-none">
                    <div className="text-center mb-8">
                      <h1 className="text-4xl font-bold text-white mb-2">
                        {book.title || "Untitled Book"}
                      </h1>
                      <p className="text-xl text-gray-300 mb-4">
                        by {book.author}
                      </p>
                      {book.description && (
                        <p className="text-gray-400 italic">
                          {book.description}
                        </p>
                      )}
                    </div>

                    {book.chapters.map((chapter, index) => (
                      <div key={chapter.id} className="mb-8">
                        <h2 className="text-2xl font-bold text-white mb-4">
                          Chapter {index + 1}: {chapter.title}
                        </h2>
                        <div className="text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {chapter.text}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
};

export default BookBuilder;
