'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, Wrench, ShoppingBag, ArrowRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80',
    icon: Building2,
    title: 'Find Verified Housing',
    desc: 'Browse hostels and apartments inspected and verified near your campus.',
    buttonText: 'Continue',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80',
    icon: Wrench,
    title: 'Discover Trusted Services',
    desc: 'From laptop repair to tutoring — hire reviewed student-friendly pros.',
    buttonText: 'Continue',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800&q=80',
    icon: ShoppingBag,
    title: 'Buy & Sell On Campus',
    desc: 'A marketplace built for your community. Verified sellers, fair prices.',
    buttonText: 'Get Started',
  },
];

export default function OnboardingPage() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);

  const handleNext = () => {
    if (current < slides.length - 1) {
      setCurrent(current + 1);
    } else {
      router.push('/welcome');
    }
  };

  const handleSkip = () => {
    router.push('/welcome');
  };

  const slide = slides[current];

  return (
    <div style={{
      minHeight: '100vh',
      background: 'white',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'Inter, sans-serif',
    }}>

      {/* Top bar */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 24px 0',
        position: 'absolute',
        top: 0, left: 0, right: 0,
        zIndex: 10,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            width: '32px', height: '32px',
            background: 'rgba(255,255,255,0.2)',
            borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            backdropFilter: 'blur(10px)',
          }}>
            <span style={{ color: 'white', fontWeight: '800', fontSize: '14px' }}>U</span>
          </div>
          <span style={{ fontWeight: '800', fontSize: '16px', color: 'white' }}>
            UniVerse
          </span>
        </div>
        <button
          onClick={handleSkip}
          style={{
            background: 'rgba(255,255,255,0.2)',
            border: 'none', borderRadius: '20px',
            padding: '6px 16px', color: 'white',
            fontSize: '13px', fontWeight: '600',
            cursor: 'pointer', backdropFilter: 'blur(10px)',
          }}
        >
          Skip
        </button>
      </div>

      {/* Image area */}
      <div style={{
        height: '55vh',
        position: 'relative',
        overflow: 'hidden',
        flexShrink: 0,
      }}>
        <img
          src={slide.image}
          alt={slide.title}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover',
            transition: 'opacity 0.3s ease',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(160deg, rgba(55,48,163,0.7) 0%, rgba(79,70,229,0.5) 50%, rgba(124,58,237,0.3) 100%)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '24px', left: '24px',
          width: '52px', height: '52px',
          background: 'white', borderRadius: '16px',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        }}>
          <slide.icon size={24} color="#4F46E5" />
        </div>
      </div>

      {/* Content */}
      <div style={{
        flex: 1,
        padding: '32px 24px 40px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: 'white',
      }}>
        <div>
          <h2 style={{
            fontSize: '28px', fontWeight: '800',
            color: '#0F172A', lineHeight: '1.2',
            letterSpacing: '-0.5px', marginBottom: '12px',
          }}>
            {slide.title}
          </h2>
          <p style={{
            fontSize: '15px', color: '#64748B',
            lineHeight: '1.6',
          }}>
            {slide.desc}
          </p>
        </div>

        <div>
          {/* Dots */}
          <div style={{ display: 'flex', gap: '6px', marginBottom: '24px' }}>
            {slides.map((_, i) => (
              <div
                key={i}
                style={{
                  height: '4px', borderRadius: '2px',
                  background: i === current ? '#4F46E5' : '#E2E8F0',
                  width: i === current ? '24px' : '8px',
                  transition: 'all 0.3s ease',
                }}
              />
            ))}
          </div>

          {/* Button */}
          <button
            onClick={handleNext}
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              color: 'white', border: 'none',
              borderRadius: '18px', padding: '18px',
              fontSize: '16px', fontWeight: '700',
              cursor: 'pointer',
              display: 'flex', alignItems: 'center',
              justifyContent: 'center', gap: '8px',
              boxShadow: '0 8px 24px rgba(79,70,229,0.3)',
            }}
          >
            {slide.buttonText}
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}