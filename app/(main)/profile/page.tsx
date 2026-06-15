'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import {
  Settings, Shield, Bell, BarChart2,
  HelpCircle, LogOut, ChevronRight,
  Package, Wallet, Star, Edit, Bookmark,
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, loadFromStorage } = useAuthStore();
  const [wallet, setWallet] = useState({ balance: 0, locked_balance: 0 });
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('saved');

  useEffect(() => {
    loadFromStorage();
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [walletRes, ordersRes] = await Promise.all([
        api.get('/payments/wallet'),
        api.get('/orders?role=buyer'),
      ]);
      setWallet(walletRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuSections = [
    {
      title: 'MY SAVED',
      items: [
        { icon: '🏠', label: 'Saved hostels', value: '6 places', href: '/housing' },
        { icon: '🔧', label: 'Saved services', value: '3 providers', href: '/services' },
        { icon: '🛍️', label: 'Saved products', value: '9 items', href: '/marketplace' },
      ],
    },
    {
      title: 'ACCOUNT',
      items: [
        { icon: '✅', label: 'Verification', value: user?.is_verified ? 'Verified' : 'Pending', href: '#', color: user?.is_verified ? '#10B981' : '#F59E0B' },
        { icon: '🔔', label: 'Notifications', value: '', href: '/notifications' },
        { icon: '📊', label: 'Seller dashboard', value: '', href: '/seller/listings' },
        { icon: '❓', label: 'Help & support', value: '', href: '#' },
      ],
    },
  ];

  return (
    <div style={{ maxWidth: '800px' }}>

      {/* Profile header */}
      <div style={{
        background: 'linear-gradient(135deg, #1E3A8A 0%, #6D28D9 100%)',
        borderRadius: '20px', padding: '28px',
        marginBottom: '20px', position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-40px', right: '-40px',
          width: '160px', height: '160px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
        }} />

        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '72px', height: '72px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '3px solid rgba(255,255,255,0.3)',
              fontSize: '28px', fontWeight: '800', color: 'white',
              position: 'relative',
            }}>
              {user?.name?.charAt(0).toUpperCase()}
              <div style={{
                position: 'absolute', bottom: '2px', right: '2px',
                width: '16px', height: '16px',
                background: '#10B981', borderRadius: '50%',
                border: '2px solid white',
              }} />
            </div>
            <div>
              <h1 style={{ fontSize: '22px', fontWeight: '800', color: 'white', marginBottom: '4px' }}>
                {user?.name}
              </h1>
              <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
                {user?.email}
              </p>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                background: 'rgba(16,185,129,0.2)',
                border: '1px solid rgba(16,185,129,0.3)',
                borderRadius: '20px', padding: '4px 12px',
              }}>
                <Shield size={12} color="#34D399" />
                <span style={{ fontSize: '11px', fontWeight: '600', color: '#34D399' }}>
                  Verified Student
                </span>
              </div>
            </div>
          </div>

          <button style={{
            width: '36px', height: '36px',
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '10px', cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Settings size={16} color="white" />
          </button>
        </div>

        {/* Stats */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '12px', marginTop: '20px',
        }}>
          {[
            { value: orders.length, label: 'BOOKINGS' },
            { value: `₦${wallet.balance.toLocaleString()}`, label: 'BALANCE' },
            { value: '96', label: 'TRUST SCORE' },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              background: i === 2 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.1)',
              borderRadius: '12px', padding: '14px',
              textAlign: 'center',
              border: i === 2 ? '1px solid rgba(255,255,255,0.2)' : 'none',
            }}>
              <p style={{ fontSize: '22px', fontWeight: '800', color: 'white', marginBottom: '4px' }}>
                {stat.value}
              </p>
              <p style={{ fontSize: '10px', color: 'rgba(255,255,255,0.5)', letterSpacing: '0.5px' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Become a seller */}
      {user?.role === 'BUYER' && (
        <div style={{
          background: 'white', borderRadius: '14px',
          padding: '16px 20px', border: '1px solid #E2E8F0',
          display: 'flex', alignItems: 'center', gap: '14px',
          marginBottom: '16px', cursor: 'pointer',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <div style={{
            width: '44px', height: '44px',
            background: '#EFF6FF', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <BarChart2 size={22} color="#1E3A8A" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: '700', fontSize: '14px', color: '#0F172A', marginBottom: '2px' }}>
              Become a Seller
            </p>
            <p style={{ fontSize: '12px', color: '#64748B' }}>
              List housing, services or products
            </p>
          </div>
          <ChevronRight size={18} color="#CBD5E1" />
        </div>
      )}

      {/* Menu sections */}
      {menuSections.map((section) => (
        <div key={section.title} style={{ marginBottom: '16px' }}>
          <p style={{
            fontSize: '11px', fontWeight: '700', color: '#94A3B8',
            letterSpacing: '0.5px', marginBottom: '8px',
          }}>
            {section.title}
          </p>
          <div style={{
            background: 'white', borderRadius: '14px',
            border: '1px solid #E2E8F0', overflow: 'hidden',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            {section.items.map((item, i) => (
              <div
                key={item.label}
                onClick={() => router.push(item.href)}
                style={{
                  display: 'flex', alignItems: 'center',
                  gap: '14px', padding: '14px 16px',
                  borderBottom: i < section.items.length - 1 ? '1px solid #F8FAFC' : 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
              >
                <div style={{
                  width: '36px', height: '36px',
                  background: '#F8FAFC', borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: '18px',
                }}>
                  {item.icon}
                </div>
                <span style={{ flex: 1, fontSize: '14px', fontWeight: '600', color: '#0F172A' }}>
                  {item.label}
                </span>
                {item.value && (
                  <span style={{
                    fontSize: '12px', fontWeight: '600',
                    color: (item as any).color || '#94A3B8',
                  }}>
                    {item.value}
                  </span>
                )}
                <ChevronRight size={16} color="#CBD5E1" />
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Logout */}
      <button
        onClick={handleLogout}
        style={{
          width: '100%', background: '#FEF2F2',
          border: '1px solid #FEE2E2', borderRadius: '14px',
          padding: '16px', display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          gap: '10px', cursor: 'pointer',
        }}
      >
        <LogOut size={18} color="#DC2626" />
        <span style={{ fontSize: '15px', fontWeight: '700', color: '#DC2626' }}>
          Log out
        </span>
      </button>
    </div>
  );
}