import React from 'react';
import styles from '../Dashboard.module.css';
import Card from '../../../components/Card';
import StatusBadge from '../StatusBadge';

export default function Applications({ tasks, user, onShowDetail }) {
  if (!tasks.length) return <div className={styles.section}>No applications.</div>;

  return tasks.map(t => (
    <Card key={t.id} className={styles.section} onClick={() => onShowDetail(t)} style={{ cursor: 'pointer' }}>
      <div><b>{t.title}</b> <StatusBadge status={t.status} /></div>
      <div>{t.description}</div>
    </Card>
  ));
} 