import { app } from './firebase';
import { getFirestore, collection, query, where, getDocs, addDoc, doc, updateDoc, arrayUnion, serverTimestamp, getDoc, deleteDoc } from 'firebase/firestore';
import { createNotification } from './notificationService';

const db = getFirestore(app);

export async function fetchOpenTasks({ category, minBudget, maxBudget, urgent } = {}) {
  let q = query(collection(db, 'tasks'), where('status', '==', 'open'));
  const snap = await getDocs(q);
  let tasks = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  if (category) tasks = tasks.filter(t => t.category === category);
  if (minBudget) tasks = tasks.filter(t => Number(t.budget) >= minBudget);
  if (maxBudget) tasks = tasks.filter(t => Number(t.budget) <= maxBudget);
  if (urgent !== undefined) tasks = tasks.filter(t => !!t.urgent === !!urgent);
  return tasks;
}

export async function applyToTask(taskId, userId) {
  const taskRef = doc(db, 'tasks', taskId);
  await updateDoc(taskRef, {
    applicants: arrayUnion(userId),
    updatedAt: serverTimestamp(),
  });
}

export async function createTask(task) {
  const taskData = {
    ...task,
    status: 'open',
    applicants: [],
    assignedTo: null,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  };
  await addDoc(collection(db, 'tasks'), taskData);
}

export async function assignTask(taskId, freelancerUid) {
  const taskRef = doc(getFirestore(app), 'tasks', taskId);
  await updateDoc(taskRef, { assignedTo: freelancerUid, status: 'assigned' });
  // Notify the assigned user
  await createNotification(
    freelancerUid,
    'task_assigned',
    'You have been assigned a new task.',
    `/dashboard?tab=assigned`
  );
}

export async function submitWork(taskId, submission) {
  const taskRef = doc(db, 'tasks', taskId);
  await updateDoc(taskRef, {
    submission,
    status: 'submitted',
    updatedAt: serverTimestamp(),
  });
}

export async function markTaskCompleted(taskId) {
  const taskRef = doc(db, 'tasks', taskId);
  await updateDoc(taskRef, {
    status: 'completed',
    updatedAt: serverTimestamp(),
  });
}

export async function addTaskFeedback(taskId, review) {
  const taskRef = doc(db, 'tasks', taskId);
  await updateDoc(taskRef, {
    review,
    updatedAt: serverTimestamp(),
  });
}

export async function editTask(taskId, updates) {
  const taskRef = doc(getFirestore(app), 'tasks', taskId);
  const snap = await getDoc(taskRef);
  if (!snap.exists()) throw new Error('Task not found');
  if (snap.data().status !== 'open') throw new Error('Only open tasks can be edited');
  await updateDoc(taskRef, { ...updates, updatedAt: serverTimestamp() });
}

export async function deleteTask(taskId) {
  const taskRef = doc(getFirestore(app), 'tasks', taskId);
  const snap = await getDoc(taskRef);
  if (!snap.exists()) throw new Error('Task not found');
  if (snap.data().status !== 'open') throw new Error('Only open tasks can be deleted');
  await deleteDoc(taskRef);
}

export async function fetchalltasks() {
  const tasksRef = collection(db, 'tasks');
  const snap = await getDocs(tasksRef);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function fetchallads() {
  const adsRef = collection(db, 'ads');
  const snap = await getDocs(adsRef);
  return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}