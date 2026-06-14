'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  ChevronRight,
  ArrowUpDown,
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
  COMPLETED: { color: '#16A34A', bg: '#F0FDF4', icon: CheckCircle, label: 'Completed' },
  CANCELLED: { color: '#DC2626', bg: '#FEF2F2', icon: XCircle, label: 'Cancelled' },
  DISPUTED: { color: '#EA580C', bg: '#FFF7ED', icon: AlertTriangle, label: 'Disputed' },
};

export default function OrdersPage() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<'buyer' | 'seller'>('buyer');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

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
      alert(err.response?.data?.message || 'Failed to update status');
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
          alignItems: 'center', marginBottom: '16px',
        }}>
          <div>
            <h1 style={{
              color: 'white', fontWeight: '800',
              fontSize: '22px', letterSpacing: '-0.5px',
            }}>
              My Orders
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '2px' }}>
              {orders.length} order{orders.length !== 1 ? 's' : ''} found
            </p>
          </div>
          <ArrowUpDown size={20} color="rgba(255,255,255,0.6)" />
        </div>

        {/* Role toggle */}
        {(user?.role === 'SELLER' || user?.role === 'UNIVERSAL') && (
          <div style={{
            background: 'rgba(255,255,255,0.1)',
            borderRadius: '12px',
            padding: '4px',
            display: 'flex',
          }}>
            {(['buyer', 'seller'] as const).map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                style={{
                  flex: 1, padding: '8px',
                  borderRadius: '10px', border: 'none',
                  background: role === r ? 'white' : 'transparent',
                  color: role === r ? '#4F46E5' : 'rgba(255,255,255,0.7)',
                  fontWeight: '700', fontSize: '13px',
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

      {/* Orders list */}
      <div style={{ padding: '16px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8', fontSize: '14px' }}>
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 0' }}>
            <div style={{
              width: '64px', height: '64px',
              background: '#EEF2FF', borderRadius: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <Package size={28} color="#4F46E5" />
            </div>
            <p style={{ fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>
              No orders yet
            </p>
            <p style={{ fontSize: '13px', color: '#94A3B8' }}>
              Your orders will appear here
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {orders.map((order) => {
              const config = statusConfig[order.status] || statusConfig.PENDING;
              const StatusIcon = config.icon;
              return (
                <div
                  key={order.id}
                  onClick={() => setSelectedOrder(order)}
                  style={{
                    background: 'white',
                    borderRadius: '20px',
                    padding: '16px',
                    boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                    cursor: 'pointer',
                    display: 'flex',
                    gap: '14px',
                    alignItems: 'center',
                  }}
                >
                  {/* Status icon */}
                  <div style={{
                    width: '48px', height: '48px',
                    background: config.bg,
                    borderRadius: '14px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <StatusIcon size={22} color={config.color} />
                  </div>

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{
                      fontWeight: '700', fontSize: '14px',
                      color: '#0F172A', marginBottom: '4px',
                      overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    }}>
                      {order.listing?.title}
                    </p>
                    <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '6px' }}>
                      {role === 'buyer' ? `Seller: ${order.seller?.name}` : `Buyer: ${order.buyer?.name}`}
                    </p>
                    <span style={{
                      fontSize: '11px', fontWeight: '600',
                      color: config.color, background: config.bg,
                      padding: '3px 10px', borderRadius: '20px',
                    }}>
                      {config.label}
                    </span>
                  </div>

                  {/* Amount + arrow */}
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <p style={{
                      fontWeight: '800', fontSize: '15px',
                      color: '#4F46E5', marginBottom: '4px',
                    }}>
                      ₦{order.amount.toLocaleString()}
                    </p>
                    <p style={{ fontSize: '11px', color: '#94A3B8' }}>
                      {new Date(order.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <ChevronRight size={16} color="#CBD5E1" />
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Order detail bottom sheet */}
      {selectedOrder && (
        <div
          style={{
            position: 'fixed', inset: 0,
            background: 'rgba(0,0,0,0.5)',
            display: 'flex', alignItems: 'flex-end',
            justifyContent: 'center', zIndex: 200,
          }}
          onClick={() => setSelectedOrder(null)}
        >
          <div
            style={{
              background: 'white',
              borderRadius: '28px 28px 0 0',
              padding: '24px 20px 40px',
              width: '100%', maxWidth: '680px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Handle */}
            <div style={{
              width: '40px', height: '4px',
              background: '#E2E8F0', borderRadius: '2px',
              margin: '0 auto 20px',
            }} />

            <h2 style={{
              fontWeight: '800', fontSize: '18px',
              color: '#0F172A', marginBottom: '4px',
            }}>
              {selectedOrder.listing?.title}
            </h2>
            <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '20px' }}>
              Order placed on {new Date(selectedOrder.created_at).toLocaleDateString()}
            </p>

            {/* Details */}
            {[
              { label: 'Buyer', value: selectedOrder.buyer?.name },
              { label: 'Seller', value: selectedOrder.seller?.name },
              { label: 'Amount', value: `₦${selectedOrder.amount.toLocaleString()}` },
              { label: 'Status', value: statusConfig[selectedOrder.status]?.label },
            ].map((item) => (
              <div key={item.label} style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'center', padding: '12px 0',
                borderBottom: '1px solid #F1F5F9',
              }}>
                <span style={{ fontSize: '13px', color: '#64748B' }}>{item.label}</span>
                <span style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A' }}>
                  {item.value}
                </span>
              </div>
            ))}

            {/* Actions */}
            <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {role === 'buyer' && selectedOrder.status === 'PENDING' && (
                <button
                  onClick={() => handlePayment(selectedOrder.id)}
                  style={{
                    width: '100%', background: '#4F46E5',
                    color: 'white', border: 'none',
                    borderRadius: '14px', padding: '16px',
                    fontSize: '15px', fontWeight: '700', cursor: 'pointer',
                  }}
                >
                  Pay Now — ₦{selectedOrder.amount.toLocaleString()}
                </button>
              )}

              {role === 'buyer' && selectedOrder.status === 'DELIVERED' && (
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'COMPLETED')}
                  style={{
                    width: '100%', background: '#16A34A',
                    color: 'white', border: 'none',
                    borderRadius: '14px', padding: '16px',
                    fontSize: '15px', fontWeight: '700', cursor: 'pointer',
                  }}
                >
                  Confirm Delivery
                </button>
              )}

              {role === 'seller' && selectedOrder.status === 'PAID' && (
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'DELIVERED')}
                  style={{
                    width: '100%', background: '#7C3AED',
                    color: 'white', border: 'none',
                    borderRadius: '14px', padding: '16px',
                    fontSize: '15px', fontWeight: '700', cursor: 'pointer',
                  }}
                >
                  Mark as Delivered
                </button>
              )}

              {selectedOrder.status === 'PENDING' && (
                <button
                  onClick={() => handleUpdateStatus(selectedOrder.id, 'CANCELLED')}
                  style={{
                    width: '100%', background: '#FEF2F2',
                    color: '#DC2626', border: 'none',
                    borderRadius: '14px', padding: '16px',
                    fontSize: '15px', fontWeight: '700', cursor: 'pointer',
                  }}
                >
                  Cancel Order
                </button>
              )}

              <button
                onClick={() => setSelectedOrder(null)}
                style={{
                  width: '100%', background: '#F8FAFC',
                  color: '#64748B', border: 'none',
                  borderRadius: '14px', padding: '14px',
                  fontSize: '14px', fontWeight: '600', cursor: 'pointer',
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