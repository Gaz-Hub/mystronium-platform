import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import {
  BookOpen,
  Image,
  Play,
  Download,
  Plus,
  Eye,
  Edit,
  Trash2,
} from "lucide-react";
import toast from "react-hot-toast";
import ProtectedRoute from "../components/ProtectedRoute";

interface Comic {
  id: string;
  title: string;
  description: string;
  panels: number;
  createdAt: Date;
  lastModified: Date;
  status: "draft" | "completed";
  thumbnailUrl?: string;
}

const Comics = () => {
  const { currentUser } = useAuth();
  const { userProfile } = useUser();
  const [comics, setComics] = useState<Comic[]>([
    {
      id: "1",
      title: "The Digital Realm Chronicles",
      description: "A mystical journey through the MYSTRONIUM universe",
      panels: 12,
      createdAt: new Date("2024-12-20"),
      lastModified: new Date("2024-12-22"),
      status: "draft",
    },
    {
      id: "2",
      title: "Vault Engine Adventures",
      description: "Epic tales of AI-generated art coming to life",
      panels: 8,
      createdAt: new Date("2024-12-18"),
      lastModified: new Date("2024-12-21"),
      status: "completed",
    },
  ]);

  const createNewComic = () => {
    if (!currentUser) {
      toast.error("Please log in to create comics");
      return;
    }

    if (userProfile?.subscription === "free") {
      toast.error("Comic Builder requires Premium or Creator Pro subscription");
      return;
    }

    // In a real app, this would navigate to the comic builder
    toast.success("Opening Comic Builder...");
  };

  const deleteComic = (id: string) => {
    const comic = comics.find((c) => c.id === id);
    if (!comic) return;

    if (window.confirm(`Are you sure you want to delete "${comic.title}"?`)) {
      setComics(comics.filter((c) => c.id !== id));
      toast.success("Comic deleted");
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <BookOpen className="mr-3 w-10 h-10 text-pink-400" />
              🎬 Comic Builder™
            </h1>
            <p className="text-gray-400">
              Transform your stories into visual narratives • Panel by panel
            </p>
            {userProfile?.subscription === "free" && (
              <div className="mt-4 bg-pink-900/20 border border-pink-500 text-pink-400 p-3 rounded-lg inline-block">
                <p className="font-medium">Premium Feature</p>
                <p className="text-sm">
                  Upgrade to Premium or Creator Pro to use Comic Builder
                </p>
              </div>
            )}
          </div>

          {/* Feature Preview */}
          <motion.div
            className="mb-12 bg-gradient-to-r from-pink-600/20 to-purple-600/20 p-8 rounded-xl border border-pink-500/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-white mb-4">
                Coming Soon: Full Comic Builder
              </h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Transform your Ghostscribe™ stories into stunning visual
                comics. Our AI will help you create panels, generate artwork,
                and bring your characters to life.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                <Image className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">
                  Auto Panel Generation
                </h3>
                <p className="text-gray-400 text-sm">
                  AI converts your text into comic panels automatically
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                <Play className="w-8 h-8 text-green-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">Dynamic Layouts</h3>
                <p className="text-gray-400 text-sm">
                  Smart panel arrangements and speech bubble placement
                </p>
              </div>

              <div className="bg-gray-800/50 p-6 rounded-lg text-center">
                <Download className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                <h3 className="text-white font-bold mb-2">Export Options</h3>
                <p className="text-gray-400 text-sm">
                  Download as PDF, CBZ, or web-ready formats
                </p>
              </div>
            </div>
          </motion.div>

          {/* Sample Comic Panels */}
          <motion.div
            className="mb-12 bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-xl font-bold text-white mb-6">
              Sample Comic Strip
            </h2>

            <div className="grid md:grid-cols-3 gap-4 mb-6">
              {[1, 2, 3].map((panel) => (
                <div
                  key={panel}
                  className="bg-white rounded-lg p-4 aspect-square flex items-center justify-center border-2 border-gray-400"
                >
                  <div className="text-center text-gray-600">
                    <div className="text-4xl mb-2">🎨</div>
                    <p className="text-sm font-medium">Panel {panel}</p>
                    <p className="text-xs">
                      Generated artwork will appear here
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-700/50 p-4 rounded-lg">
              <p className="text-gray-300 text-sm italic">
                "In the digital realm of MYSTRONIUM, where creativity knows no
                bounds, a young creator discovers the power of the Vault
                Engine..."
              </p>
            </div>
          </motion.div>

          {/* User Comics */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white">Your Comics</h2>
            <button
              onClick={createNewComic}
              disabled={userProfile?.subscription === "free"}
              className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 transition-all flex items-center"
            >
              <Plus className="mr-2 w-4 h-4" />
              Start a Comic
            </button>
          </div>

          {currentUser ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {comics.map((comic, index) => (
                <motion.div
                  key={comic.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-600 overflow-hidden hover:border-pink-500/50 transition-all"
                >
                  <div className="relative">
                    {comic.thumbnailUrl ? (
                      <img
                        src={comic.thumbnailUrl}
                        alt={comic.title}
                        className="w-full h-32 object-cover"
                      />
                    ) : (
                      <div className="w-full h-32 bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center">
                        <BookOpen className="w-8 h-8 text-white" />
                      </div>
                    )}

                    <div className="absolute top-2 right-2">
                      <span
                        className={`px-2 py-1 rounded text-xs font-medium ${
                          comic.status === "completed"
                            ? "bg-green-600/20 text-green-400"
                            : "bg-yellow-600/20 text-yellow-400"
                        }`}
                      >
                        {comic.status.charAt(0).toUpperCase() +
                          comic.status.slice(1)}
                      </span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-white font-bold text-lg mb-1">
                      {comic.title}
                    </h3>
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2">
                      {comic.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <span>{comic.panels} panels</span>
                      <span>{comic.lastModified.toLocaleDateString()}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center text-sm">
                        <Edit className="w-3 h-3 mr-1" />
                        Edit
                      </button>
                      <button className="bg-green-600 text-white p-2 rounded-lg hover:bg-green-700 transition-colors">
                        <Eye className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => deleteComic(comic.id)}
                        className="bg-red-600 text-white p-2 rounded-lg hover:bg-red-700 transition-colors"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎬</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Login Required
              </h3>
              <p className="text-gray-400 mb-6">
                Please log in to create and manage your comics
              </p>
              <a
                href="/login"
                className="inline-flex items-center bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 transition-all"
              >
                Login to Continue
              </a>
            </div>
          )}

          {/* Call to Action */}
          <motion.div
            className="mt-12 bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-8 rounded-xl border border-purple-500/30 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Create Visual Stories?
            </h3>
            <p className="text-gray-300 mb-6">
              Join the beta program to get early access to Comic Builder™ and
              help shape the future of AI-powered storytelling.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-pink-600 to-purple-600 text-white px-8 py-3 rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 transition-all">
                Join Beta Program
              </button>
              <a
                href="/ghostscribe"
                className="bg-gray-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-600 transition-all"
              >
                Start with Writing
              </a>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Comics;
