import React from 'react';
import styles from './Card.module.css';

export default function Card({ children, className = '', ...props }) {
  return (
    <div className={`${styles.card} ${className}`} {...props}>
      {children}
    </div>
  );
} 