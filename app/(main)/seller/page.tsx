'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Plus, MoreVertical, TrendingUp, Eye, MessageSquare, Star } from 'lucide-react';

export default function SellerListingsPage() {
  const { user, loadFromStorage } = useAuthStore();
  const [listings, setListings] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('All');

  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [listRes, orderRes] = await Promise.all([
        api.get('/marketplace/listings'),
        api.get('/orders?role=seller'),
      ]);
      setListings(listRes.data);
      setOrders(orderRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const myListings = listings.filter((l) => l.seller?.id === user?.id);

  return (
    <div style={{ maxWidth: '1200px' }}>

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
            My Listings
          </h1>
          <p style={{ fontSize: '14px', color: '#64748B' }}>
            Monitor and update your active offers across the campus network.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          {['All', 'Housing', 'Services'].map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                padding: '7px 16px', border: '1px solid #E2E8F0',
                borderRadius: '8px', fontSize: '13px',
                fontWeight: activeFilter === f ? '700' : '500',
                background: activeFilter === f ? '#1E3A8A' : 'white',
                color: activeFilter === f ? 'white' : '#64748B',
                cursor: 'pointer',
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '16px', marginBottom: '24px',
      }}>
        {[
          { label: 'Total Views', value: '12.4k', change: '+12%', icon: Eye, color: '#1E3A8A', bg: '#EFF6FF' },
          { label: 'Active Inquiries', value: orders.length, change: `+${orders.length}`, icon: MessageSquare, color: '#10B981', bg: '#F0FDF4' },
          { label: 'Avg Rating', value: '4.8', change: 'Excellent', icon: Star, color: '#F59E0B', bg: '#FFFBEB' },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: 'white', borderRadius: '14px',
            padding: '20px', border: '1px solid #E2E8F0',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <div style={{
                width: '36px', height: '36px',
                background: stat.bg, borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <stat.icon size={18} color={stat.color} />
              </div>
              <span style={{
                fontSize: '11px', fontWeight: '700',
                color: '#10B981', background: '#F0FDF4',
                padding: '2px 8px', borderRadius: '20px',
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

      {/* Listings table */}
      <div style={{
        background: 'white', borderRadius: '16px',
        border: '1px solid #E2E8F0', overflow: 'hidden',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}>
        {/* Table header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr',
          padding: '12px 20px',
          background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
        }}>
          {['Item Details', 'Category', 'Status', 'Price', 'Views'].map((h) => (
            <p key={h} style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.3px' }}>
              {h}
            </p>
          ))}
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px', color: '#94A3B8' }}>
            Loading listings...
          </div>
        ) : myListings.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <div style={{ fontSize: '48px', marginBottom: '12px' }}>📋</div>
            <p style={{ fontWeight: '700', fontSize: '16px', color: '#0F172A', marginBottom: '6px' }}>
              No listings yet
            </p>
            <p style={{ fontSize: '13px', color: '#94A3B8', marginBottom: '16px' }}>
              Create your first listing to start selling
            </p>
            <button style={{
              background: '#1E3A8A', color: 'white',
              border: 'none', borderRadius: '10px',
              padding: '10px 20px', fontSize: '13px',
              fontWeight: '700', cursor: 'pointer',
            }}>
              + Create Listing
            </button>
          </div>
        ) : (
          myListings.map((listing, i) => (
            <div
              key={listing.id}
              style={{
                display: 'grid',
                gridTemplateColumns: '3fr 1fr 1fr 1fr 1fr',
                padding: '16px 20px',
                borderBottom: i < myListings.length - 1 ? '1px solid #F8FAFC' : 'none',
                alignItems: 'center',
                transition: 'background 0.15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = '#F8FAFC')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Item */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px', height: '44px',
                  background: 'linear-gradient(135deg, #EFF6FF, #E0E7FF)',
                  borderRadius: '10px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '20px', flexShrink: 0,
                }}>
                  ✨
                </div>
                <div>
                  <p style={{ fontWeight: '600', fontSize: '14px', color: '#0F172A', marginBottom: '2px' }}>
                    {listing.title}
                  </p>
                  <p style={{ fontSize: '11px', color: '#94A3B8' }}>
                    Listed {new Date(listing.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Category */}
              <span style={{
                fontSize: '12px', fontWeight: '600',
                color: '#6D28D9', background: '#F5F3FF',
                padding: '4px 10px', borderRadius: '20px',
                width: 'fit-content',
              }}>
                {listing.category?.name || 'Services'}
              </span>

              {/* Status */}
              <span style={{
                fontSize: '12px', fontWeight: '700',
                color: listing.status === 'ACTIVE' ? '#10B981' : '#D97706',
                background: listing.status === 'ACTIVE' ? '#F0FDF4' : '#FFFBEB',
                padding: '4px 10px', borderRadius: '20px',
                width: 'fit-content',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                <div style={{
                  width: '6px', height: '6px',
                  background: listing.status === 'ACTIVE' ? '#10B981' : '#D97706',
                  borderRadius: '50%',
                }} />
                {listing.status === 'ACTIVE' ? 'Active' : 'Inactive'}
              </span>

              {/* Price */}
              <p style={{ fontWeight: '700', fontSize: '14px', color: '#1E3A8A' }}>
                ₦{listing.price.toLocaleString()}
              </p>

              {/* Views + actions */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <p style={{ fontSize: '13px', color: '#64748B', fontWeight: '600' }}>
                  {Math.floor(Math.random() * 1000 + 100)}
                </p>
                <button style={{
                  background: 'none', border: 'none',
                  cursor: 'pointer', color: '#94A3B8',
                }}>
                  <MoreVertical size={16} />
                </button>
              </div>
            </div>
          ))
        )}

        {/* Pagination */}
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '12px 20px',
          borderTop: '1px solid #E2E8F0',
        }}>
          <p style={{ fontSize: '12px', color: '#94A3B8' }}>
            Showing 1 to {myListings.length} of {myListings.length} listings
          </p>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['Previous', '1', '2', 'Next'].map((p) => (
              <button key={p} style={{
                padding: '5px 10px', border: '1px solid #E2E8F0',
                borderRadius: '6px', background: p === '1' ? '#1E3A8A' : 'white',
                color: p === '1' ? 'white' : '#374151',
                fontSize: '12px', fontWeight: p === '1' ? '700' : '500',
                cursor: 'pointer',
              }}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Post new listing button */}
      <div style={{
        position: 'fixed', bottom: '32px', right: '32px',
      }}>
        <button style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: '#1E3A8A', color: 'white',
          border: 'none', borderRadius: '14px',
          padding: '14px 20px', fontSize: '14px',
          fontWeight: '700', cursor: 'pointer',
          boxShadow: '0 8px 24px rgba(30,58,138,0.3)',
        }}>
          <Plus size={18} />
          Post New Listing
        </button>
      </div>
    </div>
  );
}