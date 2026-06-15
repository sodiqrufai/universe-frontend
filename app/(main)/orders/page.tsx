'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import {
  Package, Clock, CheckCircle, XCircle,
  AlertTriangle, ChevronRight, Search,
  Filter, ArrowUpDown,
} from 'lucide-react';

interface Order {
  id: string;
  amount: number;
  status: string;
  created_at: string;
  listing: { title: string; price: number };
  buyer: { id: string; name: string; email: string };
  seller: { id: string; name: string; email: string };
  payment: any;
}

const statusConfig: Record<string, { color: string; bg: string; icon: any; label: string }> = {
  PENDING: { color: '#D97706', bg: '#FFFBEB', icon: Clock, label: 'Pending Payment' },
  PAID: { color: '#2563EB', bg: '#EFF6FF', icon: CheckCircle, label: 'Paid' },
  IN_PROGRESS: { color: '#4F46E5', bg: '#EEF2FF', icon: Package, label: 'In Progress' },
  DELIVERED: { color: '#7C3AED', bg: '#F5F3FF', icon: Package, label: 'Delivered' },
  COMPLETED: { color: '#10B981', bg: '#F0FDF4', icon: CheckCircle, label: 'Completed' },
  CANCELLED: { color: '#DC2626', bg: '#FEF2F2', icon: XCircle, label: 'Cancelled' },
  DISPUTED: { color: '#EA580C', bg: '#FFF7ED', icon: AlertTriangle, label: 'Disputed' },
};

