import React, { useState } from 'react';
import { createTask } from '../../../services/taskService';
import Button from '../../../components/Button';
import Loader from '../../../components/Loader';
import { useAuth } from '../../../context/AuthContext';

const CATEGORIES = [
  "Tiffin Services", "Assignment Writer", "Canva Poster Artist",
  "Online Form Filling", "Logo Designing", "Video Editing",
  "AI Video Generation", "Beatboxing Tutorials", "Invitation Designer",
  "Academic Tutoring", "Fuel/Puncture SOS", "Resume & Deck Design",
  "Yoga Instructor", "Choreography Only", "Presentation Preparation"
];

export default function PostTaskForm({ onSuccess }) {
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
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-card p-6 rounded-lg border border-primary/20">
      <h2 className="text-xl font-bold text-primary mb-2">Post a Task</h2>
      <input
        name="title"
        value={form.title}
        onChange={handleChange}
        placeholder="Title"
        className="bg-background border border-primary/30 rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <textarea
        name="description"
        value={form.description}
        onChange={handleChange}
        placeholder="Description"
        rows={3}
        className="bg-background border border-primary/30 rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <input
        name="budget"
        type="number"
        value={form.budget}
        onChange={handleChange}
        placeholder="Budget (₹)"
        className="bg-background border border-primary/30 rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
        required
      />
      <select
        name="category"
        value={form.category}
        onChange={handleChange}
        className="bg-background border border-primary/30 rounded-lg px-4 py-2 text-text"
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
        className="bg-background border border-primary/30 rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
      />
      <label className="flex items-center gap-2 text-text">
        <input
          type="checkbox"
          name="urgent"
          checked={form.urgent}
          onChange={handleChange}
        />
        Mark as Urgent
      </label>
      {loading ? <Loader label="Posting your task..." /> : <Button type="submit" className="w-full">Post Task</Button>}
      {msg && <div className="text-xs text-center text-primary mt-2">{msg}</div>}
      {error && <div className="text-xs text-center text-red-400 mt-2">{error}</div>}
    </form>
  );
} 