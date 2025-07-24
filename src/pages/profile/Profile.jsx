import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { getUserProfileFromFirestore, updateUserProfileInFirestore } from '../../services/authService';
import styles from './Profile.module.css';

const CATEGORIES = [
  "Tiffin Services", "Assignment Writer", "Canva Poster Artist",
  "Online Form Filling", "Logo Designing", "Video Editing",
  "AI Video Generation", "Beatboxing Tutorials", "Invitation Designer",
  "Academic Tutoring", "Fuel/Puncture SOS", "Resume & Deck Design",
  "Yoga Instructor", "Choreography Only", "Presentation Preparation"
];

export default function Profile() {
  const { user, emailVerified, sendVerificationEmailToUser, loading: authLoading } = useAuth();
  const [profile, setProfile] = useState(null);
  const [edit, setEdit] = useState(false);
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      setLoading(true);
      getUserProfileFromFirestore(user.uid)
        .then(data => {
          setProfile(data);
          setLoading(false);
        })
        .catch(err => {
          setError('Failed to load profile');
          setLoading(false);
        });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleArrayChange = (name, value) => {
    setProfile(prev => {
      const arr = prev[name] || [];
      if (arr.includes(value)) {
        return { ...prev, [name]: arr.filter(v => v !== value) };
      } else {
        return { ...prev, [name]: [...arr, value] };
      }
    });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setMsg('');
    setError('');
    setLoading(true);
    try {
      await updateUserProfileInFirestore(user.uid, profile);
      setMsg('Profile updated!');
      setEdit(false);
    } catch (err) {
      setError('Failed to update profile');
    }
    setLoading(false);
  };

  const handleVerify = async () => {
    setMsg('');
    try {
      await sendVerificationEmailToUser();
      setMsg('Verification email sent!');
    } catch (err) {
      setMsg(err.message || 'Failed to send verification email');
    }
  };

  if (authLoading || loading) return <Loader label="Loading profile..." />;
  if (!user) return <div className={styles.msg}>Not logged in</div>;
  if (!profile) return <div className={styles.msg}>No profile found</div>;

  return (
    <div className={styles.container}>
      <img
        src={profile.avatarURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || user.email)}&background=14b8a6&color=fff`}
        alt="avatar"
        className={styles.avatar}
      />
      {edit ? (
        <form onSubmit={handleSave} className={styles.form}>
          <input
            type="text"
            className={styles.input}
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="url"
            className={styles.input}
            name="avatarURL"
            value={profile.avatarURL}
            onChange={handleChange}
            placeholder="Avatar URL (optional)"
          />
          <textarea
            className={styles.textarea}
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Bio"
            rows={3}
          />
          <div className={styles.flexRow}>
            <label className={styles.label}>Skills</label>
            <div className={styles.chipGroup}>
              {CATEGORIES.map(cat => (
                <button
                  type="button"
                  key={cat}
                  className={`${styles.chip} ${profile.skills?.includes(cat) ? styles.chipActive : ''}`}
                  onClick={() => handleArrayChange('skills', cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.flexRow}>
            <label className={styles.label}>Offering</label>
            <div className={styles.chipGroup}>
              {CATEGORIES.map(cat => (
                <button
                  type="button"
                  key={cat}
                  className={`${styles.chip} ${profile.offering?.includes(cat) ? styles.chipActive : ''}`}
                  onClick={() => handleArrayChange('offering', cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.flexRow}>
            <label className={styles.label}>Looking For</label>
            <div className={styles.chipGroup}>
              {CATEGORIES.map(cat => (
                <button
                  type="button"
                  key={cat}
                  className={`${styles.chip} ${profile.lookingFor?.includes(cat) ? styles.chipActive : ''}`}
                  onClick={() => handleArrayChange('lookingFor', cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className={styles.flexRow}>
            <Button type="submit" loading={loading} className={styles.input}>Save</Button>
            <Button type="button" className={styles.input} onClick={() => setEdit(false)}>Cancel</Button>
          </div>
        </form>
      ) : (
        <>
          <h2 className={styles.title}>{profile.name || 'No Name'}</h2>
          <div className={styles.subtitle}>{profile.email}</div>
          <div className={styles.subtitle}>{profile.bio}</div>
          <div className={styles.subtitle}>
            <span className={styles.label}>Skills: </span>
            {profile.skills?.length ? profile.skills.join(', ') : 'None'}
          </div>
          <div className={styles.subtitle}>
            <span className={styles.label}>Offering: </span>
            {profile.offering?.length ? profile.offering.join(', ') : 'None'}
          </div>
          <div className={styles.subtitle}>
            <span className={styles.label}>Looking For: </span>
            {profile.lookingFor?.length ? profile.lookingFor.join(', ') : 'None'}
          </div>
          <div className={styles.subtitle}>
            {emailVerified ? (
              <span className={styles.verified}>Email Verified</span>
            ) : (
              <span className={styles.notVerified}>Email Not Verified</span>
            )}
          </div>
          <Button type="button" className={styles.input} onClick={() => setEdit(true)}>Edit Profile</Button>
          {!emailVerified && (
            <Button type="button" className={styles.input} onClick={handleVerify}>Resend Verification Email</Button>
          )}
        </>
      )}
      {msg && <div className={styles.msg}>{msg}</div>}
      {error && <div className={styles.error}>{error}</div>}
    </div>
  );
} 


