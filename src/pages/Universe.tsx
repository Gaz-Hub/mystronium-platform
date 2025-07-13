import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { useAdmin } from "../contexts/AdminContext";
import {
  Globe,
  Clock,
  BookOpen,
  Palette,
  Mic,
  FileText,
  Star,
  Calendar,
  Users,
  Activity,
  Sparkles,
  Crown,
  Map,
  Compass,
  Layers,
  Zap,
  Target,
  Award,
  Gift,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

interface TimelineEvent {
  id: string;
  type: "book" | "card" | "narration" | "codex" | "milestone";
  title: string;
  description: string;
  date: string;
  icon: string;
  color: string;
  tags: string[];
}

interface UniverseStats {
  totalEvents: number;
  booksCreated: number;
  cardsGenerated: number;
  narrationsCreated: number;
  codexEntries: number;
  timelineLength: number;
  achievements: string[];
  activeProjects: number;
}

const Universe = () => {
  const { currentUser } = useAuth();
  const { userProfile } = useUser();
  const { godModeEnabled } = useAdmin();

  const [stats, setStats] = useState<UniverseStats>({
    totalEvents: 24,
    booksCreated: 3,
    cardsGenerated: 12,
    narrationsCreated: 5,
    codexEntries: 8,
    timelineLength: 45,
    achievements: [
      "First Book",
      "Card Collector",
      "Voice Master",
      "Lore Keeper",
    ],
    activeProjects: 2,
  });

  const [timeline, setTimeline] = useState<TimelineEvent[]>([
    {
      id: "1",
      type: "book",
      title: "Digital Dreams",
      description: "Completed the first chapter of your sci-fi novel",
      date: "2024-01-15",
      icon: "📚",
      color: "blue",
      tags: ["sci-fi", "chapter-1", "completed"],
    },
    {
      id: "2",
      type: "card",
      title: "Mythic Dragon",
      description: "Generated a legendary dragon card for your collection",
      date: "2024-01-14",
      icon: "🐉",
      color: "purple",
      tags: ["mythic", "dragon", "collection"],
    },
    {
      id: "3",
      type: "narration",
      title: "Chapter 1 Audio",
      description: "Created voice narration for Digital Dreams Chapter 1",
      date: "2024-01-13",
      icon: "🎙️",
      color: "green",
      tags: ["audio", "narration", "chapter-1"],
    },
    {
      id: "4",
      type: "codex",
      title: "Anunnaki Lore",
      description: "Added ancient civilization lore to your codex",
      date: "2024-01-12",
      icon: "📜",
      color: "yellow",
      tags: ["lore", "ancient", "civilization"],
    },
    {
      id: "5",
      type: "milestone",
      title: "First Achievement",
      description: "Unlocked your first achievement: First Book",
      date: "2024-01-11",
      icon: "🏆",
      color: "orange",
      tags: ["achievement", "milestone"],
    },
  ]);

  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTimeline = timeline.filter((event) => {
    const matchesFilter =
      selectedFilter === "all" || event.type === selectedFilter;
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    return matchesFilter && matchesSearch;
  });

  const getEventColor = (color: string) => {
    switch (color) {
      case "blue":
        return "border-blue-500 bg-blue-600/20";
      case "purple":
        return "border-purple-500 bg-purple-600/20";
      case "green":
        return "border-green-500 bg-green-600/20";
      case "yellow":
        return "border-yellow-500 bg-yellow-600/20";
      case "orange":
        return "border-orange-500 bg-orange-600/20";
      default:
        return "border-gray-500 bg-gray-600/20";
    }
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "book":
        return <BookOpen className="w-5 h-5" />;
      case "card":
        return <Palette className="w-5 h-5" />;
      case "narration":
        return <Mic className="w-5 h-5" />;
      case "codex":
        return <FileText className="w-5 h-5" />;
      case "milestone":
        return <Award className="w-5 h-5" />;
      default:
        return <Star className="w-5 h-5" />;
    }
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
            <Globe className="mr-3 w-10 h-10 text-blue-400" />
            Your Creative Universe
          </h1>
          <p className="text-gray-400 text-glyph mb-2">
            Timeline • Lore • Achievements • Progress
          </p>
          <p className="text-blue-400">
            {currentUser?.displayName ||
              currentUser?.email?.split("@")[0] ||
              "Creator"}
          </p>
        </motion.div>

        {/* God Mode Indicator */}
        {godModeEnabled && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 cinematic-card p-4 glow-effect"
          >
            <div className="flex items-center justify-center space-x-2">
              <Crown className="w-6 h-6 text-yellow-400" />
              <span className="text-yellow-400 font-bold text-lg">
                ⚡ GOD MODE ACTIVE
              </span>
              <Sparkles className="w-5 h-5 text-yellow-400" />
            </div>
            <p className="text-center text-yellow-300 text-sm mt-1">
              Unlimited access to all universe features
            </p>
          </motion.div>
        )}

        {/* Universe Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="cinematic-card p-6"
          >
            <div className="flex items-center space-x-3 mb-3">
              <Clock className="w-8 h-8 text-blue-400" />
              <div>
                <p className="text-gray-400 text-sm">Timeline Events</p>
                <p className="text-2xl font-bold text-blue-400">
                  {stats.totalEvents}
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-blue-400 h-2 rounded-full"
                style={{ width: `${(stats.totalEvents / 50) * 100}%` }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="cinematic-card p-6"
          >
            <div className="flex items-center space-x-3 mb-3">
              <Calendar className="w-8 h-8 text-purple-400" />
              <div>
                <p className="text-gray-400 text-sm">Timeline Length</p>
                <p className="text-2xl font-bold text-purple-400">
                  {stats.timelineLength} days
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-purple-400 h-2 rounded-full"
                style={{ width: `${(stats.timelineLength / 365) * 100}%` }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="cinematic-card p-6"
          >
            <div className="flex items-center space-x-3 mb-3">
              <Target className="w-8 h-8 text-green-400" />
              <div>
                <p className="text-gray-400 text-sm">Active Projects</p>
                <p className="text-2xl font-bold text-green-400">
                  {stats.activeProjects}
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-green-400 h-2 rounded-full"
                style={{ width: `${(stats.activeProjects / 5) * 100}%` }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="cinematic-card p-6"
          >
            <div className="flex items-center space-x-3 mb-3">
              <Award className="w-8 h-8 text-yellow-400" />
              <div>
                <p className="text-gray-400 text-sm">Achievements</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {stats.achievements.length}
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div
                className="bg-yellow-400 h-2 rounded-full"
                style={{ width: `${(stats.achievements.length / 10) * 100}%` }}
              />
            </div>
          </motion.div>
        </div>

        {/* Filters and Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="cinematic-card p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex flex-wrap gap-2">
              {["all", "book", "card", "narration", "codex", "milestone"].map(
                (filter) => (
                  <button
                    key={filter}
                    onClick={() => setSelectedFilter(filter)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedFilter === filter
                        ? "bg-blue-600 text-white"
                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                    }`}
                  >
                    {filter.charAt(0).toUpperCase() + filter.slice(1)}
                  </button>
                ),
              )}
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Search timeline..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>
        </motion.div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="cinematic-card p-6"
        >
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
            <Activity className="mr-2 w-6 h-6" />
            Your Creative Timeline
          </h2>

          <div className="space-y-6">
            {filteredTimeline.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.1 * index }}
                className={`relative p-6 rounded-lg border-l-4 ${getEventColor(event.color)}`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
                    <span className="text-2xl">{event.icon}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-lg font-bold text-white">
                        {event.title}
                      </h3>
                      <span className="text-xs bg-gray-600 px-2 py-1 rounded text-gray-300">
                        {event.type}
                      </span>
                    </div>
                    <p className="text-gray-300 mb-3">{event.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex flex-wrap gap-2">
                        {event.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="text-xs bg-gray-600 px-2 py-1 rounded text-gray-300"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                      <span className="text-sm text-gray-400">
                        {event.date}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="mt-8 grid md:grid-cols-3 gap-6"
        >
          <Link
            to="/ghostscribe"
            className="cinematic-card p-6 hover:scale-105 transition-transform"
          >
            <div className="flex items-center space-x-3">
              <BookOpen className="w-8 h-8 text-blue-400" />
              <div>
                <h3 className="text-lg font-bold text-white">
                  Create New Book
                </h3>
                <p className="text-gray-400 text-sm">Start your next story</p>
              </div>
            </div>
          </Link>

          <Link
            to="/vault"
            className="cinematic-card p-6 hover:scale-105 transition-transform"
          >
            <div className="flex items-center space-x-3">
              <Palette className="w-8 h-8 text-purple-400" />
              <div>
                <h3 className="text-lg font-bold text-white">Generate Cards</h3>
                <p className="text-gray-400 text-sm">Add to your collection</p>
              </div>
            </div>
          </Link>

          <Link
            to="/narrata"
            className="cinematic-card p-6 hover:scale-105 transition-transform"
          >
            <div className="flex items-center space-x-3">
              <Mic className="w-8 h-8 text-green-400" />
              <div>
                <h3 className="text-lg font-bold text-white">
                  Create Narration
                </h3>
                <p className="text-gray-400 text-sm">Bring stories to life</p>
              </div>
            </div>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default Universe;
