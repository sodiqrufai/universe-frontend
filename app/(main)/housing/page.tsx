'use client';

import { Building2, Search, MapPin } from 'lucide-react';

export default function HousingPage() {
  const types = ['All', 'Hostel', 'Studio', 'Shared', 'Self-contain'];

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{ padding: '24px 20px 16px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '16px',
        }}>
          <div>
            <h1 style={{
              fontWeight: '800', fontSize: '22px', color: '#0F172A',
            }}>
              Housing
            </h1>
            <p style={{ fontSize: '13px', color: '#64748B' }}>
              Find accommodation near campus
            </p>
          </div>
        </div>

        {/* Search */}
        <div style={{
          background: 'white', borderRadius: '14px',
          padding: '12px 16px',
          display: 'flex', alignItems: 'center', gap: '10px',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
          marginBottom: '12px',
        }}>
          <Search size={16} color="#94A3B8" />
          <input
            type="text"
            placeholder="Search by area or campus..."
            style={{
              flex: 1, border: 'none', background: 'none',
              fontSize: '14px', color: '#0F172A',
            }}
          />
        </div>

        {/* Type filters */}
        <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', scrollbarWidth: 'none' }}>
          {types.map((type, i) => (
            <button
              key={type}
              style={{
                padding: '8px 16px', borderRadius: '20px',
                border: 'none', whiteSpace: 'nowrap',
                background: i === 0 ? '#4F46E5' : 'white',
                color: i === 0 ? 'white' : '#64748B',
                fontSize: '13px', fontWeight: '600',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Coming soon */}
      <div style={{ padding: '40px 20px', textAlign: 'center' }}>
        <div style={{
          width: '80px', height: '80px',
          background: '#EEF2FF', borderRadius: '24px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 20px',
        }}>
          <Building2 size={36} color="#4F46E5" />
        </div>
        <h2 style={{
          fontWeight: '800', fontSize: '20px',
          color: '#0F172A', marginBottom: '8px',
        }}>
          Housing Coming Soon
        </h2>
        <p style={{
          fontSize: '14px', color: '#64748B',
          lineHeight: '1.6', maxWidth: '280px', margin: '0 auto',
        }}>
          We're verifying hostels and apartments near Nigerian campuses. Check back soon!
        </p>

        {/* Preview cards */}
        <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {[
            { name: 'Sunrise Heights Hostel', location: '5 min to Main Gate', price: '₦85,000/yr' },
            { name: 'Campus View Residence', location: 'Greenfields University', price: '₦120,000/yr' },
          ].map((h) => (
            <div key={h.name} style={{
              background: 'white', borderRadius: '18px',
              padding: '16px', textAlign: 'left',
              boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
              opacity: 0.5,
              filter: 'blur(1px)',
            }}>
              <div style={{
                width: '100%', height: '120px',
                background: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)',
                borderRadius: '12px', marginBottom: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Building2 size={32} color="#4F46E5" />
              </div>
              <p style={{ fontWeight: '700', fontSize: '14px', color: '#0F172A', marginBottom: '4px' }}>
                {h.name}
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '6px' }}>
                <MapPin size={12} color="#94A3B8" />
                <span style={{ fontSize: '12px', color: '#64748B' }}>{h.location}</span>
              </div>
              <p style={{ fontWeight: '800', fontSize: '16px', color: '#4F46E5' }}>{h.price}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}