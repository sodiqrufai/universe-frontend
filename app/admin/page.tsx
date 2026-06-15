'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import {
  Users, Package, ShoppingBag, AlertTriangle,
  TrendingUp, CheckCircle, XCircle, BarChart2,
  Flag, ArrowLeft, Search,
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
  COMPLETED: { color: '#10B981', bg: '#F0FDF4' },
  CANCELLED: { color: '#DC2626', bg: '#FEF2F2' },
  DISPUTED: { color: '#EA580C', bg: '#FFF7ED' },
};

export default function AdminPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [activeTab, setActiveTab] = useState('analytics');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

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

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94A3B8' }}>
      Loading admin panel...
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#F8FAFC', fontFamily: 'Inter, sans-serif' }}>

      {/* Top nav */}
      <div style={{
        background: 'white', borderBottom: '1px solid #E2E8F0',
        padding: '0 24px', height: '64px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between',
        position: 'sticky', top: 0, zIndex: 100,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div style={{
              width: '32px', height: '32px',
              background: 'linear-gradient(135deg, #1E3A8A, #6D28D9)',
              borderRadius: '8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: 'white', fontWeight: '800', fontSize: '14px' }}>U</span>
            </div>
            <div>
              <p style={{ fontWeight: '800', fontSize: '14px', color: '#0F172A' }}>UniVerse</p>
              <p style={{ fontSize: '10px', color: '#94A3B8' }}>Admin Console</p>
            </div>
          </div>

          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#F8FAFC', border: '1px solid #E2E8F0',
            borderRadius: '8px', padding: '7px 14px', width: '280px',
          }}>
            <Search size={14} color="#94A3B8" />
            <input
              placeholder="Search campus listings, users, or IDs..."
              style={{ border: 'none', background: 'none', fontSize: '12px', flex: 1 }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: '#FEF2F2', border: '1px solid #FEE2E2',
            borderRadius: '20px', padding: '4px 12px',
          }}>
            <Flag size={12} color="#DC2626" />
            <span style={{ fontSize: '12px', fontWeight: '600', color: '#DC2626' }}>
              {stats?.pending_disputes ?? 0} Active Flags
            </span>
          </div>
          <button
            onClick={() => router.push('/dashboard')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: 'none', border: '1px solid #E2E8F0',
              borderRadius: '8px', padding: '6px 14px',
              fontSize: '13px', fontWeight: '600', color: '#64748B',
              cursor: 'pointer',
            }}
          >
            <ArrowLeft size={14} /> Back to App
          </button>
        </div>
      </div>

      <div style={{ display: 'flex' }}>

        {/* Sidebar */}
        <div style={{
          width: '200px', background: 'white',
          borderRight: '1px solid #E2E8F0',
          minHeight: 'calc(100vh - 64px)',
          padding: '16px 12px',
          position: 'sticky', top: '64px',
        }}>
          <div style={{ marginBottom: '16px', padding: '0 8px' }}>
            <p style={{ fontSize: '12px', fontWeight: '700', color: '#0F172A', marginBottom: '2px' }}>
              Dashboard
            </p>
            <p style={{ fontSize: '11px', color: '#94A3B8' }}>Manage your UniVerse</p>
          </div>

          {[
            { icon: BarChart2, label: 'Analytics', value: 'analytics' },
            { icon: Users, label: 'Listings', value: 'users' },
            { icon: Package, label: 'Messages', value: 'orders' },
            { icon: Flag, label: 'Reviews', value: 'reviews' },
          ].map((item) => (
            <button
              key={item.value}
              onClick={() => setActiveTab(item.value)}
              style={{
                display: 'flex', alignItems: 'center', gap: '10px',
                padding: '10px 12px', borderRadius: '10px',
                border: 'none', width: '100%', textAlign: 'left',
                background: activeTab === item.value ? '#EFF6FF' : 'transparent',
                color: activeTab === item.value ? '#1E3A8A' : '#64748B',
                fontWeight: activeTab === item.value ? '700' : '500',
                fontSize: '13px', cursor: 'pointer', marginBottom: '2px',
              }}
            >
              <item.icon size={16} color={activeTab === item.value ? '#1E3A8A' : '#94A3B8'} />
              {item.label}
            </button>
          ))}

          <div style={{ position: 'absolute', bottom: '16px', left: '12px', right: '12px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '8px',
              padding: '10px 12px',
            }}>
              <div style={{
                width: '8px', height: '8px',
                background: '#10B981', borderRadius: '50%',
              }} />
              <div>
                <p style={{ fontSize: '11px', fontWeight: '700', color: '#0F172A' }}>Admin Portal</p>
                <p style={{ fontSize: '10px', color: '#94A3B8' }}>Manage your UniVerse</p>
              </div>
            </div>
            <button style={{
              width: '100%', background: '#1E3A8A', color: 'white',
              border: 'none', borderRadius: '8px', padding: '10px',
              fontSize: '12px', fontWeight: '700', cursor: 'pointer',
            }}>
              + Post New Listing
            </button>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1, padding: '24px' }}>

          {/* Analytics Tab */}
          {activeTab === 'analytics' && stats && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
                    Admin Overview
                  </h1>
                  <p style={{ fontSize: '14px', color: '#64748B' }}>
                    Real-time platform metrics and moderation queue.
                  </p>
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '6px',
                  background: '#F0FDF4', border: '1px solid #BBF7D0',
                  borderRadius: '20px', padding: '6px 14px',
                }}>
                  <div style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%' }} />
                  <span style={{ fontSize: '12px', fontWeight: '600', color: '#10B981' }}>System Operational</span>
                </div>
              </div>

              {/* Stats */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px', marginBottom: '24px',
              }}>
                {[
                  { icon: Users, label: 'Total Users', value: stats.total_users, change: '+12%', color: '#1E3A8A', bg: '#EFF6FF' },
                  { icon: TrendingUp, label: 'Monthly Revenue', value: `₦${stats.total_revenue.toLocaleString()}`, change: '+8%', color: '#10B981', bg: '#F0FDF4' },
                  { icon: Package, label: 'Pending Approvals', value: stats.pending_disputes, change: `${stats.pending_disputes} New!`, color: '#F59E0B', bg: '#FFFBEB' },
                  { icon: AlertTriangle, label: 'Active Reports', value: stats.total_disputes, change: '-2%', color: '#DC2626', bg: '#FEF2F2' },
                ].map((stat) => (
                  <div key={stat.label} style={{
                    background: 'white', borderRadius: '14px',
                    padding: '20px', border: '1px solid #E2E8F0',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                      <div style={{
                        width: '36px', height: '36px',
                        background: stat.bg, borderRadius: '10px',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <stat.icon size={18} color={stat.color} />
                      </div>
                      <span style={{
                        fontSize: '11px', fontWeight: '700',
                        color: stat.change.includes('+') ? '#10B981' : stat.change.includes('-') ? '#DC2626' : '#F59E0B',
                      }}>
                        {stat.change}
                      </span>
                    </div>
                    <p style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', marginBottom: '4px' }}>
                      {stat.label}
                    </p>
                    <p style={{ fontSize: '26px', fontWeight: '800', color: '#0F172A' }}>
                      {stat.value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Verification Queue */}
              <div style={{
                background: 'white', borderRadius: '16px',
                border: '1px solid #E2E8F0', overflow: 'hidden',
              }}>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '16px 20px',
                  borderBottom: '1px solid #E2E8F0',
                }}>
                  <div>
                    <h2 style={{ fontWeight: '700', fontSize: '16px', color: '#0F172A', marginBottom: '2px' }}>
                      Verification Queue
                    </h2>
                    <p style={{ fontSize: '13px', color: '#64748B' }}>
                      New landlord and service provider applications.
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                      background: '#F0FDF4', borderRadius: '20px', padding: '4px 12px',
                    }}>
                      <div style={{ width: '6px', height: '6px', background: '#10B981', borderRadius: '50%' }} />
                      <span style={{ fontSize: '11px', fontWeight: '600', color: '#10B981' }}>12 New Today</span>
                    </div>
                    <button style={{
                      background: '#F8FAFC', border: '1px solid #E2E8F0',
                      borderRadius: '8px', padding: '6px 14px',
                      fontSize: '12px', fontWeight: '600', color: '#374151',
                      cursor: 'pointer',
                    }}>
                      Bulk Action
                    </button>
                  </div>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC' }}>
                      {['PROVIDER', 'TYPE', 'VERIFICATION TIER', 'SUBMITTED', 'STATUS'].map((h) => (
                        <th key={h} style={{
                          textAlign: 'left', padding: '10px 20px',
                          fontSize: '11px', fontWeight: '700', color: '#94A3B8',
                          borderBottom: '1px solid #E2E8F0',
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'Skyline Management', email: 'skyline@rentals.com', type: 'Housing Landlord', tier: 'ENTERPRISE', submitted: '2 hours ago', status: 'READY', statusColor: '#10B981', statusBg: '#F0FDF4' },
                      { name: 'John Harrison', email: 'john.h@edu-services.io', type: 'Tutoring Service', tier: 'INDIVIDUAL', submitted: '5 hours ago', status: 'MISSING DOCS', statusColor: '#DC2626', statusBg: '#FEF2F2' },
                      { name: 'Campus Living Corp', email: 'admin@campusliving.org', type: 'Dormitory Provider', tier: 'ENTERPRISE', submitted: 'Yesterday', status: 'IN REVIEW', statusColor: '#D97706', statusBg: '#FFFBEB' },
                    ].map((item, i) => (
                      <tr key={i} style={{ borderBottom: '1px solid #F8FAFC' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '36px', height: '36px',
                              background: 'linear-gradient(135deg, #1E3A8A, #6D28D9)',
                              borderRadius: '50%',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              <span style={{ color: 'white', fontWeight: '700', fontSize: '12px' }}>
                                {item.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                              </span>
                            </div>
                            <div>
                              <p style={{ fontWeight: '600', fontSize: '13px', color: '#0F172A' }}>{item.name}</p>
                              <p style={{ fontSize: '11px', color: '#94A3B8' }}>{item.email}</p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748B' }}>{item.type}</td>
                        <td style={{ padding: '14px 20px' }}>
                          <span style={{
                            background: '#EFF6FF', color: '#1E3A8A',
                            fontSize: '11px', fontWeight: '700',
                            padding: '3px 10px', borderRadius: '20px',
                          }}>
                            {item.tier}
                          </span>
                        </td>
                        <td style={{ padding: '14px 20px', fontSize: '13px', color: '#64748B' }}>{item.submitted}</td>
                        <td style={{ padding: '14px 20px' }}>
                          <span style={{
                            background: item.statusBg, color: item.statusColor,
                            fontSize: '11px', fontWeight: '700',
                            padding: '3px 10px', borderRadius: '20px',
                          }}>
                            {item.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div>
                  <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
                    User Management
                  </h1>
                </div>
              </div>

              {/* User stats */}
              <div style={{
                display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
                gap: '16px', marginBottom: '20px',
              }}>
                {[
                  { label: 'Total Users', value: stats?.total_users ?? 0, color: '#1E3A8A' },
                  { label: 'Pending Verification', value: users.filter(u => !u.is_verified).length, color: '#F59E0B' },
                  { label: 'Active Students', value: users.filter(u => u.role === 'BUYER' || u.role === 'UNIVERSAL').length, color: '#10B981' },
                  { label: 'Active Providers', value: users.filter(u => u.role === 'SELLER' || u.role === 'UNIVERSAL').length, color: '#6D28D9' },
                ].map((stat) => (
                  <div key={stat.label} style={{
                    background: 'white', borderRadius: '12px',
                    padding: '16px', border: '1px solid #E2E8F0',
                  }}>
                    <p style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', marginBottom: '4px' }}>{stat.label}</p>
                    <p style={{ fontSize: '24px', fontWeight: '800', color: stat.color }}>{stat.value}</p>
                  </div>
                ))}
              </div>

              {/* Search + filter */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  background: 'white', border: '1px solid #E2E8F0',
                  borderRadius: '10px', padding: '9px 14px', flex: 1,
                }}>
                  <Search size={14} color="#94A3B8" />
                  <input
                    value={search} onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by name, email or ID..."
                    style={{ border: 'none', background: 'none', fontSize: '13px', flex: 1 }}
                  />
                </div>
                <button style={{
                  background: '#1E3A8A', color: 'white',
                  border: 'none', borderRadius: '10px',
                  padding: '9px 20px', fontSize: '13px',
                  fontWeight: '700', cursor: 'pointer',
                }}>
                  + Add User
                </button>
              </div>

              {/* Users table */}
              <div style={{
                background: 'white', borderRadius: '14px',
                border: '1px solid #E2E8F0', overflow: 'hidden',
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC' }}>
                      {['USER', 'ROLE', 'STATUS', 'JOIN DATE', 'ACTIONS'].map((h) => (
                        <th key={h} style={{
                          textAlign: 'left', padding: '10px 20px',
                          fontSize: '11px', fontWeight: '700', color: '#94A3B8',
                          borderBottom: '1px solid #E2E8F0',
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user, i) => (
                      <tr
                        key={user.id}
                        style={{ borderBottom: i < filteredUsers.length - 1 ? '1px solid #F8FAFC' : 'none' }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
                        onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                      >
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <div style={{
                              width: '36px', height: '36px',
                              background: 'linear-gradient(135deg, #1E3A8A, #6D28D9)',
                              borderRadius: '50%',
                              display: 'flex', alignItems: 'center', justifyContent: 'center',
                            }}>
                              <span style={{ color: 'white', fontWeight: '700', fontSize: '13px' }}>
                                {user.name?.charAt(0).toUpperCase()}
                              </span>
                            </div>
                            <div>
                              <p style={{ fontWeight: '600', fontSize: '13px', color: '#0F172A' }}>{user.name}</p>
                              <p style={{ fontSize: '11px', color: '#94A3B8' }}>{user.email}</p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <span style={{
                            background: '#EFF6FF', color: '#1E3A8A',
                            fontSize: '11px', fontWeight: '700',
                            padding: '3px 10px', borderRadius: '20px',
                          }}>
                            {user.role}
                          </span>
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            {user.is_verified ? (
                              <>
                                <CheckCircle size={14} color="#10B981" />
                                <span style={{ fontSize: '12px', color: '#10B981', fontWeight: '600' }}>Verified</span>
                              </>
                            ) : (
                              <>
                                <XCircle size={14} color="#DC2626" />
                                <span style={{ fontSize: '12px', color: '#DC2626', fontWeight: '600' }}>Pending</span>
                              </>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: '14px 20px', fontSize: '12px', color: '#94A3B8' }}>
                          {new Date(user.created_at).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '14px 20px' }}>
                          <div style={{ display: 'flex', gap: '6px' }}>
                            {!user.is_verified && (
                              <button
                                onClick={() => verifyUser(user.id)}
                                style={{
                                  background: '#F0FDF4', color: '#10B981',
                                  border: 'none', borderRadius: '8px',
                                  padding: '5px 12px', fontSize: '12px',
                                  fontWeight: '700', cursor: 'pointer',
                                }}
                              >
                                Verify Now
                              </button>
                            )}
                            {user.is_verified && (
                              <button
                                onClick={() => banUser(user.id)}
                                style={{
                                  background: '#FEF2F2', color: '#DC2626',
                                  border: 'none', borderRadius: '8px',
                                  padding: '5px 12px', fontSize: '12px',
                                  fontWeight: '700', cursor: 'pointer',
                                }}
                              >
                                Suspend
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {/* Pagination */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center', padding: '12px 20px',
                  borderTop: '1px solid #E2E8F0',
                }}>
                  <p style={{ fontSize: '12px', color: '#94A3B8' }}>
                    Showing 1 to {filteredUsers.length} of {users.length} users
                  </p>
                  <div style={{ display: 'flex', gap: '4px' }}>
                    {[1, 2, 3].map((p) => (
                      <button key={p} style={{
                        width: '28px', height: '28px',
                        border: p === 1 ? 'none' : '1px solid #E2E8F0',
                        borderRadius: '6px',
                        background: p === 1 ? '#1E3A8A' : 'white',
                        color: p === 1 ? 'white' : '#374151',
                        fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                      }}>
                        {p}
                      </button>
                    ))}
                    <button style={{
                      padding: '0 10px', height: '28px',
                      border: '1px solid #E2E8F0', borderRadius: '6px',
                      background: 'white', fontSize: '12px',
                      color: '#374151', cursor: 'pointer',
                    }}>
                      ...312
                    </button>
                  </div>
                </div>
              </div>

              {/* New merchant applications */}
              <div style={{
                background: 'linear-gradient(135deg, #EFF6FF, #F5F3FF)',
                borderRadius: '14px', padding: '20px 24px',
                border: '1px solid #E2E8F0', marginTop: '16px',
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <div>
                  <p style={{ fontWeight: '700', fontSize: '15px', color: '#0F172A', marginBottom: '4px' }}>
                    New Merchant Applications
                  </p>
                  <p style={{ fontSize: '13px', color: '#64748B' }}>
                    There are 24 new service providers and landlords awaiting identity verification.
                  </p>
                </div>
                <button style={{
                  background: '#1E3A8A', color: 'white',
                  border: 'none', borderRadius: '10px',
                  padding: '10px 20px', fontSize: '13px',
                  fontWeight: '700', cursor: 'pointer',
                  flexShrink: 0,
                }}>
                  Review Application Queue
                </button>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '20px' }}>
                All Orders ({orders.length})
              </h1>
              <div style={{
                background: 'white', borderRadius: '14px',
                border: '1px solid #E2E8F0', overflow: 'hidden',
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#F8FAFC' }}>
                      {['LISTING', 'BUYER', 'SELLER', 'AMOUNT', 'STATUS', 'DATE'].map((h) => (
                        <th key={h} style={{
                          textAlign: 'left', padding: '10px 16px',
                          fontSize: '11px', fontWeight: '700', color: '#94A3B8',
                          borderBottom: '1px solid #E2E8F0',
                        }}>
                          {h}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order, i) => {
                      const config = statusColors[order.status] || statusColors.PENDING;
                      return (
                        <tr
                          key={order.id}
                          style={{ borderBottom: i < orders.length - 1 ? '1px solid #F8FAFC' : 'none' }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                          <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '600', color: '#0F172A', maxWidth: '200px' }}>
                            <p style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {order.listing?.title}
                            </p>
                          </td>
                          <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748B' }}>{order.buyer?.name}</td>
                          <td style={{ padding: '12px 16px', fontSize: '13px', color: '#64748B' }}>{order.seller?.name}</td>
                          <td style={{ padding: '12px 16px', fontSize: '13px', fontWeight: '700', color: '#1E3A8A' }}>
                            ₦{order.amount.toLocaleString()}
                          </td>
                          <td style={{ padding: '12px 16px' }}>
                            <span style={{
                              fontSize: '11px', fontWeight: '700',
                              color: config.color, background: config.bg,
                              padding: '3px 10px', borderRadius: '20px',
                            }}>
                              {order.status}
                            </span>
                          </td>
                          <td style={{ padding: '12px 16px', fontSize: '12px', color: '#94A3B8' }}>
                            {new Date(order.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        background: 'white', borderTop: '1px solid #E2E8F0',
        padding: '24px 48px',
        display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr',
        gap: '32px',
      }}>
        <div>
          <p style={{ fontWeight: '800', fontSize: '16px', color: '#0F172A', marginBottom: '6px' }}>UniVerse</p>
          <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.6' }}>
            Connecting university communities through integrated housing, services, and marketplace solutions.
          </p>
        </div>
        {[
          { title: 'RESOURCES', links: ['Housing', 'Services', 'Marketplace'] },
          { title: 'COMPANY', links: ['Trust & Safety', 'Partners', 'Privacy'] },
          { title: 'ADMIN', links: ['System Health', 'API Docs', 'Contact Support'] },
        ].map((col) => (
          <div key={col.title}>
            <p style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.5px', marginBottom: '10px' }}>
              {col.title}
            </p>
            {col.links.map((link) => (
              <p key={link} style={{ fontSize: '13px', color: '#64748B', marginBottom: '6px', cursor: 'pointer' }}>
                {link}
              </p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}