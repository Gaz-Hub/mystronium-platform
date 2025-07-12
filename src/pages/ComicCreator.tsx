import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useUser } from '../contexts/UserContext';
import { BookOpen, Image, Type, Layout, Download, Wand2 } from 'lucide-react';
import toast from 'react-hot-toast';
import ProtectedRoute from '../components/ProtectedRoute';

interface ComicPanel {
  id: string;
  text: string;
  imagePrompt: string;
  imageUrl?: string;
  position: { x: number; y: number; width: number; height: number };
}

const ComicCreator = () => {
  const { userProfile } = useUser();
  const [panels, setPanels] = useState<ComicPanel[]>([]);
  const [selectedPanel, setSelectedPanel] = useState<ComicPanel | null>(null);
  const [comicTitle, setComicTitle] = useState('Untitled Comic');
  const [loading, setLoading] = useState(false);

  const addPanel = () => {
    const newPanel: ComicPanel = {
      id: Date.now().toString(),
      text: '',
      imagePrompt: '',
      position: {
        x: Math.random() * 400,
        y: Math.random() * 300,
        width: 200,
        height: 150
      }
    };
    setPanels([...panels, newPanel]);
    setSelectedPanel(newPanel);
  };

  const updatePanel = (id: string, updates: Partial<ComicPanel>) => {
    setPanels(panels.map(panel => 
      panel.id === id ? { ...panel, ...updates } : panel
    ));
    if (selectedPanel?.id === id) {
      setSelectedPanel({ ...selectedPanel, ...updates });
    }
  };

  const deletePanel = (id: string) => {
    setPanels(panels.filter(panel => panel.id !== id));
    if (selectedPanel?.id === id) {
      setSelectedPanel(null);
    }
  };

  const generatePanelImage = async (panel: ComicPanel) => {
    if (!panel.imagePrompt.trim()) {
      toast.error('Please enter an image prompt');
      return;
    }

    if (userProfile?.subscription === 'free') {
      toast.error('Comic Creator requires Premium or Creator Pro subscription');
      return;
    }

    setLoading(true);
    try {
      // Simulate image generation (replace with actual API call)
      setTimeout(() => {
        const mockImageUrl = `https://picsum.photos/400/300?random=${Date.now()}`;
        updatePanel(panel.id, { imageUrl: mockImageUrl });
        toast.success('Panel image generated!');
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.error('Error generating image:', error);
      toast.error('Failed to generate image');
      setLoading(false);
    }
  };

  const exportComic = () => {
    if (panels.length === 0) {
      toast.error('Add some panels first');
      return;
    }

    // Create a simple HTML export
    const comicHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>${comicTitle}</title>
          <style>
            body { font-family: Arial, sans-serif; background: #000; color: #fff; padding: 20px; }
            .comic-title { text-align: center; font-size: 2em; margin-bottom: 30px; }
            .panel { margin-bottom: 20px; border: 2px solid #333; padding: 10px; border-radius: 8px; }
            .panel img { max-width: 100%; height: auto; }
            .panel-text { margin-top: 10px; font-style: italic; }
          </style>
        </head>
        <body>
          <h1 class="comic-title">${comicTitle}</h1>
          ${panels.map(panel => `
            <div class="panel">
              ${panel.imageUrl ? `<img src="${panel.imageUrl}" alt="Panel image" />` : '<div style="background: #333; height: 200px; display: flex; align-items: center; justify-content: center;">No image generated</div>'}
              ${panel.text ? `<div class="panel-text">${panel.text}</div>` : ''}
            </div>
          `).join('')}
        </body>
      </html>
    `;

    const blob = new Blob([comicHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${comicTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success('Comic exported successfully!');
  };

  return (
    <ProtectedRoute>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <BookOpen className="mr-3 w-10 h-10 text-pink-400" />
              Comic Creator
            </h1>
            <p className="text-gray-400">Create visual stories with AI-generated panels</p>
            {userProfile?.subscription === 'free' && (
              <div className="mt-4 bg-pink-900/20 border border-pink-500 text-pink-400 p-3 rounded-lg inline-block">
                <p className="font-medium">Premium Feature</p>
                <p className="text-sm">Upgrade to Premium or Creator Pro to use Comic Creator</p>
              </div>
            )}
          </div>

          <div className="mb-6 text-center">
            <input
              type="text"
              value={comicTitle}
              onChange={(e) => setComicTitle(e.target.value)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-600 focus:border-pink-500 focus:outline-none text-center text-lg font-medium"
              placeholder="Enter comic title..."
            />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Comic Canvas */}
            <div className="lg:col-span-2">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-bold text-white flex items-center">
                    <Layout className="w-5 h-5 mr-2" />
                    Comic Canvas
                  </h2>
                  <div className="flex space-x-2">
                    <button
                      onClick={addPanel}
                      disabled={userProfile?.subscription === 'free'}
                      className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 disabled:opacity-50 transition-colors flex items-center"
                    >
                      <Image className="w-4 h-4 mr-1" />
                      Add Panel
                    </button>
                    <button
                      onClick={exportComic}
                      disabled={panels.length === 0}
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:opacity-50 transition-colors flex items-center"
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Export
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-lg h-96 relative overflow-hidden">
                  {panels.length === 0 ? (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      <div className="text-center">
                        <Layout className="w-16 h-16 mx-auto mb-4" />
                        <p>Click "Add Panel" to start creating your comic</p>
                      </div>
                    </div>
                  ) : (
                    panels.map((panel) => (
                      <motion.div
                        key={panel.id}
                        className={`absolute border-2 cursor-pointer ${
                          selectedPanel?.id === panel.id ? 'border-pink-500' : 'border-gray-400'
                        }`}
                        style={{
                          left: panel.position.x,
                          top: panel.position.y,
                          width: panel.position.width,
                          height: panel.position.height
                        }}
                        onClick={() => setSelectedPanel(panel)}
                        whileHover={{ scale: 1.02 }}
                      >
                        {panel.imageUrl ? (
                          <img 
                            src={panel.imageUrl} 
                            alt="Panel" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <Image className="w-8 h-8 text-gray-400" />
                          </div>
                        )}
                        {panel.text && (
                          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-1 text-xs">
                            {panel.text}
                          </div>
                        )}
                      </motion.div>
                    ))
                  )}
                </div>
              </div>
            </div>

            {/* Panel Editor */}
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Type className="w-5 h-5 mr-2" />
                  Panel Editor
                </h2>

                {selectedPanel ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-white font-medium mb-2">Panel Text</label>
                      <textarea
                        value={selectedPanel.text}
                        onChange={(e) => updatePanel(selectedPanel.id, { text: e.target.value })}
                        placeholder="Enter dialogue or narration..."
                        className="w-full h-20 bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-pink-500 focus:outline-none resize-none"
                      />
                    </div>

                    <div>
                      <label className="block text-white font-medium mb-2">Image Prompt</label>
                      <textarea
                        value={selectedPanel.imagePrompt}
                        onChange={(e) => updatePanel(selectedPanel.id, { imagePrompt: e.target.value })}
                        placeholder="Describe the scene for this panel..."
                        className="w-full h-20 bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-pink-500 focus:outline-none resize-none"
                      />
                    </div>

                    <button
                      onClick={() => generatePanelImage(selectedPanel)}
                      disabled={loading || !selectedPanel.imagePrompt.trim() || userProfile?.subscription === 'free'}
                      className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-pink-700 hover:to-purple-700 disabled:opacity-50 transition-all flex items-center justify-center"
                    >
                      {loading ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Generating...
                        </>
                      ) : (
                        <>
                          <Wand2 className="mr-2 w-4 h-4" />
                          Generate Image
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => deletePanel(selectedPanel.id)}
                      className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                    >
                      Delete Panel
                    </button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Type className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                    <p className="text-gray-500 italic">Select a panel to edit</p>
                  </div>
                )}
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-4 rounded-xl border border-gray-600">
                <h3 className="text-white font-medium mb-2">Comic Stats</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Panels:</span>
                    <span className="text-white">{panels.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">With Images:</span>
                    <span className="text-white">{panels.filter(p => p.imageUrl).length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">With Text:</span>
                    <span className="text-white">{panels.filter(p => p.text).length}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
};

export default ComicCreator;