import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const MOCK_STATUS = {
  eligible: true,
  availableCredit: 47550,
  currentMonthBill: 2450,
  dueDate: '31 Jan 2026',
};

export default function PostpaidConfirm() {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceName, company, amount: passedAmount } = location.state || {};

  const [status, setStatus] = useState(MOCK_STATUS);
  const [confirming, setConfirming] = useState(false);

  const merchantName = company || serviceName || 'Office Supplies Ltd';
  const txAmount = passedAmount || 100;

  useEffect(() => {
    axios.get('/api/checkout/postpaid-status').then(r => setStatus(r.data)).catch(() => {});
  }, []);

  const newTotal = status.currentMonthBill + txAmount;

  const confirm = async () => {
    setConfirming(true);
    try {
      const { data } = await axios.post('/api/postpaid/confirm-payment', {
        merchantName,
        category: serviceName || 'General',
        amount: txAmount,
      });
      navigate('/checkout/postpaid-processing', {
        state: {
          merchantName,
          txAmount,
          transactionId: data.transactionId,
          newMonthlyTotal: data.newMonthlyTotal,
          availableCredit: data.availableCredit,
          dueDate: data.dueDate,
        },
      });
    } catch {
      // Fallback: navigate with mock data if API fails
      navigate('/checkout/postpaid-processing', {
        state: {
          merchantName,
          txAmount,
          transactionId: 'TXN-' + Date.now(),
          newMonthlyTotal: newTotal,
          availableCredit: status.availableCredit - txAmount,
          dueDate: status.dueDate,
        },
      });
    }
  };

  return (
    <div style={{ maxWidth: 520, margin: '0 auto' }}>
      <div className="card" style={{ overflow: 'hidden' }}>
        <div style={{ background: '#FDF6EE', padding: '28px 24px', textAlign: 'center', borderBottom: '1px solid #F0F0F0' }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>🪙</div>
          <h2 style={{ fontWeight: 700, fontSize: 18, marginBottom: 8 }}>Peko will pay this bill on your behalf</h2>
          <p style={{ color: '#6B7280', fontSize: 13 }}>You'll pay at the end of the month</p>
        </div>

        <div style={{ padding: 24 }}>
          <div className="section-title" style={{ marginBottom: 12 }}>Transaction Details</div>
          {[
            ['Merchant Name', merchantName],
            ['Amount', `AED ${txAmount.toLocaleString()}`],
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
            ['Available Credit', `AED ${status.availableCredit.toLocaleString()}`, null],
            ['Current month bill', `AED ${status.currentMonthBill.toLocaleString()}`, null],
            ['Transaction Amount', `+AED ${txAmount.toLocaleString()}`, '#16A34A'],
            ['New Total Bill', `AED ${newTotal.toLocaleString()}`, null],
          ].map(([l, v, c]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #F9FAFB' }}>
              <span style={{ color: '#6B7280', fontSize: 13 }}>{l}</span>
              <span style={{ fontWeight: 600, color: c || '#1A1A1A' }}>{v}</span>
            </div>
          ))}

          <div className="info-box info-box-yellow" style={{ marginTop: 16, marginBottom: 20 }}>
            ⚠ Payment due date: <strong>{status.dueDate}</strong>
          </div>

          <button className="btn btn-primary btn-full" onClick={confirm} disabled={confirming}>
            {confirming ? 'Processing...' : 'Confirm Post Paid Payment'}
          </button>
        </div>
      </div>
    </div>
  );
}
