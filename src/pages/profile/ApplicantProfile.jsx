import React, { useEffect, useState } from 'react';
import Loader from '../../components/Loader';
import { getUserProfileFromFirestore } from '../../services/authService';
import styles from './ApplicantProfile.module.css';

export default function ApplicantProfile({ uid }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!uid) return;
    setLoading(true);
    getUserProfileFromFirestore(uid)
      .then(data => {
        setProfile(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load profile');
        setLoading(false);
      });
  }, [uid]);

  if (loading) return <Loader label="Loading profile..." />;
  if (error) return <div className={styles.error}>{error}</div>;
  if (!profile) return <div className={styles.msg}>No profile found</div>;

  return (
    <div className={styles.container}>
      <img
        src={profile.avatarURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || profile.email)}&background=14b8a6&color=fff`}
        alt="avatar"
        className={styles.avatar}
      />
      <h2 className={styles.title}>{profile.name || 'No Name'}</h2>
      <div className={styles.email}>{profile.email}</div>
      <div className={styles.bio}>{profile.bio}</div>
      <div className={styles.info}>
        <span className={styles.label}>Skills: </span>
        {profile.skills?.length ? profile.skills.join(', ') : 'None'}
      </div>
      <div className={styles.info}>
        <span className={styles.label}>Offering: </span>
        {profile.offering?.length ? profile.offering.join(', ') : 'None'}
      </div>
      <div className={styles.info}>
        <span className={styles.label}>Looking For: </span>
        {profile.lookingFor?.length ? profile.lookingFor.join(', ') : 'None'}
      </div>
    </div>
  );
} 