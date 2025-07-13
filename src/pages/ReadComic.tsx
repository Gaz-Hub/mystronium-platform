import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface ComicPanel {
  id: string;
  imageUrl: string;
  text?: string;
  speechBubbles?: Array<{
    text: string;
    x: number;
    y: number;
    character?: string;
  }>;
}

interface Comic {
  id: string;
  title: string;
  author: string;
  description: string;
  panels: ComicPanel[];
}

const ReadComic = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [comic, setComic] = useState<Comic | null>(null);
  const [currentPanel, setCurrentPanel] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock comic data - in real app, load from database
    const mockComic: Comic = {
      id: id || "1",
      title: "The Digital Realm Chronicles",
      author: "VaultMaster_42",
      description: "A mystical journey through the MYSTRONIUM universe",
      panels: [
        {
          id: "1",
          imageUrl: "https://picsum.photos/800/600?random=1",
          text: "In the beginning, there was only code...",
          speechBubbles: [
            {
              text: "Welcome to the Digital Realm",
              x: 50,
              y: 20,
              character: "Narrator",
            },
          ],
        },
        {
          id: "2",
          imageUrl: "https://picsum.photos/800/600?random=2",
          text: "The Vault Engine awakened...",
          speechBubbles: [
            {
              text: "I can feel the power flowing through me!",
              x: 30,
              y: 80,
              character: "Hero",
            },
          ],
        },
        {
          id: "3",
          imageUrl: "https://picsum.photos/800/600?random=3",
          text: "And creativity was born.",
          speechBubbles: [
            {
              text: "This is just the beginning...",
              x: 60,
              y: 30,
              character: "Hero",
            },
          ],
        },
      ],
    };

    setComic(mockComic);
    setLoading(false);
  }, [id]);

  const nextPanel = () => {
    if (comic && currentPanel < comic.panels.length - 1) {
      setCurrentPanel(currentPanel + 1);
    }
  };

  const prevPanel = () => {
    if (currentPanel > 0) {
      setCurrentPanel(currentPanel - 1);
    }
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") nextPanel();
    if (e.key === "ArrowLeft") prevPanel();
    if (e.key === "Escape") setFullscreen(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentPanel, comic]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-400"></div>
      </div>
    );
  }

  if (!comic) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Comic Not Found</h2>
          <p className="text-gray-400">
            The comic you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  const currentPanelData = comic.panels[currentPanel];

  return (
    <div
      className={`${fullscreen ? "fixed inset-0 z-50" : "min-h-screen"} bg-black text-white`}
    >
      {/* Header */}
      {!fullscreen && (
        <div className="bg-gray-900 border-b border-gray-700 px-6 py-4">
          <div className="max-w-6xl mx-auto flex items-center justify-between">
            <button
              onClick={() => navigate("/comics")}
              className="flex items-center text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Comics
            </button>

            <div className="text-center">
              <h1 className="text-xl font-bold text-white">{comic.title}</h1>
              <p className="text-gray-400 text-sm">by {comic.author}</p>
            </div>

            <div className="text-gray-400 text-sm">
              Panel {currentPanel + 1} of {comic.panels.length}
            </div>
          </div>
        </div>
      )}

      {/* Comic Panel */}
      <div
        className={`${fullscreen ? "h-full" : "min-h-[calc(100vh-80px)]"} flex items-center justify-center p-4`}
      >
        <div className="relative max-w-4xl w-full">
          <motion.div
            key={currentPanel}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-lg overflow-hidden shadow-2xl"
          >
            <img
              src={currentPanelData.imageUrl}
              alt={`Panel ${currentPanel + 1}`}
              className="w-full h-auto"
            />

            {/* Speech Bubbles */}
            {currentPanelData.speechBubbles?.map((bubble, index) => (
              <div
                key={index}
                className="absolute bg-white text-black p-3 rounded-lg shadow-lg border-2 border-gray-800 max-w-xs"
                style={{
                  left: `${bubble.x}%`,
                  top: `${bubble.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <p className="text-sm font-medium">{bubble.text}</p>
                {bubble.character && (
                  <p className="text-xs text-gray-600 mt-1">
                    - {bubble.character}
                  </p>
                )}
                {/* Speech bubble tail */}
                <div className="absolute bottom-0 left-1/2 transform translate-y-full -translate-x-1/2">
                  <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-transparent border-t-white"></div>
                </div>
              </div>
            ))}

            {/* Panel Text */}
            {currentPanelData.text && (
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 text-white p-3 rounded-lg">
                <p className="text-sm italic">{currentPanelData.text}</p>
              </div>
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <button
            onClick={prevPanel}
            disabled={currentPanel === 0}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <button
            onClick={nextPanel}
            disabled={currentPanel === comic.panels.length - 1}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-3 rounded-full hover:bg-black/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Fullscreen Toggle */}
          <button
            onClick={() => setFullscreen(!fullscreen)}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-lg hover:bg-black/70 transition-all"
          >
            {fullscreen ? (
              <Minimize2 className="w-4 h-4" />
            ) : (
              <Maximize2 className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      {!fullscreen && (
        <div className="bg-gray-900 border-t border-gray-700 px-6 py-4">
          <div className="max-w-6xl mx-auto">
            {/* Progress Bar */}
            <div className="w-full bg-gray-700 rounded-full h-2 mb-4">
              <div
                className="bg-pink-600 h-2 rounded-full transition-all duration-300"
                style={{
                  width: `${((currentPanel + 1) / comic.panels.length) * 100}%`,
                }}
              ></div>
            </div>

            {/* Panel Thumbnails */}
            <div className="flex space-x-2 justify-center overflow-x-auto">
              {comic.panels.map((panel, index) => (
                <button
                  key={panel.id}
                  onClick={() => setCurrentPanel(index)}
                  className={`flex-shrink-0 w-16 h-12 rounded border-2 overflow-hidden transition-all ${
                    currentPanel === index
                      ? "border-pink-500 scale-110"
                      : "border-gray-600 hover:border-gray-400"
                  }`}
                >
                  <img
                    src={panel.imageUrl}
                    alt={`Panel ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReadComic;
