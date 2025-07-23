import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Home from './pages/home';
import Auth from './pages/auth';
import Profile from './pages/profile';
import TaskFeed from './pages/feed/tasks';
import FreelancerFeed from './pages/feed/freelancers';
import Dashboard from './pages/dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

function Placeholder({ label }) {
  return <div className="text-center text-2xl text-primary mt-32">{label} (Coming Soon)</div>;
}

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();
  if (loading) return <div className="text-center text-primary mt-32">Loading...</div>;
  if (!user) return <Navigate to="/auth" replace />;
  return children;
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <MainLayout>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/feed/tasks" element={<TaskFeed />} />
            <Route path="/feed/freelancers" element={<FreelancerFeed />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/home" />} />
          </Routes>
        </MainLayout>
      </Router>
    </AuthProvider>
  );
}
