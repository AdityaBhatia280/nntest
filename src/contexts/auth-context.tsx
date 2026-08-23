'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { User, onAuthStateChanged, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth';
import { auth, db } from '@/lib/firebase/client';
import { doc, setDoc, onSnapshot } from 'firebase/firestore';

export type UserStatus = 'pending_step_1' | 'approved_step_1' | 'ip_submitted' | 'fully_approved';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userStatus: UserStatus | null;
  isAdmin: boolean;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  updateUserStatus: (status: UserStatus) => Promise<void>;
}

const defaultAuthContext: AuthContextType = {
  user: null,
  loading: true,
  userStatus: null,
  isAdmin: false,
  signInWithGoogle: async () => {},
  logout: async () => {},
  updateUserStatus: async () => {},
};

const AuthContext = createContext<AuthContextType>(defaultAuthContext);

const ADMIN_EMAIL = 'adityabhatia280@gmail.com';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsubscribeSnapshot: (() => void) | null = null;

    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
        unsubscribeSnapshot = null;
      }

      if (currentUser) {
        const docRef = doc(db, 'users', currentUser.uid);
        unsubscribeSnapshot = onSnapshot(docRef, (docSnap) => {
          if (docSnap.exists()) {
            const data = docSnap.data();
            // Automatically upgrade Head Admin if they are not fully_approved
            if (currentUser.email === ADMIN_EMAIL && data.status !== 'fully_approved') {
              setDoc(docRef, { status: 'fully_approved' }, { merge: true });
              setUserStatus('fully_approved');
            } else {
              setUserStatus(data.status as UserStatus);
            }
            setLoading(false);
          } else {
            const initialStatus = currentUser.email === ADMIN_EMAIL ? 'fully_approved' : 'pending_step_1';
            setDoc(docRef, {
              email: currentUser.email || '',
              name: currentUser.displayName || '',
              status: initialStatus
            }).then(() => {
                setUserStatus(initialStatus);
                setLoading(false);
            }).catch((err) => {
                console.error("Error creating user doc: ", err);
            });
          }
        }, (error) => {
          console.error("Firestore Error in AuthContext: ", error);
          setLoading(false);
        });
      } else {
        setUserStatus(null);
        setLoading(false);
      }
    });

    return () => {
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot();
      }
      unsubscribeAuth();
    };
  }, []);

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error signing in with Google: ", error);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  
  const updateUserStatus = async (status: UserStatus) => {
    if (!user) return;
    await setDoc(doc(db, 'users', user.uid), { status }, { merge: true });
  }

  const isAdmin = user?.email === ADMIN_EMAIL;

  return (
    <AuthContext.Provider value={{ user, loading, userStatus, isAdmin, signInWithGoogle, logout, updateUserStatus }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
