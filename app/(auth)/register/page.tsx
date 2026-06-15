'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { useAuthStore } from '@/store/authStore';
import Link from 'next/link';
import { Mail, Lock, User, Phone, Eye, EyeOff, Building2, Wrench, ShoppingBag, CheckCircle } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const { setAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', password: '', phone: '', role: 'BUYER',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
    { value: 'BUYER', icon: '🎓', label: 'Student', desc: 'Browse and purchase services' },
    { value: 'SELLER', icon: '🏪', label: 'Provider', desc: 'Offer services or products' },
    { value: 'UNIVERSAL', icon: '⚡', label: 'Both', desc: 'Buy and sell on UniVerse' },
  ];

  return (
    <div style={{
      minHeight: '100vh', background: '#F8FAFC',
      display: 'flex', fontFamily: 'Inter, sans-serif',
    }}>
      {/* Left panel */}
      <div style={{
        width: '460px', flexShrink: 0,
        background: 'linear-gradient(160deg, #1E3A8A 0%, #6D28D9 100%)',
        padding: '48px 40px',
        display: 'flex', flexDirection: 'column',
        position: 'relative', overflow: 'hidden',
      }}
        className="hidden lg:flex"
      >
        <div style={{
          position: 'absolute', top: '-80px', right: '-80px',
          width: '300px', height: '300px',
          background: 'rgba(255,255,255,0.05)', borderRadius: '50%',
        }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '48px', position: 'relative' }}>
          <div style={{
            width: '36px', height: '36px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontWeight: '800', fontSize: '18px' }}>U</span>
          </div>
          <span style={{ fontWeight: '800', fontSize: '20px', color: 'white' }}>UniVerse</span>
        </div>

        <div style={{ position: 'relative', flex: 1 }}>
          <h2 style={{
            fontSize: '36px', fontWeight: '800',
            color: 'white', lineHeight: '1.2',
            letterSpacing: '-0.5px', marginBottom: '16px',
          }}>
            Let's build your future in UniVerse
          </h2>
          <p style={{ fontSize: '15px', color: 'rgba(255,255,255,0.6)', lineHeight: '1.6', marginBottom: '40px' }}>
            Select the primary category for your account. This helps us customize your dashboard and experience.
          </p>

          {/* Feature highlights */}
          {[
            { icon: Building2, title: 'Find Verified Housing', desc: 'GIS-verified hostels and apartments near campus' },
            { icon: Wrench, title: 'Hire Trusted Providers', desc: 'Vetted service providers for all campus needs' },
            { icon: ShoppingBag, title: 'Campus Marketplace', desc: 'Buy and sell within your university community' },
          ].map((feature) => (
            <div key={feature.title} style={{
              display: 'flex', alignItems: 'flex-start', gap: '14px',
              marginBottom: '20px',
            }}>
              <div style={{
                width: '36px', height: '36px',
                background: 'rgba(255,255,255,0.15)',
                borderRadius: '10px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <feature.icon size={18} color="white" />
              </div>
              <div>
                <p style={{ fontWeight: '700', fontSize: '14px', color: 'white', marginBottom: '2px' }}>
                  {feature.title}
                </p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                  {feature.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust note */}
        <div style={{
          background: 'rgba(255,255,255,0.1)',
          border: '1px solid rgba(255,255,255,0.15)',
          borderRadius: '12px', padding: '16px',
          position: 'relative',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
            <CheckCircle size={16} color="#10B981" />
            <p style={{ fontWeight: '700', fontSize: '13px', color: 'white' }}>Trust is our Priority</p>
          </div>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.5)', lineHeight: '1.5' }}>
            All sellers undergo a 48-hour identity verification process to ensure safety and integrity.
          </p>
        </div>
      </div>

      {/* Right panel */}
      <div style={{
        flex: 1, display: 'flex',
        alignItems: 'center', justifyContent: 'center',
        padding: '48px 40px', overflowY: 'auto',
      }}>
        <div style={{ width: '100%', maxWidth: '480px' }}>

          {/* Progress steps */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginBottom: '32px' }}>
            {[
              { num: 1, label: 'Choose Path' },
              { num: 2, label: 'Profile Info' },
              { num: 3, label: 'Verification' },
              { num: 4, label: 'Review' },
            ].map((step, i) => (
              <div key={step.num} style={{ display: 'flex', alignItems: 'center', flex: i < 3 ? 1 : 0 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <div style={{
                    width: '32px', height: '32px',
                    background: step.num === 1 ? '#1E3A8A' : '#E2E8F0',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '13px', fontWeight: '700',
                    color: step.num === 1 ? 'white' : '#94A3B8',
                  }}>
                    {step.num}
                  </div>
                  <p style={{
                    fontSize: '10px', fontWeight: '600',
                    color: step.num === 1 ? '#1E3A8A' : '#94A3B8',
                    marginTop: '4px', whiteSpace: 'nowrap',
                  }}>
                    {step.label}
                  </p>
                </div>
                {i < 3 && (
                  <div style={{
                    flex: 1, height: '2px',
                    background: step.num === 1 ? '#1E3A8A' : '#E2E8F0',
                    margin: '0 8px', marginTop: '-14px',
                  }} />
                )}
              </div>
            ))}
          </div>

          <h1 style={{ fontSize: '24px', fontWeight: '800', color: '#0F172A', marginBottom: '6px', textAlign: 'center' }}>
            Create your account
          </h1>
          <p style={{ fontSize: '14px', color: '#64748B', marginBottom: '24px', textAlign: 'center' }}>
            Already have an account?{' '}
            <Link href="/login" style={{ color: '#1E3A8A', fontWeight: '700' }}>Sign in</Link>
          </p>

          {error && (
            <div style={{
              background: '#FEF2F2', border: '1px solid #FEE2E2',
              color: '#DC2626', padding: '12px 14px',
              borderRadius: '10px', marginBottom: '20px', fontSize: '13px',
            }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            {/* Role selector */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '10px' }}>
                I want to join as
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                {roles.map((role) => (
                  <button
                    key={role.value}
                    type="button"
                    onClick={() => setForm({ ...form, role: role.value })}
                    style={{
                      border: form.role === role.value ? '2px solid #1E3A8A' : '1.5px solid #E5E7EB',
                      borderRadius: '12px', padding: '14px 8px',
                      background: form.role === role.value ? '#EFF6FF' : '#F9FAFB',
                      cursor: 'pointer', textAlign: 'center',
                      transition: 'all 0.2s',
                    }}
                  >
                    <div style={{ fontSize: '24px', marginBottom: '6px' }}>{role.icon}</div>
                    <p style={{ fontWeight: '700', fontSize: '12px', color: form.role === role.value ? '#1E3A8A' : '#374151', marginBottom: '2px' }}>
                      {role.label}
                    </p>
                    <p style={{ fontSize: '10px', color: '#94A3B8', lineHeight: '1.3' }}>{role.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Fields */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                  Full Name
                </label>
                <div style={{ position: 'relative' }}>
                  <User size={14} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="text" name="name" value={form.name}
                    onChange={handleChange} required placeholder="John Doe"
                    style={{
                      width: '100%', border: '1.5px solid #E5E7EB',
                      borderRadius: '10px', padding: '10px 12px 10px 36px',
                      fontSize: '13px', background: '#F9FAFB',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1E3A8A'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                  Phone <span style={{ color: '#94A3B8', fontWeight: '400' }}>(optional)</span>
                </label>
                <div style={{ position: 'relative' }}>
                  <Phone size={14} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="tel" name="phone" value={form.phone}
                    onChange={handleChange} placeholder="+234 800 000 0000"
                    style={{
                      width: '100%', border: '1.5px solid #E5E7EB',
                      borderRadius: '10px', padding: '10px 12px 10px 36px',
                      fontSize: '13px', background: '#F9FAFB',
                      boxSizing: 'border-box',
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1E3A8A'}
                    onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                  />
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                University Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={14} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email" name="email" value={form.email}
                  onChange={handleChange} required placeholder="student@university.edu"
                  style={{
                    width: '100%', border: '1.5px solid #E5E7EB',
                    borderRadius: '10px', padding: '10px 12px 10px 36px',
                    fontSize: '13px', background: '#F9FAFB',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1E3A8A'}
                  onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                />
              </div>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={14} color="#9CA3AF" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password" value={form.password}
                  onChange={handleChange} required placeholder="Create a strong password"
                  style={{
                    width: '100%', border: '1.5px solid #E5E7EB',
                    borderRadius: '10px', padding: '10px 36px',
                    fontSize: '13px', background: '#F9FAFB',
                    boxSizing: 'border-box',
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#1E3A8A'}
                  onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{
                  position: 'absolute', right: '12px', top: '50%',
                  transform: 'translateY(-50%)', background: 'none',
                  border: 'none', cursor: 'pointer', color: '#9CA3AF',
                  display: 'flex', alignItems: 'center',
                }}>
                  {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading} style={{
              width: '100%', background: '#1E3A8A',
              color: 'white', border: 'none',
              borderRadius: '12px', padding: '14px',
              fontSize: '14px', fontWeight: '700',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1, marginBottom: '16px',
            }}>
              {loading ? 'Creating account...' : 'Continue Setup →'}
            </button>

            <p style={{ textAlign: 'center', fontSize: '12px', color: '#94A3B8' }}>
              By continuing you agree to our{' '}
              <span style={{ color: '#1E3A8A', cursor: 'pointer' }}>Terms</span> &{' '}
              <span style={{ color: '#1E3A8A', cursor: 'pointer' }}>Privacy</span>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}