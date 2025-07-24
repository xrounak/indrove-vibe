import React, { useState } from 'react';
import { createAd } from '../../../services/adService';
// import Button from '../../../components/Button';
import Loader from '../../../components/Loader';
import { useAuth } from '../../../context/AuthContext';
import styles from './PostAdForm.module.css';

const CATEGORIES = [
  "Tiffin Services", "Assignment Writer", "Canva Poster Artist",
  "Online Form Filling", "Logo Designing", "Video Editing",
  "AI Video Generation", "Beatboxing Tutorials", "Invitation Designer",
  "Academic Tutoring", "Fuel/Puncture SOS", "Resume & Deck Design",
  "Yoga Instructor", "Choreography Only", "Presentation Preparation"
];

export default function PostAdForm({ onSuccess,setShowPost }) {
  const { user } = useAuth();
  const [form, setForm] = useState({
    title: '',
    description: '',
    price: '',
    skills: [],
    category: '',
    location: '',
  });
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');
  const [error, setError] = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSkillToggle = skill => {
    setForm(f => ({
      ...f,
      skills: f.skills.includes(skill)
        ? f.skills.filter(s => s !== skill)
        : [...f.skills, skill],
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setMsg('');
    setError('');
    try {
      await createAd({ ...form, createdBy: user.uid });
      setMsg('Service ad posted!');
      setForm({ title: '', description: '', price: '', skills: [], category: '', location: '' });
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Failed to post ad');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className={styles.heading}>Post Your Service</h2>
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
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price (₹)"
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
      <div>
        <label className={styles.skillLabel}>Skills</label>
        <div className={styles.skillGroup}>
          {CATEGORIES.map(skill => (
            <button
              type="button"
              key={skill}
              className={form.skills.includes(skill) ? styles.skillActive : styles.skill}
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
      {loading ? <Loader label="Posting your ad..." /> : <button type="submit" className={styles.button}>Post Service</button>}
      {msg && <div className={styles.msg}>{msg}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </form>
  );
} 