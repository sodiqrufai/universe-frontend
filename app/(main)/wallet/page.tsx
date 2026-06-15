'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Wallet, Lock, TrendingUp, ArrowUpRight, Shield, Download } from 'lucide-react';

interface WalletData {
  balance: number;
  locked_balance: number;
}

export default function WalletPage() {
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWallet();
  }, []);

  const fetchWallet = async () => {
    try {
      const res = await api.get('/payments/wallet');
      setWallet(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div style={{ textAlign: 'center', padding: '60px', color: '#94A3B8' }}>
      Loading wallet...
    </div>
  );

  const total = (wallet?.balance ?? 0) + (wallet?.locked_balance ?? 0);

  const recentActivity = [
    { entity: 'Logo Design Service', activity: 'Payment Received', date: 'Jun 14, 2026', amount: '₦4,500', status: 'PAID' },
    { entity: 'Math Tutoring', activity: 'Escrow Held', date: 'Jun 13, 2026', amount: '₦2,000', status: 'HELD' },
    { entity: 'Web Development', activity: 'Payment Released', date: 'Jun 12, 2026', amount: '₦13,500', status: 'RELEASED' },
  ];

  return (
    <div style={{ maxWidth: '1000px' }}>

      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#0F172A', marginBottom: '4px' }}>
          Overview Analytics
        </h1>
        <p style={{ fontSize: '14px', color: '#64748B' }}>
          Real-time performance metrics for your academic marketplace portfolio.
        </p>
      </div>

      {/* Stats cards */}
      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '16px', marginBottom: '24px',
      }}>
        {[
          { icon: Wallet, label: 'TOTAL EARNINGS', value: `₦${total.toLocaleString()}`, change: '+12%', color: '#1E3A8A', bg: '#EFF6FF' },
          { icon: TrendingUp, label: 'AVAILABLE BALANCE', value: `₦${(wallet?.balance ?? 0).toLocaleString()}`, change: 'Stable', color: '#10B981', bg: '#F0FDF4' },
          { icon: Lock, label: 'IN ESCROW', value: `₦${(wallet?.locked_balance ?? 0).toLocaleString()}`, change: '+4.5%', color: '#6D28D9', bg: '#F5F3FF' },
          { icon: ArrowUpRight, label: 'PENDING PAYOUTS', value: '₦0', change: 'HOT', color: '#F59E0B', bg: '#FFFBEB' },
        ].map((stat) => (
          <div key={stat.label} style={{
            background: 'white', borderRadius: '14px',
            padding: '20px', border: '1px solid #E2E8F0',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{
                width: '32px', height: '32px',
                background: stat.bg, borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <stat.icon size={16} color={stat.color} />
              </div>
              <span style={{
                fontSize: '11px', fontWeight: '700',
                color: stat.change.includes('+') ? '#10B981' : '#94A3B8',
                background: stat.change.includes('+') ? '#F0FDF4' : '#F8FAFC',
                padding: '2px 8px', borderRadius: '20px',
              }}>
                {stat.change}
              </span>
            </div>
            <p style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600', marginBottom: '4px', letterSpacing: '0.3px' }}>
              {stat.label}
            </p>
            <p style={{ fontSize: '22px', fontWeight: '800', color: '#0F172A' }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>

        {/* Withdraw card */}
        <div style={{
          background: 'linear-gradient(135deg, #1E3A8A 0%, #6D28D9 100%)',
          borderRadius: '16px', padding: '24px',
          color: 'white',
        }}>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', marginBottom: '8px' }}>
            Available to Withdraw
          </p>
          <p style={{ fontSize: '40px', fontWeight: '800', letterSpacing: '-1px', marginBottom: '20px' }}>
            ₦{(wallet?.balance ?? 0).toLocaleString()}
          </p>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: 'white', color: '#1E3A8A',
            border: 'none', borderRadius: '10px',
            padding: '12px 20px', fontSize: '14px',
            fontWeight: '700', cursor: 'pointer', width: '100%',
            justifyContent: 'center',
          }}>
            <ArrowUpRight size={18} />
            Withdraw Funds
          </button>
        </div>

        {/* Escrow info */}
        <div style={{
          background: 'white', borderRadius: '16px',
          padding: '24px', border: '1px solid #E2E8F0',
          boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <Shield size={20} color="#1E3A8A" />
            <p style={{ fontWeight: '700', fontSize: '15px', color: '#0F172A' }}>
              How Escrow Works
            </p>
          </div>
          {[
            '1. Buyer pays via Paystack',
            '2. Funds locked in escrow',
            '3. You deliver the work',
            '4. Buyer confirms delivery',
            '5. 90% released to your wallet',
          ].map((step) => (
            <div key={step} style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              padding: '6px 0', borderBottom: '1px solid #F8FAFC',
            }}>
              <div style={{
                width: '6px', height: '6px',
                background: '#1E3A8A', borderRadius: '50%', flexShrink: 0,
              }} />
              <p style={{ fontSize: '13px', color: '#64748B' }}>{step}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div style={{
        background: 'white', borderRadius: '16px',
        border: '1px solid #E2E8F0',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        marginTop: '24px', overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'center', padding: '16px 20px',
          borderBottom: '1px solid #F1F5F9',
        }}>
          <p style={{ fontWeight: '700', fontSize: '15px', color: '#0F172A' }}>
            Recent Activity
          </p>
          <button style={{
            display: 'flex', alignItems: 'center', gap: '6px',
            background: 'none', border: 'none', cursor: 'pointer',
            fontSize: '13px', fontWeight: '600', color: '#1E3A8A',
          }}>
            <Download size={14} /> Download Report
          </button>
        </div>

        {/* Table header */}
        <div style={{
          display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr',
          padding: '10px 20px', background: '#F8FAFC',
          borderBottom: '1px solid #E2E8F0',
        }}>
          {['ENTITY', 'ACTIVITY', 'DATE', 'AMOUNT', 'STATUS'].map((h) => (
            <p key={h} style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8' }}>
              {h}
            </p>
          ))}
        </div>

        {recentActivity.map((item, i) => (
          <div key={i} style={{
            display: 'grid', gridTemplateColumns: '2fr 2fr 1fr 1fr 1fr',
            padding: '14px 20px', alignItems: 'center',
            borderBottom: i < recentActivity.length - 1 ? '1px solid #F8FAFC' : 'none',
          }}>
            <p style={{ fontWeight: '600', fontSize: '13px', color: '#0F172A' }}>{item.entity}</p>
            <p style={{ fontSize: '13px', color: '#64748B' }}>{item.activity}</p>
            <p style={{ fontSize: '12px', color: '#94A3B8' }}>{item.date}</p>
            <p style={{ fontWeight: '700', fontSize: '13px', color: '#1E3A8A' }}>{item.amount}</p>
            <span style={{
              fontSize: '11px', fontWeight: '700',
              color: item.status === 'PAID' ? '#10B981' : item.status === 'HELD' ? '#D97706' : '#6D28D9',
              background: item.status === 'PAID' ? '#F0FDF4' : item.status === 'HELD' ? '#FFFBEB' : '#F5F3FF',
              padding: '3px 10px', borderRadius: '20px',
              width: 'fit-content',
            }}>
              {item.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}