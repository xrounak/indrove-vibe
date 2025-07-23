import React, { useState } from 'react';
import styles from '../Dashboard.module.css';
import Card from '../../../components/Card';

export default function MyAds({ ads, onEdit, onDelete, onShowDetail }) {
  const [editAdId, setEditAdId] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', description: '' });
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const openEdit = (ad) => {
    setEditAdId(ad.id);
    setEditForm({ title: ad.title, description: ad.description });
  };
  const closeEdit = () => setEditAdId(null);
  const handleEditChange = e => setEditForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const handleEditSubmit = e => {
    e.preventDefault();
    onEdit(editAdId, editForm);
    closeEdit();
  };

  if (!ads.length) return <div className={styles.section}>No ads posted.</div>;

  return <>
    {ads.map(ad => (
      <Card key={ad.id} className={styles.section} onClick={() => onShowDetail(ad)} style={{ cursor: 'pointer' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div><b>{ad.title}</b></div>
        </div>
        <div>{ad.description}</div>
        <div style={{ display: 'flex', gap: 8, marginTop: 10 }}>
          <button className={styles.tabButton} style={{ width: 'auto' }} onClick={e => { e.stopPropagation(); openEdit(ad); }}>Edit</button>
          <button className={styles.tabButton} style={{ width: 'auto', color: '#e05a5a', borderColor: '#e05a5a' }} onClick={e => { e.stopPropagation(); setDeleteConfirm(ad.id); }}>Delete</button>
        </div>
      </Card>
    ))}
    {/* Edit Modal */}
    {editAdId && (
      <div className={styles.modalOverlay} onClick={closeEdit}>
        <div className={styles.modal} onClick={e => e.stopPropagation()}>
          <h3>Edit Ad</h3>
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
          <h3>Delete Ad?</h3>
          <p>Are you sure you want to delete this ad? This cannot be undone.</p>
          <button className={styles.tabButton} style={{ width: 'auto', color: '#e05a5a', borderColor: '#e05a5a' }} onClick={() => { onDelete(deleteConfirm); setDeleteConfirm(null); }}>Delete</button>
          <button className={styles.tabButton} style={{ width: 'auto' }} onClick={() => setDeleteConfirm(null)}>Cancel</button>
        </div>
      </div>
    )}
  </>;
} 