import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
// import Button from '../../components/Button';

export default function Signup({ onFlip }) {
  const { register, loading } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await register(email, password, name);
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  };

  return (
    <div className="w-full flex flex-col gap-5 p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-primary mb-2 text-center">Sign Up</h2>
        <input
          type="text"
          className="bg-card border border-primary/30 rounded-lg px-4 py-2 text-text focus:outline-none focus:ring-2 focus:ring-primary"
          placeholder="Name"
          value={name}
          onChange={e => setName(e.target.value)}
          required
        />
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
        <button type="submit" loading={loading} className="w-full">Sign Up</button>
      </form>
      <div className="text-center text-sm mt-2 text-text">
        Already have an account?{' '}
        <button type="button" className="text-primary underline" onClick={onFlip}>Sign In</button>
      </div>
    </div>
  );
} 