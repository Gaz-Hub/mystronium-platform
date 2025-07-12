import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MessageSquare, Send, Phone, MapPin, Clock } from 'lucide-react';
import toast from 'react-hot-toast';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('general');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast.error('Please fill in all required fields');
      return;
    }

    setLoading(true);
    
    try {
      // In a real app, you'd send this to your backend
      // For demo purposes, we'll simulate sending
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Message sent successfully! We\'ll get back to you soon.');
      
      // Reset form
      setName('');
      setEmail('');
      setSubject('general');
      setMessage('');
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    }
    
    setLoading(false);
  };

  const subjects = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'billing', label: 'Billing & Subscriptions' },
    { value: 'creator', label: 'Creator Program' },
    { value: 'partnership', label: 'Business Partnership' },
    { value: 'bug', label: 'Bug Report' },
    { value: 'feature', label: 'Feature Request' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
            <Mail className="mr-3 w-10 h-10 text-blue-400" />
            Contact Us
          </h1>
          <p className="text-gray-400">Get in touch with the MYSTRONIUM team</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600">
              <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                <MessageSquare className="mr-2 w-6 h-6 text-green-400" />
                Send us a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-white font-medium mb-2">Name *</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      placeholder="Your full name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">Email *</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                  >
                    {subjects.map(s => (
                      <option key={s.value} value={s.value}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Message *</label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full h-32 bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                    placeholder="Tell us how we can help you..."
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all flex items-center justify-center"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 w-4 h-4" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
              <h2 className="text-xl font-bold text-white mb-4">Get in Touch</h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-blue-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Email Support</p>
                    <a href="mailto:support@mystronium.com" className="text-blue-400 hover:underline">
                      support@mystronium.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-green-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Business Inquiries</p>
                    <a href="mailto:business@mystronium.com" className="text-green-400 hover:underline">
                      business@mystronium.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-purple-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Location</p>
                    <p className="text-gray-400">Digital Creative Hub<br />Global Platform</p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-yellow-400 mt-1" />
                  <div>
                    <p className="text-white font-medium">Response Time</p>
                    <p className="text-gray-400">Usually within 24 hours</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
              <h2 className="text-xl font-bold text-white mb-4">Quick Help</h2>
              
              <div className="space-y-3">
                <div className="bg-blue-600/20 p-3 rounded-lg">
                  <p className="text-blue-400 font-medium">🔧 Technical Issues</p>
                  <p className="text-gray-300 text-sm">Check our status page or contact support</p>
                </div>
                
                <div className="bg-green-600/20 p-3 rounded-lg">
                  <p className="text-green-400 font-medium">💳 Billing Questions</p>
                  <p className="text-gray-300 text-sm">Manage subscriptions in your profile</p>
                </div>
                
                <div className="bg-purple-600/20 p-3 rounded-lg">
                  <p className="text-purple-400 font-medium">📚 Creator Support</p>
                  <p className="text-gray-300 text-sm">Visit the Creator Backend for tools</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-blue-500/30">
              <h3 className="text-lg font-bold text-white mb-2">Join Our Community</h3>
              <p className="text-gray-300 text-sm mb-4">
                Connect with other creators and get the latest updates
              </p>
              <div className="flex space-x-2">
                <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                  Discord
                </button>
                <button className="bg-purple-600 text-white px-3 py-1 rounded text-sm hover:bg-purple-700">
                  Twitter
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <motion.div
          className="mt-12 bg-gray-800/50 backdrop-blur-sm p-8 rounded-xl border border-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-white mb-6 text-center">Frequently Asked Questions</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-medium mb-2">How do I upgrade my subscription?</h3>
                <p className="text-gray-400 text-sm">Visit the Store page or your Profile to manage subscriptions and upgrade plans.</p>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-2">Can I use AI-generated content commercially?</h3>
                <p className="text-gray-400 text-sm">Premium and Creator Pro users have commercial usage rights. Free users are limited to personal use.</p>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-2">How do I publish a book in the store?</h3>
                <p className="text-gray-400 text-sm">Use the Creator Backend to submit your book for review. Approved books appear in the Bookstore.</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-white font-medium mb-2">What AI models do you use?</h3>
                <p className="text-gray-400 text-sm">We use GPT-4o, Mistral, SDXL, and ElevenLabs for different creative tools.</p>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-2">How do creator earnings work?</h3>
                <p className="text-gray-400 text-sm">Creators earn 80% of book sales revenue. MYSTRONIUM keeps 20% as a platform fee.</p>
              </div>
              
              <div>
                <h3 className="text-white font-medium mb-2">Is my content private and secure?</h3>
                <p className="text-gray-400 text-sm">Yes, your content is encrypted and stored securely. You retain full ownership of everything you create.</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Contact;