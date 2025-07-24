import React from 'react';
import Button from '../Button';
import ApplicantProfile from '../../pages/profile/ApplicantProfile';
import styles from './ProfileModal.module.css';

export default function ProfileModal({ open, onClose, uid }) {
  if (!open || !uid) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Button className={styles.closeBtn} onClick={onClose}>✕</Button>
        <ApplicantProfile uid={uid} />
      </div>
    </div>
  );
} 