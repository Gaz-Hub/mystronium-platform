import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase';
import { Sparkles, Star, Crown, Gem } from 'lucide-react';
import toast from 'react-hot-toast';

interface VaultCard {
  id: string;
  cardId: string;
  title: string;
  imageUrl: string;
  rarity: 'common' | 'rare' | 'ultra-rare' | 'mythic';
  glyphs: string[];
  vaultSignature: string;
  metadata: {
    bookTitle?: string;
    chapterTitle?: string;
    prompt: string;
    generatedAt: Date;
  };
}

const VaultCards = () => {
  const { currentUser } = useAuth();
  const { userProfile } = useUser();
  const [cards, setCards] = useState<VaultCard[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser) {
      loadUserCards();
    }
  }, [currentUser]);

  const loadUserCards = async () => {
    if (!currentUser) return;

    try {
      const cardsQuery = query(
        collection(db, 'vault-cards'),
        where('userId', '==', currentUser.uid)
      );
      const cardsSnapshot = await getDocs(cardsQuery);
      const cardsData = cardsSnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id,
        metadata: {
          ...doc.data().metadata,
          generatedAt: doc.data().metadata.generatedAt?.toDate() || new Date()
        }
      })) as VaultCard[];
      
      setCards(cardsData);
    } catch (error) {
      console.error('Error loading vault cards:', error);
    }
    setLoading(false);
  };

  const generateCardFromImage = async (imageUrl: string, prompt: string, bookTitle?: string, chapterTitle?: string) => {
    if (!currentUser) return;

    const rarities = ['common', 'rare', 'ultra-rare', 'mythic'];
    const weights = [60, 25, 12, 3]; // Percentage chances
    const random = Math.random() * 100;
    let rarity: VaultCard['rarity'] = 'common';
    
    let cumulative = 0;
    for (let i = 0; i < weights.length; i++) {
      cumulative += weights[i];
      if (random <= cumulative) {
        rarity = rarities[i] as VaultCard['rarity'];
        break;
      }
    }

    const cardId = `ART-${Date.now().toString(36).toUpperCase()}`;
    const glyphs = generateHiddenGlyphs();
    const vaultSignature = generateVaultSignature();

    const newCard: Omit<VaultCard, 'id'> = {
      cardId,
      title: chapterTitle || `Generated Art ${cards.length + 1}`,
      imageUrl,
      rarity,
      glyphs,
      vaultSignature,
      metadata: {
        bookTitle,
        chapterTitle,
        prompt,
        generatedAt: new Date()
      }
    };

    try {
      await addDoc(collection(db, 'vault-cards'), {
        ...newCard,
        userId: currentUser.uid
      });
      
      toast.success(`🎴 New ${rarity} Vault Card generated!`);
      loadUserCards();
    } catch (error) {
      console.error('Error creating vault card:', error);
    }
  };

  const generateHiddenGlyphs = (): string[] => {
    const glyphPool = ['⚡', '🔮', '✨', '🌟', '💫', '🎭', '🗡️', '🛡️', '👑', '💎'];
    const count = Math.floor(Math.random() * 3) + 1;
    return Array.from({ length: count }, () => 
      glyphPool[Math.floor(Math.random() * glyphPool.length)]
    );
  };

  const generateVaultSignature = (): string => {
    const signatures = [
      'Forged in the Vault',
      'Born of Digital Dreams',
      'Crystallized Imagination',
      'Essence of Creation',
      'Mystronium Blessed'
    ];
    return signatures[Math.floor(Math.random() * signatures.length)];
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-500 shadow-gray-500/20';
      case 'rare': return 'border-blue-500 shadow-blue-500/20';
      case 'ultra-rare': return 'border-purple-500 shadow-purple-500/20';
      case 'mythic': return 'border-yellow-500 shadow-yellow-500/20';
      default: return 'border-gray-500 shadow-gray-500/20';
    }
  };

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'common': return <Star className="w-4 h-4 text-gray-400" />;
      case 'rare': return <Sparkles className="w-4 h-4 text-blue-400" />;
      case 'ultra-rare': return <Crown className="w-4 h-4 text-purple-400" />;
      case 'mythic': return <Gem className="w-4 h-4 text-yellow-400" />;
      default: return <Star className="w-4 h-4 text-gray-400" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-400"></div>
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
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4">🎴 Vault Collection</h1>
            <p className="text-gray-400">Your AI-generated art transformed into collectible cards</p>
            <div className="mt-4 text-sm text-gray-400">
              Total Cards: {cards.length}
            </div>
          </div>

          {cards.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🎨</div>
              <h3 className="text-xl font-bold text-white mb-2">No Vault Cards Yet</h3>
              <p className="text-gray-400 mb-6">
                Generate art with Vault Engine to automatically create collectible cards
              </p>
              <a
                href="/vault"
                className="inline-flex items-center bg-gradient-to-r from-cyan-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-cyan-700 hover:to-blue-700 transition-all"
              >
                Create Your First Card
              </a>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {cards.map((card, index) => (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  className={`bg-gray-800/50 backdrop-blur-sm rounded-xl border-2 ${getRarityColor(card.rarity)} overflow-hidden hover:scale-105 transition-all duration-300`}
                >
                  <div className="relative">
                    <img 
                      src={card.imageUrl} 
                      alt={card.title}
                      className="w-full h-48 object-cover"
                    />
                    
                    {/* Prime Glyph Watermark */}
                    <div className="absolute bottom-2 right-2 opacity-30">
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-white">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                        <path d="M8 12l2 2 4-4" stroke="currentColor" strokeWidth="2"/>
                      </svg>
                    </div>

                    <div className="absolute top-2 left-2 flex items-center space-x-1 bg-black/70 px-2 py-1 rounded">
                      {getRarityIcon(card.rarity)}
                      <span className="text-xs font-medium capitalize">{card.rarity.replace('-', ' ')}</span>
                    </div>
                  </div>

                  <div className="p-4">
                    <h3 className="text-white font-bold text-sm mb-1">{card.title}</h3>
                    <p className="text-gray-400 text-xs mb-2">#{card.cardId}</p>
                    
                    <div className="mb-3">
                      <p className="text-gray-300 text-xs line-clamp-2">{card.metadata.prompt}</p>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <div className="flex space-x-1">
                        {card.glyphs.map((glyph, i) => (
                          <span key={i} className="text-purple-400">{glyph}</span>
                        ))}
                      </div>
                      <span className="text-gray-500">
                        {card.metadata.generatedAt.toLocaleDateString()}
                      </span>
                    </div>

                    <div className="mt-2 text-center">
                      <p className="text-purple-300 text-xs italic">{card.vaultSignature}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Rarity Guide */}
          <motion.div
            className="mt-12 bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <h2 className="text-xl font-bold text-white mb-4">Rarity Guide</h2>
            <div className="grid md:grid-cols-4 gap-4">
              <div className="text-center">
                <Star className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                <h3 className="text-white font-medium">Common</h3>
                <p className="text-gray-400 text-sm">60% chance</p>
              </div>
              <div className="text-center">
                <Sparkles className="w-6 h-6 text-blue-400 mx-auto mb-2" />
                <h3 className="text-white font-medium">Rare</h3>
                <p className="text-gray-400 text-sm">25% chance</p>
              </div>
              <div className="text-center">
                <Crown className="w-6 h-6 text-purple-400 mx-auto mb-2" />
                <h3 className="text-white font-medium">Ultra Rare</h3>
                <p className="text-gray-400 text-sm">12% chance</p>
              </div>
              <div className="text-center">
                <Gem className="w-6 h-6 text-yellow-400 mx-auto mb-2" />
                <h3 className="text-white font-medium">Mythic</h3>
                <p className="text-gray-400 text-sm">3% chance</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default VaultCards;