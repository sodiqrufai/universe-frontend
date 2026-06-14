'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Bell, Check, Trash2, CheckCheck } from 'lucide-react';

interface Notification {
  id: string;
  type: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

const typeConfig: Record<string, { color: string; bg: string; emoji: string }> = {
  NEW_ORDER: { color: '#2563EB', bg: '#EFF6FF', emoji: '🛍️' },
  DELIVERED: { color: '#7C3AED', bg: '#F5F3FF', emoji: '📦' },
  COMPLETED: { color: '#16A34A', bg: '#F0FDF4', emoji: '✅' },
  CANCELLED: { color: '#DC2626', bg: '#FEF2F2', emoji: '❌' },
  DISPUTED: { color: '#EA580C', bg: '#FFF7ED', emoji: '⚠️' },
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [unreadCount, setUnreadCount] = useState(0);

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

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #3730A3 0%, #4F46E5 60%, #7C3AED 100%)',
        padding: '24px 20px 32px',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h1 style={{
                color: 'white', fontWeight: '800',
                fontSize: '22px', letterSpacing: '-0.5px',
              }}>
                Notifications
              </h1>
              {unreadCount > 0 && (
                <span style={{
                  background: '#EF4444', color: 'white',
                  fontSize: '11px', fontWeight: '700',
                  padding: '2px 8px', borderRadius: '20px',
                }}>
                  {unreadCount}
                </span>
              )}
            </div>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '2px' }}>
              Stay updated on your activity
            </p>
          </div>
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              style={{
                display: 'flex', alignItems: 'center', gap: '6px',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px', padding: '8px 12px',
                color: 'white', fontSize: '12px',
                fontWeight: '600', cursor: 'pointer',
              }}
            >
              <CheckCheck size={14} />
              Mark all read
            </button>
          )}
        </div>
      </div>

      {/* Notifications */}
      <div style={{ padding: '16px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8', fontSize: '14px' }}>
            Loading...
          </div>
        ) : notifications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{
              width: '64px', height: '64px',
              background: '#EEF2FF', borderRadius: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <Bell size={28} color="#4F46E5" />
            </div>
            <p style={{ fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>
              No notifications yet
            </p>
            <p style={{ fontSize: '13px', color: '#94A3B8' }}>
              You're all caught up!
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {notifications.map((notif) => {
              const config = typeConfig[notif.type] || { color: '#64748B', bg: '#F8FAFC', emoji: '🔔' };
              return (
                <div
                  key={notif.id}
                  style={{
                    background: 'white',
                    borderRadius: '18px',
                    padding: '16px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    display: 'flex', gap: '14px', alignItems: 'flex-start',
                    borderLeft: notif.is_read ? 'none' : `3px solid ${config.color}`,
                  }}
                >
                  {/* Emoji icon */}
                  <div style={{
                    width: '44px', height: '44px',
                    background: config.bg, borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontSize: '20px',
                  }}>
                    {config.emoji}
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span style={{
                      fontSize: '11px', fontWeight: '700',
                      color: config.color, background: config.bg,
                      padding: '2px 8px', borderRadius: '20px',
                      display: 'inline-block', marginBottom: '6px',
                    }}>
                      {notif.type.replace('_', ' ')}
                    </span>
                    <p style={{
                      fontSize: '13px', color: '#0F172A',
                      lineHeight: '1.5', marginBottom: '6px',
                      fontWeight: notif.is_read ? '400' : '600',
                    }}>
                      {notif.message}
                    </p>
                    <p style={{ fontSize: '11px', color: '#94A3B8' }}>
                      {new Date(notif.created_at).toLocaleString()}
                    </p>
                  </div>

                  {/* Actions */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flexShrink: 0 }}>
                    {!notif.is_read && (
                      <button
                        onClick={() => markAsRead(notif.id)}
                        style={{
                          width: '30px', height: '30px',
                          background: '#EEF2FF', border: 'none',
                          borderRadius: '8px', cursor: 'pointer',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                        }}
                      >
                        <Check size={14} color="#4F46E5" />
                      </button>
                    )}
                    <button
                      onClick={() => deleteNotification(notif.id)}
                      style={{
                        width: '30px', height: '30px',
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
    </div>
  );
}