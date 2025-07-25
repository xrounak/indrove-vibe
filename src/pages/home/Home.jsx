import React from 'react';
import Card from '../../components/Card';
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Welcome to Indorve Vibe</h1>
      <div className={styles.grid}>
        <Card className={styles.cardContent}>
          <span className={styles.icon}>🔍</span>
          <h2 className={styles.cardTitle}>Find Work</h2>
          <p className={styles.cardText}>Browse open tasks and apply for jobs that match your skills.</p>
          <button className={styles.button} onClick={() => navigate('/feed/tasks')}>Go to Tasks</button>
        </Card>
        <Card className={styles.cardContent}>
          <span className={styles.icon}>🤝</span>
          <h2 className={styles.cardTitle}>Find Freelancers</h2>
          <p className={styles.cardText}>Explore freelancer ads and hire for your needs.</p>
          <button className={styles.button} onClick={() => navigate('/feed/freelancers')}>Go to Freelancers</button>
        </Card>
        <Card className={styles.cardContent}>
          <span className={styles.icon}>📊</span>
          <h2 className={styles.cardTitle}>Go to Dashboard</h2>
          <p className={styles.cardText}>Track your activity, earnings, and manage your profile.</p>
          <button className={styles.button} onClick={() => navigate('/dashboard')}>Dashboard</button>
        </Card>
      </div>
    </div>
  );
} 