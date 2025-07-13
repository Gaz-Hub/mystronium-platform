import React, { useState } from "react";
import { motion } from "framer-motion";
import { Package, Star, Gift, Sparkles, Crown } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import toast from "react-hot-toast";

interface Crate {
  id: string;
  name: string;
  price: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  contents: string[];
  icon: string;
  description: string;
}

const VaultCrates = () => {
  const { currentUser } = useAuth();
  const { userProfile } = useUser();
  const [opening, setOpening] = useState<string | null>(null);

  const crates: Crate[] = [
    {
      id: "starter",
      name: "Starter Crate",
      price: "£2.99",
      rarity: "common",
      icon: "📦",
      description: "Perfect for new creators",
      contents: [
        "5 Art Generation Credits",
        "3 Premium Writing Prompts",
        "1 Character Template",
        "Basic Lore Entry Pack",
      ],
    },
    {
      id: "artist",
      name: "Artist's Vault",
      price: "£7.99",
      rarity: "rare",
      icon: "🎨",
      description: "Focused on visual creation",
      contents: [
        "20 Art Generation Credits",
        "10 Style Presets",
        "5 Character Design Templates",
        "3 Background Art Packs",
        "Rare Color Palette Collection",
      ],
    },
    {
      id: "storyteller",
      name: "Storyteller's Chest",
      price: "£9.99",
      rarity: "epic",
      icon: "📚",
      description: "Everything for epic narratives",
      contents: [
        "50 Writing Credits",
        "15 Plot Templates",
        "10 Character Archetypes",
        "5 World-building Guides",
        "Epic Story Starter Pack",
        "Exclusive Voice Samples",
      ],
    },
    {
      id: "legendary",
      name: "Legendary Creator Vault",
      price: "£19.99",
      rarity: "legendary",
      icon: "👑",
      description: "The ultimate creator package",
      contents: [
        "100 Premium Credits",
        "25 Exclusive Art Styles",
        "20 Master Story Templates",
        "15 Voice Character Presets",
        "10 Complete Lore Universes",
        "Legendary Creator Badge",
        "1 Month Premium Subscription",
      ],
    },
  ];

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "text-gray-400 border-gray-500";
      case "rare":
        return "text-blue-400 border-blue-500";
      case "epic":
        return "text-purple-400 border-purple-500";
      case "legendary":
        return "text-yellow-400 border-yellow-500";
      default:
        return "text-gray-400 border-gray-500";
    }
  };

  const getRarityGlow = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "shadow-gray-500/20";
      case "rare":
        return "shadow-blue-500/20";
      case "epic":
        return "shadow-purple-500/20";
      case "legendary":
        return "shadow-yellow-500/20";
      default:
        return "shadow-gray-500/20";
    }
  };

  const openCrate = async (crateId: string) => {
    if (!currentUser) {
      toast.error("Please log in to open crates");
      return;
    }

    setOpening(crateId);

    // Simulate opening animation
    setTimeout(() => {
      const crate = crates.find((c) => c.id === crateId);
      toast.success(
        `🎉 Opened ${crate?.name}! Check your inventory for new items.`,
      );
      setOpening(null);
    }, 2000);
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
              <Package className="mr-3 w-10 h-10 text-purple-400" />
              Vault Crates
            </h1>
            <p className="text-gray-400">
              Open art packs, discover Codex pieces, and unlock rare
              collectibles to enhance your creative journey
            </p>
          </div>

          {/* Featured Crate */}
          <motion.div
            className="mb-12 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 p-8 rounded-xl border border-yellow-500/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="text-center">
              <div className="text-6xl mb-4">🎁</div>
              <h2 className="text-2xl font-bold text-white mb-2">
                Daily Free Crate
              </h2>
              <p className="text-gray-300 mb-4">
                Log in daily to claim your free Starter Crate! Streak bonuses
                available.
              </p>
              <button
                onClick={() =>
                  toast.success(
                    "🎁 Daily crate claimed! +5 credits added to your account.",
                  )
                }
                className="bg-gradient-to-r from-yellow-600 to-orange-600 text-white px-8 py-3 rounded-lg font-medium hover:from-yellow-700 hover:to-orange-700 transition-all"
              >
                Claim Daily Crate
              </button>
            </div>
          </motion.div>

          {/* Crates Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {crates.map((crate, index) => (
              <motion.div
                key={crate.id}
                className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border-2 ${getRarityColor(crate.rarity)} ${getRarityGlow(crate.rarity)} overflow-hidden hover:scale-105 transition-all duration-300`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -5 }}
              >
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="text-4xl mb-2">{crate.icon}</div>
                    <h3 className="text-xl font-bold text-white mb-1">
                      {crate.name}
                    </h3>
                    <p
                      className={`text-sm font-medium uppercase tracking-wide ${getRarityColor(crate.rarity).split(" ")[0]}`}
                    >
                      {crate.rarity}
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      {crate.description}
                    </p>
                  </div>

                  <div className="mb-4">
                    <h4 className="text-white font-medium mb-2 text-sm">
                      Contains:
                    </h4>
                    <ul className="space-y-1">
                      {crate.contents.slice(0, 3).map((item, i) => (
                        <li
                          key={i}
                          className="text-gray-300 text-xs flex items-center"
                        >
                          <Sparkles className="w-3 h-3 mr-1 text-purple-400" />
                          {item}
                        </li>
                      ))}
                      {crate.contents.length > 3 && (
                        <li className="text-gray-400 text-xs">
                          +{crate.contents.length - 3} more items...
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="text-center">
                    <div className="text-2xl font-bold text-white mb-3">
                      {crate.price}
                    </div>
                    <button
                      onClick={() => openCrate(crate.id)}
                      disabled={opening === crate.id}
                      className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                        opening === crate.id
                          ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                          : `bg-gradient-to-r ${
                              crate.rarity === "legendary"
                                ? "from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                                : crate.rarity === "epic"
                                  ? "from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                                  : crate.rarity === "rare"
                                    ? "from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                                    : "from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800"
                            } text-white`
                      }`}
                    >
                      {opening === crate.id ? (
                        <div className="flex items-center justify-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Opening...
                        </div>
                      ) : (
                        "Open Crate"
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Inventory Preview */}
          <motion.div
            className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Gift className="mr-2 w-6 h-6 text-green-400" />
              Your Inventory
            </h2>

            <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4">
              {/* Sample inventory items */}
              <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🎨</div>
                <p className="text-white text-sm font-medium">Art Credits</p>
                <p className="text-cyan-400 font-bold">25</p>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">📝</div>
                <p className="text-white text-sm font-medium">
                  Story Templates
                </p>
                <p className="text-purple-400 font-bold">8</p>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🎭</div>
                <p className="text-white text-sm font-medium">
                  Character Presets
                </p>
                <p className="text-blue-400 font-bold">12</p>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🌟</div>
                <p className="text-white text-sm font-medium">Rare Styles</p>
                <p className="text-yellow-400 font-bold">3</p>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">🏆</div>
                <p className="text-white text-sm font-medium">Achievements</p>
                <p className="text-green-400 font-bold">7</p>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg text-center">
                <div className="text-2xl mb-2">👑</div>
                <p className="text-white text-sm font-medium">
                  Legendary Items
                </p>
                <p className="text-orange-400 font-bold">1</p>
              </div>
            </div>
          </motion.div>

          {/* Special Offers */}
          <motion.div
            className="mt-8 bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 rounded-xl border border-purple-500/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <div className="text-center">
              <h3 className="text-xl font-bold text-white mb-2 flex items-center justify-center">
                <Crown className="mr-2 w-5 h-5 text-yellow-400" />
                Limited Time: Creator Bundle
              </h3>
              <p className="text-gray-300 mb-4">
                Get all 4 crates for the price of 3! Perfect for serious
                creators.
              </p>
              <div className="flex items-center justify-center space-x-4 mb-4">
                <span className="text-gray-400 line-through">£40.96</span>
                <span className="text-2xl font-bold text-green-400">
                  £29.99
                </span>
                <span className="bg-red-600 text-white px-2 py-1 rounded text-sm">
                  Save 27%
                </span>
              </div>
              <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
                Get Creator Bundle
              </button>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VaultCrates;
