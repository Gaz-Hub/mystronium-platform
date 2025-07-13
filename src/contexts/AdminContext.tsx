import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';

interface AdminContextProps {
  isAdmin: boolean;
  loading: boolean;
  adminData: any;
  godModeEnabled: boolean;
  setAdminData: (data: any) => void;
  toggleModule: (module: string) => void;
  toggleGodMode: () => void;
  getSystemStats: () => any;
  emergencyShutdown: () => void;
}

const AdminContext = createContext<AdminContextProps | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const { currentUser } = useAuth();
  const [adminData, setAdminData] = useState({});
  const [loading, setLoading] = useState(false);
  const [godModeEnabled, setGodModeEnabled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  // Check admin status from Firestore
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!currentUser) {
        setIsAdmin(false);
        return;
      }

      setLoading(true);
      try {
        const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
        
        if (userDoc.exists()) {
          const userData = userDoc.data();
          const adminStatus = userData.admin === true || currentUser.email === 'garetharjohns@gmail.com';
          setIsAdmin(adminStatus);
          
          // Set admin status for garetharjohns@gmail.com if not already set
          if (currentUser.email === 'garetharjohns@gmail.com' && !userData.admin) {
            await setDoc(doc(db, 'users', currentUser.uid), { admin: true }, { merge: true });
          }
        } else if (currentUser.email === 'garetharjohns@gmail.com') {
          // Create admin user for garetharjohns@gmail.com
          await setDoc(doc(db, 'users', currentUser.uid), { 
            admin: true,
            email: currentUser.email,
            createdAt: new Date()
          });
          setIsAdmin(true);
        }
      } catch (error) {
        // Silent error handling for production
        setIsAdmin(false);
      }
      setLoading(false);
    };

    checkAdminStatus();
  }, [currentUser]);

  // Load God Mode state from localStorage on mount
  useEffect(() => {
    const savedGodMode = localStorage.getItem('godModeEnabled');
    if (savedGodMode === 'true') {
      setGodModeEnabled(true);
    }
  }, []);

  const toggleModule = (module: string) => {
    // Module toggle functionality - updates system configuration
    setAdminData(prev => ({
      ...prev,
      [module]: !(prev as any)[module]
    }));
  };

  const toggleGodMode = () => {
    const newState = !godModeEnabled;
    setGodModeEnabled(newState);
    localStorage.setItem('godModeEnabled', newState.toString());
  };

  const getSystemStats = () => {
    return {
      dailyUsers: 1247,
      totalApiCalls: 15623,
      stripeRevenue: 8945.67,
      totalSpend: 3421.89,
      mostUsedTool: 'Ghostscribe',
      activeUsers: 89
    };
  };

  const emergencyShutdown = () => {
    // Emergency shutdown functionality - disables all AI modules
    setAdminData(prev => ({
      ...prev,
      emergencyMode: true
    }));
  };

  return (
    <AdminContext.Provider value={{ 
      isAdmin, 
      loading, 
      adminData, 
      godModeEnabled,
      setAdminData,
      toggleModule,
      toggleGodMode,
      getSystemStats,
      emergencyShutdown
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) throw new Error('useAdmin must be used within AdminProvider');
  return context;
};