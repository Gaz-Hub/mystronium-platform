import React, { useState } from "react";
import { motion } from "framer-motion";
import { Scroll, Eye, Lock, Star, Gem } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import toast from "react-hot-toast";

const Archivist = () => {
  const { currentUser } = useAuth();
  const [riddleAnswer, setRiddleAnswer] = useState("");
  const [unlockedSecrets, setUnlockedSecrets] = useState<string[]>([]);

  const riddles = [
    {
      id: "vault-keeper",
      question:
        "I am born from prompts, shaped by dreams, and collected by creators. What am I?",
      answer: "vault card",
      reward: "Ancient Glyph of Creation",
    },
    {
      id: "mystronium-essence",
      question:
        "Three tools forge the path: one writes, one paints, one speaks. What platform unites them?",
      answer: "mystronium",
      reward: "Codex Fragment: The First Algorithm",
    },
  ];

  const tradeOffers = [
    {
      id: "rare-template",
      name: "Legendary Story Template",
      cost: "3 Ultra Rare Cards",
      description:
        "A template that generates epic fantasy narratives with perfect pacing",
    },
    {
      id: "voice-essence",
      name: "Voice of the Ancients",
      cost: "5 Rare Cards",
      description:
        "Unlock a mystical voice option in Narrata with otherworldly tones",
    },
    {
      id: "prime-glyph",
      name: "Prime Glyph Collection",
      cost: "1 Mythic Card",
      description: "Sacred symbols that enhance all future AI generations",
    },
  ];

  const handleRiddleSubmit = (riddleId: string, answer: string) => {
    const riddle = riddles.find((r) => r.id === riddleId);
    if (!riddle) return;

    if (answer.toLowerCase().trim() === riddle.answer) {
      if (!unlockedSecrets.includes(riddleId)) {
        setUnlockedSecrets([...unlockedSecrets, riddleId]);
        toast.success(`🎉 Correct! You've unlocked: ${riddle.reward}`);
      } else {
        toast.info("You have already unlocked this secret");
      }
    } else {
      toast.error("The Archivist shakes their head... try again");
    }
    setRiddleAnswer("");
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Archivist Introduction */}
          <div className="text-center mb-12">
            <div className="text-8xl mb-6">🧙‍♂️</div>
            <h1 className="text-4xl font-bold text-white mb-4">
              The Archivist
            </h1>
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/30 max-w-2xl mx-auto">
              <p className="text-gray-300 italic leading-relaxed">
                "Greetings, Creator. I am the Keeper of the Vault's deepest
                secrets, guardian of ancient algorithms and forgotten prompts.
                Bring me your rarest cards, solve my riddles, and I shall grant
                you powers beyond imagination..."
              </p>
            </div>
          </div>

          {/* Trade Offers */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Gem className="mr-2 w-6 h-6 text-purple-400" />
              Mystical Trades
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {tradeOffers.map((offer, index) => (
                <div
                  key={offer.id}
                  className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600 hover:border-purple-500/50 transition-all"
                >
                  <h3 className="text-white font-bold mb-2">{offer.name}</h3>
                  <p className="text-gray-400 text-sm mb-3">
                    {offer.description}
                  </p>
                  <div className="text-purple-400 font-medium text-sm mb-4">
                    Cost: {offer.cost}
                  </div>
                  <button
                    onClick={() => toast.info("Trading system coming soon...")}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all text-sm"
                  >
                    Initiate Trade
                  </button>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Riddles */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Scroll className="mr-2 w-6 h-6 text-amber-400" />
              Ancient Riddles
            </h2>

            <div className="space-y-6">
              {riddles.map((riddle, index) => (
                <div
                  key={riddle.id}
                  className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
                >
                  <div className="flex items-start space-x-4">
                    <div className="text-2xl">🔮</div>
                    <div className="flex-1">
                      <p className="text-gray-300 italic mb-4">
                        "{riddle.question}"
                      </p>

                      {unlockedSecrets.includes(riddle.id) ? (
                        <div className="bg-green-900/20 border border-green-500/50 p-3 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <Star className="w-4 h-4 text-green-400" />
                            <span className="text-green-300 font-medium">
                              Unlocked: {riddle.reward}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            value={riddleAnswer}
                            onChange={(e) => setRiddleAnswer(e.target.value)}
                            placeholder="Enter your answer..."
                            className="flex-1 bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none"
                            onKeyPress={(e) =>
                              e.key === "Enter" &&
                              handleRiddleSubmit(riddle.id, riddleAnswer)
                            }
                          />
                          <button
                            onClick={() =>
                              handleRiddleSubmit(riddle.id, riddleAnswer)
                            }
                            className="bg-amber-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-amber-700 transition-colors"
                          >
                            Submit
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hidden Secrets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
              <Lock className="mr-2 w-6 h-6 text-red-400" />
              Forbidden Knowledge
            </h2>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-red-500/30">
              <div className="text-center">
                <Eye className="w-12 h-12 text-red-400 mx-auto mb-4" />
                <h3 className="text-white font-bold mb-2">
                  The Vault's Deepest Secrets
                </h3>
                <p className="text-gray-400 mb-4">
                  Only those who have proven themselves worthy may glimpse the
                  true nature of creation...
                </p>

                {unlockedSecrets.length >= 2 ? (
                  <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg">
                    <p className="text-red-300 text-sm italic">
                      "The algorithms dream of electric sheep, and in their
                      dreams, new worlds are born. The Vault is not just a
                      tool—it is a gateway to infinite possibility. Use this
                      knowledge wisely, Creator."
                    </p>
                    <div className="mt-4">
                      <a
                        href="/codex-fusion"
                        className="text-red-400 hover:text-red-300 underline text-sm"
                      >
                        → Access the Fusion Chamber
                      </a>
                    </div>
                  </div>
                ) : (
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <p className="text-gray-500 text-sm">
                      Solve {2 - unlockedSecrets.length} more riddle(s) to
                      unlock this secret...
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Footer Message */}
          <div className="mt-12 text-center">
            <p className="text-gray-500 text-sm italic">
              "The Archivist watches... always watching. Return when you have
              more to trade, Creator."
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Archivist;
