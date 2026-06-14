'use client';

import { useRouter } from 'next/navigation';
import { Building2, Wrench, ShoppingBag, Shield } from 'lucide-react';

export default function WelcomePage() {
  const router = useRouter();

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(160deg, #3730A3 0%, #4F46E5 50%, #7C3AED 100%)',
      display: 'flex',
      flexDirection: 'column',
      padding: '48px 24px 40px',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
    }}>

      {/* Background circles */}
      <div style={{
        position: 'absolute', top: '-100px', right: '-100px',
        width: '300px', height: '300px',
        background: 'rgba(255,255,255,0.05)',
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', bottom: '100px', left: '-80px',
        width: '200px', height: '200px',
        background: 'rgba(255,255,255,0.03)',
        borderRadius: '50%',
      }} />

      {/* Logo */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        marginBottom: '48px', position: 'relative',
      }}>
        <div style={{
          width: '40px', height: '40px',
          background: 'rgba(255,255,255,0.15)',
          borderRadius: '12px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          border: '1px solid rgba(255,255,255,0.2)',
        }}>
          <span style={{ color: 'white', fontWeight: '800', fontSize: '18px' }}>U</span>
        </div>
        <span style={{ fontWeight: '800', fontSize: '20px', color: 'white' }}>
          UniVerse
        </span>
      </div>

      {/* Verified badge */}
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        background: 'rgba(255,255,255,0.1)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '20px', padding: '6px 14px',
        marginBottom: '24px', width: 'fit-content',
        position: 'relative',
      }}>
        <Shield size={14} color="rgba(255,255,255,0.8)" />
        <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', fontWeight: '600' }}>
          Verified for students
        </span>
      </div>

      {/* Headline */}
      <h1 style={{
        fontSize: '38px', fontWeight: '800',
        color: 'white', lineHeight: '1.15',
        letterSpacing: '-1px', marginBottom: '16px',
        position: 'relative',
      }}>
        Your campus,
        <br />all in one place.
      </h1>

      <p style={{
        fontSize: '15px', color: 'rgba(255,255,255,0.6)',
        lineHeight: '1.6', marginBottom: '40px',
        position: 'relative',
      }}>
        Housing, services and a student marketplace — designed for university life.
      </p>

      {/* Category pills */}
      <div style={{
        display: 'flex', gap: '10px',
        marginBottom: '48px', position: 'relative',
        flexWrap: 'wrap',
      }}>
        {[
          { icon: Building2, label: 'Housing' },
          { icon: Wrench, label: 'Services' },
          { icon: ShoppingBag, label: 'Market' },
        ].map((item) => (
          <div key={item.label} style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '14px', padding: '10px 14px',
          }}>
            <item.icon size={18} color="white" />
            <span style={{ color: 'white', fontSize: '13px', fontWeight: '600' }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Buttons */}
      <div style={{
        display: 'flex', flexDirection: 'column',
        gap: '12px', position: 'relative',
      }}>
        <button
          onClick={() => router.push('/register')}
          style={{
            width: '100%', background: 'white',
            color: '#4F46E5', border: 'none',
            borderRadius: '18px', padding: '18px',
            fontSize: '16px', fontWeight: '700',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
          }}
        >
          Get Started
        </button>

        <button
          onClick={() => router.push('/login')}
          style={{
            width: '100%',
            background: 'rgba(255,255,255,0.1)',
            border: '1px solid rgba(255,255,255,0.2)',
            color: 'white', borderRadius: '18px',
            padding: '18px', fontSize: '16px',
            fontWeight: '600', cursor: 'pointer',
          }}
        >
          I already have an account
        </button>

        <p style={{
          textAlign: 'center', fontSize: '11px',
          color: 'rgba(255,255,255,0.3)', marginTop: '8px',
        }}>
          By continuing you agree to our Terms & Privacy
        </p>
      </div>
    </div>
  );
}