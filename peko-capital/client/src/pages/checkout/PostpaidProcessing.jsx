import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PostpaidProcessing() {
  const navigate = useNavigate();
  const location = useLocation();
  const tx = location.state || {};
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setDone(true), 600);
    const t2 = setTimeout(() => navigate('/checkout/postpaid-success', { state: tx }), 2500);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, [navigate, tx]);

  return (
    <div style={{ maxWidth: 520, margin: '0 auto' }}>
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: 24 }}>
          <div className="section-title" style={{ marginBottom: 12 }}>Transaction Details</div>
          {[
            ['Merchant Name', tx.merchantName || 'Office Supplies Ltd'],
            ['Amount', `AED ${(tx.txAmount || 100).toLocaleString()}`],
            ['Date', new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F9FAFB' }}>
              <span style={{ color: '#6B7280', fontSize: 13 }}>{l}</span>
              <span style={{ fontWeight: 500 }}>{v}</span>
            </div>
          ))}

          <div className="divider" />
          <div className="section-title" style={{ marginBottom: 12 }}>Post Paid Balance Impact</div>
          {[
            ['Current month bill', `AED ${((tx.newMonthlyTotal || 0) - (tx.txAmount || 0)).toLocaleString()}`, null],
            ['Transaction', `+AED ${(tx.txAmount || 100).toLocaleString()}`, '#16A34A'],
            ['New Total', `AED ${(tx.newMonthlyTotal || 0).toLocaleString()}`, null],
          ].map(([l, v, c]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F9FAFB' }}>
              <span style={{ color: '#6B7280', fontSize: 13 }}>{l}</span>
              <span style={{ fontWeight: 600, color: c || '#1A1A1A' }}>{v}</span>
            </div>
          ))}

          {done ? (
            <div className="info-box info-box-green" style={{ marginTop: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>✓</span>
              <span><strong>Payment done on:</strong> {new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
            </div>
          ) : (
            <div style={{ textAlign: 'center', marginTop: 20, color: '#9CA3AF', fontSize: 13 }}>
              Processing payment...
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
