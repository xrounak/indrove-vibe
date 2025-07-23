import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import { getUserProfileFromFirestore, updateUserProfileInFirestore } from '../../services/authService';

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
  if (!user) return <div className="text-center text-primary mt-32">Not logged in</div>;
  if (!profile) return <div className="text-center text-primary mt-32">No profile found</div>;

  return (
    <div className="max-w-lg mx-auto mt-12 bg-card rounded-2xl shadow-lg p-8 flex flex-col items-center">
      <div className="mb-6">
        <img
          src={profile.avatarURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.name || user.email)}&background=14b8a6&color=fff`}
          alt="avatar"
          className="w-24 h-24 rounded-full border-4 border-primary object-cover shadow"
        />
      </div>
      {edit ? (
        <form onSubmit={handleSave} className="flex flex-col gap-4 w-full items-center">
          <input
            type="text"
            className="bg-background border border-primary/30 rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary w-full"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Name"
            required
          />
          <input
            type="url"
            className="bg-background border border-primary/30 rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary w-full"
            name="avatarURL"
            value={profile.avatarURL}
            onChange={handleChange}
            placeholder="Avatar URL (optional)"
          />
          <textarea
            className="bg-background border border-primary/30 rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary w-full"
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            placeholder="Bio"
            rows={3}
          />
          <div className="w-full">
            <label className="block text-text mb-1 font-semibold">Skills</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  type="button"
                  key={cat}
                  className={`px-3 py-1 rounded-full border text-xs ${profile.skills?.includes(cat) ? 'bg-primary text-white border-primary' : 'bg-background text-text border-primary/30'}`}
                  onClick={() => handleArrayChange('skills', cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full">
            <label className="block text-text mb-1 font-semibold">Offering</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  type="button"
                  key={cat}
                  className={`px-3 py-1 rounded-full border text-xs ${profile.offering?.includes(cat) ? 'bg-primary text-white border-primary' : 'bg-background text-text border-primary/30'}`}
                  onClick={() => handleArrayChange('offering', cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="w-full">
            <label className="block text-text mb-1 font-semibold">Looking For</label>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map(cat => (
                <button
                  type="button"
                  key={cat}
                  className={`px-3 py-1 rounded-full border text-xs ${profile.lookingFor?.includes(cat) ? 'bg-primary text-white border-primary' : 'bg-background text-text border-primary/30'}`}
                  onClick={() => handleArrayChange('lookingFor', cat)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 w-full">
            <Button type="submit" loading={loading} className="w-full">Save</Button>
            <Button type="button" className="w-full bg-background text-primary border border-primary/40" onClick={() => setEdit(false)}>Cancel</Button>
          </div>
        </form>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-primary mb-1">{profile.name || 'No Name'}</h2>
          <div className="text-text mb-2">{profile.email}</div>
          <div className="mb-2 text-text text-sm">{profile.bio}</div>
          <div className="mb-2">
            <span className="font-semibold text-text">Skills: </span>
            {profile.skills?.length ? profile.skills.join(', ') : 'None'}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-text">Offering: </span>
            {profile.offering?.length ? profile.offering.join(', ') : 'None'}
          </div>
          <div className="mb-2">
            <span className="font-semibold text-text">Looking For: </span>
            {profile.lookingFor?.length ? profile.lookingFor.join(', ') : 'None'}
          </div>
          <div className="mb-4">
            {emailVerified ? (
              <span className="text-green-400 font-semibold">Email Verified</span>
            ) : (
              <span className="text-yellow-400 font-semibold">Email Not Verified</span>
            )}
          </div>
          <Button type="button" className="mb-2 w-full" onClick={() => setEdit(true)}>Edit Profile</Button>
          {!emailVerified && (
            <Button type="button" className="w-full bg-background text-primary border border-primary/40" onClick={handleVerify}>Resend Verification Email</Button>
          )}
        </>
      )}
      {msg && <div className="text-xs text-center text-primary mt-3">{msg}</div>}
      {error && <div className="text-xs text-center text-red-400 mt-3">{error}</div>}
    </div>
  );
} 