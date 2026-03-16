import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function PostpaidTransactionDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const tx = location.state || {};

  const fields = [
    ['Transaction ID', `TXN-${String(tx.id || '').padStart(4, '0')}`],
    ['Date & Time', tx.date || '—'],
    ['Merchant', tx.merchant || '—'],
    ['Invoice Number', tx.invoiceNumber || '—'],
    ['Category', tx.category || '—'],
    ['Amount', tx.amount ? `AED ${tx.amount}` : '—'],
    ['Status', tx.status || '—'],
    ['Payment Method', 'Peko PostPaid'],
    ['Associated Bill', 'January 2026 Statement'],
  ];

  return (
    <div style={{ maxWidth: 600, margin: '0 auto' }}>
      <button
        className="btn btn-outline btn-sm"
        style={{ marginBottom: 20 }}
        onClick={() => navigate('/postpaid')}
      >
        ← Back
      </button>

      <h1 className="page-title" style={{ marginBottom: 20 }}>Transaction Details</h1>

      <div className="card" style={{ padding: 32 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            {fields.map(([label, value]) => (
              <tr key={label} style={{ borderBottom: '1px solid #F3F4F6' }}>
                <td style={{ padding: '14px 0', color: '#6B7280', fontSize: 13, width: '45%' }}>{label}</td>
                <td style={{ padding: '14px 0', fontWeight: 500, fontSize: 14 }}>
                  {label === 'Status' ? (
                    <span className={`badge ${value === 'Paid' ? 'badge-green' : 'badge-yellow'}`}>{value}</span>
                  ) : value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
