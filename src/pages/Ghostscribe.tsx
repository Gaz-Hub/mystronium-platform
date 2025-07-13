import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { promptTemplates } from "../utils/promptTemplates";
import { db } from "../firebase";
import {
  collection,
  addDoc,
  onSnapshot,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import axios from "axios";
import toast from "react-hot-toast";
import {
  Wand2,
  BookOpen,
  Sparkles,
  Save,
  Edit,
  Trash2,
  Plus,
} from "lucide-react";

interface Chapter {
  id: string;
  title: string;
  content: string;
  created: number;
}

const Ghostscribe = () => {
  const { currentUser } = useAuth();
  const { userProfile } = useUser();
  const [prompt, setPrompt] = useState("");
  const [output, setOutput] = useState("");
  const [title, setTitle] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");

  // Load chapters from Firebase
  useEffect(() => {
    if (!currentUser) return;

    const unsubscribe = onSnapshot(
      collection(db, "books", currentUser.uid, "chapters"),
      (snapshot) => {
        const list = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Chapter[];
        setChapters(list.sort((a, b) => b.created - a.created));
      },
    );

    return () => unsubscribe();
  }, [currentUser]);

  const generateText = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt");
      return;
    }

    if (!currentUser) {
      toast.error("Please log in to use Ghostscribe");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.mistral.ai/v1/chat/completions",
        {
          model: "mistral-large-latest",
          messages: [
            {
              role: "user",
              content: `You are a professional book writer. Write a compelling chapter based on: ${prompt}`,
            },
          ],
          max_tokens: 2000,
          temperature: 0.8,
        },
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_MISTRAL_API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );
      setOutput(response.data.choices[0].message.content);
      toast.success("Chapter generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.status === 401) {
        toast.error(
          "API key invalid. Please check your Mistral API configuration.",
        );
      } else if (error.response?.status === 429) {
        toast.error("Rate limit exceeded. Please try again in a moment.");
      } else {
        toast.error("Error generating text. Please try again.");
      }
    }
    setLoading(false);
  };

  const handleSave = async () => {
    if (!currentUser || !output) {
      toast.error("Please generate content first");
      return;
    }

    if (!title.trim()) {
      toast.error("Please enter a chapter title");
      return;
    }

    try {
      await addDoc(collection(db, "books", currentUser.uid, "chapters"), {
        title: title.trim(),
        content: output,
        created: Date.now(),
      });

      setTitle("");
      setOutput("");
      setPrompt("");
      toast.success("Chapter saved successfully!");
    } catch (error) {
      console.error("Error saving chapter:", error);
      toast.error("Failed to save chapter");
    }
  };

  const handleDelete = async (id: string) => {
    if (!currentUser) return;

    if (window.confirm("Are you sure you want to delete this chapter?")) {
      try {
        await deleteDoc(doc(db, "books", currentUser.uid, "chapters", id));
        toast.success("Chapter deleted");
      } catch (error) {
        console.error("Error deleting chapter:", error);
        toast.error("Failed to delete chapter");
      }
    }
  };

  const handleLoad = (chapter: Chapter) => {
    setTitle(chapter.title);
    setPrompt("");
    setOutput(chapter.content);
    setSelectedId(chapter.id);
  };

  const handleUpdate = async () => {
    if (!selectedId || !currentUser) return;

    if (!title.trim() || !output.trim()) {
      toast.error("Please fill in both title and content");
      return;
    }

    try {
      await updateDoc(
        doc(db, "books", currentUser.uid, "chapters", selectedId),
        {
          title: title.trim(),
          content: output,
        },
      );

      setSelectedId(null);
      setTitle("");
      setOutput("");
      setPrompt("");
      toast.success("Chapter updated successfully!");
    } catch (error) {
      console.error("Error updating chapter:", error);
      toast.error("Failed to update chapter");
    }
  };

  const useTemplate = (template: string) => {
    setPrompt(template);
    setSelectedTemplate("");
    toast.success("Template applied! Customize and generate.");
  };

  const cancelEdit = () => {
    setSelectedId(null);
    setTitle("");
    setOutput("");
    setPrompt("");
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Login Required</h2>
          <p className="text-gray-400">Please log in to use Ghostscribe.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <BookOpen className="mr-3 w-10 h-10 text-purple-400" />
            👻 Ghostscribe™
          </h1>
          <p className="text-gray-400">AI-powered book writing engine</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Prompt Templates */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
              Writing Templates
            </h2>

            <div className="space-y-2 max-h-96 overflow-y-auto">
              {promptTemplates.map((template, index) => (
                <button
                  key={index}
                  onClick={() => useTemplate(template.value)}
                  className="w-full text-left p-3 bg-gray-700/50 hover:bg-gray-700 rounded-lg transition-colors border border-gray-600 hover:border-purple-500"
                >
                  <div className="text-white font-medium text-sm mb-1">
                    {template.label}
                  </div>
                  <div className="text-gray-400 text-xs line-clamp-2">
                    {template.value.substring(0, 80)}...
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 bg-purple-600/20 rounded-lg border border-purple-500/30">
              <p className="text-purple-300 text-sm">
                💡 <strong>Tip:</strong> Click any template to auto-fill your
                prompt!
              </p>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Chapter Title */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600">
              <label className="block text-white font-medium mb-2">
                Chapter Title
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter chapter title..."
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
              />
            </div>

            {/* Prompt Input */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600">
              <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                <Wand2 className="w-5 h-5 mr-2 text-purple-400" />
                Your Prompt
              </h2>

              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your scene, character development, or plot point..."
                className="w-full h-32 bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none resize-none"
              />

              <button
                onClick={generateText}
                disabled={loading || !prompt.trim()}
                className="mt-4 w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 transition-all flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Generating...
                  </>
                ) : (
                  <>
                    <Wand2 className="mr-2 w-4 h-4" />
                    Generate Content
                  </>
                )}
              </button>
            </div>

            {/* Generated Output */}
            <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600">
              <h2 className="text-xl font-bold text-white mb-4">
                Generated Content
              </h2>

              <textarea
                value={output}
                onChange={(e) => setOutput(e.target.value)}
                className="w-full h-64 bg-gray-900 text-white p-4 rounded-lg border border-gray-700 resize-none"
                placeholder="Generated content will appear here..."
              />

              {output && (
                <div className="mt-4 flex justify-between items-center">
                  <div className="text-sm text-gray-400">
                    Words: {output.trim().split(/\s+/).length}
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(output);
                      toast.success("Content copied to clipboard!");
                    }}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                  >
                    Copy Text
                  </button>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <button
                  onClick={selectedId ? handleUpdate : handleSave}
                  disabled={!output || !title.trim()}
                  className="bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center"
                >
                  <Save className="mr-2 w-4 h-4" />
                  {selectedId ? "Update Chapter" : "Save Chapter"}
                </button>

                {selectedId && (
                  <button
                    onClick={cancelEdit}
                    className="bg-gray-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-700 transition-colors"
                  >
                    Cancel Edit
                  </button>
                )}
              </div>
            </div>

            {/* Usage Info */}
            {userProfile?.subscription === "free" && (
              <div className="bg-yellow-900/20 border border-yellow-500 text-yellow-400 p-4 rounded-lg">
                <p className="font-medium">Free Tier - Mistral AI</p>
                <p className="text-sm">
                  Upgrade to Premium for GPT-4o access and unlimited generations
                </p>
              </div>
            )}
          </div>

          {/* Saved Chapters */}
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600">
            <h2 className="text-xl font-bold text-white mb-4 flex items-center">
              <BookOpen className="w-5 h-5 mr-2 text-green-400" />
              Your Book ({chapters.length})
            </h2>

            <div className="space-y-3 max-h-96 overflow-y-auto">
              {chapters.length > 0 ? (
                chapters.map((chapter) => (
                  <div
                    key={chapter.id}
                    className="p-3 bg-gray-700/50 rounded-lg border border-gray-600"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <strong className="text-white text-sm">
                        {chapter.title}
                      </strong>
                      <div className="flex gap-1">
                        <button
                          onClick={() => handleLoad(chapter)}
                          className="text-blue-400 hover:text-blue-300 p-1"
                          title="Edit"
                        >
                          <Edit className="w-3 h-3" />
                        </button>
                        <button
                          onClick={() => handleDelete(chapter.id)}
                          className="text-red-400 hover:text-red-300 p-1"
                          title="Delete"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-400 text-xs line-clamp-3">
                      {chapter.content}
                    </p>
                    <p className="text-gray-500 text-xs mt-2">
                      {new Date(chapter.created).toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 italic text-sm">
                    No chapters yet
                  </p>
                  <p className="text-gray-600 text-xs">
                    Generate and save your first chapter
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Ghostscribe;
