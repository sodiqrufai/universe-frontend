'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import Link from 'next/link';
import {
  Building2,
  Wrench,
  ShoppingBag,
  Bell,
  Shield,
  ArrowRight,
  Package,
  Wallet,
  Star,
} from 'lucide-react';

export default function DashboardPage() {
  const { user, loadFromStorage } = useAuthStore();
  const [unreadCount, setUnreadCount] = useState(0);
  const [stats, setStats] = useState({
    orders: 0,
    wallet: 0,
  });

  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user]);
  const fetchData = async () => {
    try {
      const [notifRes, walletRes] = await Promise.all([
        api.get('/notifications/unread-count'),
        api.get('/payments/wallet'),
      ]);
      setUnreadCount(notifRes.data.unread_count);
      setStats((prev) => ({ ...prev, wallet: walletRes.data.balance }));
    } catch (err) {
      console.error(err);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const categories = [
    { label: 'Housing', icon: Building2, href: '/housing', color: '#EEF2FF', iconColor: '#4F46E5' },
    { label: 'Services', icon: Wrench, href: '/services', color: '#F0FDF4', iconColor: '#16A34A' },
    { label: 'Market', icon: ShoppingBag, href: '/marketplace', color: '#FFF7ED', iconColor: '#EA580C' },
  ];

  const quickLinks = [
    { label: 'My Orders', icon: Package, href: '/orders', color: '#EEF2FF', iconColor: '#4F46E5' },
    { label: 'Wallet', icon: Wallet, href: '/wallet', color: '#F0FDF4', iconColor: '#16A34A' },
    { label: 'Reviews', icon: Star, href: '/marketplace', color: '#FFFBEB', iconColor: '#D97706' },
    { label: 'Notifications', icon: Bell, href: '/notifications', color: '#FDF4FF', iconColor: '#9333EA' },
  ];

  return (
    <div>
      {/* Hero Header */}
      <div style={{
        background: 'linear-gradient(160deg, #3730A3 0%, #4F46E5 60%, #7C3AED 100%)',
        padding: '28px 20px 48px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Glow */}
        <div style={{
          position: 'absolute', top: '-60px', right: '-60px',
          width: '200px', height: '200px',
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '50%',
        }} />

        {/* Top row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '24px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '44px', height: '44px',
              background: 'rgba(255,255,255,0.15)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              border: '2px solid rgba(255,255,255,0.2)',
            }}>
              <span style={{ color: 'white', fontWeight: '800', fontSize: '16px' }}>
                {user?.name?.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '12px' }}>
                {getGreeting()},
              </p>
              <p style={{ color: 'white', fontWeight: '700', fontSize: '16px' }}>
                Hi, {user?.name?.split(' ')[0]} 👋
              </p>
            </div>
          </div>

          <Link href="/notifications" style={{
            width: '40px', height: '40px',
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', textDecoration: 'none',
            border: '1px solid rgba(255,255,255,0.2)',
          }}>
            <Bell size={18} color="white" />
            {unreadCount > 0 && (
              <div style={{
                position: 'absolute', top: '-2px', right: '-2px',
                width: '16px', height: '16px',
                background: '#EF4444',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: '2px solid white',
              }}>
                <span style={{ color: 'white', fontSize: '9px', fontWeight: '700' }}>
                  {unreadCount}
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Headline */}
        <h1 style={{
          color: 'white', fontWeight: '800',
          fontSize: '26px', lineHeight: '1.3',
          letterSpacing: '-0.5px', marginBottom: '20px',
        }}>
          What do you need
          <br />on campus today?
        </h1>

        {/* Search bar */}
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '14px 16px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)',
        }}>
          <span style={{ fontSize: '18px' }}>🔍</span>
          <span style={{ color: '#94A3B8', fontSize: '14px' }}>
            Search housing, services, products...
          </span>
        </div>
      </div>

      {/* Categories */}
      <div style={{
        background: 'white',
        margin: '-20px 16px 0',
        borderRadius: '20px',
        padding: '20px',
        boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '12px',
        position: 'relative',
        zIndex: 10,
      }}>
        {categories.map((cat) => (
          <Link
            key={cat.label}
            href={cat.href}
            style={{ textDecoration: 'none' }}
          >
            <div style={{
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', gap: '8px',
              padding: '16px 8px',
              background: cat.color,
              borderRadius: '16px',
              transition: 'transform 0.2s',
            }}>
              <cat.icon size={24} color={cat.iconColor} />
              <span style={{
                fontSize: '12px', fontWeight: '700',
                color: '#0F172A',
              }}>
                {cat.label}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {/* Verified badge */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          background: 'white',
          borderRadius: '16px',
          padding: '16px',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <div style={{
            width: '40px', height: '40px',
            background: '#F0FDF4',
            borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <Shield size={20} color="#16A34A" />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ fontWeight: '700', fontSize: '14px', color: '#0F172A', marginBottom: '2px' }}>
              Verified for students
            </p>
            <p style={{ fontSize: '12px', color: '#64748B' }}>
              Every host, pro and seller is ID-checked.
            </p>
          </div>
          <span style={{
            fontWeight: '800', fontSize: '16px', color: '#16A34A',
          }}>
            99%
          </span>
        </div>
      </div>

      {/* Quick links */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '12px',
        }}>
          <h2 style={{ fontWeight: '800', fontSize: '16px', color: '#0F172A' }}>
            Quick access
          </h2>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
        }}>
          {quickLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}>
                <div style={{
                  width: '40px', height: '40px',
                  background: link.color,
                  borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <link.icon size={18} color={link.iconColor} />
                </div>
                <span style={{
                  fontSize: '13px', fontWeight: '700', color: '#0F172A',
                }}>
                  {link.label}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Wallet balance card */}
      <div style={{ padding: '16px 16px 0' }}>
        <div style={{
          background: 'linear-gradient(135deg, #3730A3 0%, #4F46E5 100%)',
          borderRadius: '20px',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px', marginBottom: '4px' }}>
              Wallet Balance
            </p>
            <p style={{ color: 'white', fontWeight: '800', fontSize: '28px', letterSpacing: '-1px' }}>
              ₦{stats.wallet.toLocaleString()}
            </p>
          </div>
          <Link href="/wallet" style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'rgba(255,255,255,0.15)',
            border: '1px solid rgba(255,255,255,0.2)',
            borderRadius: '12px',
            padding: '10px 14px',
            textDecoration: 'none',
          }}>
            <span style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>
              View
            </span>
            <ArrowRight size={14} color="white" />
          </Link>
        </div>
      </div>

      {/* Popular Services preview */}
      <div style={{ padding: '20px 16px 0' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '12px',
        }}>
          <h2 style={{ fontWeight: '800', fontSize: '16px', color: '#0F172A' }}>
            Popular services
          </h2>
          <Link href="/marketplace" style={{
            fontSize: '13px', color: '#4F46E5',
            fontWeight: '600', textDecoration: 'none',
          }}>
            See all
          </Link>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {[
            { name: 'Logo Design', category: 'Design', price: '₦3,000', rating: '4.9', color: '#EEF2FF', iconColor: '#4F46E5' },
            { name: 'Math Tutoring', category: 'Tutoring', price: '₦2,000/hr', rating: '4.8', color: '#F0FDF4', iconColor: '#16A34A' },
            { name: 'Web Development', category: 'Tech', price: '₦15,000', rating: '5.0', color: '#FFF7ED', iconColor: '#EA580C' },
          ].map((service) => (
            <Link
              key={service.name}
              href="/marketplace"
              style={{ textDecoration: 'none' }}
            >
              <div style={{
                background: 'white',
                borderRadius: '16px',
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              }}>
                <div style={{
                  width: '48px', height: '48px',
                  background: service.color,
                  borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <ShoppingBag size={20} color={service.iconColor} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '700', fontSize: '14px', color: '#0F172A', marginBottom: '4px' }}>
                    {service.name}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: '600',
                      color: service.iconColor,
                      background: service.color,
                      padding: '2px 8px', borderRadius: '20px',
                    }}>
                      {service.category}
                    </span>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                      ⭐ {service.rating}
                    </span>
                  </div>
                </div>
                <p style={{ fontWeight: '700', fontSize: '14px', color: '#4F46E5' }}>
                  {service.price}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom spacing */}
      <div style={{ height: '20px' }} />
    </div>
  );
}