import React from 'react';
import Button from '../Button';
import styles from './ApplicantsModal.module.css';

export default function ApplicantsModal({ open, onClose, applicants = [], assignedTo, assigning, onAssign, onViewProfile }) {
  if (!open) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Button className={styles.closeBtn} onClick={onClose}>✕</Button>
        <h3 className={styles.heading}>Applicants</h3>
        {applicants.length ? (
          <ul className={styles.applicantList}>
            {applicants.map(uid => (
              <li key={uid} className={styles.applicantItem}>
                <span className={styles.profileLink} onClick={() => onViewProfile(uid)}>{uid}</span>
                <Button
                  className={styles.assignBtn}
                  disabled={assigning === uid || assignedTo === uid}
                  onClick={() => onAssign(uid)}
                >
                  {assignedTo === uid ? 'Assigned' : assigning === uid ? 'Assigning...' : 'Assign'}
                </Button>
              </li>
            ))}
          </ul>
        ) : <div>No applicants yet.</div>}
        <Button className={styles.closeFullBtn} onClick={onClose}>Close</Button>
      </div>
    </div>
  );
} 