import React from 'react';
import styles from './Dashboard.module.css';

export default function StatusBadge({ status }) {
  return <span className={styles.statusBadge}>{status.charAt(0).toUpperCase() + status.slice(1)}</span>;
} 