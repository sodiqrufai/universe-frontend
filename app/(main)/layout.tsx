'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/layout/Navbar';
import Sidebar from '@/components/layout/Sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loadFromStorage } = useAuthStore();

  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    if (user === null) {
      const token = localStorage.getItem('universe_token');
      if (!token) {
        router.push('/login');
      }
    }
  }, [user]);

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC' }}>
      <Navbar />
      <div style={{ display: 'flex', paddingTop: '64px' }}>
        <Sidebar />
        <main style={{
          marginLeft: '200px',
          flex: 1,
          minHeight: 'calc(100vh - 64px)',
          padding: '24px',
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}