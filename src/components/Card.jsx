import React from 'react';
import styles from './Card.module.css';

export default function Card({ children, className = '', ...props }) {
  return (
    <div
      className={`bg-card/80 border border-primary/30 rounded-2xl shadow-lg backdrop-blur-md p-6 ${styles.glass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
} 