import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground: React.FC = () => {
  const glyphs = [
    // Anunnaki-inspired glyphs
    "⚡", "🌀", "🔮", "⚔️", "🛡️", "⚜️", "🔱", "⚙️", "🔮", "⚔️",
    // Mystical symbols
    "☯️", "☸️", "☮️", "☪️", "✡️", "☦️", "☨️", "☩️", "☫️", "☬️",
    // Tech glyphs
    "⚛️", "⚜️", "⚝️", "⚞️", "⚟️", "⚡", "⚢️", "⚣️", "⚤️", "⚥️"
  ];

  return (
    <div className="bg-glyphs">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-blue-900/20 to-purple-900/20" />
      
      {/* Floating glyphs */}
      {glyphs.map((glyph, index) => (
        <motion.div
          key={index}
          className="glyph text-4xl text-blue-400/20"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.1, 1],
            rotate: [0, 360]
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 4}s`
          }}
        >
          {glyph}
        </motion.div>
      ))}

      {/* Animated grid lines */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" className="absolute inset-0">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating particles */}
      {Array.from({ length: 20 }).map((_, index) => (
        <motion.div
          key={`particle-${index}`}
          className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0
          }}
          animate={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: [0, 1, 0]
          }}
          transition={{
            duration: 10 + Math.random() * 10,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear"
          }}
        />
      ))}

      {/* Energy waves */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 border border-blue-400/20 rounded-full"
          animate={{
            scale: [1, 2, 1],
            opacity: [0.3, 0, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-64 h-64 border border-purple-400/20 rounded-full"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.2, 0, 0.2]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Spiral patterns */}
      <div className="absolute top-1/4 right-1/4 w-32 h-32">
        <motion.svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          <path
            d="M50 50 Q75 25 50 0 Q25 25 50 50 Q75 75 50 100 Q25 75 50 50"
            fill="none"
            stroke="url(#spiralGradient)"
            strokeWidth="1"
            opacity="0.3"
          />
          <defs>
            <linearGradient id="spiralGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#A78BFA" stopOpacity="0.5" />
            </linearGradient>
          </defs>
        </motion.svg>
      </div>

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-32 h-32 border-l-2 border-t-2 border-blue-400/30" />
      <div className="absolute top-0 right-0 w-32 h-32 border-r-2 border-t-2 border-purple-400/30" />
      <div className="absolute bottom-0 left-0 w-32 h-32 border-l-2 border-b-2 border-purple-400/30" />
      <div className="absolute bottom-0 right-0 w-32 h-32 border-r-2 border-b-2 border-blue-400/30" />
    </div>
  );
};

export default AnimatedBackground;