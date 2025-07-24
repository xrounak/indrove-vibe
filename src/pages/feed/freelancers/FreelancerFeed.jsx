import React, { useEffect, useState } from 'react';
import useAds from '../../../hooks/useAds';
import { fetchOpenTasks, assignTask } from '../../../services/taskService';
import Card from '../../../components/Card';
// import Button from '../../../components/Button';
import PostAdForm from './PostAdForm';
import { useAuth } from '../../../context/AuthContext';
import Loader from '../../../components/Loader';
import AssignTaskModal from '../../../components/Modal/AssignTaskModal';
import ProfileModal from '../../../components/Modal/ProfileModal';
import styles from './FreelancerFeed.module.css';

const CATEGORIES = [
  "Tiffin Services", "Assignment Writer", "Canva Poster Artist",
  "Online Form Filling", "Logo Designing", "Video Editing",
  "AI Video Generation", "Beatboxing Tutorials", "Invitation Designer",
  "Academic Tutoring", "Fuel/Puncture SOS", "Resume & Deck Design",
  "Yoga Instructor", "Choreography Only", "Presentation Preparation"
];

export default function FreelancerFeed() {
  const { user } = useAuth();
  const {
    ads,
    loading,
    error,
    loadAds,
    create,
    edit,
    remove
  } = useAds();
  const [filters, setFilters] = useState({ category: '', skill: '' });
  const [showPost, setShowPost] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState(null); // ad or null
  const [myTasks, setMyTasks] = useState([]);
  const [assigning, setAssigning] = useState('');
  const [assignMsg, setAssignMsg] = useState('');
  const [assignError, setAssignError] = useState('');
  const [showProfileUid, setShowProfileUid] = useState(null);

  useEffect(() => {
    loadAds();
    // eslint-disable-next-line
  }, [filters]);

  const openAssignModal = async (ad) => {
    setShowAssignModal(ad);
    setAssignMsg('');
    setAssignError('');
    setAssigning('');
    if (user) {
      const tasks = await fetchOpenTasks();
      setMyTasks(tasks.filter(t => t.createdBy === user.uid));
    }
  };

  const handleAssign = async (taskId, freelancerUid) => {
    setAssigning(taskId);
    setAssignMsg('');
    setAssignError('');
    try {
      await assignTask(taskId, freelancerUid);
      setAssignMsg('Task assigned!');
    } catch (err) {
      setAssignError('Failed to assign task');
    }
    setAssigning('');
  };

  return (
    <div className={styles.feedContainer}>
      <h1 className={styles.heading}>Freelancer Ads</h1>
      <div className={styles.filterRow}>
        <select
          className={styles.select}
          value={filters.category}
          onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select
          className={styles.select}
          value={filters.skill}
          onChange={e => setFilters(f => ({ ...f, skill: e.target.value }))}
        >
          <option value="">All Skills</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <button onClick={loadAds} className={styles.refreshBtn}>Refresh</button>
      </div>
      {user && (
        <button
          className={styles.fab}
          onClick={() => setShowPost(true)}
        >
          + Post Your Service
        </button>
      )}
      {showPost && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
         <PostAdForm onSuccess={() => { setShowPost(false); loadAds(); }} setShowPost={setShowPost} />
          </div>
        </div>
      )}
      {loading ? (
        <Loader label="Loading freelancer ads..." />
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : ads.length === 0 ? (
        <div className={styles.empty}>No freelancer ads found.</div>
      ) : (
        <div className={styles.grid}>
          {ads.map(ad => (
            <Card key={ad.id} className={styles.card}>
              <div>
                <h2 className={styles.title}>{ad.title}</h2>
                <div className={styles.text}>{ad.description}</div>
                <div className={styles.meta}>Category: {ad.category}</div>
                <div className={styles.meta}>Price: ₹{ad.price}</div>
                <div className={styles.meta}>Skills: {(ad.skills || []).join(', ')}</div>
                <div className={styles.meta}>Location: {ad.location || 'Remote'}</div>
              </div>
              {user && user.uid !== ad.createdBy && (
                <button onClick={() => openAssignModal(ad)} className={styles.assignBtn}>Assign Task</button>
              )}
            </Card>
          ))}
        </div>
      )}
      <AssignTaskModal
        open={!!showAssignModal}
        onClose={() => setShowAssignModal(null)}
        tasks={myTasks}
        onAssign={handleAssign}
        assigning={assigning}
        assignMsg={assignMsg}
        assignError={assignError}
        freelancer={showAssignModal}
        user={user}
      />
      <ProfileModal
        open={!!showProfileUid}
        onClose={() => setShowProfileUid(null)}
        uid={showProfileUid}
      />
    </div>
  );
}