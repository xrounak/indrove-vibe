import React from 'react';
import Navbar from '../components/Navbar';

export default function MainLayout({ children }) {
  return (
    <div className="bg-background min-h-screen">
      <Navbar />
      <div className="pt-20">{/* Padding for fixed navbar */}
        {children}
      </div>
    </div>
  );
} 