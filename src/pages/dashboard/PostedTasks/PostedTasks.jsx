import React, { useState } from 'react';
import styles from '../Dashboard.module.css';
import Card from '../../../components/Card';
import StatusBadge from '../StatusBadge';

export default function PostedTasks({ tasks, user, onShowApplicants, onShowDetail, onMarkCompleted, completing, onEdit, onDelete }) {
  const [editTaskId, setEditTaskId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const openEdit = (task) => {
    setEditTaskId(task.id);
    setEditForm({ title: task.title, description: task.description });
  };
  const closeEdit = () => setEditTaskId(null);
  const handleEditChange = e => setEditForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleEditSubmit = e => {
    e.preventDefault();
    onEdit(editTaskId, editForm);
    closeEdit();
  };

  if (!tasks.length) return <div className={styles.section}>No posted tasks.</div>;

  return <>
    {tasks.map(t => (
      <Card key={t.id} className={styles.section} onClick={() => onShowDetail(t)} style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div><b>{t.title}</b> <StatusBadge status={t.status} /></div>
          {t.status === 'open' && (
            <button className={styles.tabButton} style={{ width: 'auto', marginLeft: 8 }} onClick={e => { e.stopPropagation(); onShowApplicants(t.id); }}>View Applicants</button>
          )}
        </div>
        <div>{t.description}</div>
        {t.assignedTo && <div>Assigned to: <span style={{ color: '#12b3a6' }}>{t.assignedTo}</span></div>}
        {t.status === 'submitted' && (
          <div style={{ marginTop: 12 }}>
            <div><b>Submission:</b> {t.submission?.text || 'No details'}</div>
            <button
              className={styles.tabButton}
              style={{ width: 'auto', marginTop: 8 }}
              disabled={completing === t.id}
              onClick={e => { e.stopPropagation(); onMarkCompleted(t.id); }}
            >
              {completing === t.id ? 'Completing...' : 'Mark as Completed'}
            </button>
          </div>
        )}
        {t.status === 'completed' && t.review && (
          <div style={{ marginTop: 12 }}>
            <b>Feedback:</b> <span style={{ color: '#12b3a6' }}>{'★'.repeat(t.review.rating)}</span> {t.review.comment}
          </div>
        )}
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <button
            className={styles.tabButton}
            style={{ width: 'auto' }}
            onClick={e => { e.stopPropagation(); openEdit(t); }}
            disabled={t.status !== 'open'}
            title={t.status !== 'open' ? 'Only open tasks can be edited' : ''}
          >Edit</button>
          <button
            className={styles.tabButton}
            style={{ width: 'auto', color: '#e05a5a', borderColor: '#e05a5a' }}
            onClick={e => { e.stopPropagation(); setDeleteConfirm(t.id); }}
            disabled={t.status !== 'open'}
            title={t.status !== 'open' ? 'Only open tasks can be deleted' : ''}
          >Delete</button>
        </div>
      </Card>
    ))}
    {/* Edit Modal */}
    {editTaskId && (
      <div className={styles.modalOverlay} onClick={closeEdit}>
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <h3>Edit Task</h3>
          <form onSubmit={handleEditSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            <input name="title" value={editForm.title} onChange={handleEditChange} placeholder="Title" required style={{ padding: 8, borderRadius: 6, border: '1px solid #12b3a6', background: '#18181b', color: '#fff' }} />
            <textarea name="description" value={editForm.description} onChange={handleEditChange} placeholder="Description" rows={3} required style={{ padding: 8, borderRadius: 6, border: '1px solid #12b3a6', background: '#18181b', color: '#fff' }} />
            <button className={styles.tabButton} style={{ width: 'auto' }} type="submit">Save</button>
            <button className={styles.tabButton} style={{ width: 'auto' }} type="button" onClick={closeEdit}>Cancel</button>
          </form>
        </div>
      </div>
    )}
    {/* Delete Confirm Modal */}
    {deleteConfirm && (
      <div className={styles.modalOverlay} onClick={() => setDeleteConfirm(null)}>
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <h3>Delete Task?</h3>
          <p>Are you sure you want to delete this task? This cannot be undone.</p>
          <button className={styles.tabButton} style={{ width: 'auto', color: '#e05a5a', borderColor: '#e05a5a' }} onClick={() => { onDelete(deleteConfirm); setDeleteConfirm(null); }}>Delete</button>
          <button className={styles.tabButton} style={{ width: 'auto' }} onClick={() => setDeleteConfirm(null)}>Cancel</button>
        </div>
      </div>
    )}
  </>;
} 