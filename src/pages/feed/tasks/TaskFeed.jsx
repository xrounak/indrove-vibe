import React, { useEffect, useState } from 'react';
import { fetchOpenTasks, applyToTask } from '../../../services/taskService';
import { useAuth } from '../../../context/AuthContext';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import PostTaskForm from './PostTaskForm';
import Loader from '../../../components/Loader';

const CATEGORIES = [
  "Tiffin Services", "Assignment Writer", "Canva Poster Artist",
  "Online Form Filling", "Logo Designing", "Video Editing",
  "AI Video Generation", "Beatboxing Tutorials", "Invitation Designer",
  "Academic Tutoring", "Fuel/Puncture SOS", "Resume & Deck Design",
  "Yoga Instructor", "Choreography Only", "Presentation Preparation"
];

export default function TaskFeed() {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filters, setFilters] = useState({ category: '', minBudget: '', maxBudget: '', urgent: '' });
  const [applying, setApplying] = useState('');
  const [showPost, setShowPost] = useState(false);

  const loadTasks = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchOpenTasks(filters);
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks');
    }
    setLoading(false);
  };

  useEffect(() => {
    loadTasks();
    // eslint-disable-next-line
  }, [filters]);

  const handleApply = async (taskId) => {
    if (!user) return;
    setApplying(taskId);
    try {
      await applyToTask(taskId, user.uid);
      await loadTasks();
    } catch (err) {
      setError('Failed to apply');
    }
    setApplying('');
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-2 relative">
      <h1 className="text-3xl font-bold text-primary mb-6">Open Tasks</h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="bg-background border border-primary/30 rounded-lg px-4 py-2 text-text"
          value={filters.category}
          onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input
          type="number"
          placeholder="Min Budget"
          className="bg-background border border-primary/30 rounded-lg px-4 py-2 text-text w-32"
          value={filters.minBudget}
          onChange={e => setFilters(f => ({ ...f, minBudget: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Max Budget"
          className="bg-background border border-primary/30 rounded-lg px-4 py-2 text-text w-32"
          value={filters.maxBudget}
          onChange={e => setFilters(f => ({ ...f, maxBudget: e.target.value }))}
        />
        <label className="flex items-center gap-2 text-text">
          <input
            type="checkbox"
            checked={!!filters.urgent}
            onChange={e => setFilters(f => ({ ...f, urgent: e.target.checked }))}
          />
          Urgent
        </label>
        <Button onClick={loadTasks} className="px-4 py-2">Refresh</Button>
      </div>
      {user && (
        <Button
          className="fixed bottom-8 right-8 z-50 bg-primary text-white shadow-lg hover:scale-105"
          style={{ borderRadius: '9999px', padding: '1.2rem 2.2rem', fontSize: '1.2rem' }}
          onClick={() => setShowPost(true)}
        >
          + Post a Task
        </Button>
      )}
      {showPost && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-xl">
            <Button className="absolute top-2 right-2 z-10 px-3 py-1" onClick={() => setShowPost(false)}>✕</Button>
            <PostTaskForm onSuccess={() => { setShowPost(false); loadTasks(); }} />
          </div>
        </div>
      )}
      {loading ? (
        <Loader label="Loading open tasks..." />
      ) : error ? (
        <div className="text-center text-red-400 mt-16">{error}</div>
      ) : tasks.length === 0 ? (
        <div className="text-center text-text mt-16">No open tasks found.</div>
      ) : (
        <div className="grid gap-6">
          {tasks.map(task => (
            <Card key={task.id} className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <div>
                <h2 className="text-xl font-bold text-primary mb-1">{task.title}</h2>
                <div className="text-text mb-1">{task.description}</div>
                <div className="text-sm text-text mb-1">Category: {task.category}</div>
                <div className="text-sm text-text mb-1">Budget: ₹{task.budget}</div>
                {task.urgent && <span className="inline-block text-xs bg-red-500 text-white px-2 py-1 rounded-full mr-2">🔥 Urgent</span>}
                <span className="text-xs text-text">Applicants: {task.applicants?.length || 0}</span>
              </div>
              <div className="flex flex-col gap-2 min-w-[120px]">
                <Button
                  disabled={!user || (task.applicants || []).includes(user.uid) || applying === task.id}
                  loading={applying === task.id}
                  onClick={() => handleApply(task.id)}
                  className="w-full"
                >
                  {(task.applicants || []).includes(user?.uid)
                    ? 'Applied'
                    : 'Apply'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 