import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const Codex = () => {
  const { currentUser } = useAuth();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('character');
  const [entries, setEntries] = useState<any[]>([]);

  const addEntry = () => {
    if (!title.trim() || !content.trim()) {
      toast.error('Please fill in both title and content');
      return;
    }

    const newEntry = {
      id: Date.now().toString(),
      title,
      content,
      category,
      timestamp: new Date()
    };

    setEntries([newEntry, ...entries]);
    setTitle('');
    setContent('');
    toast.success('Entry added to Codex!');
  };

  return (
    <div className="min-h-screen bg-dark text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">📜 The Codex™</h1>
          <p className="text-gray-400">Weave the fabric of reality • Chronicle the eternal dance of creation</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-600">
            <h2 className="text-xl font-bold text-white mb-4">Add New Entry</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-white font-medium mb-2">Category</label>
                <select 
                  value={category} 
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none"
                >
                  <option value="character">Character</option>
                  <option value="location">Location</option>
                  <option value="event">Event</option>
                  <option value="item">Item</option>
                  <option value="lore">Lore</option>
                </select>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter title..."
                  className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Content</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Describe this entry in detail..."
                  className="w-full h-40 bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none resize-none"
                />
              </div>

              <button
                onClick={addEntry}
                disabled={!title.trim() || !content.trim()}
                className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-green-700 disabled:opacity-50 transition-colors"
              >
                Add to Codex
              </button>
            </div>
          </div>

          <div className="lg:col-span-2 bg-gray-800/50 p-6 rounded-xl border border-gray-600">
            <h2 className="text-xl font-bold text-white mb-4">Lore Entries ({entries.length})</h2>
            
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {entries.length > 0 ? (
                entries.map((entry) => (
                  <div key={entry.id} className="p-4 bg-gray-700/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-white font-medium">{entry.title}</h4>
                      <span className="text-xs text-gray-400 capitalize">{entry.category}</span>
                    </div>
                    <p className="text-gray-300 text-sm">{entry.content}</p>
                    <p className="text-gray-500 text-xs mt-2">
                      {entry.timestamp.toLocaleDateString()}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500 italic">No entries yet</p>
                  <p className="text-gray-600 text-sm">Start building your world's lore</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Codex;