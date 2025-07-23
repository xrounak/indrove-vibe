import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { useAuth } from '../../context/AuthContext';
import { fetchOpenTasks, assignTask, submitWork, markTaskCompleted, addTaskFeedback, fetchalltasks, fetchallads, editTask, deleteTask } from '../../services/taskService';
import { fetchAds, editAd, deleteAd } from '../../services/adService';
import Card from '../../components/Card';
import PostedTasks from './PostedTasks/PostedTasks';
import Applications from './Applications/Applications';
import AssignedToMe from './AssignedToMe/AssignedToMe';
import MyAds from './MyAds/MyAds';
import Loader from '../../components/Loader';

const TABS = [
  { key: 'posted', label: 'My Posted Tasks' },
  { key: 'applied', label: 'My Applications' },
  { key: 'assigned', label: 'Assigned to Me' },
  { key: 'ads', label: 'My Ads' },
];

function StatusBadge({ status }) {
  return <span className={styles.statusBadge}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
}

function FeedbackForm({ onSubmit, loading }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  return (
    <form className={styles.feedbackForm} onSubmit={e => { e.preventDefault(); onSubmit(rating, comment); }}>
      <div className={styles.stars}>
        {[1,2,3,4,5].map(star => (
          <span
            key={star}
            className={`${styles.star} ${rating >= star ? styles.active : ''}`}
            onClick={() => setRating(star)}
            role="button"
            tabIndex={0}
          >★</span>
        ))}
      </div>
      <textarea
        className={styles.feedbackInput}
        value={comment}
        onChange={e => setComment(e.target.value)}
        placeholder="Leave a comment (optional)"
        rows={2}
      />
      <button className={styles.feedbackSubmit} type="submit" disabled={loading || !rating}>
        {loading ? 'Submitting...' : 'Submit Feedback'}
      </button>
    </form>
  );
}

