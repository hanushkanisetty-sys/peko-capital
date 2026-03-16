import React, { useEffect, useRef, useState } from 'react';

const TYPE_COLORS = {
  payment:     { border: '#16A34A', bg: '#F0FFF4' },
  bill:        { border: '#F59E0B', bg: '#FFFBEB' },
  eligibility: { border: '#3B82F6', bg: '#EFF6FF' },
  system:      { border: '#9CA3AF', bg: '#F9FAFB' },
};

function timeAgo(isoString) {
  const diff = Math.floor((Date.now() - new Date(isoString)) / 1000);
  if (diff < 60) return 'Just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return `${Math.floor(diff / 86400)}d ago`;
}

export default function Header() {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'payment', title: 'Payment Added to PostPaid', message: 'Your DEWA payment of AED 789 has been added to your January 2026 PostPaid bill.', timestamp: new Date(Date.now() - 7200000), read: false },
    { id: 2, type: 'bill', title: 'Bill Due Soon', message: 'Your January 2026 PostPaid bill of AED 2,459 is due on 31 January 2026.', timestamp: new Date(Date.now() - 86400000), read: false },
    { id: 3, type: 'eligibility', title: 'Eligibility Approved', message: 'Congratulations! You have been approved for Peko PostPaid with a credit limit of AED 50,000.', timestamp: new Date(Date.now() - 172800000), read: false },
    { id: 4, type: 'system', title: 'Payment Completed', message: 'Your payment to City Power Company of AED 789 was completed successfully.', timestamp: new Date(Date.now() - 259200000), read: true }
  ]);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const unread = (notifications || []).filter(n => !n.read).length;

  // Close on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="header">
      <div className="header-search">
        <span style={{ color: '#9CA3AF' }}>🔍</span>
        <input placeholder="Search services, payments..." />
      </div>
      <div className="header-right">
        <div className="wallet-pill">AED 1,153</div>

        {/* Bell + Dropdown */}
        <div ref={dropdownRef} style={{ position: 'relative' }}>
          <button
            className="bell-btn"
            onClick={() => setOpen(o => !o)}
            style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            🔔
            {unread > 0 && (
              <span style={{
                position: 'absolute', top: -4, right: -4,
                background: '#FF4B4B', color: '#fff',
                borderRadius: '50%', fontSize: 10, fontWeight: 700,
                minWidth: 18, height: 18, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                padding: '0 4px', lineHeight: 1,
              }}>
                {unread > 9 ? '9+' : unread}
              </span>
            )}
          </button>

          {open && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 10px)', right: 0,
              width: 380, maxHeight: 480, overflowY: 'auto',
              background: '#fff', borderRadius: 12, zIndex: 1000,
              boxShadow: '0 8px 32px rgba(0,0,0,0.14)',
              border: '1px solid #F0F0F0',
            }}>
              {/* Dropdown header */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '14px 16px 10px', borderBottom: '1px solid #F0F0F0',
                position: 'sticky', top: 0, background: '#fff', zIndex: 1,
              }}>
                <span style={{ fontWeight: 700, fontSize: 15 }}>Notifications</span>
                {unread > 0 && (
                  <button
                    onClick={markAllRead}
                    style={{ background: 'none', border: 'none', color: '#FF4B4B', fontSize: 12, fontWeight: 600, cursor: 'pointer', padding: 0 }}
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Notification list */}
              {notifications.length === 0 ? (
                <div style={{ padding: 32, textAlign: 'center', color: '#9CA3AF' }}>
                  <div style={{ fontSize: 28, marginBottom: 8 }}>🔔</div>
                  <div style={{ fontSize: 13 }}>No notifications</div>
                </div>
              ) : (
                notifications.map(n => {
                  const colors = TYPE_COLORS[n.type] || TYPE_COLORS.system;
                  return (
                    <div
                      key={n.id}
                      onClick={() => !n.read && markRead(n.id)}
                      style={{
                        display: 'flex', gap: 0,
                        background: n.read ? '#fff' : colors.bg,
                        borderBottom: '1px solid #F5F5F5',
                        cursor: n.read ? 'default' : 'pointer',
                        transition: 'background 0.15s',
                      }}
                    >
                      {/* Colored left border */}
                      <div style={{ width: 4, flexShrink: 0, background: colors.border, borderRadius: '4px 0 0 4px' }} />
                      <div style={{ padding: '12px 14px', flex: 1 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 3 }}>
                          <span style={{ fontWeight: 600, fontSize: 13, color: '#1A1A1A' }}>{n.title}</span>
                          <span style={{ fontSize: 11, color: '#9CA3AF', flexShrink: 0, marginLeft: 8 }}>{timeAgo(n.timestamp)}</span>
                        </div>
                        <p style={{ fontSize: 12, color: '#6B7280', margin: 0, lineHeight: 1.5 }}>{n.message}</p>
                        {!n.read && (
                          <div style={{ width: 7, height: 7, background: colors.border, borderRadius: '50%', marginTop: 6 }} />
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          )}
        </div>

        <div className="user-info">
          <div className="avatar">S</div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600 }}>SAVOLL LLC</div>
            <div className="user-label">Corporate</div>
          </div>
        </div>
        <button className="logout-btn" title="Logout">⏻</button>
      </div>
    </header>
  );
}
