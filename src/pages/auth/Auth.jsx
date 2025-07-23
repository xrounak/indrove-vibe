import React, { useState, useEffect } from 'react';
import Login from './Login';
import Signup from './Signup';
import styles from './Auth.module.css';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [flipped, setFlipped] = useState(false);
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate('/home', { replace: true });
    }
  }, [user, loading, navigate]);

  if (user) return null;

  return (
    <div className={styles.overlay}>
      <div className={`${styles.authCard} ${flipped ? styles.flipped : ''}`}>
        <div className={styles.authCardInner}>
          <div className={`${styles.authFace} ${styles.front}`}>
            <Login onFlip={() => setFlipped(true)} />
          </div>
          <div className={`${styles.authFace} ${styles.back}`}>
            <Signup onFlip={() => setFlipped(false)} />
          </div>
        </div>
      </div>
    </div>
  );
} 