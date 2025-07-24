import React from 'react';
import Button from '../Button';
import styles from './ConfirmModal.module.css';

export default function ConfirmModal({ open, onClose, onConfirm, title, message, confirmLabel = 'Confirm', loading, danger }) {
  if (!open) return null;
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <Button className={styles.closeBtn} onClick={onClose}>✕</Button>
        <h3 className={styles.heading}>{title}</h3>
        <div className="mb-4 text-text">{message}</div>
        <div className="flex gap-2 w-full">
          <Button
            className={`${danger ? styles.dangerBtn : ''} w-full`}
            loading={loading}
            disabled={loading}
            onClick={onConfirm}
          >
            {loading ? 'Processing...' : confirmLabel}
          </Button>
          <Button className={styles.cancelBtn} onClick={onClose} disabled={loading}>Cancel</Button>
        </div>
      </div>
    </div>
  );
} 