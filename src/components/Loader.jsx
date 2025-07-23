import React from 'react';
import styles from './Loader.module.css';

export default function Loader({ label = 'Loading...' }) {
  return (
    <div className={styles.loaderContainer}>
      <div className={styles.spinner} />
      <div className={styles.label}>{label}</div>
    </div>
  );
} 