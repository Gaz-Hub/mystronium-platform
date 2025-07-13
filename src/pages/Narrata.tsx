import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import axios from "axios";
import toast from "react-hot-toast";

const Narrata = () => {
  const { currentUser } = useAuth();
  const { userProfile } = useUser();
  const [text, setText] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const generateSpeech = async () => {
    if (!text.trim()) return;

    if (!currentUser) {
      toast.error("Please log in to use Narrata");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",
        {
          text: text,
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
            style: 0.3,
            use_speaker_boost: true,
          },
        },
        {
          headers: {
            "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY,
            "Content-Type": "application/json",
          },
          responseType: "blob",
        },
      );

      const audioBlob = new Blob([response.data], { type: "audio/mpeg" });
      const audioUrl = URL.createObjectURL(audioBlob);
      setAudioUrl(audioUrl);
      toast.success("Voice generated successfully!");
    } catch (error) {
      console.error("Error:", error);
      if (error.response?.status === 401) {
        toast.error(
          "API key invalid. Please check your ElevenLabs API configuration.",
        );
      } else if (error.response?.status === 429) {
        toast.error("Rate limit exceeded. Please try again in a moment.");
      } else {
        toast.error("Error generating voice. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-dark text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">🎙️ Narrata</h1>
          <p className="text-gray-400">AI voice synthesis & narration</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600">
            <label className="block text-white font-medium mb-2">
              Text to Narrate
            </label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter the text you want to convert to speech..."
              className="w-full h-40 bg-gray-800 text-white p-4 rounded-lg border border-gray-600 focus:border-amber-500 focus:outline-none resize-none"
            />
            <button
              onClick={generateSpeech}
              disabled={loading || !text.trim()}
              className="mt-4 w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white py-3 px-6 rounded-lg font-medium hover:from-amber-700 hover:to-orange-700 disabled:opacity-50 transition-all"
            >
              {loading ? "Generating Speech..." : "Generate Speech"}
            </button>
          </div>

          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600">
            <label className="block text-white font-medium mb-4">
              Generated Audio
            </label>
            <div className="bg-gray-900 p-8 rounded-lg border border-gray-700 h-80 flex flex-col items-center justify-center">
              {loading ? (
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-400 mx-auto mb-4"></div>
                  <p className="text-gray-400">Generating speech...</p>
                </div>
              ) : audioUrl ? (
                <div className="w-full space-y-6">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎵</div>
                    <p className="text-white mb-4">
                      Audio generated successfully!
                    </p>
                  </div>
                  <audio controls src={audioUrl} className="w-full">
                    Your browser does not support the audio element.
                  </audio>
                </div>
              ) : (
                <p className="text-gray-500 italic">
                  Generated audio will appear here...
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Narrata;
