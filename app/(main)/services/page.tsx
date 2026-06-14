'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Search, Star, Shield } from 'lucide-react';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  rating_avg: number;
  seller: { id: string; name: string };
  category: { id: string; name: string };
}

const categoryIcons: Record<string, string> = {
  'Tutoring': '📚',
  'Tech': '💻',
  'Design': '🎨',
  'Cleaning': '🧹',
  'Laundry': '👕',
  'Food': '🍔',
  'Beauty': '💄',
  'Moving': '📦',
};

export default function ServicesPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [listRes, catRes] = await Promise.all([
        api.get('/marketplace/listings'),
        api.get('/marketplace/categories'),
      ]);
      setListings(listRes.data);
      setCategories(catRes.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filtered = listings.filter((l) =>
    l.title.toLowerCase().includes(search.toLowerCase()) ||
    l.description.toLowerCase().includes(search.toLowerCase())
  );

  const handleOrder = async (listing_id: string) => {
    try {
      await api.post('/orders', { listing_id });
      alert('Order created! Go to Orders to pay.');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed to create order');
    }
  };

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ padding: '24px 20px 16px' }}>
        <h1 style={{
          fontWeight: '800', fontSize: '22px',
          color: '#0F172A', marginBottom: '4px',
        }}>
          Services
        </h1>
        <p style={{ fontSize: '13px', color: '#64748B', marginBottom: '16px' }}>
          Trusted student-friendly pros
        </p>

        {/* Search */}
        <div style={{
          background: 'white', borderRadius: '14px',
          padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        }}>
          <Search size={16} color="#94A3B8" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Try 'laptop repair' or 'tutor'..."
            style={{
              flex: 1, border: 'none', background: 'none',
              fontSize: '14px', color: '#0F172A',
            }}
          />
        </div>
      </div>

      {/* Categories grid */}
      {categories.length > 0 && (
        <div style={{ padding: '0 20px 16px' }}>
          <p style={{
            fontWeight: '700', fontSize: '15px',
            color: '#0F172A', marginBottom: '12px',
          }}>
            Browse categories
          </p>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '10px',
          }}>
            {categories.map((cat) => (
              <div key={cat.id} style={{
                background: 'white', borderRadius: '16px',
                padding: '14px 8px',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '8px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                cursor: 'pointer',
              }}>
                <span style={{ fontSize: '24px' }}>
                  {categoryIcons[cat.name] || '✨'}
                </span>
                <span style={{
                  fontSize: '11px', fontWeight: '600',
                  color: '#374151', textAlign: 'center',
                }}>
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Listings */}
      <div style={{ padding: '0 16px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '12px',
        }}>
          <p style={{ fontWeight: '700', fontSize: '15px', color: '#0F172A' }}>
            Popular near you
          </p>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: '#94A3B8' }}>
            Loading...
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {filtered.map((listing) => (
              <div
                key={listing.id}
                style={{
                  background: 'white', borderRadius: '18px',
                  padding: '14px 16px',
                  display: 'flex', alignItems: 'center', gap: '14px',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                }}
              >
                <div style={{
                  width: '56px', height: '56px',
                  background: '#EEF2FF', borderRadius: '14px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: '24px',
                }}>
                  {categoryIcons[listing.category?.name] || '✨'}
                </div>

                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontWeight: '700', fontSize: '14px',
                    color: '#0F172A', marginBottom: '3px',
                  }}>
                    {listing.title}
                  </p>
                  <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '5px' }}>
                    by {listing.seller?.name}
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Star size={11} color="#F59E0B" fill="#F59E0B" />
                    <span style={{ fontSize: '11px', color: '#64748B' }}>
                      {listing.rating_avg > 0 ? listing.rating_avg.toFixed(1) : 'New'}
                    </span>
                    <span style={{
                      fontSize: '11px', fontWeight: '600',
                      color: '#4F46E5', background: '#EEF2FF',
                      padding: '2px 8px', borderRadius: '20px',
                    }}>
                      {listing.category?.name}
                    </span>
                  </div>
                </div>

                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p style={{
                    fontWeight: '800', fontSize: '14px',
                    color: '#4F46E5', marginBottom: '6px',
                  }}>
                    ₦{listing.price.toLocaleString()}
                  </p>
                  <button
                    onClick={() => handleOrder(listing.id)}
                    style={{
                      background: '#4F46E5', color: 'white',
                      border: 'none', borderRadius: '10px',
                      padding: '6px 12px', fontSize: '12px',
                      fontWeight: '700', cursor: 'pointer',
                    }}
                  >
                    Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div style={{ height: '20px' }} />
    </div>
  );
}