import { collection, addDoc, query, where, getDocs, updateDoc, doc, serverTimestamp, orderBy, onSnapshot } from 'firebase/firestore';
import { app } from './firebase';
import { getFirestore } from 'firebase/firestore';

const db = getFirestore(app);

export async function createNotification(userId, type, message, link = '') {
  await addDoc(collection(db, 'notifications'), {
    userId,
    type,
    message,
    link,
    read: false,
    createdAt: serverTimestamp(),
  });
}

export async function fetchNotifications(userId) {
  const q = query(collection(db, 'notifications'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
  const snap = await getDocs(q);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function markNotificationRead(notificationId) {
  const notifRef = doc(db, 'notifications', notificationId);
  await updateDoc(notifRef, { read: true });
}

export function listenToNotifications(userId, callback) {
  const q = query(collection(db, 'notifications'), where('userId', '==', userId), orderBy('createdAt', 'desc'));
  return onSnapshot(q, snap => {
    callback(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  });
} 