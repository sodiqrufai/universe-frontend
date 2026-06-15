'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Search, Star, Shield, SlidersHorizontal, ChevronLeft, ChevronRight } from 'lucide-react';

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
  'Programming': '💻',
  'Design': '🎨',
  'Gadget Repair': '🔧',
  'Tutoring': '📚',
  'Tech': '💻',
  'Design Services': '🎨',
};

export default function ServicesPage() {
  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = 4;

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

  const filtered = listings.filter((l) => {
    const matchSearch = l.title.toLowerCase().includes(search.toLowerCase()) ||
      l.description.toLowerCase().includes(search.toLowerCase());
    const matchCat = selectedCategory ? l.category?.id === selectedCategory : true;
    return matchSearch && matchCat;
  });

  const paginated = filtered.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(filtered.length / perPage);

  const handleOrder = async (listing_id: string) => {
    try {
      await api.post('/orders', { listing_id });
      alert('Order created! Go to Orders to pay.');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed');
    }
  };

  return (
    <div style={{ maxWidth: '1200px' }}>
      <div style={{ display: 'flex', gap: '24px' }}>

        {/* Left sidebar */}
        <div style={{ width: '200px', flexShrink: 0 }}>
          <div style={{
            background: 'white', borderRadius: '16px',
            padding: '20px', border: '1px solid #E2E8F0',
            marginBottom: '16px',
          }}>
            <p style={{ fontSize: '13px', fontWeight: '700', color: '#0F172A', marginBottom: '12px' }}>
              Filter Results
            </p>

            <p style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.5px', marginBottom: '8px' }}>
              CATEGORY
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '20px' }}>
              {categories.map((cat) => (
                <label key={cat.id} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  cursor: 'pointer', fontSize: '13px', color: '#374151',
                }}>
                  <input
                    type="checkbox"
                    checked={selectedCategory === cat.id}
                    onChange={() => setSelectedCategory(selectedCategory === cat.id ? '' : cat.id)}
                    style={{ accentColor: '#1E3A8A' }}
                  />
                  {cat.name}
                </label>
              ))}
            </div>

            <p style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.5px', marginBottom: '8px' }}>
              PRICE RANGE
            </p>
            <input
              type="range" min="0" max="500"
              style={{ width: '100%', accentColor: '#1E3A8A', marginBottom: '6px' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>₦0</span>
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>₦500k+</span>
            </div>

            <p style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.5px', marginTop: '16px', marginBottom: '8px' }}>
              MIN. TRUST SCORE
            </p>
            <div style={{ display: 'flex', gap: '6px' }}>
              {['80+', '90+'].map((score) => (
                <button key={score} style={{
                  padding: '4px 12px', borderRadius: '6px',
                  border: '1.5px solid #1E3A8A',
                  background: score === '80+' ? '#1E3A8A' : 'white',
                  color: score === '80+' ? 'white' : '#1E3A8A',
                  fontSize: '12px', fontWeight: '600', cursor: 'pointer',
                }}>
                  {score}
                </button>
              ))}
            </div>
          </div>

          {/* Offer your service */}
          <div style={{
            background: '#1E3A8A', borderRadius: '14px',
            padding: '18px', color: 'white',
          }}>
            <p style={{ fontWeight: '700', fontSize: '14px', marginBottom: '6px' }}>
              Offer Your Service
            </p>
            <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.6)', marginBottom: '14px' }}>
              Join 500+ student providers today.
            </p>
            <button style={{
              background: 'white', color: '#1E3A8A',
              border: 'none', borderRadius: '8px',
              padding: '8px 16px', fontSize: '12px',
              fontWeight: '700', cursor: 'pointer',
              width: '100%',
            }}>
              Get Started
            </button>
          </div>
        </div>

        {/* Main content */}
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
                Services Directory
              </h1>
              <p style={{ fontSize: '14px', color: '#64748B' }}>
                Find verified student experts for your next project.
              </p>
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'white', border: '1px solid #E2E8F0',
              borderRadius: '10px', padding: '8px 14px',
              width: '260px',
            }}>
              <Search size={14} color="#94A3B8" />
              <input
                type="text" value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for campus services..."
                style={{ border: 'none', background: 'none', fontSize: '13px', flex: 1, color: '#0F172A' }}
              />
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>Loading...</div>
          ) : (
            <>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
                {paginated.map((listing) => (
                  <div key={listing.id} style={{
                    background: 'white', borderRadius: '14px',
                    overflow: 'hidden', border: '1px solid #E2E8F0',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s', cursor: 'pointer',
                  }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
                      (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                    }}
                  >
                    {/* Image */}
                    <div style={{
                      height: '140px',
                      background: 'linear-gradient(135deg, #EFF6FF, #E0E7FF)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '48px', position: 'relative',
                    }}>
                      {categoryIcons[listing.category?.name] || '✨'}
                      <div style={{
                        position: 'absolute', top: '10px', right: '10px',
                        background: '#10B981', color: 'white',
                        fontSize: '10px', fontWeight: '700',
                        padding: '3px 8px', borderRadius: '20px',
                        display: 'flex', alignItems: 'center', gap: '3px',
                      }}>
                        <Shield size={9} />
                        Verified
                      </div>
                    </div>

                    <div style={{ padding: '14px' }}>
                      <p style={{ fontSize: '10px', fontWeight: '700', color: '#6D28D9', letterSpacing: '0.5px', marginBottom: '4px' }}>
                        {listing.category?.name?.toUpperCase()}
                      </p>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                        <h3 style={{ fontWeight: '700', fontSize: '14px', color: '#0F172A', flex: 1, marginRight: '8px' }}>
                          {listing.title}
                        </h3>
                        <div style={{
                          background: '#EFF6FF', color: '#1E3A8A',
                          fontSize: '11px', fontWeight: '700',
                          padding: '2px 8px', borderRadius: '20px',
                          flexShrink: 0,
                        }}>
                          {Math.floor(80 + Math.random() * 20)} Trust
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
                        <div style={{
                          width: '24px', height: '24px',
                          background: 'linear-gradient(135deg, #1E3A8A, #6D28D9)',
                          borderRadius: '50%',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <span style={{ color: 'white', fontSize: '9px', fontWeight: '700' }}>
                            {listing.seller?.name?.charAt(0)}
                          </span>
                        </div>
                        <span style={{ fontSize: '12px', color: '#64748B' }}>{listing.seller?.name}</span>
                        <Star size={11} color="#F59E0B" fill="#F59E0B" />
                        <span style={{ fontSize: '11px', color: '#64748B' }}>
                          {listing.rating_avg > 0 ? listing.rating_avg.toFixed(1) : '5.0'}
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontWeight: '800', fontSize: '16px', color: '#1E3A8A' }}>
                          ₦{listing.price.toLocaleString()}
                        </p>
                        <button
                          onClick={() => handleOrder(listing.id)}
                          style={{
                            background: '#1E3A8A', color: 'white',
                            border: 'none', borderRadius: '8px',
                            padding: '7px 14px', fontSize: '12px',
                            fontWeight: '600', cursor: 'pointer',
                          }}
                        >
                          View Portfolio
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
                  <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} style={{
                    width: '32px', height: '32px', border: '1px solid #E2E8F0',
                    borderRadius: '8px', background: 'white', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: page === 1 ? 0.4 : 1,
                  }}>
                    <ChevronLeft size={14} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button key={p} onClick={() => setPage(p)} style={{
                      width: '32px', height: '32px',
                      border: p === page ? 'none' : '1px solid #E2E8F0',
                      borderRadius: '8px',
                      background: p === page ? '#1E3A8A' : 'white',
                      color: p === page ? 'white' : '#374151',
                      fontWeight: p === page ? '700' : '500',
                      fontSize: '13px', cursor: 'pointer',
                    }}>
                      {p}
                    </button>
                  ))}
                  <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} style={{
                    width: '32px', height: '32px', border: '1px solid #E2E8F0',
                    borderRadius: '8px', background: 'white', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    opacity: page === totalPages ? 0.4 : 1,
                  }}>
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}