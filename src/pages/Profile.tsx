import React, { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "../contexts/AuthContext";
import { useUser } from "../contexts/UserContext";
import { User, Crown, Zap, Calendar, CreditCard, Settings } from "lucide-react";
import { updateProfile } from "firebase/auth";
import toast from "react-hot-toast";
import ProtectedRoute from "../components/ProtectedRoute";

const Profile = () => {
  const { currentUser } = useAuth();
  const { userProfile, updateUserProfile } = useUser();
  const [displayName, setDisplayName] = useState(
    userProfile?.displayName || "",
  );
  const [loading, setLoading] = useState(false);

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser || !userProfile) return;

    setLoading(true);
    try {
      await updateProfile(currentUser, { displayName });
      await updateUserProfile({ displayName });
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
    setLoading(false);
  };

  const getSubscriptionBadge = () => {
    if (!userProfile) return null;

    switch (userProfile.subscription) {
      case "premium":
        return (
          <div className="flex items-center space-x-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full">
            <Crown className="w-5 h-5" />
            <span className="font-medium">Premium</span>
          </div>
        );
      case "creator-pro":
        return (
          <div className="flex items-center space-x-2 bg-purple-500/20 text-purple-400 px-4 py-2 rounded-full">
            <Zap className="w-5 h-5" />
            <span className="font-medium">Creator Pro</span>
          </div>
        );
      default:
        return (
          <div className="bg-gray-500/20 text-gray-400 px-4 py-2 rounded-full">
            Free User
          </div>
        );
    }
  };

  if (!userProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-white mb-4 flex items-center justify-center">
              <User className="mr-3 w-10 h-10 text-blue-400" />
              Profile Settings
            </h1>
            <p className="text-gray-400">
              Manage your account and subscription
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center">
                  <Settings className="w-5 h-5 mr-2" />
                  Account Information
                </h2>

                <form onSubmit={handleUpdateProfile} className="space-y-4">
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Display Name
                    </label>
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className="w-full bg-gray-800 text-white p-3 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none"
                      placeholder="Enter your display name"
                    />
                  </div>

                  <div>
                    <label className="block text-white font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={currentUser?.email || ""}
                      disabled
                      className="w-full bg-gray-700 text-gray-400 p-3 rounded-lg border border-gray-600 cursor-not-allowed"
                    />
                    <p className="text-gray-500 text-sm mt-1">
                      Email cannot be changed
                    </p>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    {loading ? "Updating..." : "Update Profile"}
                  </button>
                </form>
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                <h2 className="text-xl font-bold text-white mb-4">
                  Account Statistics
                </h2>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-5 h-5 text-green-400" />
                      <span className="text-white font-medium">
                        Member Since
                      </span>
                    </div>
                    <p className="text-green-400 font-bold">
                      {userProfile.createdAt.toLocaleDateString()}
                    </p>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar className="w-5 h-5 text-blue-400" />
                      <span className="text-white font-medium">
                        Login Streak
                      </span>
                    </div>
                    <p className="text-blue-400 font-bold">
                      {userProfile.loginStreak} days
                    </p>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <CreditCard className="w-5 h-5 text-cyan-400" />
                      <span className="text-white font-medium">
                        Vault Credits
                      </span>
                    </div>
                    <p className="text-cyan-400 font-bold">
                      {userProfile.subscription === "free"
                        ? userProfile.vaultCredits
                        : "∞"}
                    </p>
                  </div>

                  <div className="bg-gray-700/50 p-4 rounded-lg">
                    <div className="flex items-center space-x-2 mb-2">
                      <User className="w-5 h-5 text-purple-400" />
                      <span className="text-white font-medium">
                        Books Created
                      </span>
                    </div>
                    <p className="text-purple-400 font-bold">
                      {userProfile.books.length}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subscription Status */}
            <div className="space-y-6">
              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                <h2 className="text-xl font-bold text-white mb-4">
                  Subscription
                </h2>

                <div className="text-center mb-4">{getSubscriptionBadge()}</div>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className="text-white capitalize">
                      {userProfile.subscription.replace("-", " ")}
                    </span>
                  </div>

                  {userProfile.subscription === "free" && (
                    <div className="flex justify-between">
                      <span className="text-gray-400">Credits:</span>
                      <span className="text-white">
                        {userProfile.vaultCredits}
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span className="text-gray-400">Ghostscribe:</span>
                    <span className="text-white">
                      {userProfile.subscription === "free"
                        ? "Mistral Only"
                        : "GPT-4o + Mistral"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Vault Engine:</span>
                    <span className="text-white">
                      {userProfile.subscription === "free"
                        ? "3/day"
                        : "Unlimited"}
                    </span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-gray-400">Narrata:</span>
                    <span className="text-white">
                      {userProfile.subscription === "free"
                        ? "Basic"
                        : "Premium"}
                    </span>
                  </div>
                </div>

                {userProfile.subscription === "free" && (
                  <div className="mt-6">
                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-4 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all">
                      Upgrade Now
                    </button>
                  </div>
                )}
              </div>

              <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-600">
                <h2 className="text-xl font-bold text-white mb-4">
                  Recent Activity
                </h2>

                <div className="space-y-3">
                  {userProfile.books.length === 0 &&
                  userProfile.artworks.length === 0 ? (
                    <p className="text-gray-400 italic text-sm">
                      No recent activity
                    </p>
                  ) : (
                    <>
                      {userProfile.books.slice(0, 3).map((book, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-3 p-2 bg-gray-700/30 rounded"
                        >
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-white text-sm">{book}</span>
                        </div>
                      ))}
                      {userProfile.artworks
                        .slice(0, 3)
                        .map((artwork, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-2 bg-gray-700/30 rounded"
                          >
                            <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                            <span className="text-white text-sm">
                              {artwork}
                            </span>
                          </div>
                        ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </ProtectedRoute>
  );
};

export default Profile;
