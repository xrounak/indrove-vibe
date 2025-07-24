import React from 'react';
import Button from '../Button';
import ApplicantProfile from '../../pages/profile/ApplicantProfile';
import styles from './AssignTaskModal.module.css';

export default function AssignTaskModal({ open, onClose, tasks, onAssign, assigning, assignMsg, assignError, freelancer, user }) {
  const [showProfileUid, setShowProfileUid] = React.useState(null);
  if (!open || !freelancer) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Button className={styles.closeBtn} onClick={onClose}>✕</Button>
        <h2 className={styles.heading}>Assign Task to Freelancer</h2>
        <div className="mb-2 text-text">
          Assign a task to <span className="text-primary font-semibold">{freelancer.title}</span> (
            <span className={styles.profileLink} onClick={() => {
                setShowProfileUid(freelancer.createdBy)
            }
                }>{freelancer.createdBy}</span>
          )
        </div>
        {user ? (
          tasks.length === 0 ? (
            <div className="text-text mb-2">You have no open tasks to assign.</div>
          ) : (
            <ul className={styles.taskList}>
              {tasks.map(task => (
                <li key={task.id} className={styles.taskItem}>
                  <span>{task.title}</span>
                  <Button
                    style={{ width: 'auto', minWidth: 90 }}
                    loading={assigning === task.id}
                    disabled={assigning === task.id}
                    onClick={() => onAssign(task.id, freelancer.createdBy)}
                  >
                    {assigning === task.id ? 'Assigning...' : 'Assign'}
                  </Button>
                </li>
              ))}
            </ul>
          )
        ) : (
          <div className="text-text mb-2">Please log in to assign tasks.</div>
        )}
        {assignMsg && <div className={styles.message}>{assignMsg}</div>}
        {assignError && <div className={styles.message} style={{ color: '#e05a5a' }}>{assignError}</div>}
        {/* Profile Modal */}
        {showProfileUid && (
          <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center">
            <div className={styles.modal}>
              <Button className={styles.closeBtn} onClick={() => setShowProfileUid(null)}>✕</Button>
              <ApplicantProfile uid={showProfileUid} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 