export default function OrdersPage() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchOrders();
  }, [role]);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/orders?role=${role}`);
      setOrders(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async (order_id: string) => {
    try {
      const res = await api.post(`/payments/initialize/${order_id}`);
      window.open(res.data.payment_url, '_blank');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Payment failed');
    }
  };

  const handleUpdateStatus = async (
    order_id: string,
    status: 'DELIVERED' | 'COMPLETED' | 'CANCELLED',
  ) => {
    try {
      await api.put(`/orders/${order_id}/status`, { status });
      setSelectedOrder(null);
      fetchOrders();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed');
    }
  };

  const filtered = orders.filter((o) =>
    o.listing?.title?.toLowerCase().includes(search.toLowerCase()) ||
    o.buyer?.name?.toLowerCase().includes(search.toLowerCase()) ||
    o.seller?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ maxWidth: '1200px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
            My Orders
          </h1>
          <p style={{ fontSize: '14px', color: '#64748B' }}>
            Track and manage all your campus orders
          </p>
        </div>
        {(user?.role === 'SELLER' || user?.role === 'UNIVERSAL') && (
          <div style={{
            display: 'flex', background: 'white',
            border: '1px solid #E2E8F0', borderRadius: '10px',
            overflow: 'hidden',
          }}>
            {(['buyer', 'seller'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                style={{
                  padding: '8px 20px', border: 'none',
                  background: role === r ? '#1E3A8A' : 'white',
                  color: role === r ? 'white' : '#64748B',
                  fontWeight: '600', fontSize: '13px',
                  cursor: 'pointer', textTransform: 'capitalize',
                  transition: 'all 0.2s',
                }}
              >
                As {r}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Stats row */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px', marginBottom: '24px',
      }}>
        {[
          { label: 'Total Orders', value: orders.length, color: '#1E3A8A', bg: '#EFF6FF' },
          { label: 'Completed', value: orders.filter(o => o.status === 'COMPLETED').length, color: '#10B981', bg: '#F0FDF4' },
          { label: 'Pending', value: orders.filter(o => o.status === 'PENDING').length, color: '#D97706', bg: '#FFFBEB' },
          { label: 'Disputed', value: orders.filter(o => o.status === 'DISPUTED').length, color: '#DC2626', bg: '#FEF2F2' },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: 'white', borderRadius: '14px',
            padding: '16px 20px', border: '1px solid #E2E8F0',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <p style={{ fontSize: '12px', color: '#94A3B8', fontWeight: '600', marginBottom: '6px' }}>
              {stat.label}
            </p>
            <p style={{ fontSize: '28px', fontWeight: '800', color: stat.color }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search + filter */}
      <div style={{
        display: 'flex', gap: '10px', marginBottom: '16px',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'white', border: '1px solid #E2E8F0',
          borderRadius: '10px', padding: '10px 14px', flex: 1,
        }}>
          <Search size={15} color="#94A3B8" />
          <input
            type="text" value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search orders..."
            style={{ border: 'none', background: 'none', fontSize: '14px', flex: 1 }}
          />
        </div>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'white', border: '1px solid #E2E8F0',
          borderRadius: '10px', padding: '10px 16px',
          fontSize: '13px', fontWeight: '600', color: '#64748B',
          cursor: 'pointer',
        }}>
          <Filter size={14} /> Filter
        </button>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'white', border: '1px solid #E2E8F0',
          borderRadius: '10px', padding: '10px 16px',
          fontSize: '13px', fontWeight: '600', color: '#64748B',
          cursor: 'pointer',
        }}>
          <ArrowUpDown size={14} /> Sort
        </button>
      </div>

      {/* Orders table */}
      <div style={{
        background: 'white', borderRadius: '16px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        overflow: 'hidden',
      }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr',
          padding: '12px 20px',
          background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
        }}>
          {['Item', 'Amount', 'Status', 'Date', 'Action'].map((h) => (
            <p key={h} style={{
              fontSize: '11px', fontWeight: '700',
              color: '#94A3B8', letterSpacing: '0.5px',
            }}>
              {h}
            </p>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
            Loading orders...
          </div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📦</div>
            <p style={{ fontWeight: '700', fontSize: '16px', color: '#0F172A', marginBottom: '6px' }}>
              No orders yet
            </p>
            <p style={{ fontSize: '13px', color: '#94A3B8' }}>
              Your orders will appear here
            </p>
          </div>
        ) : (
          filtered.map((order, i) => {
            const config = statusConfig[order.status] || statusConfig.PENDING;
            const StatusIcon = config.icon;
            return (
              <div
                key={order.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr',
                  padding: '16px 20px',
                  borderBottom: i < filtered.length - 1 ? '1px solid #F8FAFC' : 'none',
                  alignItems: 'center',
                  cursor: 'pointer',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                onClick={() => setSelectedOrder(order)}
              >
                {/* Item */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '40px', height: '40px',
                    background: config.bg, borderRadius: '10px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <StatusIcon size={18} color={config.color} />
                  </div>
                  <div>
                    <p style={{
                      fontWeight: '600', fontSize: '14px', color: '#0F172A',
                      marginBottom: '2px',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      maxWidth: '200px',
                    }}>
                      {order.listing?.title}
                    </p>
                    <p style={{ fontSize: '12px', color: '#94A3B8' }}>
                      {role === 'buyer' ? `Seller: ${order.seller?.name}` : `Buyer: ${order.buyer?.name}`}
                    </p>
                  </div>
                </div>

                {/* Amount */}
                <p style={{ fontWeight: '700', fontSize: '14px', color: '#1E3A8A' }}>
                  ₦{order.amount.toLocaleString()}
                </p>

                {/* Status */}
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '4px',
                  fontSize: '11px', fontWeight: '700',
                  color: config.color, background: config.bg,
                  padding: '4px 10px', borderRadius: '20px',
                  width: 'fit-content',
                }}>
                  {config.label}
                </span>

                {/* Date */}
                <p style={{ fontSize: '12px', color: '#94A3B8' }}>
                  {new Date(order.created_at).toLocaleDateString()}
                </p>

                {/* Action */}
                <ChevronRight size={16} color="#CBD5E1" />
              </div>
            );
          })
        )}
      </div>

      {/* Order detail modal */}
      {selectedOrder && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.4)',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', zIndex: 200,
            padding: '24px',
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            style={{
              background: 'white', borderRadius: '20px',
              padding: '28px', width: '100%', maxWidth: '480px',
              boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h2 style={{ fontWeight: '800', fontSize: '18px', color: '#0F172A', marginBottom: '4px' }}>
                  Order Details
                </h2>
                <p style={{ fontSize: '12px', color: '#94A3B8' }}>
                  {new Date(selectedOrder.created_at).toLocaleString()}
                </p>
              </div>
              <span style={{
                fontSize: '12px', fontWeight: '700',
                color: statusConfig[selectedOrder.status]?.color,
                background: statusConfig[selectedOrder.status]?.bg,
                padding: '6px 14px', borderRadius: '20px',
                height: 'fit-content',
              }}>
                {statusConfig[selectedOrder.status]?.label}
              </span>
            </div>

            <div style={{
              background: '#F8FAFC', borderRadius: '12px',
              padding: '16px', marginBottom: '20px',
            }}>
              <p style={{ fontWeight: '700', fontSize: '15px', color: '#0F172A', marginBottom: '12px' }}>
                {selectedOrder.listing?.title}
              </p>
              {[
                { label: 'Buyer', value: selectedOrder.buyer?.name },
                { label: 'Seller', value: selectedOrder.seller?.name },
                { label: 'Amount', value: `₦${selectedOrder.amount.toLocaleString()}` },
              ].map((item) => (
                <div key={item.label} style={{
                  display: 'flex', justifyContent: 'space-between',
                  padding: '8px 0',
                  borderBottom: '1px solid #E2E8F0',
                }}>
                  <span style={{ fontSize: '13px', color: '#64748B' }}>{item.label}</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {role === 'buyer' && selectedOrder.status === 'PENDING' && (
                <button
                  onClick={() => handlePayment(selectedOrder.id)}
                  style={{
                    width: '100%', background: '#1E3A8A', color: 'white',
                    border: 'none', borderRadius: '12px', padding: '14px',
                    fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                  }}
                >
                  Pay Now — ₦{selectedOrder.amount.toLocaleString()}
                </button>
              )}
              {role === 'buyer' && selectedOrder.status === 'DELIVERED' && (
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'COMPLETED')}
                  style={{
                    width: '100%', background: '#10B981', color: 'white',
                    border: 'none', borderRadius: '12px', padding: '14px',
                    fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                  }}
                >
                  Confirm Delivery & Release Payment
                </button>
              )}
              {role === 'seller' && selectedOrder.status === 'PAID' && (
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'DELIVERED')}
                  style={{
                    width: '100%', background: '#6D28D9', color: 'white',
                    border: 'none', borderRadius: '12px', padding: '14px',
                    fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                  }}
                >
                  Mark as Delivered
                </button>
              )}
              {selectedOrder.status === 'PENDING' && (
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'CANCELLED')}
                  style={{
                    width: '100%', background: '#FEF2F2', color: '#DC2626',
                    border: 'none', borderRadius: '12px', padding: '14px',
                    fontSize: '14px', fontWeight: '700', cursor: 'pointer',
                  }}
                >
                  Cancel Order
                </button>
              )}
              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  width: '100%', background: '#F8FAFC', color: '#64748B',
                  border: 'none', borderRadius: '12px', padding: '12px',
                  fontSize: '13px', fontWeight: '600', cursor: 'pointer',
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}