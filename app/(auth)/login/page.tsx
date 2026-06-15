import Link from 'next/link';
import {
  Search,
  Shield,
  Star,
  Building2,
  Wrench,
  ShoppingBag,
  ArrowRight,
  CheckCircle,
  MapPin,
} from 'lucide-react';

export default function LandingPage() {
  const stats = [
    { value: '10k+', label: 'ACTIVE STUDENTS' },
    { value: '500+', label: 'VERIFIED HOSTELS' },
    { value: '1.2k+', label: 'SERVICE PROVIDERS' },
    { value: '50k+', label: 'ITEMS SOLD' },
  ];

  const featuredHostels = [
    { name: 'Oakwood Premium Residence', location: '1.2km from Engineering Block', price: '₦450,000', rating: 4.7, image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400&q=80' },
    { name: 'The Collective Studios', location: 'Main Campus Academic District', price: '₦380,000', rating: 4.9, image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&q=80' },
    { name: 'Skyline Scholar Suites', location: 'Medical Faculty District', price: '₦620,000', rating: 4.8, image: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&q=80' },
  ];

  const testimonials = [
    { text: 'Found my current hostel within 2 days of searching. The verification process gave me the peace of mind as an international student.', name: 'Sarah Jenkins', role: 'Sophomore, Psychology', avatar: 'SJ' },
    { text: 'The marketplace is amazing! I sold all my first year textbooks in a single weekend and bought a second-hand bike for half the store price.', name: 'Marcus Thorne', role: 'Junior, Sciences', avatar: 'MT' },
    { text: 'UniVerse has completely simplified my laundry and meal planning. I spend more time studying and less time worrying about chores.', name: 'Elena Kozlov', role: 'PhD Candidate, Physics', avatar: 'EK' },
  ];

  return (
    <div style={{ background: 'white', fontFamily: 'Inter, sans-serif' }}>

      {/* Navbar */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0,
        background: 'white', borderBottom: '1px solid #E2E8F0',
        padding: '0 48px', height: '64px',
        display: 'flex', alignItems: 'center',
        justifyContent: 'space-between', zIndex: 1000,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'linear-gradient(135deg, #1E3A8A, #6D28D9)',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontWeight: '800', fontSize: '16px' }}>U</span>
          </div>
          <span style={{ fontWeight: '800', fontSize: '18px', color: '#0F172A' }}>
            UniVerse
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {['Home', 'Housing', 'Services', 'Marketplace', 'About', 'Contact'].map((item) => (
            <a key={item} href="#" style={{
              padding: '6px 12px', fontSize: '14px',
              color: '#64748B', fontWeight: '500',
              borderRadius: '8px',
            }}>
              {item}
            </a>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link href="/login" style={{
            padding: '8px 16px', fontSize: '14px',
            color: '#64748B', fontWeight: '500',
          }}>
            Sign In
          </Link>
          <Link href="/register" style={{
            padding: '8px 20px', fontSize: '14px',
            background: '#1E3A8A', color: 'white',
            borderRadius: '10px', fontWeight: '600',
          }}>
            Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section style={{
        paddingTop: '120px', paddingBottom: '80px',
        textAlign: 'center', background: '#F8FAFC',
        borderBottom: '1px solid #E2E8F0',
      }}>
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '0 24px' }}>
          <h1 style={{
            fontSize: '48px', fontWeight: '900',
            color: '#0F172A', lineHeight: '1.15',
            letterSpacing: '-1px', marginBottom: '16px',
          }}>
            Find your place{' '}
            <span style={{ color: '#1E3A8A' }}>on campus</span>
          </h1>
          <p style={{
            fontSize: '18px', color: '#64748B',
            lineHeight: '1.6', marginBottom: '32px',
          }}>
            The ultimate university ecosystem for students. Verified housing, trusted services, and a peer-to-peer marketplace designed for academic life.
          </p>

          {/* Search bar */}
          <div style={{
            display: 'flex', alignItems: 'center',
            background: 'white', border: '2px solid #E2E8F0',
            borderRadius: '14px', padding: '8px 8px 8px 16px',
            boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
            maxWidth: '560px', margin: '0 auto 24px',
          }}>
            <Search size={18} color="#94A3B8" style={{ flexShrink: 0 }} />
            <input
              placeholder="Search for campus housing, laundry services, or textbooks..."
              style={{
                flex: 1, border: 'none', background: 'none',
                fontSize: '14px', color: '#0F172A',
                padding: '8px 12px',
              }}
            />
            <button style={{
              background: '#1E3A8A', color: 'white',
              border: 'none', borderRadius: '10px',
              padding: '10px 20px', fontSize: '14px',
              fontWeight: '600', cursor: 'pointer',
              flexShrink: 0,
            }}>
              Explore
            </button>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
            {[
              { icon: Shield, text: 'Verified Listings' },
              { icon: CheckCircle, text: 'Secure Transactions' },
              { icon: Star, text: 'Student Community' },
            ].map((badge) => (
              <div key={badge.text} style={{
                display: 'flex', alignItems: 'center', gap: '6px',
              }}>
                <badge.icon size={14} color="#10B981" />
                <span style={{ fontSize: '13px', color: '#64748B', fontWeight: '500' }}>
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section style={{
        background: 'white', padding: '40px 48px',
        borderBottom: '1px solid #E2E8F0',
      }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '0',
        }}>
          {stats.map((stat, i) => (
            <div key={stat.label} style={{
              textAlign: 'center', padding: '0 24px',
              borderRight: i < 3 ? '1px solid #E2E8F0' : 'none',
            }}>
              <p style={{ fontSize: '32px', fontWeight: '900', color: '#1E3A8A', letterSpacing: '-1px' }}>
                {stat.value}
              </p>
              <p style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', letterSpacing: '0.5px', marginTop: '4px' }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Housing */}
      <section style={{ padding: '60px 48px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between',
            alignItems: 'flex-end', marginBottom: '24px',
          }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#10B981', letterSpacing: '1px', marginBottom: '6px' }}>
                HOUSING
              </p>
              <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', letterSpacing: '-0.5px' }}>
                Featured Housing
              </h2>
              <p style={{ fontSize: '14px', color: '#64748B', marginTop: '4px' }}>
                Hand-picked student accommodations near major campus hubs.
              </p>
            </div>
            <Link href="/housing" style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              fontSize: '14px', fontWeight: '600', color: '#1E3A8A',
            }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '20px',
          }}>
            {featuredHostels.map((hostel) => (
              <div key={hostel.name} style={{
                background: 'white', borderRadius: '16px',
                overflow: 'hidden', border: '1px solid #E2E8F0',
                boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                cursor: 'pointer',
              }}>
                <div style={{ position: 'relative', height: '180px' }}>
                  <img src={hostel.image} alt={hostel.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', top: '10px', left: '10px',
                    background: '#10B981', color: 'white',
                    fontSize: '10px', fontWeight: '700',
                    padding: '3px 8px', borderRadius: '20px',
                  }}>
                    ✓ Verified
                  </div>
                  <div style={{
                    position: 'absolute', bottom: '10px', right: '10px',
                    background: 'rgba(0,0,0,0.75)', color: 'white',
                    fontSize: '13px', fontWeight: '700',
                    padding: '4px 10px', borderRadius: '8px',
                  }}>
                    {hostel.price}/mo
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  <h3 style={{ fontWeight: '700', fontSize: '15px', color: '#0F172A', marginBottom: '6px' }}>
                    {hostel.name}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '10px' }}>
                    <MapPin size={12} color="#94A3B8" />
                    <span style={{ fontSize: '12px', color: '#64748B' }}>{hostel.location}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Star size={12} color="#F59E0B" fill="#F59E0B" />
                      <span style={{ fontSize: '12px', fontWeight: '600' }}>{hostel.rating}</span>
                    </div>
                    <button style={{
                      background: 'none', border: 'none',
                      color: '#1E3A8A', fontSize: '13px',
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
      </section>

      {/* Marketplace + Services */}
      <section style={{ padding: '60px 48px', background: 'white' }}>
        <div style={{
          maxWidth: '1200px', margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1fr 1fr',
          gap: '24px',
        }}>
          {/* Marketplace */}
          <div style={{
            background: '#F8FAFC', borderRadius: '20px',
            padding: '32px', border: '1px solid #E2E8F0',
          }}>
            <p style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8', letterSpacing: '1px', marginBottom: '8px' }}>
              MARKETPLACE
            </p>
            <h3 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '8px' }}>
              Trending Student Gear
            </h3>
            <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px' }}>
              Buy and sell textbooks, electronics, and dorm essentials directly with your peers.
            </p>
            <div style={{
              display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px', marginBottom: '24px',
            }}>
              {[
                { icon: '💻', label: 'Tech' },
                { icon: '📚', label: 'Books' },
                { icon: '🛋️', label: 'Dorm' },
                { icon: '🚌', label: 'Transport' },
              ].map((cat) => (
                <div key={cat.label} style={{
                  background: 'white', borderRadius: '12px',
                  padding: '14px 8px', textAlign: 'center',
                  border: '1px solid #E2E8F0',
                }}>
                  <div style={{ fontSize: '22px', marginBottom: '4px' }}>{cat.icon}</div>
                  <p style={{ fontSize: '11px', fontWeight: '600', color: '#374151' }}>{cat.label}</p>
                </div>
              ))}
            </div>
            <Link href="/marketplace" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: '#1E3A8A', color: 'white',
              borderRadius: '10px', padding: '12px 20px',
              fontSize: '14px', fontWeight: '600',
            }}>
              Go to Marketplace
            </Link>
          </div>

          {/* Services */}
          <div style={{
            background: '#1E3A8A', borderRadius: '20px',
            padding: '32px', color: 'white',
          }}>
            <p style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.5)', letterSpacing: '1px', marginBottom: '8px' }}>
              CAMPUS SERVICES
            </p>
            <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px' }}>
              Trusted Providers
            </h3>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.6)', marginBottom: '24px' }}>
              Student-vetted service providers for all your campus needs.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
              {[
                { icon: '🧺', name: 'Next-Day Laundry', desc: 'Free pickup & delivery' },
                { icon: '🍱', name: 'Meal Subscriptions', desc: 'Healthy campus meals' },
                { icon: '🧹', name: 'Room Cleaning', desc: 'Weekly & monthly plans' },
              ].map((service) => (
                <div key={service.name} style={{
                  display: 'flex', alignItems: 'center', gap: '12px',
                  background: 'rgba(255,255,255,0.1)',
                  borderRadius: '12px', padding: '12px 16px',
                }}>
                  <span style={{ fontSize: '20px' }}>{service.icon}</span>
                  <div>
                    <p style={{ fontWeight: '600', fontSize: '13px' }}>{service.name}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.5)' }}>{service.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/services" style={{
              display: 'inline-flex', alignItems: 'center', gap: '8px',
              background: 'white', color: '#1E3A8A',
              borderRadius: '10px', padding: '12px 20px',
              fontSize: '14px', fontWeight: '600',
            }}>
              Explore Services
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '60px 48px', background: '#F8FAFC' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A' }}>
              Student Voices
            </h2>
            <p style={{ fontSize: '14px', color: '#64748B', marginTop: '8px' }}>
              Hear from the community built on trust
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {testimonials.map((t) => (
              <div key={t.name} style={{
                background: 'white', borderRadius: '16px',
                padding: '24px', border: '1px solid #E2E8F0',
              }}>
                <div style={{ display: 'flex', gap: '2px', marginBottom: '16px' }}>
                  {[1,2,3,4,5].map((i) => (
                    <Star key={i} size={14} color="#F59E0B" fill="#F59E0B" />
                  ))}
                </div>
                <p style={{
                  fontSize: '14px', color: '#374151',
                  lineHeight: '1.6', marginBottom: '20px',
                  fontStyle: 'italic',
                }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{
                    width: '36px', height: '36px',
                    background: 'linear-gradient(135deg, #1E3A8A, #6D28D9)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <span style={{ color: 'white', fontWeight: '700', fontSize: '12px' }}>{t.avatar}</span>
                  </div>
                  <div>
                    <p style={{ fontWeight: '700', fontSize: '13px', color: '#0F172A' }}>{t.name}</p>
                    <p style={{ fontSize: '11px', color: '#94A3B8' }}>{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        background: '#1E3A8A', padding: '80px 48px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{ fontSize: '36px', fontWeight: '800', color: 'white', marginBottom: '16px' }}>
            Ready to join the ecosystem?
          </h2>
          <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.6)', marginBottom: '32px' }}>
            Start exploring verified campus housing, services, and the marketplace today. Exclusive for university students.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <Link href="/register" style={{
              padding: '14px 28px', background: 'white',
              color: '#1E3A8A', borderRadius: '12px',
              fontWeight: '700', fontSize: '15px',
            }}>
              Join the Ecosystem
            </Link>
            <Link href="/login" style={{
              padding: '14px 28px',
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.2)',
              color: 'white', borderRadius: '12px',
              fontWeight: '600', fontSize: '15px',
            }}>
              Learn More
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        background: '#0F172A', padding: '48px',
        color: 'rgba(255,255,255,0.5)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px', marginBottom: '40px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                <div style={{
                  width: '28px', height: '28px',
                  background: 'linear-gradient(135deg, #1E3A8A, #6D28D9)',
                  borderRadius: '8px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: 'white', fontWeight: '800', fontSize: '13px' }}>U</span>
                </div>
                <span style={{ fontWeight: '800', fontSize: '16px', color: 'white' }}>UniVerse</span>
              </div>
              <p style={{ fontSize: '13px', lineHeight: '1.6', maxWidth: '260px' }}>
                The unified digital backbone for modern student life, connecting housing, commerce, and connection.
              </p>
            </div>
            {[
              { title: 'NAVIGATION', links: ['Housing', 'Services', 'Marketplace', 'About Us'] },
              { title: 'COMPANY', links: ['About Us', 'Partners', 'Trust & Safety'] },
              { title: 'LEGAL', links: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'] },
            ].map((col) => (
              <div key={col.title}>
                <p style={{ fontSize: '11px', fontWeight: '700', color: 'rgba(255,255,255,0.3)', letterSpacing: '1px', marginBottom: '12px' }}>
                  {col.title}
                </p>
                {col.links.map((link) => (
                  <p key={link} style={{ fontSize: '13px', marginBottom: '8px', cursor: 'pointer' }}>
                    {link}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px' }}>© 2026 UniVerse Ecosystem. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}