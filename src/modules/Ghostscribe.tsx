import React, { useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "../contexts/UserContext";
import { useAdmin } from "../contexts/AdminContext";
import {
  BookOpen,
  PenTool,
  Save,
  Trash2,
  Edit,
  Download,
  Share2,
  Sparkles,
  Zap,
  Crown,
} from "lucide-react";
import { promptTemplates } from "../utils/promptTemplates";
import axios from "axios";
import toast from "react-hot-toast";

interface Chapter {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
}

const Ghostscribe = () => {
  const { userProfile } = useUser();
  const { godModeEnabled } = useAdmin();
  const [prompt, setPrompt] = useState("");
  const [generatedContent, setGeneratedContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [chapters, setChapters] = useState<Chapter[]>([]);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [chapterTitle, setChapterTitle] = useState("");

  const generateContent = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt for content generation");
      return;
    }

    // Check credits unless God Mode is enabled
    if (
      !godModeEnabled &&
      (!userProfile || userProfile.subscription === "free")
    ) {
      toast.error(
        "Insufficient credits. Upgrade to Pro for unlimited content generation.",
      );
      return;
    }

    setLoading(true);

    try {
      // Generate content using Mistral API
      const response = await axios.post(
        "https://api.mistral.ai/v1/chat/completions",
        {
          model: "mistral-large-latest",
          messages: [
            {
              role: "system",
              content:
                "You are Ghostscribe, an AI writing assistant that creates compelling, engaging content. Write in a clear, professional style that captivates readers.",
            },
            {
              role: "user",
              content: prompt,
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

      const content = response.data.choices[0].message.content;
      setGeneratedContent(content);

      setLoading(false);
      toast.success("Content generated successfully!", {
        icon: "✍️",
        style: {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        },
      });
    } catch (error) {
      // Fallback to demo content on API error
      const demoContent = `This is a sample generated content based on your prompt: "${prompt}". 

In a world where creativity knows no bounds, the power of storytelling transcends the ordinary and reaches into the extraordinary. Every word we write has the potential to inspire, to challenge, and to transform the way we see the world around us.

The art of writing is not merely about putting words on paper—it's about crafting experiences, building worlds, and connecting with readers on a profound level. Whether we're exploring the depths of human emotion or venturing into realms of pure imagination, our words become the bridge between thought and reality.

As we continue this journey of creation, remember that every story has value, every idea has merit, and every voice deserves to be heard. Let your creativity flow freely, and watch as your words come to life on the page.`;

      setGeneratedContent(demoContent);
      setLoading(false);
      toast.success("Content generated! (Demo mode)", {
        icon: "✍️",
        style: {
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
        },
      });
    }
  };

  const useTemplate = (template: string) => {
    setPrompt(template);
    setSelectedTemplate("");
    toast.success("Template applied! Customize and generate.");
  };

  const saveChapter = () => {
    if (!chapterTitle.trim() || !generatedContent.trim()) {
      toast.error("Please provide both title and content");
      return;
    }

    const newChapter: Chapter = {
      id: Date.now().toString(),
      title: chapterTitle,
      content: generatedContent,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    setChapters((prev) => [newChapter, ...prev]);
    setChapterTitle("");
    setGeneratedContent("");
    toast.success("Chapter saved successfully!");
  };

  const deleteChapter = (id: string) => {
    setChapters((prev) => prev.filter((chapter) => chapter.id !== id));
    toast.success("Chapter deleted");
  };

  const editChapter = (chapter: Chapter) => {
    setEditingChapter(chapter);
    setChapterTitle(chapter.title);
    setGeneratedContent(chapter.content);
  };

  const updateChapter = () => {
    if (!editingChapter || !chapterTitle.trim() || !generatedContent.trim()) {
      toast.error("Please provide both title and content");
      return;
    }

    setChapters((prev) =>
      prev.map((chapter) =>
        chapter.id === editingChapter.id
          ? {
              ...chapter,
              title: chapterTitle,
              content: generatedContent,
              updatedAt: new Date(),
            }
          : chapter,
      ),
    );

    setEditingChapter(null);
    setChapterTitle("");
    setGeneratedContent("");
    toast.success("Chapter updated successfully!");
  };

  const downloadChapter = (chapter: Chapter) => {
    const content = `# ${chapter.title}\n\n${chapter.content}\n\nGenerated on: ${chapter.createdAt.toLocaleDateString()}`;
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${chapter.title.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Chapter downloaded!");
  };

  return (
    <div className="min-h-screen bg-dark text-white p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <BookOpen className="mr-3 w-10 h-10 text-green-400" />
            ✍️ Ghostscribe™
          </h1>
          <p className="text-gray-400 text-glyph mb-2">
            AI-powered content creation and writing assistance
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            {godModeEnabled ? (
              <span className="text-yellow-400 font-bold flex items-center">
                <Crown className="w-4 h-4 mr-1" />⚡ GOD MODE - Unlimited Access
              </span>
            ) : (
              <span className="text-green-400">
                Credits:{" "}
                {userProfile?.subscription === "free" ? "Limited" : "∞"}
              </span>
            )}
            <span className="text-gray-400">|</span>
            <span className="text-purple-400">Chapters: {chapters.length}</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Generation Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="cinematic-card p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <PenTool className="mr-2 w-5 h-5" />
              Generate Content
            </h2>

            {/* Prompt Templates */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-3">
                Writing Templates
              </label>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {promptTemplates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => useTemplate(template.value)}
                    className="w-full p-3 text-left bg-gray-700/50 hover:bg-gray-600/50 rounded-lg border border-gray-600 transition-all"
                  >
                    <div className="font-medium text-white">
                      {template.label}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {template.value.substring(0, 80)}...
                    </div>
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-500 mt-2">
                💡 <strong>Tip:</strong> Click any template to auto-fill your
                prompt!
              </p>
            </div>

            {/* Chapter Title */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">
                Chapter Title
              </label>
              <input
                type="text"
                value={chapterTitle}
                onChange={(e) => setChapterTitle(e.target.value)}
                placeholder="Enter chapter title..."
                className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none"
              />
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">
                Content Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your scene, character development, or plot point..."
                className="w-full h-32 bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none resize-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateContent}
              disabled={loading || !prompt.trim()}
              className="w-full btn-cinematic py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner-cinematic mr-3" />
                  Generating...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Sparkles className="mr-2 w-5 h-5" />
                  Generate Content
                </div>
              )}
            </button>

            {/* Save/Update Button */}
            {generatedContent && (
              <button
                onClick={editingChapter ? updateChapter : saveChapter}
                className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-lg font-medium transition-all"
              >
                <Save className="w-4 h-4 inline mr-2" />
                {editingChapter ? "Update Chapter" : "Save Chapter"}
              </button>
            )}
          </motion.div>

          {/* Generated Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <BookOpen className="mr-2 w-5 h-5" />
              Generated Content
            </h2>

            {generatedContent ? (
              <div className="cinematic-card p-6">
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600 min-h-96">
                  <div className="prose prose-invert max-w-none">
                    <pre className="whitespace-pre-wrap text-white font-sans text-sm leading-relaxed">
                      {generatedContent}
                    </pre>
                  </div>
                </div>
              </div>
            ) : (
              <div className="cinematic-card p-6">
                <div className="text-center py-12">
                  <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">
                    No content generated yet. Start writing!
                  </p>
                </div>
              </div>
            )}

            {/* Saved Chapters */}
            {chapters.length > 0 && (
              <div className="mt-8">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                  <Save className="mr-2 w-4 h-4" />
                  Saved Chapters
                </h3>
                <div className="space-y-4">
                  {chapters.map((chapter) => (
                    <motion.div
                      key={chapter.id}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="cinematic-card p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-white font-medium">
                          {chapter.title}
                        </h4>
                        <div className="flex space-x-2">
                          <button
                            onClick={() => editChapter(chapter)}
                            className="p-1 text-gray-400 hover:text-white"
                          >
                            <Edit className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => downloadChapter(chapter)}
                            className="p-1 text-gray-400 hover:text-white"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => deleteChapter(chapter.id)}
                            className="p-1 text-red-400 hover:text-red-300"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <p className="text-gray-400 text-sm mb-2">
                        {chapter.content.substring(0, 150)}...
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          Created: {chapter.createdAt.toLocaleDateString()}
                        </span>
                        <span>
                          Updated: {chapter.updatedAt.toLocaleDateString()}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Ghostscribe;
