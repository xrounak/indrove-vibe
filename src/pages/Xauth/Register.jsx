import React, { useState } from 'react';
import styles from './Auth.module.css';
import { useAuth } from '../../context/AuthContext';
import { GoogleButton } from '../../components/ContinueWithGoogle';
// import Button from '../../components/Button';

export default function Register({ onFlip }) {
  const { register, loginWithGoogle, loading } = useAuth();
  // const [role, setRole] = useState('client');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  const [success, setSuccess] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErr('');
    setSuccess('');
    try {
      await register(email, password, name);
      setSuccess('Account created successfully!');
    } catch (err) {
      setErr(err.message || 'Signup failed');
    }
  };

  const handleGoogleRegister = async () => {
    setErr('');
    setSuccess('');
    try {
      await loginWithGoogle();
    } catch (err) {
      setErr(err.message || 'Google signup failed');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleRegister}>
      <h2 className={styles.title}>Register</h2>

      {/* === ROLE TOGGLE === */}
      {/*
      <div className={styles.roleToggle}>
        <input
          type="radio"
          id="client"
          name="role"
          value="client"
          checked={role === 'client'}
          onChange={() => setRole('client')}
          className={styles.radioInput}
        />
        <label htmlFor="client" className={styles.radioLabel}>
          Hire
        </label>

        <input
          type="radio"
          id="freelancer"
          name="role"
          value="freelancer"
          checked={role === 'freelancer'}
          onChange={() => setRole('freelancer')}
          className={styles.radioInput}
        />
        <label htmlFor="freelancer" className={styles.radioLabel}>
          Earn
        </label>
      </div>
      */}
      {err && <p className={styles.error}>{err}</p>}
      {success && <p className={styles.success}>{success}</p>}

      <input
        className={styles.input}
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        autoComplete="name"
      />

      <input
        className={styles.input}
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        autoComplete="email"
      />

      <input
        className={styles.input}
        type="password"
        placeholder="Password (min 6 characters)"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="new-password"
      />

      <button type="submit" loading={loading} className={styles.actionBtn}>
        Register
      </button>

      <p className={styles.textSwitch}>
        Already have an account? <span onClick={onFlip}>Login</span>
      </p>

      <div className="relative my-4 w-full flex items-center justify-center">
        <div className="absolute w-full h-px bg-neutral-700" />
        <span className="bg-[#1f1f1f] px-4 text-xs text-neutral-400 z-10">or</span>
      </div>

      <GoogleButton onClick={handleGoogleRegister} />
    </form>
  );
}
