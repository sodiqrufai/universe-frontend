'use client';

import { useState } from 'react';
import {
  Search, Send, Paperclip, Phone,
  Video, Info, MoreHorizontal, Check,
} from 'lucide-react';

const conversations = [
  {
    id: 1, name: 'Sarah J.', role: 'Property Manager',
    lastMessage: 'That time works perfectly for me. See you...', time: '10:42 AM',
    unread: true, tag: 'INSPECTION SCHEDULED', tagColor: '#10B981', tagBg: '#F0FDF4',
    category: 'Housing', avatar: 'SJ',
  },
  {
    id: 2, name: 'Marcus Blue', role: 'Student',
    lastMessage: 'Is the price negotiable? I can pick it up...', time: 'Yesterday',
    unread: false, tag: 'OFFER RECEIVED', tagColor: '#D97706', tagBg: '#FFFBEB',
    category: 'Marketplace', avatar: 'MB',
  },
  {
    id: 3, name: 'Campus Tech Support', role: 'Support',
    lastMessage: 'Ticket #282 has been resolved. Please c...', time: 'Tue',
    unread: false, tag: 'RESOLVED', tagColor: '#10B981', tagBg: '#F0FDF4',
    category: 'Services', avatar: 'CT',
  },
];

const messages = [
  { id: 1, sender: 'Sarah J.', content: "Hello! I'm Sarah, the property manager for UniVerse Housing. I received your request for an inspection of Apartment 4B. Would this Thursday at 2:00 PM work for you?", time: '10:30 AM', isMe: false },
  { id: 2, sender: 'Me', content: "Hi Sarah! Thanks for getting back to me. Thursday at 2:00 PM works perfectly. Should I bring the printed application form or can I submit it digitally?", time: '10:35 AM', isMe: true },
  { id: 3, sender: 'Sarah J.', content: "Digital is preferred! I've attached the latest inspection checklist for you to review beforehand so you know what we'll be looking at.", time: '10:38 AM', isMe: false, attachment: 'Inspection_Checklist_4B.pdf' },
];

