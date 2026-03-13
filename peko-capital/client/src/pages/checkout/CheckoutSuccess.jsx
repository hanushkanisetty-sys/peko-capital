import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../components/ToastContext';

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  const toast = useToast();
  const txId = 'TXN-' + Math.random().toString(36).slice(2, 10).toUpperCase();
  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  useEffect(() => {
    toast.success('Your payment of AED 105 was processed successfully.', 'Payment Successful', 5000);
  }, []); // eslint-disable-line

  return (
    <div style={{ maxWidth: 480, margin: '0 auto' }}>
      <div className="card" style={{ padding: 36, textAlign: 'center' }}>
        <div style={{
          width: 64, height: 64, background: '#DCFCE7', borderRadius: '50%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 28, margin: '0 auto 16px', color: '#16A34A'
        }}>✓</div>
        <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Payment Successful</h2>
        <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 28 }}>
          Your payment has been processed successfully.
        </p>

        <div style={{ background: '#F9FAFB', borderRadius: 8, padding: 16, textAlign: 'left', marginBottom: 24 }}>
          {[
            ['Amount', 'AED 105'],
            ['Date', date],
            ['Transaction ID', txId],
            ['Status', 'Completed'],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F0F0F0', fontSize: 13 }}>
              <span style={{ color: '#6B7280' }}>{l}</span>
              <span style={{ fontWeight: 600 }}>{v}</span>
            </div>
          ))}
        </div>

        <button className="btn btn-outline btn-full" onClick={() => navigate('/bill-payments')}>
          Go Back
        </button>
      </div>
    </div>
  );
}
