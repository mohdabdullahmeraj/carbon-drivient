import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import Sidebar from '@/components/Sidebar';
import Topbar from '@/components/Topbar';

export default function AppLayout({ children }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        'http://localhost:3000/api/auth/logout',
        {},
        { withCredentials: true }
      );
      toast.success('Logged out successfully');
      navigate('/login');
    } catch (err) {
      console.error('Logout failed', err);
      toast.error('Logout failed. Please try again.');
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f1ffe4]">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex w-64 border-r bg-white/90">
        <Sidebar onLogout={handleLogout} />
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar onLogout={handleLogout} />
        <main className="flex-1 p-4 md:p-6 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
