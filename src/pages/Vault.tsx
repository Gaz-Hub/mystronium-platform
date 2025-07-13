import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useUser } from "../contexts/UserContext";
import { useAdmin } from "../contexts/AdminContext";
import {
  Palette,
  Zap,
  Crown,
  Star,
  Sparkles,
  Gem,
  Sword,
  Shield,
  Target,
  Activity,
  Download,
  Share2,
  Heart,
  Eye,
  RotateCcw,
  Settings,
  Filter,
  Grid,
  List,
} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

interface VaultCard {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  rarity: "common" | "rare" | "ultra" | "mythic";
  power: number;
  speed: number;
  lore: number;
  theme: string;
  prompt: string;
  createdAt: Date;
  vaultId: string;
}

const Vault = () => {
  const { userProfile, useVaultCredits } = useUser();
  const { godModeEnabled } = useAdmin();
  const [prompt, setPrompt] = useState("");
  const [generatedCards, setGeneratedCards] = useState<VaultCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState("fantasy");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [filterRarity, setFilterRarity] = useState<string>("all");

  const themes = [
    { id: "fantasy", name: "Fantasy", icon: "🐉", color: "text-purple-400" },
    { id: "conspiracy", name: "Conspiracy", icon: "🔮", color: "text-red-400" },
    { id: "sci-fi", name: "Sci-Fi", icon: "🚀", color: "text-blue-400" },
    { id: "horror", name: "Horror", icon: "👻", color: "text-gray-400" },
    { id: "anunnaki", name: "Anunnaki", icon: "⚡", color: "text-yellow-400" },
  ];

  const rarityConfig = {
    common: {
      chance: 60,
      color: "text-gray-400",
      bg: "bg-gray-600/20",
      border: "border-gray-500/30",
    },
    rare: {
      chance: 30,
      color: "text-blue-400",
      bg: "bg-blue-600/20",
      border: "border-blue-500/30",
    },
    ultra: {
      chance: 8,
      color: "text-purple-400",
      bg: "bg-purple-600/20",
      border: "border-purple-500/30",
    },
    mythic: {
      chance: 2,
      color: "text-yellow-400",
      bg: "bg-yellow-600/20",
      border: "border-yellow-500/30",
    },
  };

  const generateCard = async () => {
    if (!prompt.trim()) {
      toast.error("Please enter a prompt for your card");
      return;
    }

    // Check credits unless God Mode is enabled
    if (
      !godModeEnabled &&
      (!userProfile ||
        (userProfile.subscription === "free" && userProfile.vaultCredits < 1))
    ) {
      toast.error(
        "Insufficient credits. Upgrade to Pro for unlimited generations.",
      );
      return;
    }

    // Use credits unless God Mode is enabled
    if (!godModeEnabled) {
      const creditsUsed = await useVaultCredits(1);
      if (!creditsUsed) {
        toast.error("Unable to use credits. Please try again.");
        return;
      }
    }

    setLoading(true);

    try {
      // Determine rarity based on chance
      const rand = Math.random() * 100;
      let rarity: keyof typeof rarityConfig = "common";
      let cumulative = 0;

      for (const [rarityKey, config] of Object.entries(rarityConfig)) {
        cumulative += config.chance;
        if (rand <= cumulative) {
          rarity = rarityKey as keyof typeof rarityConfig;
          break;
        }
      }

      // Generate card stats
      const power = Math.floor(Math.random() * 12) + 1;
      const speed = Math.floor(Math.random() * 12) + 1;
      const lore = Math.floor(Math.random() * 12) + 1;

      // Generate Vault ID
      const vaultId = `VAULT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      // Generate image using Replicate API
      const response = await axios.post(
        "https://api.replicate.com/v1/predictions",
        {
          version:
            "39ed52f2a78e934b3ba6e2a89f5b1c712de7dfea535525255b1aa35c5565e08b",
          input: {
            prompt: `${selectedTheme} ${prompt}, high quality, detailed artwork`,
            width: 1024,
            height: 1024,
            num_outputs: 1,
            scheduler: "K_EULER",
            num_inference_steps: 50,
            guidance_scale: 7.5,
          },
        },
        {
          headers: {
            Authorization: `Token ${import.meta.env.VITE_REPLICATE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
        },
      );

      // For demo purposes, use a placeholder image if API fails
      const imageUrl =
        response.data?.output?.[0] ||
        `https://picsum.photos/512/512?random=${Date.now()}`;

      const newCard: VaultCard = {
        id: Date.now().toString(),
        name: `${selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} ${prompt.split(" ")[0]}`,
        description: `A ${rarity} ${selectedTheme} card generated from "${prompt}"`,
        imageUrl,
        rarity,
        power,
        speed,
        lore,
        theme: selectedTheme,
        prompt,
        createdAt: new Date(),
        vaultId,
      };

      setGeneratedCards((prev) => [newCard, ...prev]);
      setLoading(false);

      // Show rarity-specific toast
      const rarityEmoji =
        rarity === "mythic"
          ? "🌟"
          : rarity === "ultra"
            ? "💎"
            : rarity === "rare"
              ? "✨"
              : "⚪";
      toast.success(`${rarityEmoji} ${rarity.toUpperCase()} card generated!`, {
        icon: rarityEmoji,
        style: {
          background: rarityConfig[rarity].bg.replace("/20", "/80"),
          color: "white",
        },
      });
    } catch (error) {
      // Fallback to placeholder image on API error
      const vaultId = `VAULT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
      const rand = Math.random() * 100;
      let rarity: keyof typeof rarityConfig = "common";
      let cumulative = 0;

      for (const [rarityKey, config] of Object.entries(rarityConfig)) {
        cumulative += config.chance;
        if (rand <= cumulative) {
          rarity = rarityKey as keyof typeof rarityConfig;
          break;
        }
      }

      const power = Math.floor(Math.random() * 12) + 1;
      const speed = Math.floor(Math.random() * 12) + 1;
      const lore = Math.floor(Math.random() * 12) + 1;

      const newCard: VaultCard = {
        id: Date.now().toString(),
        name: `${selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)} ${prompt.split(" ")[0]}`,
        description: `A ${rarity} ${selectedTheme} card generated from "${prompt}"`,
        imageUrl: `https://picsum.photos/512/512?random=${Date.now()}`,
        rarity,
        power,
        speed,
        lore,
        theme: selectedTheme,
        prompt,
        createdAt: new Date(),
        vaultId,
      };

      setGeneratedCards((prev) => [newCard, ...prev]);
      setLoading(false);

      const rarityEmoji =
        rarity === "mythic"
          ? "🌟"
          : rarity === "ultra"
            ? "💎"
            : rarity === "rare"
              ? "✨"
              : "⚪";
      toast.success(
        `${rarityEmoji} ${rarity.toUpperCase()} card generated! (Demo mode)`,
        {
          icon: rarityEmoji,
          style: {
            background: rarityConfig[rarity].bg.replace("/20", "/80"),
            color: "white",
          },
        },
      );
    }
  };

  const getRarityColor = (rarity: string) => {
    return (
      rarityConfig[rarity as keyof typeof rarityConfig]?.color ||
      "text-gray-400"
    );
  };

  const getRarityBg = (rarity: string) => {
    return (
      rarityConfig[rarity as keyof typeof rarityConfig]?.bg || "bg-gray-600/20"
    );
  };

  const getRarityBorder = (rarity: string) => {
    return (
      rarityConfig[rarity as keyof typeof rarityConfig]?.border ||
      "border-gray-500/30"
    );
  };

  const filteredCards = generatedCards.filter(
    (card) => filterRarity === "all" || card.rarity === filterRarity,
  );

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
            <Palette className="mr-3 w-10 h-10 text-purple-400" />
            🎨 Vault Engine™
          </h1>
          <p className="text-gray-400 text-glyph mb-2">
            Generate stunning visual art with AI
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            {godModeEnabled ? (
              <span className="text-yellow-400 font-bold flex items-center">
                <Crown className="w-4 h-4 mr-1" />⚡ GOD MODE - Unlimited Access
              </span>
            ) : (
              <span className="text-blue-400">
                Credits:{" "}
                {userProfile?.subscription === "free"
                  ? userProfile.vaultCredits
                  : "∞"}
              </span>
            )}
            <span className="text-gray-400">|</span>
            <span className="text-purple-400">
              Cards Generated: {generatedCards.length}
            </span>
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
              <Zap className="mr-2 w-5 h-5" />
              Generate Card
            </h2>

            {/* Theme Selection */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-3">Theme</label>
              <div className="grid grid-cols-2 gap-2">
                {themes.map((theme) => (
                  <button
                    key={theme.id}
                    onClick={() => setSelectedTheme(theme.id)}
                    className={`p-3 rounded-lg border transition-all ${
                      selectedTheme === theme.id
                        ? "border-purple-500 bg-purple-600/20"
                        : "border-gray-600 bg-gray-700/50 hover:border-gray-500"
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl">{theme.icon}</span>
                      <span className={`text-sm font-medium ${theme.color}`}>
                        {theme.name}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Prompt Input */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">
                Card Prompt
              </label>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder={`Describe your ${selectedTheme} card...`}
                className="w-full h-32 bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none resize-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateCard}
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
                  <Palette className="mr-2 w-5 h-5" />
                  Generate Card
                </div>
              )}
            </button>

            {/* Rarity Info */}
            <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
              <h3 className="text-white font-medium mb-3">Rarity Chances</h3>
              <div className="space-y-2 text-sm">
                {Object.entries(rarityConfig).map(([rarity, config]) => (
                  <div
                    key={rarity}
                    className="flex items-center justify-between"
                  >
                    <span className={`capitalize ${config.color}`}>
                      {rarity === "mythic"
                        ? "🌟 Mythic"
                        : rarity === "ultra"
                          ? "💎 Ultra"
                          : rarity === "rare"
                            ? "✨ Rare"
                            : "⚪ Common"}
                    </span>
                    <span className="text-gray-400">{config.chance}%</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Cards Display */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            {/* Controls */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white flex items-center">
                <Gem className="mr-2 w-5 h-5" />
                Your Collection ({filteredCards.length})
              </h2>

              <div className="flex items-center space-x-4">
                {/* Filter */}
                <select
                  value={filterRarity}
                  onChange={(e) => setFilterRarity(e.target.value)}
                  className="bg-gray-800 text-white px-3 py-2 rounded-lg border border-gray-600 focus:border-purple-500 focus:outline-none"
                >
                  <option value="all">All Rarities</option>
                  <option value="common">Common</option>
                  <option value="rare">Rare</option>
                  <option value="ultra">Ultra</option>
                  <option value="mythic">Mythic</option>
                </select>

                {/* View Mode */}
                <div className="flex bg-gray-800 rounded-lg p-1">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded ${viewMode === "grid" ? "bg-purple-600 text-white" : "text-gray-400"}`}
                  >
                    <Grid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded ${viewMode === "list" ? "bg-purple-600 text-white" : "text-gray-400"}`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Cards Grid/List */}
            <AnimatePresence>
              {filteredCards.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <Palette className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                  <p className="text-gray-400">
                    No cards generated yet. Create your first card!
                  </p>
                </motion.div>
              ) : (
                <div
                  className={
                    viewMode === "grid"
                      ? "grid grid-cols-2 md:grid-cols-3 gap-4"
                      : "space-y-4"
                  }
                >
                  {filteredCards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className={`cinematic-card p-4 cursor-pointer transition-all hover:scale-105 ${getRarityBorder(card.rarity)}`}
                    >
                      {/* Card Image */}
                      <div className="relative mb-3">
                        <img
                          src={card.imageUrl}
                          alt={card.name}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2">
                          <span
                            className={`px-2 py-1 rounded text-xs font-bold ${getRarityColor(card.rarity)} bg-black/50`}
                          >
                            {card.rarity.toUpperCase()}
                          </span>
                        </div>
                      </div>

                      {/* Card Info */}
                      <div className="space-y-2">
                        <h3 className="text-white font-bold">{card.name}</h3>
                        <p className="text-gray-400 text-sm">
                          {card.description}
                        </p>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-2 text-xs">
                          <div className="text-center">
                            <Sword className="w-4 h-4 text-red-400 mx-auto mb-1" />
                            <span className="text-white">{card.power}</span>
                          </div>
                          <div className="text-center">
                            <Target className="w-4 h-4 text-blue-400 mx-auto mb-1" />
                            <span className="text-white">{card.speed}</span>
                          </div>
                          <div className="text-center">
                            <Shield className="w-4 h-4 text-green-400 mx-auto mb-1" />
                            <span className="text-white">{card.lore}</span>
                          </div>
                        </div>

                        {/* Vault ID */}
                        <p className="text-xs text-gray-500 font-mono">
                          {card.vaultId}
                        </p>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-2">
                          <div className="flex space-x-2">
                            <button className="p-1 text-gray-400 hover:text-white">
                              <Download className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-white">
                              <Share2 className="w-4 h-4" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-white">
                              <Heart className="w-4 h-4" />
                            </button>
                          </div>
                          <span className="text-xs text-gray-500">
                            {card.createdAt.toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Vault;
