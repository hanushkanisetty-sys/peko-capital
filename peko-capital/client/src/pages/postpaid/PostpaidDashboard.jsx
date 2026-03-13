import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MOCK_DATA = {
  totalTransactions: 8,
  totalSpent: 6850,
  remainingCredit: '43150',
  thisMonthTotal: '2450',
  currentMonthAmount: 2450,
  transactions: [
    { id: 1, date: '15 Jan 2026', invoiceNumber: 'INV-001', merchant: 'Office Supplies Ltd', category: 'Office', amount: '850', status: 'Paid' },
    { id: 2, date: '10 Jan 2026', invoiceNumber: 'INV-002', merchant: 'Cloud Services Inc', category: 'Tech', amount: '1200', status: 'Paid' },
    { id: 3, date: '05 Jan 2026', invoiceNumber: 'INV-003', merchant: 'Marketing Agency', category: 'Marketing', amount: '400', status: 'Pending' },
  ],
  statements: [
    { id: 1, date: 'Dec 2025', name: 'December 2025 Statement', amount: '4400', status: 'Paid' },
    { id: 2, date: 'Jan 2026', name: 'January 2026 Statement', amount: '2450', status: 'Pending' },
  ],
};

export default function PostpaidDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState(MOCK_DATA);
  const [txSearch, setTxSearch] = useState('');
  const [stSearch, setStSearch] = useState('');

  useEffect(() => {
    axios.get('/api/postpaid/dashboard').then(r => setData(r.data)).catch(() => {});
  }, []);

  const stats = [
    { label: 'Total Transactions', value: data?.totalTransactions ?? 0, cls: 'stat-peach' },
    { label: 'Total Spent', value: `AED ${(data?.totalSpent || 0).toLocaleString()}`, cls: 'stat-blue' },
    { label: 'Remaining PostPaid Credit', value: `AED ${data?.remainingCredit || 0}`, cls: 'stat-green' },
    { label: "This Month's Total", value: `AED ${data?.thisMonthTotal || 0}`, cls: 'stat-light' },
  ];

  const filteredTx = (data?.transactions || []).filter(t =>
    t.merchant.toLowerCase().includes(txSearch.toLowerCase())
  );
  const filteredSt = (data?.statements || []).filter(s =>
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
          <div style={{ fontSize: 28, fontWeight: 800, color: '#1A1A1A' }}>AED  {(data?.currentMonthAmount || 0).toLocaleString()}</div>
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
              <tr><th>Date</th><th>Invoice #</th><th>Merchant</th><th>Category</th><th>Amount</th><th>Status</th><th>View Bill</th><th>Download</th></tr>
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
                  <td><button className="btn btn-outline-red btn-sm" onClick={() => navigate('/postpaid/bill')}>View</button></td>
                  <td><button className="btn btn-outline btn-sm">⬇</button></td>
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
              <tr><th>Date</th><th>Statement Name</th><th>Amount</th><th>Status</th><th>View Statement</th><th>Download</th></tr>
            </thead>
            <tbody>
              {filteredSt.map(s => (
                <tr key={s.id}>
                  <td>{s.date}</td>
                  <td>{s.name}</td>
                  <td style={{ fontWeight: 600 }}>AED {s.amount}</td>
                  <td><span className={`badge ${statusBadge(s.status)}`}>{s.status}</span></td>
                  <td><button className="btn btn-outline-red btn-sm" onClick={() => navigate('/postpaid/statement')}>View</button></td>
                  <td><button className="btn btn-outline btn-sm">⬇</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
