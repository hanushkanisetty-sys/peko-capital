import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useToast } from '../../components/ToastContext';

export default function PostpaidSuccess() {
  const navigate = useNavigate();
  const location = useLocation();
  const toast = useToast();
  const tx = location.state || {};

  useEffect(() => {
    toast.success(
      `AED ${(tx.txAmount || 100).toLocaleString()} has been added to your January 2026 PostPaid bill.`,
      'Payment Completed',
      6000
    );
  }, []); // eslint-disable-line

  const date = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
  const txId = tx.transactionId || 'PP-R6GGOD510C';
  const txAmount = tx.txAmount || 100;
  const newMonthlyTotal = tx.newMonthlyTotal || 17600;
  const dueDate = tx.dueDate || '31 January 2026';

  return (
    <div style={{ maxWidth: 520, margin: '0 auto' }}>
      <div className="card" style={{ padding: 36, textAlign: 'center' }}>
        <div style={{ width: 64, height: 64, background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px', color: '#16A34A' }}>✓</div>
        <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 8 }}>Payment completed</h2>
        <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 24 }}>
          The merchant has been paid. This amount will be added to your monthly statement.
        </p>

        <div style={{ display: 'flex', gap: 12, marginBottom: 28 }}>
          <button className="btn btn-outline-red" style={{ flex: 1 }} onClick={() => navigate('/postpaid/bill')}>View Monthly Statement</button>
          <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => navigate('/capital/dashboard')}>Go back</button>
        </div>

        <div style={{ background: '#F9FAFB', borderRadius: 8, padding: 16, textAlign: 'left' }}>
          {[
            ['Date', date],
            ['Transaction ID', txId],
            ['Added to Monthly Balance', `AED ${txAmount.toLocaleString()}`],
            ['Current Month Total', `AED ${newMonthlyTotal.toLocaleString()}`],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderBottom: '1px solid #F0F0F0', fontSize: 13 }}>
              <span style={{ color: '#6B7280' }}>{l}</span>
              <span style={{ fontWeight: 500 }}>{v}</span>
            </div>
          ))}
        </div>

        <div className="info-box info-box-yellow" style={{ marginTop: 16, textAlign: 'left' }}>
          ⚠ Payment due date: <strong>{dueDate}</strong>
        </div>
      </div>
    </div>
  );
}
