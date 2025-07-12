import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Users, Zap, Target } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-white mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
              About MYSTRONIUM™
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              The ultimate AI-powered platform that helps creators go from nothing → book → cartoon.
              Built for visionaries, dreamers, and future mythmakers.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Sparkles className="mr-3 w-6 h-6 text-purple-400" />
                Our Mission
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                MYSTRONIUM™ democratizes creative content creation by putting the power of advanced AI 
                directly into the hands of storytellers, artists, and creators worldwide.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We believe that everyone has stories to tell, worlds to build, and characters to bring to life. 
                Our platform removes the technical barriers and empowers pure creativity.
              </p>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <Target className="mr-3 w-6 h-6 text-blue-400" />
                Our Vision
              </h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                To create a world where anyone can transform their imagination into professional-quality 
                books, artwork, and multimedia content using the power of AI.
              </p>
              <p className="text-gray-300 leading-relaxed">
                We're building the future of creative expression, where technology amplifies human 
                creativity rather than replacing it.
              </p>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600 mb-12">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">What Makes Us Different</h2>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-purple-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-purple-400" />
                </div>
                <h3 className="text-white font-bold mb-2">All-in-One Platform</h3>
                <p className="text-gray-400 text-sm">
                  From writing to art to voice - everything you need in one integrated platform
                </p>
              </div>

              <div className="text-center">
                <div className="bg-cyan-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-cyan-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Creator-First</h3>
                <p className="text-gray-400 text-sm">
                  Built by creators, for creators. We understand the creative process
                </p>
              </div>

              <div className="text-center">
                <div className="bg-green-600/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-green-400" />
                </div>
                <h3 className="text-white font-bold mb-2">Cutting-Edge AI</h3>
                <p className="text-gray-400 text-sm">
                  Latest AI models including GPT-4o, SDXL, and ElevenLabs for professional results
                </p>
              </div>
            </div>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600 mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">Our Tools</h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="text-3xl">👻</div>
                <div>
                  <h3 className="text-white font-bold mb-1">Ghostscribe™</h3>
                  <p className="text-gray-300">AI-powered book writing engine that helps you craft compelling narratives, develop characters, and build entire worlds.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-3xl">🎨</div>
                <div>
                  <h3 className="text-white font-bold mb-1">Vault Engine</h3>
                  <p className="text-gray-300">Generate stunning visual art, book covers, character designs, and scene illustrations with state-of-the-art AI.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-3xl">🎙️</div>
                <div>
                  <h3 className="text-white font-bold mb-1">Narrata</h3>
                  <p className="text-gray-300">Transform your written content into professional voice narrations with customizable AI voices.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="text-3xl">📜</div>
                <div>
                  <h3 className="text-white font-bold mb-1">Codex Forge</h3>
                  <p className="text-gray-300">Build comprehensive lore, track character development, and organize your creative universe.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 p-8 rounded-xl border border-purple-500/30">
            <h2 className="text-2xl font-bold text-white mb-4">Join the Creative Revolution</h2>
            <p className="text-gray-300 mb-6">
              Thousands of creators are already using MYSTRONIUM™ to bring their stories to life. 
              What will you create?
            </p>
            <div className="text-4xl mb-4">🔮✨🚀</div>
            <p className="text-purple-300 font-medium">
              Welcome to the Vault. Your imagination is the only limit.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;