export default function MessagesPage() {
  const [activeConversation, setActiveConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [filter, setFilter] = useState('All');

  return (
    <div style={{
      maxWidth: '1200px', height: 'calc(100vh - 120px)',
      display: 'flex', gap: '0',
      background: 'white', borderRadius: '16px',
      border: '1px solid #E2E8F0',
      overflow: 'hidden',
      boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
    }}>

      {/* Left sidebar - conversations */}
      <div style={{
        width: '300px', flexShrink: 0,
        borderRight: '1px solid #E2E8F0',
        display: 'flex', flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{ padding: '16px', borderBottom: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <h2 style={{ fontWeight: '800', fontSize: '16px', color: '#0F172A' }}>Messages</h2>
            <button style={{
              width: '28px', height: '28px',
              background: '#EFF6FF', border: 'none',
              borderRadius: '8px', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <MoreHorizontal size={14} color="#1E3A8A" />
            </button>
          </div>

          {/* Search */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            background: '#F8FAFC', border: '1px solid #E2E8F0',
            borderRadius: '8px', padding: '8px 12px',
          }}>
            <Search size={13} color="#94A3B8" />
            <input
              placeholder="Search messages..."
              style={{ border: 'none', background: 'none', fontSize: '13px', flex: 1 }}
            />
          </div>
        </div>

        {/* Filter tabs */}
        <div style={{
          display: 'flex', padding: '8px 12px',
          gap: '4px', borderBottom: '1px solid #E2E8F0',
        }}>
          {['All', 'Housing', 'Marketplace', 'Services'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilter(tab)}
              style={{
                padding: '4px 10px', border: 'none',
                borderRadius: '6px', fontSize: '11px',
                fontWeight: filter === tab ? '700' : '500',
                background: filter === tab ? '#EFF6FF' : 'transparent',
                color: filter === tab ? '#1E3A8A' : '#64748B',
                cursor: 'pointer',
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Conversation list */}
        <div style={{ flex: 1, overflowY: 'auto' }}>
          {conversations.map((conv) => (
            <div
              key={conv.id}
              onClick={() => setActiveConversation(conv)}
              style={{
                padding: '14px 16px',
                borderBottom: '1px solid #F8FAFC',
                cursor: 'pointer',
                background: activeConversation.id === conv.id ? '#F8FAFC' : 'transparent',
                borderLeft: activeConversation.id === conv.id ? '3px solid #1E3A8A' : '3px solid transparent',
              }}
            >
              <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                <div style={{
                  width: '40px', height: '40px',
                  background: 'linear-gradient(135deg, #1E3A8A, #6D28D9)',
                  borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative',
                }}>
                  <span style={{ color: 'white', fontWeight: '700', fontSize: '13px' }}>{conv.avatar}</span>
                  <div style={{
                    position: 'absolute', bottom: '1px', right: '1px',
                    width: '10px', height: '10px',
                    background: '#10B981', borderRadius: '50%',
                    border: '2px solid white',
                  }} />
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2px' }}>
                    <p style={{ fontWeight: '700', fontSize: '13px', color: '#0F172A' }}>{conv.name}</p>
                    <p style={{ fontSize: '11px', color: '#94A3B8' }}>{conv.time}</p>
                  </div>
                  <p style={{
                    fontSize: '12px', color: conv.unread ? '#374151' : '#94A3B8',
                    fontWeight: conv.unread ? '600' : '400',
                    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
                    marginBottom: '6px',
                  }}>
                    {conv.lastMessage}
                  </p>
                  <span style={{
                    fontSize: '10px', fontWeight: '700',
                    color: conv.tagColor, background: conv.tagBg,
                    padding: '2px 8px', borderRadius: '20px',
                  }}>
                    {conv.tag}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main chat area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>

        {/* Chat header */}
        <div style={{
          padding: '14px 20px',
          borderBottom: '1px solid #E2E8F0',
          display: 'flex', alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px', height: '40px',
              background: 'linear-gradient(135deg, #1E3A8A, #6D28D9)',
              borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: 'white', fontWeight: '700', fontSize: '14px' }}>
                {activeConversation.avatar}
              </span>
            </div>
            <div>
              <p style={{ fontWeight: '700', fontSize: '14px', color: '#0F172A' }}>
                {activeConversation.name}
              </p>
              <p style={{ fontSize: '12px', color: '#10B981' }}>
                {activeConversation.role} · Active now
              </p>
            </div>
          </div>

          {/* Topic tag */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              background: '#F8FAFC', border: '1px solid #E2E8F0',
              borderRadius: '8px', padding: '6px 12px',
            }}>
              <span style={{ fontSize: '12px' }}>🏠</span>
              <span style={{ fontSize: '12px', fontWeight: '600', color: '#374151' }}>
                Apartment 4B Inspection
              </span>
              <span style={{
                fontSize: '10px', fontWeight: '700',
                color: '#10B981', background: '#F0FDF4',
                padding: '2px 8px', borderRadius: '20px',
              }}>
                SCHEDULED: OCT 24, 2:00 PM
              </span>
            </div>
            <div style={{ display: 'flex', gap: '6px' }}>
              {[Phone, Video, Info].map((Icon, i) => (
                <button key={i} style={{
                  width: '32px', height: '32px',
                  background: '#F8FAFC', border: '1px solid #E2E8F0',
                  borderRadius: '8px', cursor: 'pointer',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <Icon size={14} color="#64748B" />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: 'auto',
          padding: '20px', display: 'flex',
          flexDirection: 'column', gap: '16px',
          background: '#FAFAFA',
        }}>
          {/* Date divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
            <span style={{ fontSize: '11px', color: '#94A3B8', fontWeight: '600' }}>Monday, Oct 21</span>
            <div style={{ flex: 1, height: '1px', background: '#E2E8F0' }} />
          </div>

          {messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                display: 'flex',
                justifyContent: msg.isMe ? 'flex-end' : 'flex-start',
                gap: '10px', alignItems: 'flex-end',
              }}
            >
              {!msg.isMe && (
                <div style={{
                  width: '32px', height: '32px',
                  background: 'linear-gradient(135deg, #1E3A8A, #6D28D9)',
                  borderRadius: '50%', flexShrink: 0,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span style={{ color: 'white', fontWeight: '700', fontSize: '11px' }}>
                    {activeConversation.avatar}
                  </span>
                </div>
              )}

              <div style={{ maxWidth: '60%' }}>
                <div style={{
                  background: msg.isMe ? '#1E3A8A' : 'white',
                  color: msg.isMe ? 'white' : '#0F172A',
                  borderRadius: msg.isMe ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                  padding: '12px 16px',
                  border: msg.isMe ? 'none' : '1px solid #E2E8F0',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
                }}>
                  <p style={{ fontSize: '14px', lineHeight: '1.5' }}>{msg.content}</p>
                  {msg.attachment && (
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '8px',
                      marginTop: '10px', padding: '8px 12px',
                      background: msg.isMe ? 'rgba(255,255,255,0.15)' : '#F8FAFC',
                      borderRadius: '8px', border: msg.isMe ? 'none' : '1px solid #E2E8F0',
                    }}>
                      <span style={{ fontSize: '18px' }}>📄</span>
                      <div>
                        <p style={{ fontSize: '12px', fontWeight: '600', color: msg.isMe ? 'white' : '#0F172A' }}>
                          {msg.attachment}
                        </p>
                        <p style={{ fontSize: '10px', color: msg.isMe ? 'rgba(255,255,255,0.6)' : '#94A3B8' }}>
                          1.2 MB · PDF Document
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '4px',
                  marginTop: '4px',
                  justifyContent: msg.isMe ? 'flex-end' : 'flex-start',
                }}>
                  <p style={{ fontSize: '11px', color: '#94A3B8' }}>{msg.time}</p>
                  {msg.isMe && <Check size={12} color="#10B981" />}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message input */}
        <div style={{
          padding: '14px 20px',
          borderTop: '1px solid #E2E8F0',
          background: 'white',
        }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: '10px',
            background: '#F8FAFC', border: '1px solid #E2E8F0',
            borderRadius: '12px', padding: '8px 12px',
          }}>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
              <span style={{ fontSize: '18px' }}>😊</span>
            </button>
            <button style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex' }}>
              <Paperclip size={16} color="#94A3B8" />
            </button>
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              style={{
                flex: 1, border: 'none', background: 'none',
                fontSize: '14px', color: '#0F172A',
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  setNewMessage('');
                }
              }}
            />
            <button style={{
              width: '32px', height: '32px',
              background: newMessage ? '#1E3A8A' : '#E2E8F0',
              border: 'none', borderRadius: '8px',
              cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              transition: 'background 0.2s',
            }}>
              <Send size={14} color={newMessage ? 'white' : '#94A3B8'} />
            </button>
          </div>
          <p style={{ fontSize: '11px', color: '#94A3B8', marginTop: '6px', textAlign: 'center' }}>
            PRESS SHIFT + ENTER FOR NEW LINE
          </p>
        </div>
      </div>

      {/* Right sidebar - contact info */}
      <div style={{
        width: '220px', flexShrink: 0,
        borderLeft: '1px solid #E2E8F0',
        padding: '20px 16px',
        display: 'flex', flexDirection: 'column',
        gap: '16px',
      }}>
        {/* Contact */}
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '56px', height: '56px',
            background: 'linear-gradient(135deg, #1E3A8A, #6D28D9)',
            borderRadius: '50%', margin: '0 auto 10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontWeight: '800', fontSize: '20px' }}>
              {activeConversation.avatar}
            </span>
          </div>
          <p style={{ fontWeight: '700', fontSize: '14px', color: '#0F172A', marginBottom: '2px' }}>
            {activeConversation.name}
          </p>
          <p style={{ fontSize: '12px', color: '#64748B' }}>
            UniVerse Property Group
          </p>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginTop: '10px' }}>
            {['Profile', 'Mute'].map((btn) => (
              <button key={btn} style={{
                padding: '5px 12px', border: '1px solid #E2E8F0',
                borderRadius: '8px', background: 'white',
                fontSize: '11px', fontWeight: '600',
                color: '#374151', cursor: 'pointer',
              }}>
                {btn}
              </button>
            ))}
          </div>
        </div>

        {/* Shared items */}
        <div>
          <p style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8', marginBottom: '8px' }}>
            SHARED ITEMS
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px' }}>
            {[1, 2, 3].map((i) => (
              <div key={i} style={{
                height: '52px',
                background: 'linear-gradient(135deg, #EFF6FF, #E0E7FF)',
                borderRadius: '8px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '20px',
              }}>
                {i === 1 ? '🏠' : i === 2 ? '📄' : '...'}
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions */}
        <div>
          <p style={{ fontSize: '11px', fontWeight: '700', color: '#94A3B8', marginBottom: '8px' }}>
            QUICK ACTIONS
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
            {[
              { icon: '📅', label: 'Reschedule Inspection', color: '#1E3A8A' },
              { icon: '💳', label: 'Send Deposit Receipt', color: '#6D28D9' },
              { icon: '⚠️', label: 'Report Issue', color: '#DC2626' },
            ].map((action) => (
              <button key={action.label} style={{
                display: 'flex', alignItems: 'center', gap: '8px',
                padding: '8px 10px', border: '1px solid #E2E8F0',
                borderRadius: '8px', background: 'white',
                cursor: 'pointer', textAlign: 'left',
              }}>
                <span style={{ fontSize: '14px' }}>{action.icon}</span>
                <span style={{ fontSize: '11px', fontWeight: '600', color: action.color }}>
                  {action.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}