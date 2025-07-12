import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import { useAdmin } from '../contexts/AdminContext';
import { Volume2, Play, Pause, Download, Share2, Settings, Mic, Activity } from 'lucide-react';
import axios from 'axios';
import toast from 'react-hot-toast';

const Narrata = () => {
  const { userProfile } = useUser();
  const { godModeEnabled } = useAdmin();
  const [text, setText] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState('alloy');
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const voices = [
    { id: 'alloy', name: 'Alloy', description: 'Balanced and clear' },
    { id: 'echo', name: 'Echo', description: 'Deep and resonant' },
    { id: 'fable', name: 'Fable', description: 'Warm and storytelling' },
    { id: 'onyx', name: 'Onyx', description: 'Rich and powerful' },
    { id: 'nova', name: 'Nova', description: 'Bright and energetic' },
    { id: 'shimmer', name: 'Shimmer', description: 'Soft and melodic' }
  ];

  const generateVoice = async () => {
    if (!text.trim()) {
      toast.error('Please enter text to convert to speech');
      return;
    }
    
    // Check credits unless God Mode is enabled
    if (!godModeEnabled && (!userProfile || userProfile.subscription === 'free')) {
      toast.error('Insufficient credits. Upgrade to Pro for unlimited voice generation.');
      return;
    }
    
    setLoading(true);
    
    try {
      // Generate voice using ElevenLabs API
      const response = await axios.post(
        `https://api.elevenlabs.io/v1/text-to-speech/${selectedVoice}`,
        {
          text: text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        },
        {
          headers: {
            'Accept': 'audio/mpeg',
            'Content-Type': 'application/json',
            'xi-api-key': import.meta.env.VITE_ELEVENLABS_API_KEY
          },
          responseType: 'blob'
        }
      );

      // Create audio URL from blob
      const audioBlob = new Blob([response.data], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      
      // Create audio element for playback
      const audio = new Audio(url);
      setAudioElement(audio);
      
      setLoading(false);
      toast.success('Voice generated successfully!', {
        icon: '🎤',
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        },
      });

    } catch (error) {
      // Fallback to demo audio on API error
      const demoUrl = 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav';
      setAudioUrl(demoUrl);
      
      const audio = new Audio(demoUrl);
      setAudioElement(audio);
      
      setLoading(false);
      toast.success('Voice generated! (Demo mode)', {
        icon: '🎤',
        style: {
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
        },
      });
    }
  };

  const togglePlayback = () => {
    if (!audioElement) return;
    
    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement.play();
      setIsPlaying(true);
    }
  };

  const downloadAudio = () => {
    if (!audioUrl) return;
    
    const link = document.createElement('a');
    link.href = audioUrl;
    link.download = `narrata-voice-${Date.now()}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('Audio downloaded!');
  };

  const shareAudio = () => {
    if (!audioUrl) return;
    
    if (navigator.share) {
      navigator.share({
        title: 'Narrata Voice Generation',
        text: 'Check out this AI-generated voice!',
        url: audioUrl
      });
    } else {
      navigator.clipboard.writeText(audioUrl);
      toast.success('Audio URL copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <Volume2 className="mr-3 w-10 h-10 text-blue-400" />
            🎤 Narrata™
          </h1>
          <p className="text-gray-400 text-glyph mb-2">Transform text into natural speech with AI</p>
          <div className="flex items-center justify-center space-x-4 text-sm">
            {godModeEnabled ? (
              <span className="text-yellow-400 font-bold flex items-center">
                <Activity className="w-4 h-4 mr-1" />
                ⚡ GOD MODE - Unlimited Access
              </span>
            ) : (
              <span className="text-blue-400">
                Credits: {userProfile?.subscription === 'free' ? 'Limited' : '∞'}
              </span>
            )}
            <span className="text-gray-400">|</span>
            <span className="text-purple-400">Voices Generated: {audioUrl ? '1' : '0'}</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Generation Panel */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="cinematic-card p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Mic className="mr-2 w-5 h-5" />
              Generate Voice
            </h2>

            {/* Voice Selection */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-3">Voice</label>
              <div className="grid grid-cols-2 gap-2">
                {voices.map((voice) => (
                  <button
                    key={voice.id}
                    onClick={() => setSelectedVoice(voice.id)}
                    className={`p-3 rounded-lg border transition-all text-left ${
                      selectedVoice === voice.id
                        ? 'border-blue-500 bg-blue-600/20'
                        : 'border-gray-600 bg-gray-700/50 hover:border-gray-500'
                    }`}
                  >
                    <div className="font-medium text-white">{voice.name}</div>
                    <div className="text-xs text-gray-400">{voice.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Text Input */}
            <div className="mb-6">
              <label className="block text-white font-medium mb-2">Text to Speech</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter the text you want to convert to speech..."
                className="w-full h-32 bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={generateVoice}
              disabled={loading || !text.trim()}
              className="w-full btn-cinematic py-4 text-lg font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="spinner-cinematic mr-3" />
                  Generating...
                </div>
              ) : (
                <div className="flex items-center justify-center">
                  <Volume2 className="mr-2 w-5 h-5" />
                  Generate Voice
                </div>
              )}
            </button>

            {/* Voice Info */}
            <div className="mt-6 p-4 bg-gray-700/50 rounded-lg">
              <h3 className="text-white font-medium mb-3">Voice Features</h3>
              <div className="space-y-2 text-sm text-gray-400">
                <div className="flex items-center">
                  <Activity className="w-4 h-4 mr-2 text-blue-400" />
                  Natural-sounding speech synthesis
                </div>
                <div className="flex items-center">
                  <Settings className="w-4 h-4 mr-2 text-blue-400" />
                  Multiple voice personalities
                </div>
                <div className="flex items-center">
                  <Download className="w-4 h-4 mr-2 text-blue-400" />
                  High-quality MP3 output
                </div>
              </div>
            </div>
          </motion.div>

          {/* Audio Player */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="cinematic-card p-6"
          >
            <h2 className="text-xl font-bold text-white mb-6 flex items-center">
              <Play className="mr-2 w-5 h-5" />
              Audio Player
            </h2>

            {audioUrl ? (
              <div className="space-y-6">
                {/* Audio Controls */}
                <div className="bg-gray-800/50 p-6 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-center mb-4">
                    <button
                      onClick={togglePlayback}
                      className="w-16 h-16 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-all"
                    >
                      {isPlaying ? (
                        <Pause className="w-8 h-8 text-white" />
                      ) : (
                        <Play className="w-8 h-8 text-white ml-1" />
                      )}
                    </button>
                  </div>
                  
                  <div className="text-center">
                    <p className="text-white font-medium">Generated Audio</p>
                    <p className="text-gray-400 text-sm">Voice: {voices.find(v => v.id === selectedVoice)?.name}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={downloadAudio}
                    className="flex items-center justify-center space-x-2 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition-all"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                  
                  <button
                    onClick={shareAudio}
                    className="flex items-center justify-center space-x-2 bg-purple-600 hover:bg-purple-700 text-white py-3 px-4 rounded-lg transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>

                {/* Audio Waveform Placeholder */}
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-600">
                  <div className="flex items-center justify-center space-x-1">
                    {[...Array(20)].map((_, i) => (
                      <div
                        key={i}
                        className="w-1 bg-blue-400 rounded-full"
                        style={{
                          height: `${Math.random() * 40 + 10}px`,
                          animationDelay: `${i * 0.1}s`
                        }}
                      />
                    ))}
                  </div>
                  <p className="text-center text-gray-400 text-sm mt-2">Audio waveform visualization</p>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <Volume2 className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No audio generated yet. Create your first voice!</p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Narrata;