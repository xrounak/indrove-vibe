import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, updateProfile, GoogleAuthProvider, signInWithPopup, sendPasswordResetEmail, sendEmailVerification } from 'firebase/auth';
import { app } from './firebase';
import { getFirestore, doc, setDoc, getDoc, updateDoc } from 'firebase/firestore';

export function loginWithEmail(email, password) {
  return signInWithEmailAndPassword(getAuth(app), email, password);
}

export function registerWithEmail(email, password, displayName) {
  return createUserWithEmailAndPassword(getAuth(app), email, password)
    .then(({ user }) => {
      if (displayName) {
        return updateProfile(user, { displayName });
      }
    });
}

export function logoutUser() {
  return signOut(getAuth(app));
}

export function updateUserProfile(profile) {
  const auth = getAuth(app);
  if (auth.currentUser) {
    return updateProfile(auth.currentUser, profile);
  }
  return Promise.reject('No user logged in');
}

export function loginWithGoogle() {
  const provider = new GoogleAuthProvider();
  return signInWithPopup(getAuth(app), provider);
}

export function sendResetEmail(email) {
  return sendPasswordResetEmail(getAuth(app), email);
}

export function sendVerificationEmail() {
  const auth = getAuth(app);
  if (auth.currentUser) {
    return sendEmailVerification(auth.currentUser);
  }
  return Promise.reject('No user logged in');
}

export async function createUserProfileInFirestore(user) {
  const db = getFirestore(app);
  const userRef = doc(db, 'users', user.uid);
  const profile = {
    name: user.displayName || '',
    email: user.email,
    avatarURL: user.photoURL || '',
    bio: '',
    skills: [],
    offering: [],
    lookingFor: [],
    totalEarnings: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  await setDoc(userRef, profile, { merge: true });
}

export async function getUserProfileFromFirestore(uid) {
  const db = getFirestore(app);
  const userRef = doc(db, 'users', uid);
  const snap = await getDoc(userRef);
  if (snap.exists()) {
    return snap.data();
  }
  return null;
}

export async function updateUserProfileInFirestore(uid, data) {
  const db = getFirestore(app);
  const userRef = doc(db, 'users', uid);
  await updateDoc(userRef, { ...data, updatedAt: new Date() });
} 

export const getUserData = async (uid) => {
  const db = getFirestore(app);
  const docRef = doc(db, "users", uid);
  const snap = await getDoc(docRef);
  return snap.exists() ? snap.data() : null;
};