'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import { Search, Plus, Star, Tag, Filter, X } from 'lucide-react';

interface Listing {
  id: string;
  title: string;
  description: string;
  price: number;
  rating_avg: number;
  status: string;
  seller: { id: string; name: string; email: string };
  category: { id: string; name: string };
}

interface Category {
  id: string;
  name: string;
}

export default function MarketplacePage() {
  const { user } = useAuthStore();
  const [listings, setListings] = useState<Listing[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [createForm, setCreateForm] = useState({
    title: '',
    description: '',
    price: '',
    category_id: '',
  });
  const [creating, setCreating] = useState(false);

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

  const handleCategoryFilter = (cat_id: string) => {
    setSelectedCategory(cat_id);
    fetchListings(cat_id, search);
  };

  const handleCreateListing = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      await api.post('/marketplace/listings', {
        ...createForm,
        price: Number(createForm.price),
      });
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
      alert(err.response?.data?.message || 'Failed to create order');
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
              Marketplace
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px', marginTop: '2px' }}>
              Student services & products
            </p>
          </div>
          {(user?.role === 'SELLER' || user?.role === 'UNIVERSAL') && (
            <button
              onClick={() => setShowCreateModal(true)}
              style={{
                width: '40px', height: '40px',
                background: 'rgba(255,255,255,0.15)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                cursor: 'pointer',
              }}
            >
              <Plus size={20} color="white" />
            </button>
          )}
        </div>

        {/* Search */}
        <form onSubmit={handleSearch}>
          <div style={{
            background: 'white',
            borderRadius: '14px',
            padding: '12px 16px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}>
            <Search size={16} color="#94A3B8" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Try 'logo design' or 'tutoring'..."
              style={{
                flex: 1, border: 'none', background: 'none',
                fontSize: '14px', color: '#0F172A',
              }}
            />
            {search && (
              <button
                type="button"
                onClick={() => { setSearch(''); fetchListings(selectedCategory); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer' }}
              >
                <X size={14} color="#94A3B8" />
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Categories */}
      <div style={{
        padding: '16px 20px',
        display: 'flex', gap: '8px',
        overflowX: 'auto',
        scrollbarWidth: 'none',
      }}>
        {[{ id: '', name: 'All' }, ...categories].map((cat) => (
          <button
            key={cat.id}
            onClick={() => handleCategoryFilter(cat.id)}
            style={{
              padding: '8px 16px',
              borderRadius: '20px',
              border: 'none',
              background: selectedCategory === cat.id ? '#4F46E5' : 'white',
              color: selectedCategory === cat.id ? 'white' : '#64748B',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              transition: 'all 0.2s',
            }}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Listings */}
      <div style={{ padding: '0 16px' }}>
        {loading ? (
          <div style={{
            textAlign: 'center', padding: '60px 0',
            color: '#94A3B8', fontSize: '14px',
          }}>
            Loading listings...
          </div>
        ) : listings.length === 0 ? (
          <div style={{
            textAlign: 'center', padding: '60px 0',
          }}>
            <div style={{
              width: '64px', height: '64px',
              background: '#EEF2FF',
              borderRadius: '20px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              margin: '0 auto 16px',
            }}>
              <Tag size={28} color="#4F46E5" />
            </div>
            <p style={{ fontWeight: '700', color: '#0F172A', marginBottom: '6px' }}>
              No listings found
            </p>
            <p style={{ fontSize: '13px', color: '#94A3B8' }}>
              Try a different search or category
            </p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {listings.map((listing) => (
              <div
                key={listing.id}
                style={{
                  background: 'white',
                  borderRadius: '20px',
                  padding: '16px',
                  boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                  display: 'flex',
                  gap: '14px',
                  alignItems: 'flex-start',
                }}
              >
                {/* Icon */}
                <div style={{
                  width: '56px', height: '56px',
                  background: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)',
                  borderRadius: '16px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ fontSize: '24px' }}>
                    {listing.category?.name?.toLowerCase().includes('design') ? '🎨' :
                     listing.category?.name?.toLowerCase().includes('tech') ? '💻' :
                     listing.category?.name?.toLowerCase().includes('tutor') ? '📚' :
                     listing.category?.name?.toLowerCase().includes('food') ? '🍔' : '✨'}
                  </span>
                </div>

                {/* Content */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                    <h3 style={{
                      fontWeight: '700', fontSize: '14px',
                      color: '#0F172A', lineHeight: '1.3',
                      flex: 1, marginRight: '8px',
                    }}>
                      {listing.title}
                    </h3>
                  </div>

                  <p style={{
                    fontSize: '12px', color: '#64748B',
                    marginBottom: '8px', lineHeight: '1.4',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {listing.description}
                  </p>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                    <span style={{
                      fontSize: '11px', fontWeight: '600',
                      color: '#4F46E5',
                      background: '#EEF2FF',
                      padding: '2px 8px', borderRadius: '20px',
                    }}>
                      {listing.category?.name}
                    </span>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <Star size={11} color="#F59E0B" fill="#F59E0B" />
                      <span style={{ fontSize: '11px', color: '#64748B' }}>
                        {listing.rating_avg > 0 ? listing.rating_avg.toFixed(1) : 'New'}
                      </span>
                    </div>
                    <span style={{ fontSize: '11px', color: '#94A3B8' }}>
                      by {listing.seller?.name}
                    </span>
                  </div>

                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                    <p style={{
                      fontWeight: '800', fontSize: '16px',
                      color: '#4F46E5',
                    }}>
                      ₦{listing.price.toLocaleString()}
                    </p>
                    {user?.id !== listing.seller?.id && (
                      <button
                        onClick={() => handleOrder(listing.id)}
                        style={{
                          background: '#4F46E5',
                          color: 'white', border: 'none',
                          borderRadius: '12px',
                          padding: '8px 16px',
                          fontSize: '13px', fontWeight: '700',
                          cursor: 'pointer',
                        }}
                      >
                        Order Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Listing Modal */}
      {showCreateModal && (
        <div style={{
          position: 'fixed', inset: 0,
          background: 'rgba(0,0,0,0.5)',
          display: 'flex', alignItems: 'flex-end',
          justifyContent: 'center', zIndex: 200,
        }}>
          <div style={{
            background: 'white',
            borderRadius: '28px 28px 0 0',
            padding: '24px 20px 40px',
            width: '100%', maxWidth: '680px',
            maxHeight: '90vh', overflowY: 'auto',
          }}>
            <div style={{
              display: 'flex', justifyContent: 'space-between',
              alignItems: 'center', marginBottom: '20px',
            }}>
              <h2 style={{ fontWeight: '800', fontSize: '18px', color: '#0F172A' }}>
                New Listing
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                style={{
                  width: '32px', height: '32px',
                  background: '#F1F5F9', border: 'none',
                  borderRadius: '50%', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
              >
                <X size={16} color="#64748B" />
              </button>
            </div>

            <form onSubmit={handleCreateListing}>
              {[
                { label: 'Title', name: 'title', placeholder: 'I will design your logo', type: 'text' },
                { label: 'Price (₦)', name: 'price', placeholder: '5000', type: 'number' },
              ].map((field) => (
                <div key={field.name} style={{ marginBottom: '16px' }}>
                  <label style={{
                    display: 'block', fontSize: '13px',
                    fontWeight: '600', color: '#374151', marginBottom: '8px',
                  }}>
                    {field.label}
                  </label>
                  <input
                    type={field.type}
                    required
                    placeholder={field.placeholder}
                    value={(createForm as any)[field.name]}
                    onChange={(e) => setCreateForm({ ...createForm, [field.name]: e.target.value })}
                    style={{
                      width: '100%', border: '1.5px solid #E5E7EB',
                      borderRadius: '12px', padding: '12px 14px',
                      fontSize: '14px', background: '#F9FAFB',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>
              ))}

              <div style={{ marginBottom: '16px' }}>
                <label style={{
                  display: 'block', fontSize: '13px',
                  fontWeight: '600', color: '#374151', marginBottom: '8px',
                }}>
                  Description
                </label>
                <textarea
                  required
                  placeholder="Describe your service or product..."
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  rows={3}
                  style={{
                    width: '100%', border: '1.5px solid #E5E7EB',
                    borderRadius: '12px', padding: '12px 14px',
                    fontSize: '14px', background: '#F9FAFB',
                    boxSizing: 'border-box', resize: 'none',
                    fontFamily: 'inherit',
                  }}
                />
              </div>

              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  display: 'block', fontSize: '13px',
                  fontWeight: '600', color: '#374151', marginBottom: '8px',
                }}>
                  Category
                </label>
                <select
                  required
                  value={createForm.category_id}
                  onChange={(e) => setCreateForm({ ...createForm, category_id: e.target.value })}
                  style={{
                    width: '100%', border: '1.5px solid #E5E7EB',
                    borderRadius: '12px', padding: '12px 14px',
                    fontSize: '14px', background: '#F9FAFB',
                    boxSizing: 'border-box', fontFamily: 'inherit',
                  }}
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                disabled={creating}
                style={{
                  width: '100%',
                  background: creating ? '#818CF8' : '#4F46E5',
                  color: 'white', border: 'none',
                  borderRadius: '14px', padding: '16px',
                  fontSize: '15px', fontWeight: '700',
                  cursor: creating ? 'not-allowed' : 'pointer',
                }}
              >
                {creating ? 'Creating...' : 'Create Listing'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}