export default function Dashboard() {
  const { user } = useAuth();
  const [tab, setTab] = useState('posted');
  const [tasks, setTasks] = useState([]);
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showApplicants, setShowApplicants] = useState(null); // taskId or null
  const [assigning, setAssigning] = useState('');
  const [submitting, setSubmitting] = useState('');
  const [submissionText, setSubmissionText] = useState('');
  const [completing, setCompleting] = useState('');
  const [feedbacking, setFeedbacking] = useState('');
  const [showDetail, setShowDetail] = useState(null); // { type: 'task'|'ad', data: object }

  useEffect(() => {
    if (!user) return;
    setLoading(true);
    Promise.all([
      fetchalltasks(),
      fetchallads(),
    ]).then(([allTasks, allAds]) => {
      setTasks(allTasks);
      setAds(allAds);
      setLoading(false);
    });
  }, [user]);

  const handleAssign = async (taskId, freelancerUid) => {
    setAssigning(freelancerUid);
    await assignTask(taskId, freelancerUid);
    const allTasks = await fetchOpenTasks();
    setTasks(allTasks);
    setShowApplicants(null);
    setAssigning('');
  };

  const handleSubmitWork = async (taskId) => {
    setSubmitting(taskId);
    await submitWork(taskId, { text: submissionText });
    const allTasks = await fetchOpenTasks();
    setTasks(allTasks);
    setSubmissionText('');
    setSubmitting('');
  };

  const handleMarkCompleted = async (taskId) => {
    setCompleting(taskId);
    await markTaskCompleted(taskId);
    const allTasks = await fetchOpenTasks();
    setTasks(allTasks);
    setCompleting('');
  };

  const handleFeedback = async (taskId, rating, comment) => {
    setFeedbacking(taskId);
    await addTaskFeedback(taskId, { rating, comment });
    const allTasks = await fetchOpenTasks();
    setTasks(allTasks);
    setFeedbacking('');
  };

  const handleEditTask = async (taskId, updates) => {
    await editTask(taskId, updates);
    const allTasks = await fetchalltasks();
    setTasks(allTasks);
  };
  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    const allTasks = await fetchalltasks();
    setTasks(allTasks);
  };
  const handleEditAd = async (adId, updates) => {
    await editAd(adId, updates);
    const allAds = await fetchallads();
    setAds(allAds);
  };
  const handleDeleteAd = async (adId) => {
    await deleteAd(adId);
    const allAds = await fetchallads();
    setAds(allAds);
  };

  if (!user) return <div className={styles.dashboardRoot}>Please log in.</div>;

  let content = null;
  if (tab === 'posted') {
    const posted = tasks.filter(t => t.createdBy === user.uid);
    content = (
      <PostedTasks
        tasks={posted}
        user={user}
        onShowApplicants={setShowApplicants}
        onShowDetail={t => setShowDetail({ type: 'task', data: t })}
        onMarkCompleted={handleMarkCompleted}
        completing={completing}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
      />
    );
  } else if (tab === 'applied') {
    const applied = tasks.filter(t => (t.applicants || []).includes(user.uid));
    content = (
      <Applications
        tasks={applied}
        user={user}
        onShowDetail={t => setShowDetail({ type: 'task', data: t })}
      />
    );
  } else if (tab === 'assigned') {
    const assigned = tasks.filter(t => t.assignedTo === user.uid);
    content = (
      <AssignedToMe
        tasks={assigned}
        user={user}
        onSubmitWork={(taskId, submissionText) => handleSubmitWork(taskId, submissionText)}
        submitting={submitting}
        onShowDetail={t => setShowDetail({ type: 'task', data: t })}
      />
    );
  } else if (tab === 'ads') {
    const myAds = ads.filter(ad => ad.createdBy === user.uid);
    content = (
      <MyAds
        ads={myAds}
        onEdit={handleEditAd}
        onDelete={handleDeleteAd}
        onShowDetail={ad => setShowDetail({ type: 'ad', data: ad })}
      />
    );
  }

  // Applicants Modal
  let applicantsModal = null;
  if (showApplicants) {
    const task = tasks.find(t => t.id === showApplicants);
    applicantsModal = (
      <div className={styles.modalOverlay} onClick={() => setShowApplicants(null)}>
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <h3>Applicants</h3>
          {task && task.applicants && task.applicants.length ? (
            <ul style={{ padding: 0, listStyle: 'none' }}>
              {task.applicants.map(uid => (
                <li key={uid} style={{ margin: '0.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span>{uid}</span>
                  <button
                    className={styles.tabButton}
                    style={{ width: 'auto', marginLeft: 8 }}
                    disabled={assigning === uid || task.assignedTo === uid}
                    onClick={() => handleAssign(task.id, uid)}
                  >
                    {task.assignedTo === uid ? 'Assigned' : assigning === uid ? 'Assigning...' : 'Assign'}
                  </button>
                </li>
              ))}
            </ul>
          ) : <div>No applicants yet.</div>}
          <button className={styles.tabButton} style={{ width: '100%', marginTop: 16 }} onClick={() => setShowApplicants(null)}>Close</button>
        </div>
      </div>
    );
  }

  // Detail Modal
  let detailModal = null;
  if (showDetail) {
    const d = showDetail.data;
    detailModal = (
      <div className={styles.detailModalOverlay} onClick={() => setShowDetail(null)}>
        <div className={styles.detailModal} onClick={e => e.stopPropagation()}>
          <button className={styles.detailClose} onClick={() => setShowDetail(null)}>×</button>
          <h2>{d.title}</h2>
          <div className={styles.detailLabel}>Description</div>
          <div className={styles.detailValue}>{d.description}</div>
          {showDetail.type === 'task' && (
            <>
              <div className={styles.detailLabel}>Status</div>
              <div className={styles.detailValue}>{d.status}</div>
              <div className={styles.detailLabel}>Applicants</div>
              <div className={styles.detailValue}>{(d.applicants || []).join(', ') || 'None'}</div>
              <div className={styles.detailLabel}>Assigned To</div>
              <div className={styles.detailValue}>{d.assignedTo || 'None'}</div>
              {d.submission && <>
                <div className={styles.detailLabel}>Submission</div>
                <div className={styles.detailValue}>{d.submission.text}</div>
              </>}
              {d.review && <>
                <div className={styles.detailLabel}>Feedback</div>
                <div className={styles.detailValue}><span style={{ color: '#14b8a6' }}>{'★'.repeat(d.review.rating)}</span> {d.review.comment}</div>
              </>}
            </>
          )}
          {showDetail.type === 'ad' && (
            <>
              <div className={styles.detailLabel}>Price</div>
              <div className={styles.detailValue}>₹{d.price}</div>
              <div className={styles.detailLabel}>Skills</div>
              <div className={styles.detailValue}>{(d.skills || []).join(', ') || 'None'}</div>
              <div className={styles.detailLabel}>Category</div>
              <div className={styles.detailValue}>{d.category}</div>
              <div className={styles.detailLabel}>Location</div>
              <div className={styles.detailValue}>{d.location || 'Remote'}</div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.dashboardRoot}>
      <div className={styles.tabs}>
        {TABS.map(t => (
          <button
            key={t.key}
            className={`${styles.tabButton} ${tab === t.key ? styles.active : ''}`}
            onClick={() => setTab(t.key)}
            type="button"
          >
            {t.label}
          </button>
        ))}
      </div>
      {loading ? <Loader label="Loading dashboard data..." /> : content}
      {applicantsModal}
      {detailModal}
    </div>
  );
} 