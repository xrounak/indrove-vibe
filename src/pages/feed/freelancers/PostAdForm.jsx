import React, { useState } from 'react';
import { createAd } from '../../../services/adService';
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

export default function PostAdForm({ onSuccess }) {
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
    <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-lg p-8 flex flex-col gap-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold text-primary mb-2">Post Your Service</h2>
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
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        placeholder="Price (₹)"
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
      <div>
        <label className="block text-text mb-1 font-semibold">Skills</label>
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map(skill => (
            <button
              type="button"
              key={skill}
              className={`px-3 py-1 rounded-full border text-xs ${form.skills.includes(skill) ? 'bg-primary text-white border-primary' : 'bg-background text-text border-primary/30'}`}
              onClick={() => handleSkillToggle(skill)}
            >
              {skill}
            </button>
          ))}
        </div>
      </div>
      {loading ? <Loader label="Posting your ad..." /> : <Button type="submit" className="w-full">Post Service</Button>}
      {msg && <div className="text-xs text-center text-primary mt-2">{msg}</div>}
      {error && <div className="text-xs text-center text-red-400 mt-2">{error}</div>}
    </form>
  );
} 