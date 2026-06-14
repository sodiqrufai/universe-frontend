'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import {
  Home,
  Building2,
  Wrench,
  ShoppingBag,
  User,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Home', icon: Home },
  { href: '/housing', label: 'Housing', icon: Building2 },
  { href: '/services', label: 'Services', icon: Wrench },
  { href: '/marketplace', label: 'Market', icon: ShoppingBag },
  { href: '/profile', label: 'Profile', icon: User },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <>
      {/* Top bar */}
      <div style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        background: 'white',
        borderBottom: '1px solid #F1F5F9',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px', height: '32px',
            background: '#4F46E5',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontWeight: '800', fontSize: '14px' }}>U</span>
          </div>
          <span style={{ fontWeight: '800', fontSize: '18px', color: '#0F172A', letterSpacing: '-0.5px' }}>
            Uni<span style={{ color: '#4F46E5' }}>Verse</span>
          </span>
        </div>

        {user && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{
              fontSize: '13px', color: '#64748B', fontWeight: '500',
            }}>
              {user.name}
            </span>
            <div style={{
              width: '36px', height: '36px',
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              cursor: 'pointer',
            }}>
              <span style={{ color: 'white', fontWeight: '700', fontSize: '13px' }}>
                {user.name?.charAt(0).toUpperCase()}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Bottom navigation */}
      <div style={{
        position: 'fixed', bottom: 0, left: 0, right: 0,
        background: 'white',
        borderTop: '1px solid #F1F5F9',
        padding: '8px 0 12px',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        zIndex: 100,
        boxShadow: '0 -4px 20px rgba(0,0,0,0.05)',
      }}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '4px',
                textDecoration: 'none',
                padding: '4px 16px',
              }}
            >
              <item.icon
                size={22}
                color={active ? '#4F46E5' : '#94A3B8'}
                strokeWidth={active ? 2.5 : 1.8}
              />
              <span style={{
                fontSize: '11px',
                fontWeight: active ? '700' : '500',
                color: active ? '#4F46E5' : '#94A3B8',
              }}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </>
  );
}