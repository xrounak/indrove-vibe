        // src/services/firebase.js
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// const firebaseConfig = {
//   apiKey: "AIzaSyCX5LUmeRLQasN96AHJiUNOkse-ipm4aD0",
//   authDomain: "indrove-vibe.firebaseapp.com",
//   projectId: "indrove-vibe",
//   storageBucket: "indrove-vibe.firebasestorage.app",
//   messagingSenderId: "105653827587",
//   appId: "1:105653827587:web:af2b0fcb9d0928d064f636",
//   measurementId: "G-2GLTYE8XGB"
// };

export const app = initializeApp(firebaseConfig);
export let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
