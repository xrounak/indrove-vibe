import React from 'react';
import styles from './ReportBugButton.module.css';

export default function ReportBugButton() {
  const handleClick = () => {
    window.open('https://wame.pro/uc6ccp');
  };
  return (
    <button className={styles.fab} onClick={handleClick} aria-label="Report a bug">
      <span className={styles.icon} role="img" aria-label="bug">🐞</span>
      <span className={styles.label}>Report Bug</span>
    </button>
  );
} 