'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { Mail, Lock, User, Phone, Zap, Eye, EyeOff, ShoppingBag, Star, Shield } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    role: 'BUYER',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/register', form);
      setAuth(res.data.user, res.data.token);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const roles = [
    {
      value: 'BUYER',
      label: 'Buyer',
      desc: 'I want to purchase services',
      icon: ShoppingBag,
    },
    {
      value: 'SELLER',
      label: 'Seller',
      desc: 'I want to offer services',
      icon: Star,
    },
    {
      value: 'UNIVERSAL',
      label: 'Both',
      desc: 'I want to buy and sell',
      icon: Shield,
    },
  ];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* ===== LEFT PANEL ===== */}
      <div
        className="hidden lg:flex"
        style={{
          width: '45%',
          background: 'linear-gradient(160deg, #0A0F2C 0%, #1a1060 100%)',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '48px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Glow blobs */}
        <div style={{
          position: 'absolute', top: '-80px', left: '-80px',
          width: '350px', height: '350px',
          background: 'rgba(99,102,241,0.15)',
          borderRadius: '50%', filter: 'blur(80px)',
        }} />
        <div style={{
          position: 'absolute', bottom: '-80px', right: '-80px',
          width: '350px', height: '350px',
          background: 'rgba(139,92,246,0.1)',
          borderRadius: '50%', filter: 'blur(80px)',
        }} />

        {/* Logo */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '40px', height: '40px',
            background: '#4F46E5', borderRadius: '12px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={18} color="white" />
          </div>
          <span style={{ fontSize: '20px', fontWeight: '700', color: 'white', letterSpacing: '-0.5px' }}>
            Uni<span style={{ color: '#818CF8' }}>Verse</span>
          </span>
        </div>

        {/* Center content */}
        <div style={{ position: 'relative' }}>
          <h2 style={{
            fontSize: '38px', fontWeight: '800',
            color: 'white', lineHeight: '1.2',
            marginBottom: '16px', letterSpacing: '-1px',
          }}>
            Join thousands of
            <br />
            <span style={{ color: '#818CF8' }}>student hustlers.</span>
          </h2>
          <p style={{
            color: 'rgba(255,255,255,0.45)',
            fontSize: '14px', lineHeight: '1.7',
            marginBottom: '40px',
          }}>
            UniVerse connects students across Nigerian universities to buy, sell, and grow — all protected by escrow.
          </p>

          {/* Stats cards */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' }}>
            {[
              { value: '5,000+', label: 'Active Students' },
              { value: '500+', label: 'Listings' },
              { value: '₦2M+', label: 'Transacted' },
              { value: '100%', label: 'Escrow Safe' },
            ].map((stat) => (
              <div key={stat.label} style={{
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '14px', padding: '16px',
              }}>
                <p style={{ fontSize: '22px', fontWeight: '800', color: 'white', marginBottom: '4px' }}>
                  {stat.value}
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.35)' }}>
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Testimonial */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px', padding: '20px',
            backdropFilter: 'blur(10px)',
          }}>
            <p style={{
              color: 'rgba(255,255,255,0.6)',
              fontSize: '13px', lineHeight: '1.6',
              marginBottom: '12px', fontStyle: 'italic',
            }}>
              "I made ₦45,000 in my first month selling graphics on UniVerse. Best decision ever!"
            </p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '32px', height: '32px',
                background: 'rgba(79,70,229,0.3)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ color: '#A5B4FC', fontWeight: '700', fontSize: '11px' }}>AO</span>
              </div>
              <div>
                <p style={{ color: 'white', fontSize: '12px', fontWeight: '600' }}>Adaeze O.</p>
                <p style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}>Graphics Designer · UNILAG</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p style={{ position: 'relative', color: 'rgba(255,255,255,0.2)', fontSize: '12px' }}>
          © 2026 UniVerse. Built for students.
        </p>
      </div>

      {/* ===== RIGHT PANEL ===== */}
      <div style={{
        flex: 1,
        background: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 32px',
        overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: '420px' }}>

          {/* Mobile logo */}
          <div className="flex lg:hidden" style={{
            alignItems: 'center', gap: '10px', marginBottom: '32px',
          }}>
            <div style={{
              width: '36px', height: '36px', background: '#4F46E5',
              borderRadius: '10px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <Zap size={16} color="white" />
            </div>
            <span style={{ fontSize: '18px', fontWeight: '700', color: '#0F172A' }}>
              Uni<span style={{ color: '#4F46E5' }}>Verse</span>
            </span>
          </div>

          {/* Heading */}
          <div style={{ marginBottom: '28px' }}>
            <h1 style={{
              fontSize: '26px', fontWeight: '800',
              color: '#0F172A', marginBottom: '8px',
              letterSpacing: '-0.5px',
            }}>
              Create your account
            </h1>
            <p style={{ fontSize: '14px', color: '#64748B' }}>
              Already have an account?{' '}
              <Link href="/login" style={{ color: '#4F46E5', fontWeight: '600', textDecoration: 'none' }}>
                Sign in
              </Link>
            </p>
          </div>

          {/* Error */}
          {error && (
            <div style={{
              background: '#FEF2F2', border: '1px solid #FEE2E2',
              color: '#DC2626', padding: '12px 16px',
              borderRadius: '12px', marginBottom: '20px',
              fontSize: '13px',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Full Name */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block', fontSize: '13px',
                fontWeight: '600', color: '#374151', marginBottom: '8px',
              }}>
                Full Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={15} color="#9CA3AF" style={{
                  position: 'absolute', left: '14px',
                  top: '50%', transform: 'translateY(-50%)',
                }} />
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                  style={{
                    width: '100%', border: '1.5px solid #E5E7EB',
                    borderRadius: '12px', padding: '12px 14px 12px 40px',
                    fontSize: '14px', color: '#111827',
                    background: '#F9FAFB', boxSizing: 'border-box',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                  onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                />
              </div>
            </div>

            {/* Email */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block', fontSize: '13px',
                fontWeight: '600', color: '#374151', marginBottom: '8px',
              }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} color="#9CA3AF" style={{
                  position: 'absolute', left: '14px',
                  top: '50%', transform: 'translateY(-50%)',
                }} />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  placeholder="john@university.edu"
                  style={{
                    width: '100%', border: '1.5px solid #E5E7EB',
                    borderRadius: '12px', padding: '12px 14px 12px 40px',
                    fontSize: '14px', color: '#111827',
                    background: '#F9FAFB', boxSizing: 'border-box',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                  onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                />
              </div>
            </div>

            {/* Phone */}
            <div style={{ marginBottom: '16px' }}>
              <label style={{
                display: 'block', fontSize: '13px',
                fontWeight: '600', color: '#374151', marginBottom: '8px',
              }}>
                Phone <span style={{ color: '#94A3B8', fontWeight: '400' }}>(optional)</span>
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={15} color="#9CA3AF" style={{
                  position: 'absolute', left: '14px',
                  top: '50%', transform: 'translateY(-50%)',
                }} />
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+234 800 000 0000"
                  style={{
                    width: '100%', border: '1.5px solid #E5E7EB',
                    borderRadius: '12px', padding: '12px 14px 12px 40px',
                    fontSize: '14px', color: '#111827',
                    background: '#F9FAFB', boxSizing: 'border-box',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                  onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block', fontSize: '13px',
                fontWeight: '600', color: '#374151', marginBottom: '8px',
              }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={15} color="#9CA3AF" style={{
                  position: 'absolute', left: '14px',
                  top: '50%', transform: 'translateY(-50%)',
                }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  required
                  placeholder="Create a strong password"
                  style={{
                    width: '100%', border: '1.5px solid #E5E7EB',
                    borderRadius: '12px', padding: '12px 40px 12px 40px',
                    fontSize: '14px', color: '#111827',
                    background: '#F9FAFB', boxSizing: 'border-box',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                  onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute', right: '14px',
                    top: '50%', transform: 'translateY(-50%)',
                    background: 'none', border: 'none',
                    cursor: 'pointer', color: '#9CA3AF',
                    display: 'flex', alignItems: 'center',
                  }}
                >
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Role selector */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{
                display: 'block', fontSize: '13px',
                fontWeight: '600', color: '#374151', marginBottom: '10px',
              }}>
                I want to
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                {roles.map((r) => (
                  <button
                    key={r.value}
                    type="button"
                    onClick={() => setForm({ ...form, role: r.value })}
                    style={{
                      border: form.role === r.value ? '2px solid #4F46E5' : '1.5px solid #E5E7EB',
                      borderRadius: '12px',
                      padding: '12px 8px',
                      background: form.role === r.value ? '#EEF2FF' : '#F9FAFB',
                      cursor: 'pointer',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '6px',
                      transition: 'all 0.2s',
                    }}
                  >
                    <r.icon
                      size={18}
                      color={form.role === r.value ? '#4F46E5' : '#94A3B8'}
                    />
                    <span style={{
                      fontSize: '12px',
                      fontWeight: '700',
                      color: form.role === r.value ? '#4F46E5' : '#374151',
                    }}>
                      {r.label}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      color: form.role === r.value ? '#6366F1' : '#94A3B8',
                      textAlign: 'center',
                      lineHeight: '1.3',
                    }}>
                      {r.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#818CF8' : '#4F46E5',
                color: 'white', border: 'none',
                borderRadius: '12px', padding: '14px',
                fontSize: '14px', fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '16px',
                letterSpacing: '0.3px',
              }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>

            {/* Divider */}
            <div style={{
              display: 'flex', alignItems: 'center',
              gap: '12px', marginBottom: '16px',
            }}>
              <div style={{ flex: 1, height: '1px', background: '#F1F5F9' }} />
              <span style={{ fontSize: '12px', color: '#94A3B8' }}>OR</span>
              <div style={{ flex: 1, height: '1px', background: '#F1F5F9' }} />
            </div>

            {/* Login link */}
            <Link
              href="/login"
              style={{
                display: 'block', width: '100%',
                border: '2px solid #4F46E5',
                color: '#4F46E5', borderRadius: '12px',
                padding: '13px', fontSize: '14px',
                fontWeight: '700', textAlign: 'center',
                textDecoration: 'none', boxSizing: 'border-box',
              }}
            >
              Sign In Instead
            </Link>
          </form>

          {/* Terms */}
          <p style={{
            fontSize: '12px', color: '#94A3B8',
            marginTop: '24px', lineHeight: '1.6',
          }}>
            By creating an account, you agree to our{' '}
            <span style={{ color: '#4F46E5', cursor: 'pointer' }}>Terms of Service</span>
            {' '}and{' '}
            <span style={{ color: '#4F46E5', cursor: 'pointer' }}>Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}