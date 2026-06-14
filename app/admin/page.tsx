'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import {
  Users,
  Package,
  ShoppingBag,
  AlertTriangle,
  TrendingUp,
  CheckCircle,
  XCircle,
  ChevronRight,
  ArrowLeft,
  BarChart2,
} from 'lucide-react';

interface Stats {
  total_users: number;
  total_listings: number;
  total_orders: number;
  total_disputes: number;
  pending_disputes: number;
  total_revenue: number;
}

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  is_verified: boolean;
  created_at: string;
}

interface Order {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  listing: { title: string };
  buyer: { name: string };
  seller: { name: string };
}

const statusColors: Record<string, { color: string; bg: string }> = {
  PENDING: { color: '#D97706', bg: '#FFFBEB' },
  PAID: { color: '#2563EB', bg: '#EFF6FF' },
  IN_PROGRESS: { color: '#4F46E5', bg: '#EEF2FF' },
  DELIVERED: { color: '#7C3AED', bg: '#F5F3FF' },
  COMPLETED: { color: '#16A34A', bg: '#F0FDF4' },
  CANCELLED: { color: '#DC2626', bg: '#FEF2F2' },
  DISPUTED: { color: '#EA580C', bg: '#FFF7ED' },
};

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const [statsRes, usersRes, ordersRes] = await Promise.all([
        api.get('/admin/dashboard'),
        api.get('/admin/users'),
        api.get('/admin/orders'),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setOrders(ordersRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const verifyUser = async (id: string) => {
    try {
      await api.put(`/admin/users/${id}/verify`);
      fetchAll();
    } catch (err) {
      console.error(err);
    }
  };

  const banUser = async (id: string) => {
    try {
      await api.put(`/admin/users/${id}/ban`);
      fetchAll();
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh', display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        color: '#94A3B8', fontSize: '14px',
        fontFamily: 'Inter, sans-serif',
      }}>
        Loading admin panel...
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#F8FAFC',
      fontFamily: 'Inter, sans-serif',
    }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #3730A3 0%, #4F46E5 60%, #7C3AED 100%)',
        padding: '24px 20px 32px',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center',
          gap: '12px', marginBottom: '20px',
        }}>
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              width: '36px', height: '36px',
              background: 'rgba(255,255,255,0.15)',
              border: '1px solid rgba(255,255,255,0.2)',
              borderRadius: '10px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <ArrowLeft size={16} color="white" />
          </button>
          <div>
            <h1 style={{
              color: 'white', fontWeight: '800',
              fontSize: '20px', letterSpacing: '-0.5px',
            }}>
              Admin Panel
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '12px' }}>
              UniVerse Control Center
            </p>
          </div>
        </div>

        {/* Tab bar */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          borderRadius: '12px', padding: '4px',
          display: 'flex', gap: '4px',
        }}>
          {['dashboard', 'users', 'orders'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1, padding: '8px',
                borderRadius: '10px', border: 'none',
                background: activeTab === tab ? 'white' : 'transparent',
                color: activeTab === tab ? '#4F46E5' : 'rgba(255,255,255,0.7)',
                fontWeight: '700', fontSize: '13px',
                cursor: 'pointer', textTransform: 'capitalize',
                transition: 'all 0.2s',
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      <div style={{ padding: '16px' }}>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && stats && (
          <div>
            {/* Revenue card */}
            <div style={{
              background: 'linear-gradient(135deg, #3730A3, #4F46E5)',
              borderRadius: '20px', padding: '20px',
              marginBottom: '16px',
              boxShadow: '0 8px 24px rgba(79,70,229,0.3)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                <div style={{
                  width: '36px', height: '36px',
                  background: 'rgba(255,255,255,0.15)',
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <TrendingUp size={18} color="white" />
                </div>
                <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '13px' }}>
                  Total Platform Revenue
                </span>
              </div>
              <p style={{
                fontSize: '36px', fontWeight: '800',
                color: 'white', letterSpacing: '-1px',
              }}>
                ₦{stats.total_revenue.toLocaleString()}
              </p>
            </div>

            {/* Stats grid */}
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr',
              gap: '12px', marginBottom: '16px',
            }}>
              {[
                { icon: Users, label: 'Total Users', value: stats.total_users, color: '#EEF2FF', iconColor: '#4F46E5' },
                { icon: ShoppingBag, label: 'Listings', value: stats.total_listings, color: '#F0FDF4', iconColor: '#16A34A' },
                { icon: Package, label: 'Total Orders', value: stats.total_orders, color: '#F5F3FF', iconColor: '#7C3AED' },
                { icon: AlertTriangle, label: 'Open Disputes', value: stats.pending_disputes, color: '#FFF7ED', iconColor: '#EA580C' },
              ].map((stat) => (
                <div key={stat.label} style={{
                  background: 'white', borderRadius: '18px',
                  padding: '16px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}>
                  <div style={{
                    width: '36px', height: '36px',
                    background: stat.color, borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '10px',
                  }}>
                    <stat.icon size={18} color={stat.iconColor} />
                  </div>
                  <p style={{
                    fontSize: '24px', fontWeight: '800',
                    color: '#0F172A', marginBottom: '4px',
                  }}>
                    {stat.value}
                  </p>
                  <p style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '600' }}>
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Quick actions */}
            <div style={{
              background: 'white', borderRadius: '18px',
              overflow: 'hidden',
              boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
            }}>
              <p style={{
                padding: '14px 16px 8px',
                fontSize: '11px', fontWeight: '700',
                color: '#94A3B8', letterSpacing: '0.5px',
              }}>
                QUICK ACTIONS
              </p>
              {[
                { icon: Users, label: 'Manage Users', tab: 'users', color: '#EEF2FF', iconColor: '#4F46E5' },
                { icon: Package, label: 'View All Orders', tab: 'orders', color: '#F5F3FF', iconColor: '#7C3AED' },
                { icon: BarChart2, label: 'Platform Analytics', tab: 'dashboard', color: '#F0FDF4', iconColor: '#16A34A' },
              ].map((item, i, arr) => (
                <div
                  key={item.label}
                  onClick={() => setActiveTab(item.tab)}
                  style={{
                    display: 'flex', alignItems: 'center',
                    gap: '14px', padding: '14px 16px',
                    borderBottom: i < arr.length - 1 ? '1px solid #F8FAFC' : 'none',
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
                  <ChevronRight size={16} color="#CBD5E1" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <p style={{
              fontSize: '13px', color: '#64748B',
              marginBottom: '12px', fontWeight: '500',
            }}>
              {users.length} registered users
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {users.map((user) => (
                <div key={user.id} style={{
                  background: 'white', borderRadius: '18px',
                  padding: '16px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                }}>
                  <div style={{
                    display: 'flex', alignItems: 'center',
                    gap: '12px', marginBottom: '12px',
                  }}>
                    <div style={{
                      width: '44px', height: '44px',
                      background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
                      borderRadius: '14px',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <span style={{ color: 'white', fontWeight: '800', fontSize: '16px' }}>
                        {user.name?.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontWeight: '700', fontSize: '14px',
                        color: '#0F172A', marginBottom: '2px',
                      }}>
                        {user.name}
                      </p>
                      <p style={{
                        fontSize: '12px', color: '#64748B',
                        overflow: 'hidden', textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}>
                        {user.email}
                      </p>
                    </div>
                    <span style={{
                      fontSize: '11px', fontWeight: '700',
                      color: '#4F46E5', background: '#EEF2FF',
                      padding: '3px 10px', borderRadius: '20px',
                      flexShrink: 0,
                    }}>
                      {user.role}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '12px',
                    borderTop: '1px solid #F8FAFC',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {user.is_verified ? (
                        <>
                          <CheckCircle size={14} color="#16A34A" />
                          <span style={{ fontSize: '12px', color: '#16A34A', fontWeight: '600' }}>
                            Verified
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle size={14} color="#DC2626" />
                          <span style={{ fontSize: '12px', color: '#DC2626', fontWeight: '600' }}>
                            Unverified
                          </span>
                        </>
                      )}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      {!user.is_verified && (
                        <button
                          onClick={() => verifyUser(user.id)}
                          style={{
                            background: '#F0FDF4', color: '#16A34A',
                            border: 'none', borderRadius: '10px',
                            padding: '6px 14px', fontSize: '12px',
                            fontWeight: '700', cursor: 'pointer',
                          }}
                        >
                          Verify
                        </button>
                      )}
                      {user.is_verified && (
                        <button
                          onClick={() => banUser(user.id)}
                          style={{
                            background: '#FEF2F2', color: '#DC2626',
                            border: 'none', borderRadius: '10px',
                            padding: '6px 14px', fontSize: '12px',
                            fontWeight: '700', cursor: 'pointer',
                          }}
                        >
                          Ban
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div>
            <p style={{
              fontSize: '13px', color: '#64748B',
              marginBottom: '12px', fontWeight: '500',
            }}>
              {orders.length} total orders
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {orders.map((order) => {
                const config = statusColors[order.status] || statusColors.PENDING;
                return (
                  <div key={order.id} style={{
                    background: 'white', borderRadius: '18px',
                    padding: '16px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  }}>
                    <div style={{
                      display: 'flex', justifyContent: 'space-between',
                      alignItems: 'flex-start', marginBottom: '10px',
                    }}>
                      <p style={{
                        fontWeight: '700', fontSize: '14px',
                        color: '#0F172A', flex: 1,
                        marginRight: '8px', lineHeight: '1.3',
                      }}>
                        {order.listing?.title}
                      </p>
                      <p style={{
                        fontWeight: '800', fontSize: '15px',
                        color: '#4F46E5', flexShrink: 0,
                      }}>
                        ₦{order.amount.toLocaleString()}
                      </p>
                    </div>

                    <div style={{
                      display: 'flex', alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                      <div>
                        <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '2px' }}>
                          {order.buyer?.name} → {order.seller?.name}
                        </p>
                        <p style={{ fontSize: '11px', color: '#94A3B8' }}>
                          {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <span style={{
                        fontSize: '11px', fontWeight: '700',
                        color: config.color, background: config.bg,
                        padding: '4px 10px', borderRadius: '20px',
                      }}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}