'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { Mail, Lock, CheckCircle, Zap, Eye, EyeOff } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({ email: '', password: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', form);
      setAuth(res.data.user, res.data.token);
     router.push('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>

      {/* ===== LEFT PANEL ===== */}
      <div style={{
        width: '50%',
        background: 'linear-gradient(160deg, #0A0F2C 0%, #1a1060 100%)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '48px',
        position: 'relative',
        overflow: 'hidden',
      }}
        className="hidden lg:flex"
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
            background: '#4F46E5',
            borderRadius: '12px',
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
            fontSize: '42px', fontWeight: '800',
            color: 'white', lineHeight: '1.2',
            marginBottom: '32px', letterSpacing: '-1px',
          }}>
            Your campus.<br />
            <span style={{ color: '#818CF8' }}>Your economy.</span>
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
            {[
              'Verified escrow payments — zero risk',
              'Buy and sell across your university',
              'Real-time chat with every order',
              'Build your reputation with reviews',
            ].map((item) => (
              <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <CheckCircle size={18} color="#818CF8" style={{ flexShrink: 0 }} />
                <span style={{ color: 'rgba(255,255,255,0.65)', fontSize: '14px' }}>{item}</span>
              </div>
            ))}
          </div>

          {/* Testimonial card */}
          <div style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '16px',
            padding: '20px',
            backdropFilter: 'blur(10px)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
              <div style={{
                width: '40px', height: '40px',
                background: 'rgba(79,70,229,0.3)',
                borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ color: '#A5B4FC', fontWeight: '700', fontSize: '13px' }}>JS</span>
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ color: 'white', fontSize: '13px', fontWeight: '600', marginBottom: '2px' }}>
                  John Seller
                </p>
                <p style={{ color: 'rgba(255,255,255,0.35)', fontSize: '11px' }}>
                  Logo Design · ₦5,000
                </p>
              </div>
              <span style={{
                background: 'rgba(34,197,94,0.15)',
                color: '#4ADE80',
                fontSize: '11px',
                fontWeight: '600',
                padding: '4px 10px',
                borderRadius: '20px',
              }}>
                Completed
              </span>
            </div>
            <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '13px', lineHeight: '1.5' }}>
              "Delivered exactly what I needed. Payment was released instantly!"
            </p>
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
      }}>
        <div style={{ width: '100%', maxWidth: '400px' }}>

          {/* Heading */}
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{
              fontSize: '28px', fontWeight: '800',
              color: '#0F172A', marginBottom: '8px',
              letterSpacing: '-0.5px',
            }}>
              Sign in to your account
            </h1>
            <p style={{ fontSize: '14px', color: '#64748B' }}>
              Don't have an account?{' '}
              <Link href="/register" style={{ color: '#4F46E5', fontWeight: '600', textDecoration: 'none' }}>
                Join here
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

          {/* Form */}
          <form onSubmit={handleSubmit}>

            {/* Email */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block', fontSize: '13px',
                fontWeight: '600', color: '#374151',
                marginBottom: '8px',
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
                  placeholder="alex@email.com"
                  style={{
                    width: '100%', border: '1.5px solid #E5E7EB',
                    borderRadius: '12px', padding: '12px 14px 12px 40px',
                    fontSize: '14px', color: '#111827',
                    background: '#F9FAFB', boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4F46E5'}
                  onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                />
              </div>
            </div>

            {/* Password */}
            <div style={{ marginBottom: '24px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>
                  Password
                </label>
                <span style={{ fontSize: '12px', color: '#4F46E5', cursor: 'pointer', fontWeight: '500' }}>
                  Forgot Password?
                </span>
              </div>
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
                  placeholder="Enter your password"
                  style={{
                    width: '100%', border: '1.5px solid #E5E7EB',
                    borderRadius: '12px', padding: '12px 40px 12px 40px',
                    fontSize: '14px', color: '#111827',
                    background: '#F9FAFB', boxSizing: 'border-box',
                    transition: 'border-color 0.2s',
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

            {/* Login button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                background: loading ? '#818CF8' : '#4F46E5',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                padding: '14px',
                fontSize: '14px',
                fontWeight: '700',
                cursor: loading ? 'not-allowed' : 'pointer',
                marginBottom: '16px',
                transition: 'background 0.2s',
                letterSpacing: '0.3px',
              }}
            >
              {loading ? 'Signing in...' : 'Login Now'}
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

            {/* Signup button */}
            <Link
              href="/register"
              style={{
                display: 'block', width: '100%',
                border: '2px solid #4F46E5',
                color: '#4F46E5', borderRadius: '12px',
                padding: '13px', fontSize: '14px',
                fontWeight: '700', textAlign: 'center',
                textDecoration: 'none', boxSizing: 'border-box',
                transition: 'background 0.2s',
              }}
            >
              Signup Now
            </Link>
          </form>

          {/* Terms */}
          <p style={{
            fontSize: '12px', color: '#94A3B8',
            marginTop: '28px', lineHeight: '1.6',
          }}>
            By signing in, you agree to our{' '}
            <span style={{ color: '#4F46E5', cursor: 'pointer' }}>Terms of Service</span>
            {' '}and{' '}
            <span style={{ color: '#4F46E5', cursor: 'pointer' }}>Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
}