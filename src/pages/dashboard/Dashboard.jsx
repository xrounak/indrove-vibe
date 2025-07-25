import React, { useState, useEffect } from 'react';
import styles from './Dashboard.module.css';
import { useAuth } from '../../context/AuthContext';
import useTasks from '../../hooks/useTasks';
import { fetchAds, editAd, deleteAd } from '../../services/adService';
import Card from '../../components/Card';
import PostedTasks from './PostedTasks/PostedTasks';
import Applications from './Applications/Applications';
import AssignedToMe from './AssignedToMe/AssignedToMe';
import MyAds from './MyAds/MyAds';
import Loader from '../../components/Loader';
import ApplicantsModal from '../../components/Modal/ApplicantsModal';
import ProfileModal from '../../components/Modal/ProfileModal';
import ConfirmModal from '../../components/Modal/ConfirmModal';
import useAds from '../../hooks/useAds';

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
  const {
    tasks,
    loading,
    error,
    loadAllTasks,
    assign,
    submit,
    markCompleted,
    addFeedback,
    edit,
    remove,
  } = useTasks();
  const {
    ads,
    loadAds,
    create,
    editAd,
    deleteAd
  } = useAds();
  const [tab, setTab] = useState('posted');
  // const [ads, setAds] = useState([]);
  const [showApplicants, setShowApplicants] = useState(null); // taskId or null
  const [assigning, setAssigning] = useState('');
  const [submitting, setSubmitting] = useState('');
  const [submissionText, setSubmissionText] = useState('');
  const [completing, setCompleting] = useState('');
  const [feedbacking, setFeedbacking] = useState('');
  const [showDetail, setShowDetail] = useState(null); // { type: 'task'|'ad', data: object }
  const [showApplicantProfile, setShowApplicantProfile] = useState(null); // uid or null
  const [showProfileUid, setShowProfileUid] = useState(null);

  useEffect(() => {
    if (!user) return;
    loadAllTasks();
    loadAds();
  }, [user, loadAllTasks, loadAds]);

  const handleAssign = async (taskId, freelancerUid) => {
    setAssigning(freelancerUid);
    await assign(taskId, freelancerUid);
    loadAllTasks();
    setShowApplicants(null);
    setAssigning('');
  };

  const handleSubmitWork = async (taskId) => {
    setSubmitting(taskId);
    await submit(taskId, { text: submissionText });
    loadAllTasks();
    setSubmissionText('');
    setSubmitting('');
  };

  const handleMarkCompleted = async (taskId) => {
    setCompleting(taskId);
    await markCompleted(taskId);
    loadAllTasks();
    setCompleting('');
  };

  const handleFeedback = async (taskId, rating, comment) => {
    setFeedbacking(taskId);
    await addFeedback(taskId, { rating, comment });
    loadAllTasks();
    setFeedbacking('');
  };

  const handleEditTask = async (taskId, updates) => {
    await edit(taskId, updates);
    loadAllTasks();
  };
  const handleDeleteTask = async (taskId) => {
    await remove(taskId);
    loadAllTasks();
  };
  const handleEditAd = async (adId, updates) => {
    await editAd(adId, updates);
    const allAds = await fetchAds(); // Assuming fetchAds is part of adService
    setAds(allAds);
  };
  const handleDeleteAd = async (adId) => {
    await deleteAd(adId);
    const allAds = await fetchAds(); // Assuming fetchAds is part of adService
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
      <ApplicantsModal
        open={!!showApplicants}
        onClose={() => setShowApplicants(null)}
        applicants={task && task.applicants}
        assignedTo={task && task.assignedTo}
        assigning={assigning}
        onAssign={uid => handleAssign(task.id, uid)}
        onViewProfile={setShowApplicantProfile}
      />
    );
  }
  // Applicant Profile Modal
  let applicantProfileModal = null;
  if (showApplicantProfile) {
    applicantProfileModal = (
      <ProfileModal
        open={!!showApplicantProfile}
        onClose={() => setShowApplicantProfile(null)}
        uid={showApplicantProfile}
      />
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
              <div className={styles.detailValue}>
                {(d.applicants || []).length
                  ? d.applicants.map(uid => (
                      <span
                        key={uid}
                        style={{ color: '#14b8a6', cursor: 'pointer', textDecoration: 'underline', marginRight: 8 }}
                        onClick={() => setShowProfileUid(uid)}
                      >
                        {uid}
                      </span>
                    ))
                  : 'None'}
              </div>
              <div className={styles.detailLabel}>Assigned To</div>
              <div className={styles.detailValue}>
                {d.assignedTo ? (
                  <span
                    style={{ color: '#14b8a6', cursor: 'pointer', textDecoration: 'underline' }}
                    onClick={() => setShowProfileUid(d.assignedTo)}
                  >
                    {d.assignedTo}
                  </span>
                ) : 'None'}
              </div>
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
      {applicantProfileModal}
      {detailModal}
      <ProfileModal open={!!showProfileUid} uid={showProfileUid} onClose={() => setShowProfileUid(null)} />
    </div>
  );
} 