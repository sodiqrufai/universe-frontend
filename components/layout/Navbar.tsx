'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { useState } from 'react';
import {
  Search,
  Bell,
  ChevronDown,
  User,
  LayoutDashboard,
  Bookmark,
  MessageSquare,
  LogOut,
  Settings,
} from 'lucide-react';

const navLinks = [
  { href: '/dashboard', label: 'Home' },
  { href: '/housing', label: 'Housing' },
  { href: '/services', label: 'Services' },
  { href: '/marketplace', label: 'Marketplace' },
  { href: '/about', label: 'About' },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      height: '64px',
      background: 'white',
      borderBottom: '1px solid #E2E8F0',
      display: 'flex', alignItems: 'center',
      padding: '0 24px',
      zIndex: 1000,
      gap: '24px',
    }}>
      {/* Logo */}
      <Link href="/dashboard" style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        flexShrink: 0,
      }}>
        <div style={{
          width: '32px', height: '32px',
          background: 'linear-gradient(135deg, #1E3A8A, #6D28D9)',
          borderRadius: '8px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <span style={{ color: 'white', fontWeight: '800', fontSize: '16px' }}>U</span>
        </div>
        <span style={{
          fontWeight: '800', fontSize: '18px',
          color: '#0F172A', letterSpacing: '-0.5px',
        }}>
          UniVerse
        </span>
      </Link>

      {/* Nav links */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '4px', flex: 1 }}>
        {navLinks.map((link) => {
          const active = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: active ? '600' : '500',
                color: active ? '#1E3A8A' : '#64748B',
                background: active ? '#EFF6FF' : 'transparent',
                borderBottom: active ? '2px solid #1E3A8A' : '2px solid transparent',
                transition: 'all 0.15s',
              }}
            >
              {link.label}
            </Link>
          );
        })}
      </div>

      {/* Search */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: '#F8FAFC', border: '1px solid #E2E8F0',
        borderRadius: '10px', padding: '8px 14px',
        width: '260px', flexShrink: 0,
      }}>
        <Search size={15} color="#94A3B8" />
        <input
          placeholder="Search for campus housing..."
          style={{
            border: 'none', background: 'none',
            fontSize: '13px', color: '#0F172A',
            width: '100%',
          }}
        />
      </div>

      {/* Right side */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
        {/* Notifications */}
        <button style={{
          width: '36px', height: '36px',
          background: '#F8FAFC', border: '1px solid #E2E8F0',
          borderRadius: '10px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          position: 'relative',
        }}>
          <Bell size={16} color="#64748B" />
          <div style={{
            position: 'absolute', top: '6px', right: '6px',
            width: '8px', height: '8px',
            background: '#EF4444', borderRadius: '50%',
            border: '1.5px solid white',
          }} />
        </button>

        {/* User dropdown */}
        {user && (
          <div style={{ position: 'relative' }}>
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                background: '#F8FAFC', border: '1px solid #E2E8F0',
                borderRadius: '10px', padding: '6px 10px',
                cursor: 'pointer',
              }}
            >
              <div style={{
                width: '28px', height: '28px',
                background: 'linear-gradient(135deg, #1E3A8A, #6D28D9)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: 'white', fontWeight: '700', fontSize: '12px' }}>
                  {user.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              <span style={{ fontSize: '13px', fontWeight: '600', color: '#0F172A' }}>
                {user.name?.split(' ')[0]}
              </span>
              <ChevronDown size={14} color="#94A3B8" />
            </button>

            {/* Dropdown */}
            {showDropdown && (
              <div style={{
                position: 'absolute', top: '44px', right: 0,
                background: 'white', border: '1px solid #E2E8F0',
                borderRadius: '14px', padding: '8px',
                width: '200px',
                boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                zIndex: 100,
              }}>
                {/* User info */}
                <div style={{
                  padding: '10px 12px', marginBottom: '4px',
                  borderBottom: '1px solid #F1F5F9',
                }}>
                  <p style={{ fontWeight: '700', fontSize: '13px', color: '#0F172A' }}>
                    {user.name}
                  </p>
                  <p style={{ fontSize: '11px', color: '#94A3B8', marginTop: '2px' }}>
                    {user.email}
                  </p>
                </div>

                {[
                  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
                  { icon: User, label: 'Profile', href: '/profile' },
                  { icon: Bookmark, label: 'Saved Items', href: '/profile' },
                  { icon: MessageSquare, label: 'Messages', href: '/messages' },
                  { icon: Settings, label: 'Settings', href: '/profile' },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setShowDropdown(false)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '8px 12px', borderRadius: '8px',
                      fontSize: '13px', fontWeight: '500', color: '#374151',
                      transition: 'background 0.15s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <item.icon size={15} color="#64748B" />
                    {item.label}
                  </Link>
                ))}

                <div style={{ borderTop: '1px solid #F1F5F9', marginTop: '4px', paddingTop: '4px' }}>
                  <button
                    onClick={handleLogout}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '10px',
                      padding: '8px 12px', borderRadius: '8px',
                      fontSize: '13px', fontWeight: '500', color: '#EF4444',
                      background: 'none', border: 'none', cursor: 'pointer',
                      width: '100%',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = '#FEF2F2')}
                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                  >
                    <LogOut size={15} color="#EF4444" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}