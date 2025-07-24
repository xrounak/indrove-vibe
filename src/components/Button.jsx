import React from 'react';
import styles from './Button.module.css';

export default function Button({ children, loading, className = '', ...props }) {
  return (
    <button
      className={`${styles.button} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? <span className={styles.loader}></span> : children}
    </button>
  );
} 