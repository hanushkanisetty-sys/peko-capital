import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MOCK_DATA = {
  totalTransactions: 5,
  totalSpent: 2459,
  remainingCredit: '47,541',
  thisMonthTotal: '2,459',
  currentMonthAmount: 2459,
  transactions: [
    { id: 1, date: '15 Jan 2026', invoiceNumber: 'INV-001', merchant: 'DEWA', category: 'Electricity', amount: '789', status: 'Paid' },
    { id: 2, date: '12 Jan 2026', invoiceNumber: 'INV-002', merchant: 'Etisalat', category: 'Telecom', amount: '450', status: 'Paid' },
    { id: 3, date: '10 Jan 2026', invoiceNumber: 'INV-003', merchant: 'Dubai Police', category: 'Fines', amount: '400', status: 'Paid' },
    { id: 4, date: '08 Jan 2026', invoiceNumber: 'INV-004', merchant: 'du Telecom', category: 'Telecom', amount: '320', status: 'Paid' },
    { id: 5, date: '05 Jan 2026', invoiceNumber: 'INV-005', merchant: 'Salik', category: 'Toll', amount: '500', status: 'Paid' },
  ],
  statements: [
    { id: 1, period: '01 Jan 2026 – 31 Jan 2026', name: 'January 2026', amount: 'AED 2,459', status: 'Due' },
    { id: 2, period: '01 Dec 2025 – 31 Dec 2025', name: 'December 2025', amount: 'AED 1,850', status: 'Paid' },
    { id: 3, period: '01 Nov 2025 – 30 Nov 2025', name: 'November 2025', amount: 'AED 2,100', status: 'Paid' },
  ],
};

export default function PostpaidDashboard() {
  const navigate = useNavigate();
  const [data] = useState(MOCK_DATA);
  const [txSearch, setTxSearch] = useState('');
  const [stSearch, setStSearch] = useState('');

  const stats = [
    { label: 'Total Transactions', value: data.totalTransactions, cls: 'stat-peach' },
    { label: 'Total Spent', value: `AED ${data.totalSpent.toLocaleString()}`, cls: 'stat-blue' },
    { label: 'Remaining PostPaid Credit', value: `AED ${data.remainingCredit}`, cls: 'stat-green' },
    { label: "This Month's Total", value: `AED ${data.thisMonthTotal}`, cls: 'stat-light' },
  ];

  const filteredTx = data.transactions.filter(t =>
    t.merchant.toLowerCase().includes(txSearch.toLowerCase())
  );
  const filteredSt = data.statements.filter(s =>
    s.name.toLowerCase().includes(stSearch.toLowerCase())
  );

  const statusBadge = s => s === 'Paid' ? 'badge-green' : 'badge-yellow';

  return (
    <div>
      <h1 className="page-title">Peko Post Paid</h1>
      <p className="page-subtitle">Manage your postpaid transactions and statements</p>

      <div className="stat-grid">
        {stats.map(s => (
          <div key={s.label} className={`card stat-card ${s.cls}`}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
          </div>
        ))}
      </div>

      {/* Current Month */}
      <div className="card" style={{ padding: 24, marginBottom: 24, display: 'flex', alignItems: 'center', gap: 24 }}>
        <div style={{ fontSize: 40 }}>📅</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, color: '#6B7280', marginBottom: 4 }}>Current Month Total</div>
          <div style={{ fontSize: 28, fontWeight: 800, color: '#1A1A1A' }}>AED  {data.currentMonthAmount.toLocaleString()}</div>
          <div style={{ fontSize: 13, color: '#9CA3AF', marginTop: 2 }}>January 2026</div>
        </div>
        <button className="btn btn-primary" onClick={() => navigate('/postpaid/bill')}>View Bill</button>
      </div>

      {/* Transaction History */}
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <div className="section-header"><span className="section-title">Transaction History</span></div>
        <div className="filters">
          <select className="filter-select"><option>All Categories</option></select>
          <input type="date" className="filter-select" />
          <input className="filter-input" placeholder="Search merchant..." value={txSearch} onChange={e => setTxSearch(e.target.value)} />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Date</th><th>Invoice #</th><th>Merchant</th><th>Category</th><th>Amount</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filteredTx.map(t => (
                <tr key={t.id}>
                  <td>{t.date}</td>
                  <td>{t.invoiceNumber}</td>
                  <td style={{ fontWeight: 500 }}>{t.merchant}</td>
                  <td>{t.category}</td>
                  <td style={{ fontWeight: 600 }}>AED {t.amount}</td>
                  <td><span className={`badge ${statusBadge(t.status)}`}>{t.status}</span></td>
                  <td><button className="btn btn-outline-red btn-sm" onClick={() => navigate(`/postpaid/transaction/${t.id}`, { state: t })}>View</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Monthly Statements */}
      <div className="card" style={{ padding: 20 }}>
        <div className="section-header"><span className="section-title">Monthly Statements</span></div>
        <div className="filters">
          <select className="filter-select"><option>All Periods</option></select>
          <input type="date" className="filter-select" />
          <input className="filter-input" placeholder="Search statement..." value={stSearch} onChange={e => setStSearch(e.target.value)} />
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Period</th><th>Statement Name</th><th>Amount</th><th>Status</th><th>Actions</th></tr>
            </thead>
            <tbody>
              {filteredSt.map(s => (
                <tr key={s.id}>
                  <td>{s.period}</td>
                  <td>{s.name}</td>
                  <td style={{ fontWeight: 600 }}>{s.amount}</td>
                  <td><span className={`badge ${statusBadge(s.status)}`}>{s.status}</span></td>
                  <td>
                    <div style={{ display: 'flex', gap: 8 }}>
                      {(s.status === 'Due' || s.status === 'Unpaid') && (
                        <button className="btn btn-primary btn-sm" onClick={() => navigate('/postpaid/pay-bill')}>Pay Now</button>
                      )}
                      <button className="btn btn-outline btn-sm" onClick={() => navigate('/postpaid/statement', { state: s })}>⬇ Download</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
