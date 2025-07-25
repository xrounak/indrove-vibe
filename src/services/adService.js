import { app } from './firebase';
import { getFirestore, collection, getDocs, addDoc, serverTimestamp, doc, updateDoc, deleteDoc } from 'firebase/firestore';

const db = getFirestore(app);

export async function fetchAds({ category, skill } = {}) {
  const snap = await getDocs(collection(db, 'ads'));
  let ads = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  if (category) ads = ads.filter(ad => ad.category === category);
  if (skill) ads = ads.filter(ad => (ad.skills || []).includes(skill));
  return ads;
}

export async function createAd(ad) {
  const adData = {
    ...ad,
    createdAt: serverTimestamp(),
  };
  await addDoc(collection(db, 'ads'), adData);
}

export async function editAd(adId, updates) {
  const adRef = doc(getFirestore(app), 'ads', adId);
  await updateDoc(adRef, { ...updates, updatedAt: serverTimestamp() });
}

export async function deleteAd(adId) {
  const adRef = doc(getFirestore(app), 'ads', adId);
  await deleteDoc(adRef);
} 