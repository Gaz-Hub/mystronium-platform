import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, Palette, Mic, Scroll, User, Crown, Sparkles, ArrowRight, Zap } from 'lucide-react';

const Home = () => {
  const { currentUser } = useAuth();

  const tools = [
    {
      id: 'ghostscribe',
      name: 'Ghostscribe™',
      icon: '👻',
      tagline: 'AI Book Writing Engine',
      description: 'Summon stories from the digital ether. Channel the power of GPT-4o to forge epic narratives.',
      lore: 'The Ghostscribe whispers forgotten tales through quantum algorithms.',
      color: 'from-purple-600 to-blue-600',
      hoverColor: 'from-purple-700 to-blue-700',
      link: '/ghostscribe',
      preview: 'Once upon a time, in a realm where code and creativity merged...'
    },
    {
      id: 'vault',
      name: 'Vault Engine™',
      icon: '🎨',
      tagline: 'Visual Art Generation',
      description: 'Transmute imagination into stunning visuals. Each creation becomes a collectible Vault Card.',
      lore: 'The Vault holds infinite artistic possibilities, guarded by ancient glyphs.',
      color: 'from-cyan-600 to-blue-600',
      hoverColor: 'from-cyan-700 to-blue-700',
      link: '/vault',
      preview: 'Generating mystical artwork with ethereal lighting and cosmic energy...'
    },
    {
      id: 'narrata',
      name: 'Narrata™',
      icon: '🎙️',
      tagline: 'AI Voice Synthesis',
      description: 'Breathe life into your words. Transform text into captivating voice narrations.',
      lore: 'The Voice of Narrata echoes through digital dimensions, speaking truths untold.',
      color: 'from-amber-600 to-orange-600',
      hoverColor: 'from-amber-700 to-orange-700',
      link: '/narrata',
      preview: '🎵 ∿∿∿ Voice synthesis in progress ∿∿∿ 🎵'
    },
    {
      id: 'codex',
      name: 'The Codex™',
      icon: '📜',
      tagline: 'Lore Builder & Universe Forge',
      description: 'Weave the fabric of your creative universe. Track characters, events, and hidden connections.',
      lore: 'The Codex remembers all—past, present, and futures yet unwritten.',
      color: 'from-green-600 to-emerald-600',
      hoverColor: 'from-green-700 to-emerald-700',
      link: '/codex',
      preview: 'Character: The Archivist | Location: Digital Sanctum | Event: The Great Convergence'
    },
    {
      id: 'archivist',
      name: 'The Archivist™',
      icon: '🧙‍♂️',
      tagline: 'NPC Exchange System',
      description: 'Trade rare Vault Cards with the mysterious Keeper of Secrets. Unlock hidden knowledge.',
      lore: 'The Archivist dwells between worlds, offering power to those who prove worthy.',
      color: 'from-purple-600 to-pink-600',
      hoverColor: 'from-purple-700 to-pink-700',
      link: '/archivist',
      preview: '"Bring me three rare cards, and I shall reveal the secrets of creation..."'
    },
    {
      id: 'bookstore',
      name: 'The Bookstore™',
      icon: '📚',
      tagline: 'Creator Marketplace',
      description: 'Discover and acquire legendary tomes crafted by fellow creators. Support the community.',
      lore: 'Where digital dreams become tangible treasures, traded among the enlightened.',
      color: 'from-blue-600 to-indigo-600',
      hoverColor: 'from-blue-700 to-indigo-700',
      link: '/bookstore',
      preview: 'Featured: "Chronicles of the Digital Realm" by VaultMaster_42'
    },
    {
      id: 'comics',
      name: 'Comic Builder™',
      icon: '🎬',
      tagline: 'Visual Story Creation',
      description: 'Transform your books into stunning visual comics. Panel by panel, scene by scene.',
      lore: 'Where written words transcend into visual poetry, frame by frame.',
      color: 'from-pink-600 to-purple-600',
      hoverColor: 'from-pink-700 to-purple-700',
      link: '/comics',
      preview: 'Panel 1: Hero discovers ancient artifact | Panel 2: Magic awakens...'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-blue-900/10 to-indigo-900/20" />
        
        {/* Floating Glyphs */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-purple-400/10 text-4xl font-bold"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.1, 0.3, 0.1],
              rotate: [0, 360],
            }}
            transition={{
              duration: 15 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            {['⚡', '🔮', '✨', '🌟', '💫', '🎭', '👑', '💎'][i % 8]}
          </motion.div>
        ))}

        {/* Prime Glyph Watermark */}
        <div className="absolute bottom-8 right-8 opacity-5">
          <svg width="120" height="120" viewBox="0 0 120 120" className="text-gold">
            <circle cx="60" cy="60" r="50" stroke="currentColor" strokeWidth="3" fill="none"/>
            <circle cx="60" cy="60" r="30" stroke="currentColor" strokeWidth="2" fill="none"/>
            <path d="M40 60l15 15 25-25" stroke="currentColor" strokeWidth="3" fill="none"/>
            <text x="60" y="100" textAnchor="middle" className="text-xs fill-current">MYSTRONIUM</text>
          </svg>
        </div>
      </div>

      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-6">
          <div className="text-center max-w-6xl mx-auto">
            {/* Prime Glyph Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="mb-8"
            >
              <div className="relative inline-block">
                <svg width="150" height="150" viewBox="0 0 150 150" className="text-gold drop-shadow-2xl">
                  <defs>
                    <linearGradient id="glowGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFD700" />
                      <stop offset="50%" stopColor="#00F0FF" />
                      <stop offset="100%" stopColor="#FFD700" />
                    </linearGradient>
                    <filter id="glow">
                      <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                      <feMerge> 
                        <feMergeNode in="coloredBlur"/>
                        <feMergeNode in="SourceGraphic"/>
                      </feMerge>
                    </filter>
                  </defs>
                  <circle cx="75" cy="75" r="65" stroke="url(#glowGradient)" strokeWidth="4" fill="none" filter="url(#glow)"/>
                  <circle cx="75" cy="75" r="40" stroke="url(#glowGradient)" strokeWidth="3" fill="none" filter="url(#glow)"/>
                  <path d="M50 75l20 20 30-30" stroke="url(#glowGradient)" strokeWidth="4" fill="none" filter="url(#glow)"/>
                </svg>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  animate={{
                    boxShadow: [
                      "0 0 20px rgba(255, 215, 0, 0.3)",
                      "0 0 40px rgba(0, 240, 255, 0.5)",
                      "0 0 20px rgba(255, 215, 0, 0.3)"
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="text-8xl font-bold mb-6 bg-gradient-to-r from-gold via-cyan-400 to-gold bg-clip-text text-transparent"
              style={{ fontFamily: 'serif' }}
            >
              MYSTRONIUM™
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
              className="mb-8"
            >
              <p className="text-3xl text-gray-300 mb-4 font-light">
                Forge your legacy in the digital realm
              </p>
              <div className="flex items-center justify-center space-x-4 text-xl text-gold">
                <span className="font-bold">Nothing</span>
                <ArrowRight className="w-6 h-6" />
                <span className="font-bold">Book</span>
                <ArrowRight className="w-6 h-6" />
                <span className="font-bold">Art</span>
                <ArrowRight className="w-6 h-6" />
                <span className="font-bold">Voice</span>
                <ArrowRight className="w-6 h-6" />
                <span className="font-bold">Collectibles</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.8 }}
              className="mb-12"
            >
              {currentUser ? (
                <Link
                  to="/dashboard"
                  className="inline-flex items-center bg-gradient-to-r from-gold to-cyan-400 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-cyan-300 transition-all transform hover:scale-105 shadow-2xl"
                >
                  <Crown className="mr-2 w-6 h-6" />
                  Enter the Vault
                </Link>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/register"
                    className="inline-flex items-center bg-gradient-to-r from-gold to-cyan-400 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-cyan-300 transition-all transform hover:scale-105 shadow-2xl"
                  >
                    <Sparkles className="mr-2 w-6 h-6" />
                    Begin Your Journey
                  </Link>
                  <Link
                    to="/login"
                    className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-700/50 transition-all border border-gray-600"
                  >
                    <User className="mr-2 w-6 h-6" />
                    Login to Vault
                  </Link>
                </div>
              )}
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.8 }}
              className="text-gray-400 italic"
            >
              "Powered by the Vault Engine™ • Where imagination becomes reality"
            </motion.p>
          </div>
        </section>

        {/* Tools Section */}
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-5xl font-bold text-white mb-4">
                The Creator's Arsenal
              </h2>
              <p className="text-xl text-gray-400">
                Summon your Glyphs • Decode forgotten lore • Transcend the ordinary
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {tools.map((tool, index) => (
                <motion.div
                  key={tool.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.8 }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="group"
                >
                  <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-700 hover:border-gold/50 transition-all duration-300 h-full relative overflow-hidden">
                    {/* Hover Glow Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-10 transition-opacity duration-300" 
                         style={{ background: `linear-gradient(135deg, ${tool.color.split(' ')[1]}, ${tool.color.split(' ')[3]})` }} />
                    
                    <div className="relative z-10">
                      <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                        {tool.icon}
                      </div>
                      
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-gold transition-colors">
                        {tool.name}
                      </h3>
                      
                      <p className="text-gold text-sm font-medium mb-3">
                        {tool.tagline}
                      </p>
                      
                      <p className="text-gray-300 mb-4 leading-relaxed">
                        {tool.description}
                      </p>
                      
                      <div className="bg-gray-800/50 p-3 rounded-lg mb-4 border-l-4 border-purple-500">
                        <p className="text-purple-300 text-sm italic">
                          {tool.lore}
                        </p>
                      </div>

                      {/* Preview */}
                      <div className="bg-black/30 p-3 rounded-lg mb-6 font-mono text-xs text-cyan-400">
                        {tool.preview}
                      </div>
                      
                      <Link
                        to={tool.link}
                        className={`inline-flex items-center bg-gradient-to-r ${tool.color} text-white px-6 py-3 rounded-lg font-medium hover:${tool.hoverColor} transition-all transform group-hover:scale-105 shadow-lg w-full justify-center`}
                      >
                        <Zap className="mr-2 w-4 h-4" />
                        Launch {tool.name.split('™')[0]}
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 backdrop-blur-sm p-12 rounded-xl border border-gold/30">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Forge Your Legacy?
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Join thousands of creators who have already transcended the ordinary. 
                Your imagination is the only limit in the MYSTRONIUM™ universe.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                {!currentUser && (
                  <Link
                    to="/register"
                    className="inline-flex items-center bg-gradient-to-r from-gold to-cyan-400 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-400 hover:to-cyan-300 transition-all transform hover:scale-105"
                  >
                    <Crown className="mr-2 w-6 h-6" />
                    Claim Your Power
                  </Link>
                )}
                <Link
                  to="/about"
                  className="inline-flex items-center bg-gray-800/50 backdrop-blur-sm text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-700/50 transition-all border border-gray-600"
                >
                  <BookOpen className="mr-2 w-6 h-6" />
                  Learn the Lore
                </Link>
              </div>
            </div>
          </motion.div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900/80 backdrop-blur-sm border-t border-gray-700 mt-20">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <svg width="40" height="40" viewBox="0 0 40 40" className="text-gold mr-3">
                  <circle cx="20" cy="20" r="18" stroke="currentColor" strokeWidth="2" fill="none"/>
                  <path d="M12 20l6 6 10-10" stroke="currentColor" strokeWidth="2"/>
                </svg>
                <h3 className="text-white font-bold text-xl">MYSTRONIUM™</h3>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                The ultimate AI-powered creative platform for writers, artists, and digital alchemists.
              </p>
              <p className="text-gold text-xs">
                © 2025 MYSTRONIUM™ Platform. All rights reserved.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">The Arsenal</h4>
              <div className="space-y-2">
                <Link to="/ghostscribe" className="block text-gray-400 hover:text-gold transition-colors text-sm">👻 Ghostscribe™</Link>
                <Link to="/vault" className="block text-gray-400 hover:text-gold transition-colors text-sm">🎨 Vault Engine™</Link>
                <Link to="/narrata" className="block text-gray-400 hover:text-gold transition-colors text-sm">🎙️ Narrata™</Link>
                <Link to="/codex" className="block text-gray-400 hover:text-gold transition-colors text-sm">📜 The Codex™</Link>
                <Link to="/archivist" className="block text-gray-400 hover:text-gold transition-colors text-sm">🧙‍♂️ The Archivist™</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">The Marketplace</h4>
              <div className="space-y-2">
                <Link to="/bookstore" className="block text-gray-400 hover:text-gold transition-colors text-sm">📚 Bookstore</Link>
                <Link to="/credit-shop" className="block text-gray-400 hover:text-gold transition-colors text-sm">⚡ Credit Shop</Link>
                <Link to="/creator-backend" className="block text-gray-400 hover:text-gold transition-colors text-sm">⚡ Creator Backend</Link>
                <Link to="/vault-cards" className="block text-gray-400 hover:text-gold transition-colors text-sm">🎴 Vault Cards</Link>
                <Link to="/vault-crates" className="block text-gray-400 hover:text-gold transition-colors text-sm">📦 Vault Crates</Link>
                <Link to="/codex-fusion" className="block text-gray-400 hover:text-gold transition-colors text-sm">🧬 Codex Fusion</Link>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-4">The Sanctum</h4>
              <div className="space-y-2">
                <Link to="/about" className="block text-gray-400 hover:text-gold transition-colors text-sm">📖 The Lore</Link>
                <Link to="/how-it-works" className="block text-gray-400 hover:text-gold transition-colors text-sm">🔮 How It Works</Link>
                <Link to="/contact" className="block text-gray-400 hover:text-gold transition-colors text-sm">📬 Contact</Link>
                <Link to="/store" className="block text-gray-400 hover:text-gold transition-colors text-sm">👑 Subscription Plans</Link>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center">
            <p className="text-gray-400 text-sm">
              Powered by the Vault Engine™ • Built for Creators • Forged in Digital Fire
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;