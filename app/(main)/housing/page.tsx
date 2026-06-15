'use client';

import { useState } from 'react';
import { Search, MapPin, Star, Shield, Wifi, Car, Dumbbell, Wind, SlidersHorizontal } from 'lucide-react';

const properties = [
  {
    id: 1, name: 'The Ivy Residences', type: 'Apartment',
    location: 'North Campus Academic District', price: '₦1,250,000',
    rating: 4.0, verified: true, trending: false,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80',
    amenities: ['2 Bed', '1 Bath', 'Free WiFi'],
    distance: '0.4 miles from Campus',
  },
  {
    id: 2, name: 'North Campus Studios', type: 'Studio',
    location: 'North Campus Road', price: '₦890,000',
    rating: 4.6, verified: true, trending: false,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80',
    amenities: ['Studio', 'Laundry', 'Gym'],
    distance: '0.1 miles from Campus',
  },
  {
    id: 3, name: 'Heritage Lofts', type: 'Shared',
    location: 'West Campus District', price: '₦1,050,000',
    rating: 4.8, verified: true, trending: false,
    image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80',
    amenities: ['Shared', 'Central Air', 'Parking'],
    distance: '0.3 miles from Campus',
  },
  {
    id: 4, name: 'Skyline Scholar Suites', type: 'Hostel',
    location: 'Medical Faculty District', price: '₦620,000',
    rating: 4.5, verified: true, trending: true,
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&q=80',
    amenities: ['Hostel', 'WiFi', 'Security'],
    distance: '0.2 miles from Campus',
  },
];

const types = ['All', 'Hostel', 'Studio', 'Shared', 'Self-contain'];

