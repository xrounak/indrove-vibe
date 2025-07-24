import React, { useState } from 'react';
import { createTask } from '../../../services/taskService';
// import Button from '../../../components/Button';
import Loader from '../../../components/Loader';
import { useAuth } from '../../../context/AuthContext';
import styles from './PostTaskForm.module.css';

const CATEGORIES = [
  "Tiffin Services", "Assignment Writer", "Canva Poster Artist",
  "Online Form Filling", "Logo Designing", "Video Editing",
  "AI Video Generation", "Beatboxing Tutorials", "Invitation Designer",
  "Academic Tutoring", "Fuel/Puncture SOS", "Resume & Deck Design",
  "Yoga Instructor", "Choreography Only", "Presentation Preparation"
];

export default function PostTaskForm({ onSuccess,setShowPost }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: '',
    description: '',
    budget: '',
    category: '',
    location: '',
    urgent: false,
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setForm(f => ({ ...f, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setError('');
    try {
      await createTask({ ...form, createdBy: user.uid });
      setMsg('Task posted!');
      setForm({ title: '', description: '', budget: '', category: '', location: '', urgent: false });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Failed to post task');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Post a Task</h2>
      <button className={styles.closeBtn} onClick={() => setShowPost(false)}>✕</button>
      <br />
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className={styles.input}
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows={3}
        className={styles.textarea}
        required
      />
      <input
        name="budget"
        type="number"
        value={form.budget}
        onChange={handleChange}
        placeholder="Budget (₹)"
        className={styles.input}
        required
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className={styles.select}
        required
      >
        <option value="">Select Category</option>
        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
      </select>
      <input
        name="location"
        value={form.location}
        onChange={handleChange}
        placeholder="Location (optional)"
        className={styles.input}
      />
      <label className={styles.checkboxLabel}>
        <input
          type="checkbox"
          name="urgent"
          checked={form.urgent}
          onChange={handleChange}
        />
        Mark as Urgent
      </label>
      {loading ? <Loader label="Posting your task..." /> : <button type="submit" className={styles.button}>Post Task</button>}
      {msg && <div className={styles.msg}>{msg}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
} 
