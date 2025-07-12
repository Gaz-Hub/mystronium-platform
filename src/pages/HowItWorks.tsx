import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, Palette, Mic, Scroll, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      title: "Start with Ghostscribe",
      description: "Use our AI-powered writing engine to generate compelling chapters, develop characters, and craft your story.",
      icon: <BookOpen className="w-8 h-8 text-purple-400" />,
      link: "/ghostscribe"
    },
    {
      number: 2,
      title: "Create Visual Art",
      description: "Generate stunning book covers, character art, and scene illustrations with Vault Engine's AI image generation.",
      icon: <Palette className="w-8 h-8 text-cyan-400" />,
      link: "/vault"
    },
    {
      number: 3,
      title: "Add Voice Narration",
      description: "Transform your text into professional voice narrations using Narrata's advanced AI voice synthesis.",
      icon: <Mic className="w-8 h-8 text-amber-400" />,
      link: "/narrata"
    },
    {
      number: 4,
      title: "Build Your Universe",
      description: "Use Codex Forge to organize lore, track characters, and build comprehensive world documentation.",
      icon: <Scroll className="w-8 h-8 text-green-400" />,
      link: "/codex"
    },
    {
      number: 5,
      title: "Publish & Earn",
      description: "List your completed works in the MYSTRONIUM Bookstore and start earning from your creativity.",
      icon: <ShoppingBag className="w-8 h-8 text-pink-400" />,
      link: "/creator-backend"
    }
  ];

  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-white mb-4">How MYSTRONIUM™ Works</h1>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              From initial idea to published masterpiece - here's how our AI-powered platform 
              transforms your creativity into professional content.
            </p>
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                className={`flex items-center gap-8 ${
                  index % 2 === 1 ? 'flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1 bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600">
                  <div className="flex items-center mb-4">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg mr-4">
                      {step.number}
                    </div>
                    <div className="mr-4">{step.icon}</div>
                    <h2 className="text-2xl font-bold text-white">{step.title}</h2>
                  </div>
                  
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {step.description}
                  </p>
                  
                  <Link
                    to={step.link}
                    className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-blue-700 transition-all"
                  >
                    Try {step.title.split(' ')[step.title.split(' ').length - 1]}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden lg:block">
                    <ArrowRight className="w-8 h-8 text-gray-600" />
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {/* Example Workflow */}
          <motion.div
            className="mt-16 bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-6 text-center">Example: Creating "The Dragon's Quest"</h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-purple-400 font-bold mb-2">📝 Ghostscribe</h3>
                <p className="text-gray-300 text-sm">
                  "Write a fantasy chapter about a young mage discovering an ancient dragon's lair..."
                  → Generated 2,000-word compelling chapter
                </p>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-cyan-400 font-bold mb-2">🎨 Vault Engine</h3>
                <p className="text-gray-300 text-sm">
                  "Ancient dragon in crystal cave, fantasy art, epic scale..."
                  → Generated stunning book cover and character art
                </p>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-amber-400 font-bold mb-2">🎙️ Narrata</h3>
                <p className="text-gray-300 text-sm">
                  Converted the chapter text into professional voice narration
                  → 15-minute audio book sample
                </p>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-green-400 font-bold mb-2">📜 Codex Forge</h3>
                <p className="text-gray-300 text-sm">
                  Organized character profiles, world lore, and magic system
                  → Comprehensive universe documentation
                </p>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-pink-400 font-bold mb-2">🛍️ Marketplace</h3>
                <p className="text-gray-300 text-sm">
                  Published complete book with cover art and audio samples
                  → Earning £4.99 per sale (80% creator share)
                </p>
              </div>

              <div className="bg-gray-700/50 p-4 rounded-lg">
                <h3 className="text-blue-400 font-bold mb-2">📈 Results</h3>
                <p className="text-gray-300 text-sm">
                  Professional fantasy novel created in hours, not months
                  → Ready for publication and monetization
                </p>
              </div>
            </div>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            className="mt-12 text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-8 rounded-xl border border-purple-500/30"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-white mb-4">Ready to Start Creating?</h2>
            <p className="text-gray-300 mb-6">
              Join thousands of creators who are already using MYSTRONIUM™ to bring their stories to life.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all"
              >
                Start Creating Free
              </Link>
              <Link
                to="/store"
                className="bg-gray-700 text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-600 transition-all"
              >
                View Pricing
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default HowItWorks;