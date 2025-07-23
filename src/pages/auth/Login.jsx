import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/Button';

export default function Login({ onFlip }) {
  const { login, loginWithGoogle, sendResetEmail, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showForgot, setShowForgot] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetMsg, setResetMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await login(email, password);
    } catch (err) {
      setError(err.message || 'Login failed');
    }
  };

  const handleGoogle = async () => {
    setError('');
    try {
      await loginWithGoogle();
    } catch (err) {
      setError(err.message || 'Google login failed');
    }
  };

  const handleForgot = async (e) => {
    e.preventDefault();
    setResetMsg('');
    try {
      await sendResetEmail(resetEmail);
      setResetMsg('Password reset email sent!');
    } catch (err) {
      setResetMsg(err.message || 'Failed to send reset email');
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 p-6">
      <h2 className="text-2xl font-bold text-primary mb-2 text-center">Sign In</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          className="bg-card border border-primary/30 rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          className="bg-card border border-primary/30 rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
        {error && <div className="text-red-400 text-sm text-center">{error}</div>}
        <Button type="submit" loading={loading} className="w-full">Login</Button>
      </form>
      <Button type="button" onClick={handleGoogle} className="w-full bg-white text-primary flex items-center justify-center gap-2" style={{boxShadow:'0 0 0 1.5px #14b8a6'}}>
        <svg width="20" height="20" viewBox="0 0 48 48"><g><path fill="#4285F4" d="M43.6 20.5H42V20H24v8h11.3C34.7 32.1 30.1 35 24 35c-6.1 0-11.3-4.1-13.1-9.6c-0.4-1-0.6-2-0.6-3.1c0-1.1 0.2-2.1 0.6-3.1C12.7 12.1 17.9 8 24 8c3.1 0 6 1.1 8.2 2.9l6.2-6.2C34.5 1.7 29.5 0 24 0C14.6 0 6.4 6.6 3.1 15.6c-0.7 1.8-1.1 3.7-1.1 5.6c0 1.9 0.4 3.8 1.1 5.6C6.4 41.4 14.6 48 24 48c5.5 0 10.5-1.7 14.4-4.7c4.1-3.2 6.6-8.1 6.6-13.3c0-1.1-0.1-2.1-0.2-3.1z"/><path fill="#34A853" d="M6.3 14.1l6.6 4.8C14.1 16.1 18.7 13 24 13c3.1 0 6 1.1 8.2 2.9l6.2-6.2C34.5 1.7 29.5 0 24 0C14.6 0 6.4 6.6 3.1 15.6c-0.7 1.8-1.1 3.7-1.1 5.6c0 1.9 0.4 3.8 1.1 5.6C6.4 41.4 14.6 48 24 48c5.5 0 10.5-1.7 14.4-4.7c4.1-3.2 6.6-8.1 6.6-13.3c0-1.1-0.1-2.1-0.2-3.1z"/><path fill="#FBBC05" d="M24 48c6.1 0 11.3-4.1 13.1-9.6l-6.2-4.8C30.1 35 25.5 32.1 24 32.1c-3.1 0-6 1.1-8.2 2.9l-6.2 6.2C13.5 46.3 18.5 48 24 48z"/><path fill="#EA4335" d="M43.6 20.5H42V20H24v8h11.3C34.7 32.1 30.1 35 24 35c-6.1 0-11.3-4.1-13.1-9.6c-0.4-1-0.6-2-0.6-3.1c0-1.1 0.2-2.1 0.6-3.1C12.7 12.1 17.9 8 24 8c3.1 0 6 1.1 8.2 2.9l6.2-6.2C34.5 1.7 29.5 0 24 0C14.6 0 6.4 6.6 3.1 15.6c-0.7 1.8-1.1 3.7-1.1 5.6c0 1.9 0.4 3.8 1.1 5.6C6.4 41.4 14.6 48 24 48c5.5 0 10.5-1.7 14.4-4.7c4.1-3.2 6.6-8.1 6.6-13.3c0-1.1-0.1-2.1-0.2-3.1z"/></g></svg>
        Continue with Google
      </Button>
      <div className="text-center text-sm mt-2 text-text">
        <button type="button" className="text-primary underline" onClick={() => setShowForgot(v => !v)}>
          Forgot password?
        </button>
      </div>
      {showForgot && (
        <form onSubmit={handleForgot} className="flex flex-col gap-2 mt-2">
          <input
            type="email"
            className="bg-card border border-primary/30 rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
            placeholder="Enter your email"
            value={resetEmail}
            onChange={e => setResetEmail(e.target.value)}
            required
          />
          <Button type="submit" loading={loading} className="w-full">Send Reset Email</Button>
          {resetMsg && <div className="text-xs text-center text-primary mt-1">{resetMsg}</div>}
        </form>
      )}
      <div className="text-center text-sm mt-2 text-text">
        Don't have an account?{' '}
        <button type="button" className="text-primary underline" onClick={onFlip}>Sign Up</button>
      </div>
    </div>
  );
} 