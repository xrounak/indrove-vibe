import React from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] gap-10">
      <h1 className="text-3xl md:text-5xl font-bold text-primary mb-8">Welcome to Indorve Vibe</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <Card className="flex flex-col items-center">
          <span className="text-4xl mb-4">🔍</span>
          <h2 className="text-xl font-semibold mb-2">Find Work</h2>
          <p className="mb-4 text-center">Browse open tasks and apply for jobs that match your skills.</p>
          <Button onClick={() => navigate('/feed/tasks')}>Go to Tasks</Button>
        </Card>
        <Card className="flex flex-col items-center">
          <span className="text-4xl mb-4">🤝</span>
          <h2 className="text-xl font-semibold mb-2">Find Freelancers</h2>
          <p className="mb-4 text-center">Explore freelancer ads and hire for your needs.</p>
          <Button onClick={() => navigate('/feed/freelancers')}>Go to Freelancers</Button>
        </Card>
        <Card className="flex flex-col items-center">
          <span className="text-4xl mb-4">📊</span>
          <h2 className="text-xl font-semibold mb-2">Go to Dashboard</h2>
          <p className="mb-4 text-center">Track your activity, earnings, and manage your profile.</p>
          <Button onClick={() => navigate('/dashboard')}>Dashboard</Button>
        </Card>
      </div>
    </div>
  );
} 