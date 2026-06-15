'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Bell, Check, Trash2, CheckCheck, Filter } from 'lucide-react';

interface Notification {
  id: string;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const typeConfig: Record<string, { color: string; bg: string; emoji: string; label: string }> = {
  NEW_ORDER: { color: '#2563EB', bg: '#EFF6FF', emoji: '🛍️', label: 'New Order' },
  DELIVERED: { color: '#7C3AED', bg: '#F5F3FF', emoji: '📦', label: 'Delivered' },
  COMPLETED: { color: '#10B981', bg: '#F0FDF4', emoji: '✅', label: 'Completed' },
  CANCELLED: { color: '#DC2626', bg: '#FEF2F2', emoji: '❌', label: 'Cancelled' },
  DISPUTED: { color: '#EA580C', bg: '#FFF7ED', emoji: '⚠️', label: 'Disputed' },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchNotifications();
    fetchUnreadCount();
  }, []);

  const fetchNotifications = async () => {
    setLoading(true);
    try {
      const res = await api.get('/notifications');
      setNotifications(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchUnreadCount = async () => {
    try {
      const res = await api.get('/notifications/unread-count');
      setUnreadCount(res.data.unread_count);
    } catch (err) {
      console.error(err);
    }
  };

  const markAsRead = async (id: string) => {
    try {
      await api.put(`/notifications/${id}/read`);
      fetchNotifications();
      fetchUnreadCount();
    } catch (err) {
      console.error(err);
    }
  };

  const markAllAsRead = async () => {
    try {
      await api.put('/notifications/read-all');
      fetchNotifications();
      setUnreadCount(0);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteNotification = async (id: string) => {
    try {
      await api.delete(`/notifications/${id}`);
      fetchNotifications();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = notifications.filter((n) => {
    if (filter === 'unread') return !n.is_read;
    if (filter === 'read') return n.is_read;
    return true;
  });

  return (
    <div style={{ maxWidth: '800px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A' }}>
              Notifications
            </h1>
            {unreadCount > 0 && (
              <span style={{
                background: '#DC2626', color: 'white',
                fontSize: '12px', fontWeight: '700',
                padding: '2px 10px', borderRadius: '20px',
              }}>
                {unreadCount} new
              </span>
            )}
          </div>
          <p style={{ fontSize: '14px', color: '#64748B' }}>
            Stay updated on your orders and activity
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllAsRead}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              background: '#EFF6FF', color: '#1E3A8A',
              border: 'none', borderRadius: '10px',
              padding: '8px 16px', fontSize: '13px',
              fontWeight: '600', cursor: 'pointer',
            }}
          >
            <CheckCheck size={16} />
            Mark all as read
          </button>
        )}
      </div>

      {/* Filter tabs */}
      <div style={{
        display: 'flex', gap: '4px',
        background: 'white', borderRadius: '10px',
        padding: '4px', border: '1px solid #E2E8F0',
        width: 'fit-content', marginBottom: '20px',
      }}>
        {[
          { value: 'all', label: 'All' },
          { value: 'unread', label: 'Unread' },
          { value: 'read', label: 'Read' },
        ].map((tab) => (
          <button
            key={tab.value}
            onClick={() => setFilter(tab.value)}
            style={{
              padding: '6px 16px', border: 'none',
              borderRadius: '8px', fontSize: '13px',
              fontWeight: filter === tab.value ? '700' : '500',
              background: filter === tab.value ? '#1E3A8A' : 'transparent',
              color: filter === tab.value ? 'white' : '#64748B',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notifications */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '60px', color: '#94A3B8' }}>
          Loading...
        </div>
      ) : filtered.length === 0 ? (
        <div style={{
          textAlign: 'center', padding: '60px',
          background: 'white', borderRadius: '16px',
          border: '1px solid #E2E8F0',
        }}>
          <Bell size={48} color="#E2E8F0" style={{ margin: '0 auto 16px' }} />
          <p style={{ fontWeight: '700', fontSize: '16px', color: '#0F172A', marginBottom: '6px' }}>
            No notifications
          </p>
          <p style={{ fontSize: '13px', color: '#94A3B8' }}>You're all caught up!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {filtered.map((notif) => {
            const config = typeConfig[notif.type] || { color: '#64748B', bg: '#F8FAFC', emoji: '🔔', label: notif.type };
            return (
              <div
                key={notif.id}
                style={{
                  background: 'white', borderRadius: '14px',
                  padding: '16px 20px',
                  border: notif.is_read ? '1px solid #E2E8F0' : `1px solid ${config.color}30`,
                  boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  display: 'flex', gap: '14px', alignItems: 'flex-start',
                  borderLeft: notif.is_read ? '1px solid #E2E8F0' : `4px solid ${config.color}`,
                }}
              >
                <div style={{
                  width: '44px', height: '44px',
                  background: config.bg, borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: '20px',
                }}>
                  {config.emoji}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: '700',
                      color: config.color, background: config.bg,
                      padding: '2px 8px', borderRadius: '20px',
                    }}>
                      {config.label}
                    </span>
                    {!notif.is_read && (
                      <div style={{
                        width: '6px', height: '6px',
                        background: config.color, borderRadius: '50%',
                      }} />
                    )}
                  </div>
                  <p style={{
                    fontSize: '14px', color: '#0F172A',
                    fontWeight: notif.is_read ? '400' : '600',
                    lineHeight: '1.5', marginBottom: '4px',
                  }}>
                    {notif.message}
                  </p>
                  <p style={{ fontSize: '12px', color: '#94A3B8' }}>
                    {new Date(notif.created_at).toLocaleString()}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                  {!notif.is_read && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      style={{
                        width: '32px', height: '32px',
                        background: '#EFF6FF', border: 'none',
                        borderRadius: '8px', cursor: 'pointer',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}
                    >
                      <Check size={14} color="#1E3A8A" />
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    style={{
                      width: '32px', height: '32px',
                      background: '#FEF2F2', border: 'none',
                      borderRadius: '8px', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}
                  >
                    <Trash2 size={14} color="#DC2626" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}