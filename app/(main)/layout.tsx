'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import Navbar from '@/components/layout/Navbar';

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
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />
      <main style={{
        paddingTop: '64px',
        paddingBottom: '80px',
        width: '100%',
      }}>
        {children}
      </main>
    </div>
  );
}