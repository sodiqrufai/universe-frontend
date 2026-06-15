'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Search, Plus, Star, Shield, ChevronLeft, ChevronRight, X, SlidersHorizontal } from 'lucide-react';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  rating_avg: number;
  seller: { id: string; name: string };
  category: { id: string; name: string };
}

interface Category {
  id: string;
  name: string;
}

const categoryIcons: Record<string, string> = {
  'Design Services': '🎨',
  'Tech': '💻',
  'Tutoring': '📚',
  'Food': '🍔',
  'Electronics': '📱',
  'Books': '📖',
  'Fashion': '👕',
  'Furniture': '🛋️',
};

export default function MarketplacePage() {
  const { user } = useAuthStore();
  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [createForm, setCreateForm] = useState({ title: '', description: '', price: '', category_id: '' });
  const [creating, setCreating] = useState(false);
  const [page, setPage] = useState(1);
  const perPage = 6;

  useEffect(() => {
    fetchListings();
    fetchCategories();
  }, []);

  const fetchListings = async (cat?: string, q?: string) => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (cat) params.append('category_id', cat);
      if (q) params.append('search', q);
      const res = await api.get(`/marketplace/listings?${params.toString()}`);
      setListings(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await api.get('/marketplace/categories');
      setCategories(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchListings(selectedCategory, search);
  };

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      await api.post('/marketplace/listings', { ...createForm, price: Number(createForm.price) });
      setShowCreateModal(false);
      setCreateForm({ title: '', description: '', price: '', category_id: '' });
      fetchListings();
    } catch (err) {
      console.error(err);
    } finally {
      setCreating(false);
    }
  };

  const handleOrder = async (listing_id: string) => {
    try {
      await api.post('/orders', { listing_id });
      alert('Order created! Go to Orders to pay.');
    } catch (err: any) {
      alert(err.response?.data?.message || 'Failed');
    }
  };

  const paginated = listings.slice((page - 1) * perPage, page * perPage);
  const totalPages = Math.ceil(listings.length / perPage);

  return (
    <div style={{ maxWidth: '1200px' }}>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.5px', marginBottom: '4px' }}>
          Campus Marketplace
        </h1>
        <p style={{ fontSize: '14px', color: '#64748B' }}>
          Buy and sell within your university community. Safe, verified, and student-first.
        </p>
      </div>

      {/* Search bar */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '12px',
        background: 'white', border: '1.5px solid #E2E8F0',
        borderRadius: '14px', padding: '12px 16px',
        marginBottom: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}>
        <Search size={16} color="#94A3B8" />
        <input
          type="text" value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="What are you looking for today?"
          style={{ flex: 1, border: 'none', background: 'none', fontSize: '14px', color: '#0F172A' }}
          onKeyDown={(e) => e.key === 'Enter' && fetchListings(selectedCategory, search)}
        />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: '#64748B' }}>Verified Only</span>
          <div
            onClick={() => setVerifiedOnly(!verifiedOnly)}
            style={{
              width: '40px', height: '22px',
              background: verifiedOnly ? '#1E3A8A' : '#E2E8F0',
              borderRadius: '11px', position: 'relative',
              cursor: 'pointer', transition: 'background 0.2s',
            }}
          >
            <div style={{
              position: 'absolute', top: '3px',
              left: verifiedOnly ? '21px' : '3px',
              width: '16px', height: '16px',
              background: 'white', borderRadius: '50%',
              transition: 'left 0.2s',
              boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
            }} />
          </div>
        </div>
        <button
          onClick={() => fetchListings(selectedCategory, search)}
          style={{
            background: '#1E3A8A', color: 'white',
            border: 'none', borderRadius: '10px',
            padding: '8px 20px', fontSize: '14px',
            fontWeight: '600', cursor: 'pointer',
          }}
        >
          Search Marketplace
        </button>
      </div>

      <div style={{ display: 'flex', gap: '24px' }}>

        {/* Left sidebar - categories */}
        <div style={{ width: '200px', flexShrink: 0 }}>
          <p style={{ fontSize: '12px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.5px', marginBottom: '10px' }}>
            CATEGORIES
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginBottom: '24px' }}>
            <button
              onClick={() => { setSelectedCategory(''); fetchListings('', search); }}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '8px 12px', borderRadius: '8px', border: 'none',
                background: selectedCategory === '' ? '#EFF6FF' : 'transparent',
                color: selectedCategory === '' ? '#1E3A8A' : '#374151',
                fontWeight: selectedCategory === '' ? '700' : '500',
                fontSize: '13px', cursor: 'pointer', textAlign: 'left',
              }}
            >
              All Categories
              <span style={{ fontSize: '11px', color: '#94A3B8' }}>{listings.length}</span>
            </button>
            {categories.map((cat) => {
              const count = listings.filter((l) => l.category?.id === cat.id).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => { setSelectedCategory(cat.id); fetchListings(cat.id, search); }}
                  style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '8px 12px', borderRadius: '8px', border: 'none',
                    background: selectedCategory === cat.id ? '#EFF6FF' : 'transparent',
                    color: selectedCategory === cat.id ? '#1E3A8A' : '#374151',
                    fontWeight: selectedCategory === cat.id ? '700' : '500',
                    fontSize: '13px', cursor: 'pointer', textAlign: 'left',
                  }}
                >
                  {cat.name}
                  <span style={{ fontSize: '11px', color: '#94A3B8' }}>{count}</span>
                </button>
              );
            })}
          </div>

          {/* Trust badge */}
          <div style={{
            background: '#F0FDF4', border: '1px solid #BBF7D0',
            borderRadius: '12px', padding: '14px',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
              <Shield size={14} color="#10B981" />
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#10B981' }}>Trust & Safety</p>
            </div>
            <p style={{ fontSize: '11px', color: '#64748B', lineHeight: '1.5' }}>
              Look for the emerald badge to shop from UniVerse Verified students.
            </p>
          </div>

          {/* Create listing */}
          {(user?.role === 'SELLER' || user?.role === 'UNIVERSAL') && (
            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                gap: '8px', width: '100%', marginTop: '12px',
                background: '#1E3A8A', color: 'white',
                border: 'none', borderRadius: '10px',
                padding: '10px', fontSize: '13px',
                fontWeight: '600', cursor: 'pointer',
              }}
            >
              <Plus size={16} />
              Post Listing
            </button>
          )}
        </div>

        {/* Main content */}
        <div style={{ flex: 1 }}>
          {/* Results header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              {selectedCategory ? categories.find(c => c.id === selectedCategory)?.name : 'All Categories'} · Showing {Math.min(paginated.length, perPage)} of {listings.length} results
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '13px', color: '#64748B' }}>Sort by:</span>
              <select style={{
                border: '1px solid #E2E8F0', borderRadius: '8px',
                padding: '6px 10px', fontSize: '13px', color: '#374151',
                background: 'white', cursor: 'pointer',
              }}>
                <option>Newest First</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Best Rated</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>
              Loading listings...
            </div>
          ) : paginated.length === 0 ? (
            <div style={{
              textAlign: 'center', padding: '60px',
              background: 'white', borderRadius: '16px',
              border: '2px dashed #E2E8F0',
            }}>
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
              <p style={{ fontWeight: '700', fontSize: '16px', color: '#0F172A', marginBottom: '8px' }}>
                No listings found
              </p>
              <p style={{ fontSize: '14px', color: '#94A3B8' }}>
                Try a different search or category
              </p>
            </div>
          ) : (
            <>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '16px',
              }}>
                {paginated.map((listing) => (
                  <div key={listing.id} style={{
                    background: 'white', borderRadius: '14px',
                    overflow: 'hidden', border: '1px solid #E2E8F0',
                    boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
                    cursor: 'pointer', transition: 'all 0.2s',
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
                    {/* Image placeholder */}
                    <div style={{
                      height: '160px',
                      background: 'linear-gradient(135deg, #EFF6FF, #E0E7FF)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '48px', position: 'relative',
                    }}>
                      {categoryIcons[listing.category?.name] || '✨'}
                      <div style={{
                        position: 'absolute', top: '10px', left: '10px',
                        background: '#10B981', color: 'white',
                        fontSize: '10px', fontWeight: '700',
                        padding: '3px 8px', borderRadius: '20px',
                        display: 'flex', alignItems: 'center', gap: '3px',
                      }}>
                        <Shield size={9} />
                        Trusted
                      </div>
                    </div>

                    {/* Content */}
                    <div style={{ padding: '14px' }}>
                      <h3 style={{
                        fontWeight: '700', fontSize: '14px',
                        color: '#0F172A', marginBottom: '4px',
                        overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                      }}>
                        {listing.title}
                      </h3>
                      <p style={{ fontSize: '12px', color: '#64748B', marginBottom: '8px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {listing.description}
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Star size={11} color="#F59E0B" fill="#F59E0B" />
                          <span style={{ fontSize: '11px', color: '#64748B' }}>
                            {listing.rating_avg > 0 ? listing.rating_avg.toFixed(1) : 'New'}
                          </span>
                        </div>
                        <span style={{ fontSize: '11px', color: '#94A3B8' }}>·</span>
                        <span style={{ fontSize: '11px', color: '#64748B' }}>
                          {listing.seller?.name}
                        </span>
                      </div>

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <p style={{ fontWeight: '800', fontSize: '16px', color: '#1E3A8A' }}>
                          ₦{listing.price.toLocaleString()}
                        </p>
                        {user?.id !== listing.seller?.id && (
                          <button
                            onClick={() => handleOrder(listing.id)}
                            style={{
                              background: '#1E3A8A', color: 'white',
                              border: 'none', borderRadius: '8px',
                              padding: '6px 14px', fontSize: '12px',
                              fontWeight: '600', cursor: 'pointer',
                            }}
                          >
                            Order
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {/* Post your own card */}
                {(user?.role === 'SELLER' || user?.role === 'UNIVERSAL') && (
                  <div
                    onClick={() => setShowCreateModal(true)}
                    style={{
                      background: 'white', borderRadius: '14px',
                      border: '2px dashed #E2E8F0',
                      display: 'flex', flexDirection: 'column',
                      alignItems: 'center', justifyContent: 'center',
                      padding: '24px', cursor: 'pointer',
                      minHeight: '280px',
                      transition: 'border-color 0.2s',
                    }}
                  >
                    <div style={{
                      width: '48px', height: '48px',
                      background: '#EFF6FF', borderRadius: '50%',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      marginBottom: '12px', fontSize: '24px',
                    }}>
                      +
                    </div>
                    <p style={{ fontWeight: '700', fontSize: '14px', color: '#0F172A', marginBottom: '4px' }}>
                      Post Your Own
                    </p>
                    <p style={{ fontSize: '12px', color: '#94A3B8', textAlign: 'center' }}>
                      Clear out your room and earn extra credit.
                    </p>
                    <p style={{ fontSize: '13px', color: '#1E3A8A', fontWeight: '600', marginTop: '8px' }}>
                      Start Listing →
                    </p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', marginTop: '24px' }}>
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    style={{
                      width: '32px', height: '32px',
                      border: '1px solid #E2E8F0', borderRadius: '8px',
                      background: 'white', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: page === 1 ? 0.4 : 1,
                    }}
                  >
                    <ChevronLeft size={14} />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      style={{
                        width: '32px', height: '32px',
                        border: p === page ? 'none' : '1px solid #E2E8F0',
                        borderRadius: '8px',
                        background: p === page ? '#1E3A8A' : 'white',
                        color: p === page ? 'white' : '#374151',
                        fontWeight: p === page ? '700' : '500',
                        fontSize: '13px', cursor: 'pointer',
                      }}
                    >
                      {p}
                    </button>
                  ))}
                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    style={{
                      width: '32px', height: '32px',
                      border: '1px solid #E2E8F0', borderRadius: '8px',
                      background: 'white', cursor: 'pointer',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      opacity: page === totalPages ? 0.4 : 1,
                    }}
                  >
                    <ChevronRight size={14} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: '48px', borderTop: '1px solid #E2E8F0', paddingTop: '32px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <div style={{
                width: '24px', height: '24px',
                background: 'linear-gradient(135deg, #1E3A8A, #6D28D9)',
                borderRadius: '6px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: 'white', fontWeight: '800', fontSize: '12px' }}>U</span>
              </div>
              <span style={{ fontWeight: '800', fontSize: '14px', color: '#0F172A' }}>UniVerse</span>
            </div>
            <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.6' }}>
              The digital backbone of student life. Bridging the gap between academic success and daily logistics.
            </p>
          </div>
          {[
            { title: 'Resources', links: ['Housing', 'Services', 'Marketplace'] },
            { title: 'Legal', links: ['Privacy Policy', 'Terms of Use', 'Cookie Policy'] },
            { title: 'Connect', links: ['Partners', 'Support', 'Contact'] },
          ].map((col) => (
            <div key={col.title}>
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8', letterSpacing: '0.5px', marginBottom: '10px' }}>
                {col.title.toUpperCase()}
              </p>
              {col.links.map((link) => (
                <p key={link} style={{ fontSize: '13px', color: '#64748B', marginBottom: '6px', cursor: 'pointer' }}>
                  {link}
                </p>
              ))}
            </div>
          ))}
        </div>
        <p style={{ fontSize: '11px', color: '#94A3B8', marginTop: '24px', textAlign: 'center' }}>
          © 2026 UniVerse Ecosystem. All rights reserved.
        </p>
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.4)',
          display: 'flex', alignItems: 'center',
          justifyContent: 'center', zIndex: 200,
          padding: '24px',
        }}>
          <div style={{
            background: 'white', borderRadius: '20px',
            padding: '28px', width: '100%',
            maxWidth: '480px',
            boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>New Listing</h2>
              <button onClick={() => setShowCreateModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={20} color="#64748B" />
              </button>
            </div>
            <form onSubmit={handleCreateListing}>
              {[
                { label: 'Title', name: 'title', type: 'text', placeholder: 'e.g. MacBook Pro M2 Student Edition' },
                { label: 'Price (₦)', name: 'price', type: 'number', placeholder: '0' },
              ].map((field) => (
                <div key={field.name} style={{ marginBottom: '16px' }}>
                  <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type} required
                    placeholder={field.placeholder}
                    value={(createForm as any)[field.name]}
                    onChange={(e) => setCreateForm({ ...createForm, [field.name]: e.target.value })}
                    style={{
                      width: '100%', border: '1.5px solid #E5E7EB',
                      borderRadius: '10px', padding: '10px 14px',
                      fontSize: '14px', background: '#F9FAFB',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              ))}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                  Description
                </label>
                <textarea
                  required rows={3}
                  placeholder="Describe your item..."
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  style={{
                    width: '100%', border: '1.5px solid #E5E7EB',
                    borderRadius: '10px', padding: '10px 14px',
                    fontSize: '14px', background: '#F9FAFB',
                    boxSizing: 'border-box', resize: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                  Category
                </label>
                <select
                  required value={createForm.category_id}
                  onChange={(e) => setCreateForm({ ...createForm, category_id: e.target.value })}
                  style={{
                    width: '100%', border: '1.5px solid #E5E7EB',
                    borderRadius: '10px', padding: '10px 14px',
                    fontSize: '14px', background: '#F9FAFB',
                    boxSizing: 'border-box',
                  }}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" disabled={creating} style={{
                width: '100%', background: '#1E3A8A',
                color: 'white', border: 'none',
                borderRadius: '12px', padding: '14px',
                fontSize: '14px', fontWeight: '700',
                cursor: creating ? 'not-allowed' : 'pointer',
                opacity: creating ? 0.7 : 1,
              }}>
                {creating ? 'Creating...' : 'Post Listing'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}