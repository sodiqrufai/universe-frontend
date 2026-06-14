'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import {
  Settings,
  Shield,
  Bell,
  BarChart2,
  HelpCircle,
  LogOut,
  ChevronRight,
  Package,
  Wallet,
  Star,
} from 'lucide-react';

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout, loadFromStorage } = useAuthStore();
  const [wallet, setWallet] = useState({ balance: 0, locked_balance: 0 });
  const [stats, setStats] = useState({ orders: 0, reviews: 0 });

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
      setStats((prev) => ({ ...prev, orders: ordersRes.data.length }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  const menuItems = [
    {
      section: 'MY ACCOUNT',
      items: [
        { icon: Package, label: 'My Orders', href: '/orders', color: '#EEF2FF', iconColor: '#4F46E5' },
        { icon: Wallet, label: 'Wallet', href: '/wallet', color: '#F0FDF4', iconColor: '#16A34A' },
        { icon: Bell, label: 'Notifications', href: '/notifications', color: '#FDF4FF', iconColor: '#9333EA' },
      ],
    },
    {
      section: 'SETTINGS',
      items: [
        { icon: Shield, label: 'Verification', value: user?.is_verified ? 'Verified' : 'Unverified', color: '#F0FDF4', iconColor: '#16A34A' },
        { icon: Settings, label: 'Account Settings', color: '#F8FAFC', iconColor: '#64748B' },
        { icon: HelpCircle, label: 'Help & Support', color: '#F8FAFC', iconColor: '#64748B' },
      ],
    },
  ];

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #3730A3 0%, #4F46E5 60%, #7C3AED 100%)',
        padding: '24px 20px 60px',
        position: 'relative',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            {/* Avatar */}
            <div style={{
              width: '60px', height: '60px',
              background: 'rgba(255,255,255,0.2)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid rgba(255,255,255,0.3)',
              fontSize: '24px', fontWeight: '800', color: 'white',
            }}>
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <p style={{ color: 'white', fontWeight: '800', fontSize: '18px', marginBottom: '4px' }}>
                {user?.name}
              </p>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginBottom: '6px' }}>
                {user?.email}
              </p>
              <span style={{
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.2)',
                color: 'white', fontSize: '11px',
                fontWeight: '600', padding: '3px 10px',
                borderRadius: '20px',
              }}>
                ✓ {user?.role}
              </span>
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
      </div>

      {/* Stats card */}
      <div style={{ padding: '0 16px', marginTop: '-36px', position: 'relative', zIndex: 10 }}>
        <div style={{
          background: 'white', borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
          gap: '0', marginBottom: '16px',
        }}>
          {[
            { value: stats.orders, label: 'ORDERS', icon: Package, color: '#4F46E5' },
            { value: `₦${wallet.balance.toLocaleString()}`, label: 'BALANCE', icon: Wallet, color: '#16A34A' },
            { value: wallet.locked_balance > 0 ? `₦${wallet.locked_balance.toLocaleString()}` : '—', label: 'IN ESCROW', icon: Star, color: '#D97706' },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              textAlign: 'center',
              borderRight: i < 2 ? '1px solid #F1F5F9' : 'none',
              padding: '0 8px',
            }}>
              <p style={{
                fontSize: '20px', fontWeight: '800',
                color: '#0F172A', marginBottom: '4px',
              }}>
                {stat.value}
              </p>
              <p style={{ fontSize: '10px', color: '#94A3B8', fontWeight: '700' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Become a seller banner */}
        {user?.role === 'BUYER' && (
          <div style={{
            background: 'white', borderRadius: '18px',
            padding: '16px 20px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            display: 'flex', alignItems: 'center', gap: '14px',
            marginBottom: '16px', cursor: 'pointer',
          }}>
            <div style={{
              width: '44px', height: '44px',
              background: '#EEF2FF', borderRadius: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              <BarChart2 size={22} color="#4F46E5" />
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontWeight: '700', fontSize: '14px', color: '#0F172A', marginBottom: '2px' }}>
                Become a Seller
              </p>
              <p style={{ fontSize: '12px', color: '#64748B' }}>
                List services or products on UniVerse
              </p>
            </div>
            <ChevronRight size={18} color="#CBD5E1" />
          </div>
        )}

        {/* Menu sections */}
        {menuItems.map((section) => (
          <div key={section.section} style={{ marginBottom: '16px' }}>
            <p style={{
              fontSize: '11px', fontWeight: '700',
              color: '#94A3B8', marginBottom: '8px',
              paddingLeft: '4px', letterSpacing: '0.5px',
            }}>
              {section.section}
            </p>
            <div style={{
              background: 'white', borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}>
              {section.items.map((item, i) => (
                <div
                  key={item.label}
                  onClick={() => item.href && router.push(item.href)}
                  style={{
                    display: 'flex', alignItems: 'center',
                    gap: '14px', padding: '14px 16px',
                    borderBottom: i < section.items.length - 1 ? '1px solid #F8FAFC' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '36px', height: '36px',
                    background: item.color, borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <item.icon size={18} color={item.iconColor} />
                  </div>
                  <span style={{
                    flex: 1, fontSize: '14px',
                    fontWeight: '600', color: '#0F172A',
                  }}>
                    {item.label}
                  </span>
                  {(item as any).value && (
                    <span style={{ fontSize: '12px', color: '#16A34A', fontWeight: '600' }}>
                      {(item as any).value}
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
            width: '100%',
            background: '#FEF2F2',
            border: 'none', borderRadius: '16px',
            padding: '16px',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '10px',
            cursor: 'pointer', marginBottom: '8px',
          }}
        >
          <LogOut size={18} color="#DC2626" />
          <span style={{ fontSize: '15px', fontWeight: '700', color: '#DC2626' }}>
            Log out
          </span>
        </button>
      </div>
    </div>
  );
}