export default function HousingPage() {
  const [selectedType, setSelectedType] = useState('All');
  const [search, setSearch] = useState('');
  const [view, setView] = useState<'list' | 'map'>('list');

  const filtered = properties.filter((p) => {
    const matchType = selectedType === 'All' || p.type === selectedType;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase());
    return matchType && matchSearch;
  });

  return (
    <div style={{ maxWidth: '1200px' }}>

      {/* Header */}
      <div style={{ marginBottom: '20px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
          Available Housing
        </h1>
        <p style={{ fontSize: '14px', color: '#64748B' }}>
          {filtered.length} properties found near campus
        </p>
      </div>

      {/* Search + filters */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'white', border: '1px solid #E2E8F0',
          borderRadius: '10px', padding: '10px 14px',
          flex: 1,
        }}>
          <Search size={15} color="#94A3B8" />
          <input
            type="text" value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by area or campus..."
            style={{ border: 'none', background: 'none', fontSize: '14px', flex: 1 }}
          />
        </div>
        <button style={{
          width: '40px', height: '40px',
          background: '#1E3A8A', border: 'none',
          borderRadius: '10px', cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <SlidersHorizontal size={16} color="white" />
        </button>
      </div>

      {/* Type filters + view toggle */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          {types.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              style={{
                padding: '7px 16px', borderRadius: '20px',
                border: 'none', fontSize: '13px', fontWeight: '600',
                cursor: 'pointer',
                background: selectedType === type ? '#1E3A8A' : 'white',
                color: selectedType === type ? 'white' : '#64748B',
                boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
              }}
            >
              {type}
            </button>
          ))}
        </div>

        <div style={{
          display: 'flex', background: 'white',
          border: '1px solid #E2E8F0', borderRadius: '8px',
          overflow: 'hidden',
        }}>
          {(['list', 'map'] as const).map((v) => (
            <button
              key={v}
              onClick={() => setView(v)}
              style={{
                padding: '7px 16px', border: 'none',
                background: view === v ? '#EFF6FF' : 'white',
                color: view === v ? '#1E3A8A' : '#64748B',
                fontWeight: view === v ? '700' : '500',
                fontSize: '13px', cursor: 'pointer',
                textTransform: 'capitalize',
              }}
            >
              {v === 'map' ? '🗺️ ' : ''}{v.charAt(0).toUpperCase() + v.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {view === 'list' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {filtered.map((property) => (
            <div key={property.id} style={{
              background: 'white', borderRadius: '16px',
              overflow: 'hidden', border: '1px solid #E2E8F0',
              boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
              display: 'flex', cursor: 'pointer',
              transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
              }}
            >
              {/* Image */}
              <div style={{ width: '280px', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                <img
                  src={property.image} alt={property.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {property.verified && (
                  <div style={{
                    position: 'absolute', top: '12px', left: '12px',
                    background: '#10B981', color: 'white',
                    fontSize: '11px', fontWeight: '700',
                    padding: '4px 10px', borderRadius: '20px',
                    display: 'flex', alignItems: 'center', gap: '4px',
                  }}>
                    <Shield size={10} /> Verified
                  </div>
                )}
                {property.trending && (
                  <div style={{
                    position: 'absolute', top: '12px', right: '12px',
                    background: '#F59E0B', color: 'white',
                    fontSize: '11px', fontWeight: '700',
                    padding: '4px 10px', borderRadius: '20px',
                  }}>
                    Trending
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ flex: 1, padding: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <div>
                    <h3 style={{ fontWeight: '800', fontSize: '16px', color: '#0F172A', marginBottom: '4px' }}>
                      {property.name}
                    </h3>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={12} color="#94A3B8" />
                      <span style={{ fontSize: '12px', color: '#64748B' }}>{property.location}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: '800', fontSize: '18px', color: '#1E3A8A' }}>
                      {property.price}
                    </p>
                    <p style={{ fontSize: '11px', color: '#94A3B8' }}>per year</p>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '12px' }}>
                  <Star size={13} color="#F59E0B" fill="#F59E0B" />
                  <span style={{ fontSize: '13px', fontWeight: '600', color: '#0F172A' }}>{property.rating}</span>
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>· {property.distance}</span>
                </div>

                <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                  {property.amenities.map((amenity) => (
                    <span key={amenity} style={{
                      background: '#F8FAFC', border: '1px solid #E2E8F0',
                      borderRadius: '6px', padding: '4px 10px',
                      fontSize: '11px', fontWeight: '600', color: '#64748B',
                    }}>
                      {amenity}
                    </span>
                  ))}
                </div>

                <div style={{ display: 'flex', gap: '10px' }}>
                  <button style={{
                    background: '#1E3A8A', color: 'white',
                    border: 'none', borderRadius: '8px',
                    padding: '8px 20px', fontSize: '13px',
                    fontWeight: '600', cursor: 'pointer',
                  }}>
                    Contact Landlord
                  </button>
                  <button style={{
                    background: 'white', color: '#1E3A8A',
                    border: '1.5px solid #1E3A8A', borderRadius: '8px',
                    padding: '8px 20px', fontSize: '13px',
                    fontWeight: '600', cursor: 'pointer',
                  }}>
                    Book Inspection
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Map view placeholder */
        <div style={{ display: 'flex', gap: '16px', height: '600px' }}>
          <div style={{ width: '300px', flexShrink: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {filtered.map((p) => (
              <div key={p.id} style={{
                background: 'white', borderRadius: '14px',
                overflow: 'hidden', border: '1px solid #E2E8F0',
                cursor: 'pointer',
              }}>
                <div style={{ height: '120px', position: 'relative' }}>
                  <img src={p.image} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', bottom: '8px', right: '8px',
                    background: 'rgba(0,0,0,0.7)', color: 'white',
                    fontSize: '12px', fontWeight: '700',
                    padding: '3px 8px', borderRadius: '6px',
                  }}>
                    {p.price}/yr
                  </div>
                </div>
                <div style={{ padding: '12px' }}>
                  <p style={{ fontWeight: '700', fontSize: '13px', color: '#0F172A', marginBottom: '4px' }}>{p.name}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <Star size={11} color="#F59E0B" fill="#F59E0B" />
                    <span style={{ fontSize: '11px', color: '#64748B' }}>{p.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div style={{
            flex: 1, background: '#E8F0E8',
            borderRadius: '16px', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            position: 'relative', overflow: 'hidden',
            border: '1px solid #E2E8F0',
          }}>
            <div style={{
              position: 'absolute', inset: 0,
              backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(30,58,138,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(109,40,217,0.08) 0%, transparent 40%)',
            }} />
            <div style={{ textAlign: 'center', position: 'relative' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>🗺️</div>
              <p style={{ fontWeight: '700', fontSize: '16px', color: '#374151', marginBottom: '4px' }}>
                Interactive Map
              </p>
              <p style={{ fontSize: '13px', color: '#94A3B8' }}>
                GIS map integration coming soon
              </p>
            </div>
            {/* Campus markers */}
            {[
              { top: '35%', left: '40%', label: 'University Main Campus' },
              { top: '25%', left: '60%', label: '' },
              { top: '55%', left: '35%', label: '' },
              { top: '65%', left: '55%', label: '' },
            ].map((marker, i) => (
              <div key={i} style={{
                position: 'absolute', top: marker.top, left: marker.left,
                transform: 'translate(-50%, -50%)',
              }}>
                <div style={{
                  width: i === 0 ? '40px' : '28px',
                  height: i === 0 ? '40px' : '28px',
                  background: i === 0 ? '#1E3A8A' : '#6D28D9',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: '3px solid white',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                }}>
                  <span style={{ fontSize: i === 0 ? '16px' : '12px' }}>
                    {i === 0 ? '🎓' : '🏠'}
                  </span>
                </div>
                {marker.label && (
                  <div style={{
                    position: 'absolute', top: '110%', left: '50%',
                    transform: 'translateX(-50%)',
                    background: 'white', borderRadius: '6px',
                    padding: '4px 8px', fontSize: '10px',
                    fontWeight: '600', color: '#374151',
                    whiteSpace: 'nowrap',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  }}>
                    {marker.label}
                  </div>
                )}
              </div>
            ))}

            {/* Map legend */}
            <div style={{
              position: 'absolute', bottom: '16px', right: '16px',
              background: 'white', borderRadius: '10px',
              padding: '12px 16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            }}>
              <p style={{ fontSize: '11px', fontWeight: '700', color: '#374151', marginBottom: '6px' }}>
                Map Legend
              </p>
              {[
                { color: '#1E3A8A', label: 'Luxury Listing' },
                { color: '#10B981', label: 'Budget Friendly' },
                { color: '#6D28D9', label: 'Verified by UniVerse' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                  <div style={{ width: '8px', height: '8px', background: item.color, borderRadius: '50%' }} />
                  <span style={{ fontSize: '11px', color: '#64748B' }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}