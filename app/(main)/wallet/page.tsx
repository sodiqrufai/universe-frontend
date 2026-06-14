'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Wallet, Lock, TrendingUp, ArrowUpRight, Shield } from 'lucide-react';

interface WalletData {
  id: string;
  user_id: string;
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
    setLoading(true);
    try {
      const res = await api.get('/payments/wallet');
      setWallet(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0', color: '#94A3B8' }}>
        Loading wallet...
      </div>
    );
  }

  const total = (wallet?.balance ?? 0) + (wallet?.locked_balance ?? 0);

  return (
    <div style={{ background: '#F8FAFC', minHeight: '100vh' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(160deg, #3730A3 0%, #4F46E5 60%, #7C3AED 100%)',
        padding: '24px 20px 60px',
      }}>
        <h1 style={{
          color: 'white', fontWeight: '800',
          fontSize: '22px', letterSpacing: '-0.5px',
          marginBottom: '4px',
        }}>
          My Wallet
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '13px' }}>
          Manage your earnings and balance
        </p>
      </div>

      {/* Main balance card */}
      <div style={{ padding: '0 16px', marginTop: '-40px', position: 'relative', zIndex: 10 }}>
        <div style={{
          background: 'white',
          borderRadius: '24px',
          padding: '24px',
          boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
          marginBottom: '16px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              width: '40px', height: '40px',
              background: '#EEF2FF', borderRadius: '12px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Wallet size={20} color="#4F46E5" />
            </div>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#64748B' }}>
              Available Balance
            </span>
          </div>

          <p style={{
            fontSize: '42px', fontWeight: '800',
            color: '#0F172A', letterSpacing: '-2px',
            marginBottom: '4px',
          }}>
            ₦{wallet?.balance.toLocaleString() ?? '0'}
          </p>
          <p style={{ fontSize: '13px', color: '#94A3B8' }}>
            Ready to withdraw
          </p>

          <button style={{
            marginTop: '20px',
            width: '100%',
            background: '#4F46E5',
            color: 'white', border: 'none',
            borderRadius: '14px', padding: '14px',
            fontSize: '14px', fontWeight: '700',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center',
            justifyContent: 'center', gap: '8px',
          }}>
            <ArrowUpRight size={18} />
            Withdraw Funds
          </button>
        </div>

        {/* Stats row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '16px' }}>
          {/* Locked */}
          <div style={{
            background: 'white', borderRadius: '20px',
            padding: '18px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}>
            <div style={{
              width: '36px', height: '36px',
              background: '#FFF7ED', borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '12px',
            }}>
              <Lock size={18} color="#EA580C" />
            </div>
            <p style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '4px', fontWeight: '600' }}>
              IN ESCROW
            </p>
            <p style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A' }}>
              ₦{wallet?.locked_balance.toLocaleString() ?? '0'}
            </p>
          </div>

          {/* Total */}
          <div style={{
            background: 'white', borderRadius: '20px',
            padding: '18px',
            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
          }}>
            <div style={{
              width: '36px', height: '36px',
              background: '#F0FDF4', borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginBottom: '12px',
            }}>
              <TrendingUp size={18} color="#16A34A" />
            </div>
            <p style={{ fontSize: '11px', color: '#94A3B8', marginBottom: '4px', fontWeight: '600' }}>
              TOTAL EARNED
            </p>
            <p style={{ fontSize: '20px', fontWeight: '800', color: '#0F172A' }}>
              ₦{total.toLocaleString()}
            </p>
          </div>
        </div>

        {/* How escrow works */}
        <div style={{
          background: 'white', borderRadius: '20px',
          padding: '20px',
          boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
            <div style={{
              width: '36px', height: '36px',
              background: '#EEF2FF', borderRadius: '10px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <Shield size={18} color="#4F46E5" />
            </div>
            <p style={{ fontWeight: '700', fontSize: '14px', color: '#0F172A' }}>
              How Escrow Works
            </p>
          </div>

          {[
            { step: '1', text: 'Buyer places order and pays' },
            { step: '2', text: 'Money locked in escrow safely' },
            { step: '3', text: 'You deliver the work or product' },
            { step: '4', text: 'Buyer confirms delivery' },
            { step: '5', text: 'Money released to your wallet (90%)' },
          ].map((item) => (
            <div key={item.step} style={{
              display: 'flex', alignItems: 'center',
              gap: '12px', marginBottom: '12px',
            }}>
              <div style={{
                width: '24px', height: '24px',
                background: '#EEF2FF', borderRadius: '50%',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '11px', fontWeight: '800', color: '#4F46E5' }}>
                  {item.step}
                </span>
              </div>
              <p style={{ fontSize: '13px', color: '#64748B' }}>{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}