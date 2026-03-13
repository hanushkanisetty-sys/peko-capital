import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastContext';

const txId = 'INV-' + Math.random().toString(36).slice(2, 10).toUpperCase();

export default function PostpaidPayBillSuccess() {
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    toast.success('Your January 2026 invoice of AED 2,582 has been paid successfully.', 'Invoice Paid', 6000);
  }, []); // eslint-disable-line

  return (
    <div style={{ background: '#F3F4F6', minHeight: '100%', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 40 }}>
      <div style={{ maxWidth: 500, width: '100%', background: '#fff', borderRadius: 12, padding: 40, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
        {/* Checkmark */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <div style={{
            width: 72, height: 72, background: '#DCFCE7', borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, margin: '0 auto 16px', color: '#16A34A',
          }}>✓</div>
          <h2 style={{ fontWeight: 700, fontSize: 22, color: '#1A1A1A', marginBottom: 8 }}>Invoice Paid Successfully!</h2>
          <p style={{ color: '#6B7280', fontSize: 14 }}>Your January 2026 invoice has been paid.</p>
        </div>

        {/* Details table */}
        <div style={{ background: '#F9FAFB', borderRadius: 8, padding: '4px 16px', marginBottom: 28 }}>
          {[
            ['Billing Period', 'January 2026'],
            ['Amount Paid', 'AED 2,582'],
            ['Payment Date', new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })],
            ['Transaction ID', txId],
            ['Status', 'Paid'],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #F0F0F0', fontSize: 13 }}>
              <span style={{ color: '#6B7280' }}>{l}</span>
              <span style={{ fontWeight: 600, color: l === 'Status' ? '#16A34A' : '#1A1A1A' }}>{v}</span>
            </div>
          ))}
        </div>

        {/* Back button */}
        <button
          onClick={() => navigate('/postpaid')}
          style={{
            width: '100%', background: '#FF4B4B', color: '#fff',
            border: 'none', borderRadius: 8, padding: 14,
            fontWeight: 600, fontSize: 15, cursor: 'pointer',
          }}
        >
          Back to PostPaid
        </button>
      </div>
    </div>
  );
}
