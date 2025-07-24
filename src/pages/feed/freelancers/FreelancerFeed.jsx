import React, { useEffect, useState } from 'react';
import useAds from '../../../hooks/useAds';
import { fetchOpenTasks, assignTask } from '../../../services/taskService';
import Card from '../../../components/Card';
import Button from '../../../components/Button';
import PostAdForm from './PostAdForm';
import { useAuth } from '../../../context/AuthContext';
import Loader from '../../../components/Loader';
import AssignTaskModal from '../../../components/Modal/AssignTaskModal';
import ProfileModal from '../../../components/Modal/ProfileModal';

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
    <div className="max-w-4xl mx-auto py-10 px-2 relative">
      <h1 className="text-3xl font-bold text-primary mb-6">Freelancer Ads</h1>
      <div className="flex flex-wrap gap-4 mb-6">
        <select
          className="bg-background border border-primary/30 rounded-lg px-4 py-2 text-text"
          value={filters.category}
          onChange={e => setFilters(f => ({ ...f, category: e.target.value }))}
        >
          <option value="">All Categories</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <select
          className="bg-background border border-primary/30 rounded-lg px-4 py-2 text-text"
          value={filters.skill}
          onChange={e => setFilters(f => ({ ...f, skill: e.target.value }))}
        >
          <option value="">All Skills</option>
          {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat}</option>)}
        </select>
        <Button onClick={loadAds} className="px-4 py-2">Refresh</Button>
      </div>
      {user && (
        <Button
          className="fixed bottom-8 right-8 z-50 bg-primary text-white shadow-lg hover:scale-105"
          style={{ borderRadius: '9999px', padding: '1.2rem 2.2rem', fontSize: '1.2rem' }}
          onClick={() => setShowPost(true)}
        >
          + Post Your Service
        </Button>
      )}
      {showPost && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
          <div className="relative w-full max-w-xl">
            <Button className="absolute top-2 right-2 z-10 px-3 py-1" onClick={() => setShowPost(false)}>✕</Button>
            <PostAdForm onSuccess={() => { setShowPost(false); loadAds(); }} />
          </div>
        </div>
      )}
      {loading ? (
        <Loader label="Loading freelancer ads..." />
      ) : error ? (
        <div className="text-center text-red-400 mt-16">{error}</div>
      ) : ads.length === 0 ? (
        <div className="text-center text-text mt-16">No freelancer ads found.</div>
      ) : (
        <div className="grid gap-6">
          {ads.map(ad => (
            <Card key={ad.id} className="flex flex-col md:flex-row md:items-center gap-4 justify-between">
              <div>
                <h2 className="text-xl font-bold text-primary mb-1">{ad.title}</h2>
                <div className="text-text mb-1">{ad.description}</div>
                <div className="text-sm text-text mb-1">Category: {ad.category}</div>
                <div className="text-sm text-text mb-1">Price: ₹{ad.price}</div>
                <div className="text-xs text-text mb-1">Skills: {(ad.skills || []).join(', ')}</div>
                <div className="text-xs text-text mb-1">Location: {ad.location || 'Remote'}</div>
              </div>
              {user && user.uid !== ad.createdBy && (
                <Button onClick={() => openAssignModal(ad)} className="mt-2 md:mt-0">Assign Task</Button>
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