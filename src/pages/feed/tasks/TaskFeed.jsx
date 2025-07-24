import React, { useEffect, useState } from 'react';
import { fetchOpenTasks, applyToTask } from '../../../services/taskService';
import { useAuth } from '../../../context/AuthContext';
import Card from '../../../components/Card';
// import Button from '../../../components/Button';
import PostTaskForm from './PostTaskForm';
import Loader from '../../../components/Loader';
import styles from './TaskFeed.module.css';

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
    <div className={styles.feedContainer}>
      <h1 className={styles.heading}>Open Tasks</h1>
      <div className={styles.filterRow}>
        <select
          className={styles.select}
          value={filters.category}
          onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <input
          type="number"
          placeholder="Min Budget"
          className={styles.input}
          value={filters.minBudget}
          onChange={e => setFilters(f => ({ ...f, minBudget: e.target.value }))}
        />
        <input
          type="number"
          placeholder="Max Budget"
          className={styles.input}
          value={filters.maxBudget}
          onChange={e => setFilters(f => ({ ...f, maxBudget: e.target.value }))}
        />
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            checked={!!filters.urgent}
            onChange={e => setFilters(f => ({ ...f, urgent: e.target.checked }))}
          />
          Urgent
        </label>
        <button onClick={loadTasks} className={styles.refreshBtn}>Refresh</button>
      </div>
      {user && (
        <button
          className={styles.fab}
          onClick={() => setShowPost(true)}
        >
          + Post a Task
        </button>
      )}
      {showPost && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
<PostTaskForm onSuccess={() => { setShowPost(false); loadTasks(); }} setShowPost={setShowPost} />
          </div>
        </div>
      )}
      {loading ? (
        <Loader label="Loading open tasks..." />
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : tasks.length === 0 ? (
        <div className={styles.empty}>No open tasks found.</div>
      ) : (
        <div className={styles.grid}>
          {tasks.map(task => (
            <Card key={task.id} className={styles.card}>
              <div>
                <h2 className={styles.title}>{task.title}</h2>
                <div className={styles.text}>{task.description}</div>
                <div className={styles.meta}>Category: {task.category}</div>
                <div className={styles.meta}>Budget: ₹{task.budget}</div>
                {task.urgent && <span className={styles.urgent}>🔥 Urgent</span>}
                <span className={styles.meta}>Applicants: {task.applicants?.length || 0}</span>
              </div>
              <div className={styles.cardActions}>
                
              {user && user.uid !== task.createdBy &&(<button
                
                  disabled={!user || (task.applicants || []).includes(user.uid) || applying === task.id}
                  onClick={() => handleApply(task.id)}
                  className={styles.applyBtn}
                >
                  {(task.applicants || []).includes(user?.uid)
                    ? 'Applied'
                    : 'Apply'}
                </button>)}
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
} 