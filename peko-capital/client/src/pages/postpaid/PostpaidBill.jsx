import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MOCK_DATA = {
  billingPeriod: 'Jan 2026',
  totalTransactions: 3,
  dueDate: '31 Jan 2026',
  dueAmount: 2450,
  invoiceItems: [
    { date: '15 Jan 2026', name: 'Office Supplies Ltd', initials: 'OS', color: '#FF4B4B', amount: 850 },
    { date: '10 Jan 2026', name: 'Cloud Services Inc', initials: 'CS', color: '#3B82F6', amount: 1200 },
    { date: '05 Jan 2026', name: 'Marketing Agency', initials: 'MA', color: '#10B981', amount: 400 },
  ],
};

export default function PostpaidBill() {
  const navigate = useNavigate();
  const [data, setData] = useState(MOCK_DATA);

  useEffect(() => {
    axios.get('/api/postpaid/bill').then(r => setData(r.data)).catch(() => {});
  }, []);

  const total = data.invoiceItems.reduce((s, i) => s + i.amount, 0);

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <h1 className="page-title" style={{ marginBottom: 20 }}>Your Monthly Bill</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        <div className="card stat-card stat-light"><div className="stat-label">Billing Period</div><div style={{ fontWeight: 700, marginTop: 4 }}>{data.billingPeriod}</div></div>
        <div className="card stat-card stat-blue"><div className="stat-label">Total Transactions</div><div className="stat-value">{data.totalTransactions}</div></div>
        <div className="card stat-card stat-peach">
          <div className="stat-label">Payment Due Date</div>
          <div style={{ fontWeight: 700, fontSize: 13, marginTop: 4 }}>{data.dueDate}</div>
          <div style={{ fontWeight: 800, color: '#FF4B4B', fontSize: 18 }}>AED {data.dueAmount}</div>
        </div>
      </div>

      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <div className="section-title" style={{ marginBottom: 16 }}>Invoice Details</div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead><tr><th>Date</th><th>Transaction Name</th><th style={{ textAlign: 'right' }}>Amount</th></tr></thead>
          <tbody>
            {data.invoiceItems.map((item, i) => (
              <tr key={i}>
                <td>{item.date}</td>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ width: 32, height: 32, borderRadius: '50%', background: item.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700, flexShrink: 0 }}>{item.initials}</div>
                    {item.name}
                  </div>
                </td>
                <td style={{ textAlign: 'right', fontWeight: 600 }}>AED {item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card" style={{ padding: 20 }}>
        <div className="section-title" style={{ marginBottom: 16 }}>Payment Details</div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
          <span style={{ color: '#6B7280' }}>Total Amount Due</span>
          <span style={{ fontWeight: 700, fontSize: 18 }}>AED {total}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
          <span style={{ color: '#6B7280' }}>Payment Due</span>
          <span style={{ fontWeight: 500 }}>{data.dueDate}</span>
        </div>
        <button className="btn btn-primary btn-full" onClick={() => navigate('/postpaid/pay-bill')}>
          Pay Monthly Invoice
        </button>
      </div>
    </div>
  );
}
