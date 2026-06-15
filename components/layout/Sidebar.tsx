'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  BarChart2,
  List,
  MessageSquare,
  Star,
  Plus,
} from 'lucide-react';

const sidebarItems = [
  { icon: BarChart2, label: 'Analytics', href: '/dashboard' },
  { icon: List, label: 'Listings', href: '/seller/listings' },
  { icon: MessageSquare, label: 'Messages', href: '/messages', badge: 3 },
  { icon: Star, label: 'Reviews', href: '/seller/reviews' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div style={{
      width: '200px',
      background: 'white',
      borderRight: '1px solid #E2E8F0',
      height: 'calc(100vh - 64px)',
      position: 'fixed',
      top: '64px', left: 0,
      display: 'flex',
      flexDirection: 'column',
      padding: '16px 12px',
      zIndex: 100,
    }}>
      {/* Section label */}
      <div style={{ marginBottom: '8px', padding: '0 8px' }}>
        <p style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.5px' }}>
          DASHBOARD
        </p>
        <p style={{ fontSize: '12px', color: '#64748B', marginTop: '2px' }}>
          Manage your UniVerse
        </p>
      </div>

      {/* Nav items */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', flex: 1 }}>
        {sidebarItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '10px',
                fontSize: '13px', fontWeight: active ? '700' : '500',
                color: active ? '#1E3A8A' : '#64748B',
                background: active ? '#EFF6FF' : 'transparent',
                transition: 'all 0.15s',
                position: 'relative',
              }}
            >
              <item.icon size={17} color={active ? '#1E3A8A' : '#94A3B8'} />
              {item.label}
              {item.badge && (
                <span style={{
                  marginLeft: 'auto',
                  background: '#EF4444', color: 'white',
                  fontSize: '10px', fontWeight: '700',
                  padding: '1px 6px', borderRadius: '10px',
                }}>
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Post new listing CTA */}
      <button style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: '8px',
        background: '#1E3A8A', color: 'white',
        border: 'none', borderRadius: '12px',
        padding: '12px', fontSize: '13px',
        fontWeight: '700', cursor: 'pointer',
        width: '100%',
      }}>
        <Plus size={16} />
        Post New Listing
      </button>
    </div>
  );
}