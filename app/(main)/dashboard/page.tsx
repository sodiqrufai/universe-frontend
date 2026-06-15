'use client';

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/authStore';
import api from '@/lib/api';
import Link from 'next/link';
import {
  Building2,
  Wrench,
  ShoppingBag,
  MessageSquare,
  ArrowRight,
  Shield,
  Star,
  MapPin,
  TrendingUp,
} from 'lucide-react';

export default function DashboardPage() {
  const { user, loadFromStorage } = useAuthStore();
  const [wallet, setWallet] = useState({ balance: 0 });
  const [orders, setOrders] = useState([]);
  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    loadFromStorage();
  }, []);

  useEffect(() => {
    if (user) fetchData();
  }, [user]);

  const fetchData = async () => {
    try {
      const [walletRes, ordersRes, listingsRes] = await Promise.all([
        api.get('/payments/wallet'),
        api.get('/orders?role=buyer'),
        api.get('/marketplace/listings'),
      ]);
      setWallet(walletRes.data);
      setOrders(ordersRes.data);
      setListings(listingsRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  const quickCards = [
    { icon: Building2, label: 'Housing', desc: 'Find the best near-campus stays', href: '/housing', color: '#EFF6FF', iconColor: '#1E3A8A' },
    { icon: Wrench, label: 'Services', desc: 'Tutors, laundry, and more', href: '/services', color: '#F0FDF4', iconColor: '#10B981' },
    { icon: ShoppingBag, label: 'Marketplace', desc: 'Buy and sell student gear', href: '/marketplace', color: '#FFF7ED', iconColor: '#F59E0B' },
    { icon: MessageSquare, label: 'Messages', desc: '3 new campus requests', href: '/messages', color: '#F5F3FF', iconColor: '#6D28D9' },
  ];

  const featuredHostels = [
    { name: 'Blue Horizon Residences', location: '0.5 miles from Main Gate', price: '₦450,000', rating: 4.8, verified: true, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
    { name: "The Scholar's Loft", location: 'Downtown Campus District', price: '₦520,000', rating: 4.9, verified: true, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80' },
    { name: 'Ivy Green Suites', location: 'West Campus Woods', price: '₦480,000', rating: 4.7, verified: true, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80' },
  ];

  const popularTutors = [
    { name: 'Sarah J.', role: 'UI/UX Design Specialist', rating: 4.9, reviews: 124, avatar: 'SJ' },
    { name: 'Dr. Michael Chen', role: 'Calculus & Linear Algebra', rating: 5.0, reviews: 89, avatar: 'MC' },
  ];

  return (
    <div style={{ maxWidth: '1200px' }}>

      {/* Welcome header */}
      <div style={{
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'flex-start', marginBottom: '24px',
      }}>
        <div>
          <h1 style={{
            fontSize: '28px', fontWeight: '800',
            color: '#0F172A', letterSpacing: '-0.5px',
            marginBottom: '4px',
          }}>
            Welcome back, {user?.name?.split(' ')[0]} 👋
          </h1>
          <p style={{ fontSize: '14px', color: '#64748B' }}>
            Your campus life, perfectly organized today.
          </p>
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: '#F0FDF4', border: '1px solid #BBF7D0',
          borderRadius: '20px', padding: '6px 14px',
        }}>
          <div style={{
            width: '8px', height: '8px',
            background: '#10B981', borderRadius: '50%',
          }} />
          <span style={{ fontSize: '12px', fontWeight: '600', color: '#10B981' }}>
            Verified Student
          </span>
        </div>
      </div>

      {/* Quick access cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px', marginBottom: '32px',
      }}>
        {quickCards.map((card) => (
          <Link key={card.label} href={card.href} style={{ textDecoration: 'none' }}>
            <div style={{
              background: 'white', borderRadius: '16px',
              padding: '20px', border: '1px solid #F1F5F9',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              transition: 'all 0.2s', cursor: 'pointer',
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              <div style={{
                width: '44px', height: '44px',
                background: card.color, borderRadius: '12px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '12px',
              }}>
                <card.icon size={22} color={card.iconColor} />
              </div>
              <p style={{ fontWeight: '700', fontSize: '14px', color: '#0F172A', marginBottom: '4px' }}>
                {card.label}
              </p>
              <p style={{ fontSize: '12px', color: '#94A3B8', lineHeight: '1.4' }}>
                {card.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* Featured Hostels */}
      <div style={{ marginBottom: '32px' }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', marginBottom: '16px',
        }}>
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0F172A' }}>
              Featured Hostels Near Campus
            </h2>
            <p style={{ fontSize: '13px', color: '#64748B', marginTop: '2px' }}>
              Hand-picked student accommodations near major campus hubs.
            </p>
          </div>
          <Link href="/housing" style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            fontSize: '13px', fontWeight: '600', color: '#1E3A8A',
          }}>
            View all <ArrowRight size={14} />
          </Link>
        </div>

        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '16px',
        }}>
          {featuredHostels.map((hostel) => (
            <div key={hostel.name} style={{
              background: 'white', borderRadius: '16px',
              overflow: 'hidden', border: '1px solid #F1F5F9',
              boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
              cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.05)';
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
              }}
            >
              {/* Image */}
              <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
                <img
                  src={hostel.image}
                  alt={hostel.name}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {hostel.verified && (
                  <div style={{
                    position: 'absolute', top: '10px', left: '10px',
                    background: '#10B981', color: 'white',
                    fontSize: '10px', fontWeight: '700',
                    padding: '3px 8px', borderRadius: '20px',
                    display: 'flex', alignItems: 'center', gap: '4px',
                  }}>
                    <Shield size={10} />
                    Verified
                  </div>
                )}
                <div style={{
                  position: 'absolute', bottom: '10px', right: '10px',
                  background: 'rgba(0,0,0,0.7)', color: 'white',
                  fontSize: '12px', fontWeight: '700',
                  padding: '4px 10px', borderRadius: '8px',
                }}>
                  {hostel.price}/mo
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '14px' }}>
                <h3 style={{
                  fontWeight: '700', fontSize: '14px',
                  color: '#0F172A', marginBottom: '6px',
                }}>
                  {hostel.name}
                </h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '8px' }}>
                  <MapPin size={12} color="#94A3B8" />
                  <span style={{ fontSize: '12px', color: '#64748B' }}>{hostel.location}</span>
                </div>
                <div style={{
                  display: 'flex', justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Star size={12} color="#F59E0B" fill="#F59E0B" />
                    <span style={{ fontSize: '12px', fontWeight: '600', color: '#0F172A' }}>
                      {hostel.rating}
                    </span>
                  </div>
                  <button style={{
                    background: 'none', border: 'none',
                    color: '#1E3A8A', fontSize: '12px',
                    fontWeight: '600', cursor: 'pointer',
                  }}>
                    Details →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom row: Tutors + Trending */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

        {/* Popular Tutors */}
        <div style={{
          background: 'white', borderRadius: '16px',
          padding: '20px', border: '1px solid #F1F5F9',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '16px',
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>
              Popular Tutors & Designers
            </h2>
            <Link href="/services" style={{
              fontSize: '12px', fontWeight: '600', color: '#1E3A8A',
            }}>
              See all experts →
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {popularTutors.map((tutor) => (
              <div key={tutor.name} style={{
                display: 'flex', alignItems: 'center',
                gap: '12px', padding: '12px',
                background: '#F8FAFC', borderRadius: '12px',
              }}>
                <div style={{
                  width: '44px', height: '44px',
                  background: 'linear-gradient(135deg, #1E3A8A, #6D28D9)',
                  borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0,
                }}>
                  <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>
                    {tutor.avatar}
                  </span>
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontWeight: '700', fontSize: '13px', color: '#0F172A' }}>
                    {tutor.name}
                  </p>
                  <p style={{ fontSize: '11px', color: '#64748B' }}>{tutor.role}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                    <Star size={10} color="#F59E0B" fill="#F59E0B" />
                    <span style={{ fontSize: '11px', color: '#64748B' }}>
                      {tutor.rating} ({tutor.reviews} reviews)
                    </span>
                  </div>
                </div>
                <button style={{
                  background: '#EFF6FF', color: '#1E3A8A',
                  border: 'none', borderRadius: '8px',
                  padding: '6px 12px', fontSize: '12px',
                  fontWeight: '600', cursor: 'pointer',
                  flexShrink: 0,
                }}>
                  Book Session
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Trending Gadgets */}
        <div style={{
          background: 'white', borderRadius: '16px',
          padding: '20px', border: '1px solid #F1F5F9',
          boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
        }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'center', marginBottom: '16px',
          }}>
            <h2 style={{ fontSize: '16px', fontWeight: '800', color: '#0F172A' }}>
              Trending Gadgets
            </h2>
            <span style={{
              background: '#EFF6FF', color: '#1E3A8A',
              fontSize: '11px', fontWeight: '600',
              padding: '3px 10px', borderRadius: '20px',
            }}>
              Campus Deals
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {listings.slice(0, 3).length > 0 ? listings.slice(0, 3).map((listing: any) => (
              <div key={listing.id} style={{
                display: 'flex', alignItems: 'center',
                gap: '12px', padding: '12px',
                background: '#F8FAFC', borderRadius: '12px',
              }}>
                <div style={{
                  width: '48px', height: '48px',
                  background: '#EFF6FF', borderRadius: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  flexShrink: 0, fontSize: '22px',
                }}>
                  🛍️
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{
                    fontWeight: '600', fontSize: '13px',
                    color: '#0F172A', overflow: 'hidden',
                    textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                  }}>
                    {listing.title}
                  </p>
                  <p style={{ fontSize: '11px', color: '#94A3B8' }}>
                    Seller: {listing.seller?.name}
                  </p>
                </div>
                <p style={{
                  fontWeight: '800', fontSize: '14px',
                  color: '#1E3A8A', flexShrink: 0,
                }}>
                  ₦{listing.price?.toLocaleString()}
                </p>
              </div>
            )) : (
              [
                { name: 'SonicPro Max Headphones', condition: 'Like New', price: '₦120,000' },
                { name: 'TabPro 12" with Keyboard', condition: 'Graduating Senior', price: '₦340,000' },
                { name: 'MacBook Pro M2 Student', condition: 'Like New', price: '₦850,000' },
              ].map((item) => (
                <div key={item.name} style={{
                  display: 'flex', alignItems: 'center',
                  gap: '12px', padding: '12px',
                  background: '#F8FAFC', borderRadius: '12px',
                }}>
                  <div style={{
                    width: '48px', height: '48px',
                    background: '#EFF6FF', borderRadius: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, fontSize: '22px',
                  }}>
                    💻
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontWeight: '600', fontSize: '13px', color: '#0F172A' }}>
                      {item.name}
                    </p>
                    <p style={{ fontSize: '11px', color: '#94A3B8' }}>{item.condition}</p>
                  </div>
                  <p style={{ fontWeight: '800', fontSize: '14px', color: '#1E3A8A', flexShrink: 0 }}>
                    {item.price}
                  </p>
                </div>
              ))
            )}
          </div>

          <Link href="/marketplace" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: '6px', marginTop: '16px',
            background: '#1E3A8A', color: 'white',
            borderRadius: '10px', padding: '10px',
            fontSize: '13px', fontWeight: '600',
          }}>
            Go to Marketplace <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      {/* Stats bar */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px', marginTop: '24px',
        background: '#1E3A8A', borderRadius: '16px',
        padding: '20px 24px',
      }}>
        {[
          { value: '10k+', label: 'ACTIVE STUDENTS' },
          { value: '500+', label: 'VERIFIED HOSTELS' },
          { value: '1.2k+', label: 'SERVICE PROVIDERS' },
          { value: '50k+', label: 'ITEMS SOLD' },
        ].map((stat) => (
          <div key={stat.label} style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: '800', color: 'white' }}>
              {stat.value}
            </p>
            <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)', marginTop: '4px', letterSpacing: '0.5px' }}>
              {stat.label}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}