import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, BookOpen, DollarSign, FileText } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useUser } from '../contexts/UserContext';
import toast from 'react-hot-toast';

const Sell = () => {
  const { currentUser } = useAuth();
  const { userProfile } = useUser();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [downloadLink, setDownloadLink] = useState('');
  const [price, setPrice] = useState('');
  const [genre, setGenre] = useState('fantasy');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!currentUser) {
      toast.error('Please log in to sell books');
      return;
    }

    if (!title.trim() || !description.trim() || !downloadLink.trim() || !price.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      // Simulate book submission (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success('Book submitted for review! You\'ll be notified once it\'s approved.');
      
      // Reset form
      setTitle('');
      setDescription('');
      setDownloadLink('');
      setPrice('');
      setGenre('fantasy');
    } catch (error) {
      toast.error('Failed to submit book. Please try again.');
    }
    
    setLoading(false);
  };

  if (!currentUser) {
    return (
      <div className="min-h-screen bg-dark text-white flex items-center justify-center">
        <div className="text-center">
          <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Login Required</h2>
          <p className="text-gray-400">Please log in to sell your books on MYSTRONIUM.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="max-w-3xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <Upload className="mr-3 w-10 h-10 text-green-400" />
              Sell Your Book
            </h1>
            <p className="text-gray-400">
              Once you've created your book using Ghostscribe, you can list it for sale below
            </p>
          </div>

          <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-white font-medium mb-2">Book Title *</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none"
                    placeholder="Enter your book title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Genre</label>
                  <select
                    value={genre}
                    onChange={(e) => setGenre(e.target.value)}
                    className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none"
                  >
                    <option value="fantasy">Fantasy</option>
                    <option value="sci-fi">Science Fiction</option>
                    <option value="romance">Romance</option>
                    <option value="mystery">Mystery</option>
                    <option value="thriller">Thriller</option>
                    <option value="horror">Horror</option>
                    <option value="non-fiction">Non-Fiction</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Short Description *</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-32 bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none resize-none"
                  placeholder="Write a compelling description of your book..."
                  required
                />
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Download Link or Upload URL *</label>
                <input
                  type="url"
                  value={downloadLink}
                  onChange={(e) => setDownloadLink(e.target.value)}
                  className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none"
                  placeholder="https://your-file-hosting.com/book.pdf"
                  required
                />
                <p className="text-gray-400 text-sm mt-1">
                  Upload your book to a file hosting service and provide the download link
                </p>
              </div>

              <div>
                <label className="block text-white font-medium mb-2">Price (£) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-gray-800 text-white p-3 pl-10 rounded-lg border border-gray-600 focus:border-green-500 focus:outline-none"
                    placeholder="5.99"
                    min="0.99"
                    step="0.01"
                    required
                  />
                </div>
                <p className="text-gray-400 text-sm mt-1">
                  You'll receive 80% of the sale price (£{(parseFloat(price) * 0.8).toFixed(2)} per sale)
                </p>
              </div>

              <div className="bg-blue-900/20 border border-blue-500/50 p-4 rounded-lg">
                <h3 className="text-blue-300 font-medium mb-2 flex items-center">
                  <FileText className="w-4 h-4 mr-2" />
                  Submission Guidelines
                </h3>
                <ul className="text-blue-200 text-sm space-y-1">
                  <li>• Books must be original content created by you</li>
                  <li>• Content will be reviewed for quality and appropriateness</li>
                  <li>• Approval typically takes 1-3 business days</li>
                  <li>• You retain full ownership of your content</li>
                  <li>• MYSTRONIUM takes a 20% platform fee</li>
                </ul>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 disabled:opacity-50 transition-all flex items-center justify-center"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Submitting for Review...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 w-4 h-4" />
                    Submit Book for Review
                  </>
                )}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Sell;