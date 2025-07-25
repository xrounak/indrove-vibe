import React, { useState } from 'react';
import styles from './Auth.module.css';
import { useAuth } from '../../context/AuthContext';
// import Button from '../../components/Button';
import { GoogleButton } from '../../components/ContinueWithGoogle';

export default function Login({ onFlip }) {
  const { login, loginWithGoogle, sendResetEmail, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [resetMsg, setResetMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const handleGoogleLogin = async () => {
    setError('');
    setMessage('');
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message || 'Google login failed');
    }
  };

  const handleForgotPassword = async () => {
    setError('');
    setMessage('');
    if (!email) {
      setError('Please enter your email to reset password.');
      return;
    }

    try {
      await sendResetEmail(email);
      setMessage('Password reset email sent!');
    } catch (err) {
      setError(err.message || 'Failed to send reset email');
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Login</h2>

      {error && <p className={styles.error}>{error}</p>}
      {message && <p className={styles.success}>{message}</p>}

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
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        autoComplete="current-password"
      />

      <div className={styles.forgotWrapper}>
        <button
          type="button"
          onClick={handleForgotPassword}
          className={styles.forgotBtn}
        >
          Forgot Password?
        </button>
      </div>

      <button
        type="submit"
        className={styles.actionBtn}
        loading={loading}
      >
        Login
      </button>

      <p className={styles.textSwitch}>
        Don&apos;t have an account? <span onClick={onFlip}>Register</span>
      </p>

      <div className="relative my-4 w-full flex items-center justify-center">
        <div className="absolute w-full h-px bg-neutral-700" />
        <span className="bg-[#1f1f1f] px-4 text-xs text-neutral-400 z-10">or</span>
      </div>

      <GoogleButton onClick={handleGoogleLogin} />
    </form>
  );
}
