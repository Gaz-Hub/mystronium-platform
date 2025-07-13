import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Star,
  Search,
  Filter,
  ShoppingCart,
  Crown,
  Play,
} from "lucide-react";
import toast from "react-hot-toast";

interface MarketplaceItem {
  id: string;
  title: string;
  author: string;
  price: string;
  originalPrice?: string;
  rating: number;
  genre: string;
  description: string;
  sales: number;
  type: "book" | "comic" | "audio";
  featured?: boolean;
  free?: boolean;
  premium?: boolean;
}

const Marketplace = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [selectedType, setSelectedType] = useState("all");
  const [priceFilter, setPriceFilter] = useState("all");

  const marketplaceItems: MarketplaceItem[] = [
    {
      id: "1",
      title: "The Spiral Dawn",
      price: "£4.99",
      author: "A. Vault",
      rating: 4.5,
      genre: "fantasy",
      description:
        "A mystical journey through realms unknown, where magic and technology collide.",
      sales: 234,
      type: "book",
      featured: true,
    },
    {
      id: "2",
      title: "Digital Dreams Comic",
      price: "£2.99",
      author: "ComicMaster",
      rating: 4.8,
      genre: "sci-fi",
      description:
        "Visual storytelling at its finest - a cyberpunk adventure in comic form.",
      sales: 156,
      type: "comic",
      premium: true,
    },
    {
      id: "3",
      title: "Neon Shadows Audiobook",
      price: "£6.99",
      originalPrice: "£9.99",
      author: "Cyber_Sage",
      rating: 4.2,
      genre: "sci-fi",
      description: "Professional voice narration of the cyberpunk classic.",
      sales: 89,
      type: "audio",
    },
    {
      id: "4",
      title: "Free Starter Stories",
      price: "Free",
      author: "MYSTRONIUM",
      rating: 4.0,
      genre: "anthology",
      description: "A collection of short stories to get you started.",
      sales: 1250,
      type: "book",
      free: true,
    },
  ];

  const genres = [
    "all",
    "fantasy",
    "sci-fi",
    "mystery",
    "romance",
    "thriller",
    "horror",
    "anthology",
  ];
  const types = ["all", "book", "comic", "audio"];
  const priceFilters = ["all", "free", "under-5", "under-10", "premium"];

  const filteredItems = marketplaceItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre =
      selectedGenre === "all" || item.genre === selectedGenre;
    const matchesType = selectedType === "all" || item.type === selectedType;

    let matchesPrice = true;
    if (priceFilter === "free")
      matchesPrice = item.free || item.price === "Free";
    else if (priceFilter === "under-5")
      matchesPrice = parseFloat(item.price.replace("£", "")) < 5;
    else if (priceFilter === "under-10")
      matchesPrice = parseFloat(item.price.replace("£", "")) < 10;
    else if (priceFilter === "premium")
      matchesPrice =
        item.premium || parseFloat(item.price.replace("£", "")) >= 10;

    return matchesSearch && matchesGenre && matchesType && matchesPrice;
  });

  const handlePurchase = (item: MarketplaceItem) => {
    if (item.free) {
      toast.success(`Added "${item.title}" to your library!`);
    } else {
      toast.success(
        `Added "${item.title}" to cart! Redirecting to checkout...`,
      );
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "book":
        return <BookOpen className="w-4 h-4" />;
      case "comic":
        return <span className="text-sm">🎬</span>;
      case "audio":
        return <Play className="w-4 h-4" />;
      default:
        return <BookOpen className="w-4 h-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "book":
        return "text-blue-400";
      case "comic":
        return "text-pink-400";
      case "audio":
        return "text-green-400";
      default:
        return "text-blue-400";
    }
  };

  return (
    <div className="min-h-screen bg-dark text-white">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <ShoppingCart className="mr-3 w-10 h-10 text-blue-400" />
              MYSTRONIUM Marketplace
            </h1>
            <p className="text-gray-400">
              Discover books, comics, and audio content from our creator
              community
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600 mb-8">
            <div className="grid md:grid-cols-5 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search marketplace..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                />
              </div>

              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-gray-800 text-white p-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type === "all"
                      ? "All Types"
                      : type.charAt(0).toUpperCase() + type.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={selectedGenre}
                onChange={(e) => setSelectedGenre(e.target.value)}
                className="bg-gray-800 text-white p-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                {genres.map((genre) => (
                  <option key={genre} value={genre}>
                    {genre === "all"
                      ? "All Genres"
                      : genre.charAt(0).toUpperCase() + genre.slice(1)}
                  </option>
                ))}
              </select>

              <select
                value={priceFilter}
                onChange={(e) => setPriceFilter(e.target.value)}
                className="bg-gray-800 text-white p-2 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                {priceFilters.map((filter) => (
                  <option key={filter} value={filter}>
                    {filter === "all"
                      ? "All Prices"
                      : filter === "free"
                        ? "Free Only"
                        : filter === "under-5"
                          ? "Under £5"
                          : filter === "under-10"
                            ? "Under £10"
                            : "Premium (£10+)"}
                  </option>
                ))}
              </select>

              <div className="flex items-center text-gray-400">
                <Filter className="w-4 h-4 mr-2" />
                {filteredItems.length} items found
              </div>
            </div>
          </div>

          {/* Featured Items */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">
              Featured Content
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {filteredItems
                .filter((item) => item.featured)
                .map((item) => (
                  <motion.div
                    key={item.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-yellow-500/50 overflow-hidden hover:border-yellow-500 transition-all"
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        {getTypeIcon(item.type)}
                      </div>

                      <div className="absolute top-2 left-2">
                        <div className="bg-yellow-500 text-black px-2 py-1 rounded-full text-xs font-bold flex items-center">
                          <Crown className="w-3 h-3 mr-1" />
                          Featured
                        </div>
                      </div>

                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
                        {item.price}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        by {item.author}
                      </p>

                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">
                            {item.rating.toFixed(1)}
                          </span>
                        </div>

                        <div className="text-gray-400 text-xs">
                          {item.sales} sales
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs ${getTypeColor(item.type)}`}
                          >
                            {getTypeIcon(item.type)}
                          </span>
                          <span className="inline-block bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs">
                            {item.genre}
                          </span>
                        </div>

                        <button
                          onClick={() => handlePurchase(item)}
                          className={`px-3 py-1 rounded text-sm font-medium transition-colors flex items-center ${
                            item.free
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          {item.free ? "Get Free" : "Buy"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>

          {/* All Items Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">All Content</h2>
            {filteredItems.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <motion.div
                    key={item.id}
                    className="bg-gray-800/50 backdrop-blur-sm rounded-xl border border-gray-600 overflow-hidden hover:border-blue-500/50 transition-all"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="relative">
                      <div className="w-full h-48 bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center">
                        {getTypeIcon(item.type)}
                      </div>

                      {item.premium && (
                        <div className="absolute top-2 left-2">
                          <div className="bg-purple-500 text-white px-2 py-1 rounded-full text-xs font-bold">
                            Premium
                          </div>
                        </div>
                      )}

                      <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-sm font-bold">
                        {item.originalPrice && (
                          <span className="line-through text-gray-400 mr-1">
                            {item.originalPrice}
                          </span>
                        )}
                        {item.price}
                      </div>
                    </div>

                    <div className="p-4">
                      <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-400 text-sm mb-2">
                        by {item.author}
                      </p>

                      <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span className="text-white text-sm">
                            {item.rating.toFixed(1)}
                          </span>
                        </div>

                        <div className="text-gray-400 text-xs">
                          {item.sales} sales
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <span
                            className={`inline-block px-2 py-1 rounded text-xs ${getTypeColor(item.type)}`}
                          >
                            {getTypeIcon(item.type)}
                          </span>
                          <span className="inline-block bg-blue-600/20 text-blue-400 px-2 py-1 rounded text-xs">
                            {item.genre}
                          </span>
                        </div>

                        <button
                          onClick={() => handlePurchase(item)}
                          className={`px-3 py-1 rounded text-sm font-medium transition-colors flex items-center ${
                            item.free
                              ? "bg-green-600 text-white hover:bg-green-700"
                              : "bg-blue-600 text-white hover:bg-blue-700"
                          }`}
                        >
                          <ShoppingCart className="w-3 h-3 mr-1" />
                          {item.free ? "Get Free" : "Buy"}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">
                  No items found
                </h3>
                <p className="text-gray-400">
                  Try adjusting your search or filters
                </p>
              </div>
            )}
          </div>

          {/* Call to Action */}
          <motion.div
            className="bg-gradient-to-r from-green-600/20 to-blue-600/20 p-8 rounded-xl border border-green-500/30 text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              Ready to Publish Your Content?
            </h3>
            <p className="text-gray-300 mb-6">
              Join our community of creators and start earning from your books,
              comics, and audio content
            </p>
            <Link
              to="/creator-backend"
              className="inline-flex items-center bg-gradient-to-r from-green-600 to-blue-600 text-white px-8 py-3 rounded-lg font-medium hover:from-green-700 hover:to-blue-700 transition-all"
            >
              <BookOpen className="mr-2 w-5 h-5" />
              Start Publishing
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Marketplace;
