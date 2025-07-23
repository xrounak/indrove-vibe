import React, { useState } from 'react';
import styles from '../Dashboard.module.css';
import Card from '../../../components/Card';
import StatusBadge from '../StatusBadge';

export default function AssignedToMe({ tasks, onSubmitWork, submitting, onShowDetail }) {
  // Use local state for each task's submission text
  const [submissionTexts, setSubmissionTexts] = useState({});

  const handleChange = (taskId, value) => {
    setSubmissionTexts(prev => ({ ...prev, [taskId]: value }));
  };

  if (!tasks.length) return <div className={styles.section}>No assigned tasks.</div>;

  return tasks.map(t => (
    <Card key={t.id} className={styles.section}>
      <div><b>{t.title}</b> <StatusBadge status={t.status} /></div>
      <div>{t.description}</div>
      <button className={styles.tabButton} onClick={() => onShowDetail(t)}>View Details</button>
      {t.status === 'assigned' && (
        <form
          style={{ marginTop: 12, display: 'flex', flexDirection: 'column', gap: 8 }}
          onSubmit={e => { e.preventDefault(); onSubmitWork(t.id, submissionTexts[t.id] || ''); }}
        >
          <textarea
            value={submissionTexts[t.id] || ''}
            onChange={e => handleChange(t.id, e.target.value)}
            placeholder="Describe your work or paste a link"
            rows={2}
            style={{ width: '100%', border: '1px solid #12b3a6', borderRadius: 8, padding: 8, background: '#18181b', color: '#fff' }}
            required
          />
          <button
            className={styles.tabButton}
            style={{ width: 'auto' }}
            type="submit"
            disabled={submitting === t.id}
          >
            {submitting === t.id ? 'Submitting...' : 'Submit Work'}
          </button>
        </form>
      )}
      {t.status === 'submitted' && (
        <div style={{ marginTop: 12 }}><b>Submitted:</b> {t.submission?.text || 'No details'}</div>
      )}
    </Card>
  ));
} 