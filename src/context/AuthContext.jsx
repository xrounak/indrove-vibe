import React, { createContext, useContext, useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { app } from '../services/firebase';
import { createUserProfileInFirestore,getUserData } from '../services/authService';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [emailVerified, setEmailVerified] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setEmailVerified(firebaseUser?.emailVerified || false);
      setLoading(false);

      if (firebaseUser) {
        const data = await getUserData(firebaseUser.uid);
        setUserData(data);
      }
    });
    return () => unsubscribe();
  }, []);

  // Auth actions
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(getAuth(app), email, password)
      .finally(() => setLoading(false));
  };

  const register = (email, password, displayName) => {
    setLoading(true);
    return createUserWithEmailAndPassword(getAuth(app), email, password)
      .then(async ({ user }) => {
        if (displayName) {
          await updateProfile(user, { displayName });
        }
        await createUserProfileInFirestore(user);
      })
      .finally(() => setLoading(false));
  };

  const loginWithGoogle = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(getAuth(app), provider)
      .then(async ({ user }) => {
        await createUserProfileInFirestore(user);
      })
      .finally(() => setLoading(false));
  };

  const logout = () => {
    setLoading(true);
    return signOut(getAuth(app)).finally(() => setLoading(false));
  };

  const sendResetEmail = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(getAuth(app), email).finally(() => setLoading(false));
  };

  const sendVerificationEmailToUser = () => {
    setLoading(true);
    const auth = getAuth(app);
    if (auth.currentUser) {
      return sendEmailVerification(auth.currentUser).finally(() => setLoading(false));
    }
    setLoading(false);
    return Promise.reject('No user logged in');
  };

  return (
    <AuthContext.Provider value={{ user, userData, loading, emailVerified, login, register, loginWithGoogle, logout, sendResetEmail, sendVerificationEmailToUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
} 