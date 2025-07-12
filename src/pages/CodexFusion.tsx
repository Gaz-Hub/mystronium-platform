import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { Zap, Sparkles, Gem, Flame, Star, Crown } from 'lucide-react';
import toast from 'react-hot-toast';
import ProtectedRoute from '../components/ProtectedRoute';

interface FusionCard {
  id: string;
  name: string;
  rarity: 'common' | 'rare' | 'ultra-rare' | 'mythic';
  type: 'art' | 'lore' | 'character' | 'element';
}

const CodexFusion = () => {
  const { currentUser } = useAuth();
  const [selectedCards, setSelectedCards] = useState<FusionCard[]>([]);
  const [fusionResult, setFusionResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  // Mock user cards for demonstration
  const userCards: FusionCard[] = [
    { id: '1', name: 'Dragon Art', rarity: 'rare', type: 'art' },
    { id: '2', name: 'Ancient Lore', rarity: 'common', type: 'lore' },
    { id: '3', name: 'Fire Element', rarity: 'rare', type: 'element' },
    { id: '4', name: 'Warrior Character', rarity: 'ultra-rare', type: 'character' },
    { id: '5', name: 'Magic Scroll', rarity: 'common', type: 'lore' },
    { id: '6', name: 'Ice Element', rarity: 'rare', type: 'element' }
  ];

  const selectCard = (card: FusionCard) => {
    if (selectedCards.length >= 3) {
      toast.error('You can only select 3 cards for fusion');
      return;
    }
    
    if (selectedCards.find(c => c.id === card.id)) {
      toast.error('Card already selected');
      return;
    }

    setSelectedCards([...selectedCards, card]);
  };

  const removeCard = (cardId: string) => {
    setSelectedCards(selectedCards.filter(c => c.id !== cardId));
  };

  const performFusion = async () => {
    if (selectedCards.length !== 3) {
      toast.error('You need exactly 3 cards to perform fusion');
      return;
    }

    setLoading(true);
    
    // Simulate fusion process
    setTimeout(() => {
      const fusionResults = [
        'Legendary Dragon Template - A powerful template that generates epic dragon-themed content',
        'Mystical Lore Entry - Ancient knowledge about the origins of magic',
        'Elemental Fusion Spell - A rare spell that combines multiple elements',
        'Character Archetype: Fire Warrior - A legendary character template',
        'Vault Signature Enhancement - Improves all future generations'
      ];
      
      const result = fusionResults[Math.floor(Math.random() * fusionResults.length)];
      setFusionResult(result);
      setSelectedCards([]);
      toast.success('🧬 Fusion successful! New item created.');
      setLoading(false);
    }, 3000);
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-500 bg-gray-500/10';
      case 'rare': return 'border-blue-500 bg-blue-500/10';
      case 'ultra-rare': return 'border-purple-500 bg-purple-500/10';
      case 'mythic': return 'border-yellow-500 bg-yellow-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'art': return '🎨';
      case 'lore': return '📜';
      case 'character': return '🎭';
      case 'element': return '⚡';
      default: return '🔮';
    }
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-dark text-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
                <Zap className="mr-3 w-10 h-10 text-purple-400" />
                🧬 Codex Fusion
              </h1>
              <p className="text-gray-400">Combine 3 Vault Cards to unlock powerful new items and abilities</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Card Selection */}
              <div className="lg:col-span-2">
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600 mb-6">
                  <h2 className="text-xl font-bold text-white mb-4">Your Vault Cards</h2>
                  <div className="grid md:grid-cols-3 gap-4">
                    {userCards.map((card) => (
                      <motion.div
                        key={card.id}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all hover:scale-105 ${getRarityColor(card.rarity)} ${
                          selectedCards.find(c => c.id === card.id) ? 'ring-2 ring-purple-500' : ''
                        }`}
                        onClick={() => selectCard(card)}
                        whileHover={{ y: -2 }}
                      >
                        <div className="text-center">
                          <div className="text-3xl mb-2">{getTypeIcon(card.type)}</div>
                          <h3 className="text-white font-medium text-sm">{card.name}</h3>
                          <p className="text-gray-400 text-xs capitalize">{card.rarity}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Fusion Result */}
                {fusionResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-6 rounded-xl border border-purple-500/30"
                  >
                    <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                      <Sparkles className="mr-2 w-6 h-6 text-purple-400" />
                      Fusion Result
                    </h2>
                    <div className="bg-gray-800/50 p-4 rounded-lg">
                      <p className="text-purple-300 font-medium">{fusionResult}</p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Fusion Chamber */}
              <div className="space-y-6">
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                  <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                    <Gem className="mr-2 w-5 h-5 text-cyan-400" />
                    Fusion Chamber
                  </h2>
                  
                  <div className="space-y-4">
                    <div className="text-center">
                      <p className="text-gray-400 text-sm mb-4">
                        Selected Cards: {selectedCards.length}/3
                      </p>
                      
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {[0, 1, 2].map((index) => (
                          <div
                            key={index}
                            className={`aspect-square rounded-lg border-2 border-dashed flex items-center justify-center ${
                              selectedCards[index] 
                                ? getRarityColor(selectedCards[index].rarity)
                                : 'border-gray-600 bg-gray-700/30'
                            }`}
                          >
                            {selectedCards[index] ? (
                              <div 
                                className="text-center cursor-pointer"
                                onClick={() => removeCard(selectedCards[index].id)}
                              >
                                <div className="text-2xl">{getTypeIcon(selectedCards[index].type)}</div>
                                <p className="text-xs text-white">{selectedCards[index].name}</p>
                              </div>
                            ) : (
                              <div className="text-gray-500 text-2xl">+</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={performFusion}
                      disabled={selectedCards.length !== 3 || loading}
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 transition-all flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Fusing...
                        </>
                      ) : (
                        <>
                          <Flame className="mr-2 w-4 h-4" />
                          Begin Fusion
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Fusion Guide */}
                <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                  <h3 className="text-white font-medium mb-4">Fusion Recipes</h3>
                  <div className="space-y-3 text-sm">
                    <div className="bg-blue-600/20 p-3 rounded-lg">
                      <p className="text-blue-400 font-medium">🎨 + 📜 + ⚡ = Legendary Template</p>
                    </div>
                    <div className="bg-purple-600/20 p-3 rounded-lg">
                      <p className="text-purple-400 font-medium">🎭 + 🎭 + 🎭 = Character Fusion</p>
                    </div>
                    <div className="bg-green-600/20 p-3 rounded-lg">
                      <p className="text-green-400 font-medium">📜 + 📜 + 📜 = Ancient Knowledge</p>
                    </div>
                  </div>
                </div>

                {/* Warning */}
                <div className="bg-red-900/20 border border-red-500/50 p-4 rounded-lg">
                  <p className="text-red-300 text-sm">
                    ⚠️ <strong>Warning:</strong> Fusion consumes the selected cards permanently. Choose wisely!
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </ProtectedRoute>
  );
};

export default CodexFusion;