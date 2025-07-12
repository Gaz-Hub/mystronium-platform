import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  subscription: 'free' | 'premium' | 'creator-pro';
  vaultCredits: number;
  loginStreak: number;
  lastLogin: Date;
  createdAt: Date;
  books: string[];
  artworks: string[];
  voiceNarrations: string[];
  admin?: boolean;
}

interface UserContextProps {
  userProfile: UserProfile | null;
  displayName: string; // Keep for backward compatibility
  setDisplayName: (name: string) => void;
  loading: boolean;
  updateUserProfile: (updates: Partial<UserProfile>) => Promise<void>;
  useVaultCredits: (amount: number) => Promise<boolean>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [displayName, setDisplayName] = useState('');

  useEffect(() => {
    if (currentUser) {
      loadUserProfile();
      setDisplayName(currentUser.displayName || currentUser.email?.split('@')[0] || '');
    } else {
      setUserProfile(null);
      setDisplayName('');
    }
  }, [currentUser]);

  const loadUserProfile = async () => {
    if (!currentUser) return;
    
    setLoading(true);
    try {
      const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
      
      if (userDoc.exists()) {
        const data = userDoc.data();
        const userProfileData = {
          ...data,
          lastLogin: data.lastLogin?.toDate() || new Date(),
          createdAt: data.createdAt?.toDate() || new Date()
        } as UserProfile;
        
        // Ensure admin status for garetharjohns@gmail.com
        if (currentUser.email === 'garetharjohns@gmail.com' && !userProfileData.admin) {
          await updateDoc(doc(db, 'users', currentUser.uid), { admin: true });
          userProfileData.admin = true;
        }
        
        setUserProfile(userProfileData);
      } else {
        // Create new user profile
        const newProfile: UserProfile = {
          uid: currentUser.uid,
          email: currentUser.email || '',
          displayName: currentUser.displayName || '',
          subscription: 'free',
          vaultCredits: 3,
          loginStreak: 1,
          lastLogin: new Date(),
          createdAt: new Date(),
          books: [],
          artworks: [],
          voiceNarrations: [],
          admin: currentUser.email === 'garetharjohns@gmail.com'
        };
        
        await setDoc(doc(db, 'users', currentUser.uid), newProfile);
        setUserProfile(newProfile);
      }
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
    setLoading(false);
  };

  const updateUserProfile = async (updates: Partial<UserProfile>) => {
    if (!currentUser || !userProfile) return;
    
    try {
      await updateDoc(doc(db, 'users', currentUser.uid), updates);
      setUserProfile({ ...userProfile, ...updates });
    } catch (error) {
      console.error('Error updating user profile:', error);
    }
  };

  const useVaultCredits = async (amount: number): Promise<boolean> => {
    if (!userProfile) return false;
    
    if (userProfile.subscription === 'free') {
      if (userProfile.vaultCredits < amount) return false;
      await updateUserProfile({ vaultCredits: userProfile.vaultCredits - amount });
    }
    
    return true;
  };

  return (
    <UserContext.Provider value={{ 
      userProfile, 
      displayName, 
      setDisplayName, 
      loading,
      updateUserProfile,
      useVaultCredits
    }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within UserProvider');
  }
  return context;
};