import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';

const PIE_COLORS = ['#FF4B4B', '#3B82F6', '#10B981'];

const MOCK_DATA = {
  totalPayments: 247500,
  activeProducts: 1,
  upcomingPayments: 2459,
  availableCredit: 47541,
  totalCredit: 50000,
  recentActivity: [
    { date: '15 Jan 2026', product: 'PostPaid', description: 'DEWA', amount: 789, status: 'Paid' },
    { date: '12 Jan 2026', product: 'PostPaid', description: 'Etisalat', amount: 450, status: 'Paid' },
    { date: '10 Jan 2026', product: 'PostPaid', description: 'Dubai Police', amount: 400, status: 'Paid' },
    { date: '08 Jan 2026', product: 'PostPaid', description: 'du Telecom', amount: 320, status: 'Paid' },
    { date: '05 Jan 2026', product: 'PostPaid', description: 'Salik', amount: 500, status: 'Paid' },
  ],
  chartData: [
    { month: 'Aug', amount: 3200 },
    { month: 'Sep', amount: 4100 },
    { month: 'Oct', amount: 3800 },
    { month: 'Nov', amount: 5200 },
    { month: 'Dec', amount: 6100 },
    { month: 'Jan', amount: 2459 },
  ],
  productUsage: [
    { name: 'PostPaid', value: 100 },
    { name: 'Peko Flex', value: 0 },
    { name: 'Peko Fast', value: 0 },
  ],
};

export default function CapitalDashboard() {
  const navigate = useNavigate();
  const [data] = useState(MOCK_DATA);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  const stats = [
    { label: 'Total Payments', value: `AED ${data.totalPayments.toLocaleString()}`, cls: 'stat-peach' },
    { label: 'Active Products', value: data.activeProducts, cls: 'stat-light' },
    { label: 'Upcoming Payments', value: `AED ${data.upcomingPayments.toLocaleString()}`, cls: 'stat-blue' },
    { label: 'Available Credit', value: `AED ${data.availableCredit.toLocaleString()}`, sub: `of AED ${data.totalCredit.toLocaleString()}`, cls: 'stat-green' },
  ];

  const filtered = data.recentActivity.filter(r =>
    (!category || r.product === category) &&
    (!search || r.description.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <div>
      <h1 className="page-title">Peko Capital</h1>
      <p className="page-subtitle">Overview of your capital products</p>

      <div className="stat-grid">
        {stats.map(s => (
          <div key={s.label} className={`card stat-card ${s.cls}`}>
            <div className="stat-label">{s.label}</div>
            <div className="stat-value">{s.value}</div>
            {s.sub && <div className="stat-sub">{s.sub}</div>}
          </div>
        ))}
      </div>

      {/* Product Widgets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {/* Peko Flex — Coming Soon */}
        <div className="card" style={{ padding: 20, opacity: 0.5, cursor: 'not-allowed' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>🔄</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Peko Flex</div>
              <span className="badge badge-gray" style={{ fontSize: 10 }}>COMING SOON</span>
            </div>
          </div>
          <div style={{ fontSize: 13, color: '#9CA3AF' }}>Coming Soon</div>
        </div>

        {/* Peko Fast — Coming Soon */}
        <div className="card" style={{ padding: 20, opacity: 0.5, cursor: 'not-allowed' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>🚀</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Peko Fast</div>
              <span className="badge badge-gray" style={{ fontSize: 10 }}>COMING SOON</span>
            </div>
          </div>
          <div style={{ fontSize: 13, color: '#9CA3AF' }}>Coming Soon</div>
        </div>

        {/* Peko Postpaid — Active */}
        <div
          className="card"
          style={{ padding: 20, cursor: 'pointer' }}
          onClick={() => navigate('/postpaid')}
          onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'}
          onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 24 }}>⚡</span>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>Peko Postpaid</div>
              <span className="badge badge-green" style={{ fontSize: 10 }}>Active</span>
            </div>
          </div>
          <div style={{ fontSize: 12, color: '#6B7280' }}>Active plans: <strong>1</strong></div>
          <div style={{ fontSize: 12, color: '#6B7280', marginTop: 4 }}>Monthly payment: <strong>AED 2,459</strong></div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="card" style={{ padding: 20, marginBottom: 24 }}>
        <div className="section-header">
          <span className="section-title">Recent Activity</span>
        </div>
        <div className="filters">
          <select className="filter-select" value={category} onChange={e => setCategory(e.target.value)}>
            <option value="">All Products</option>
            <option>PostPaid</option>
            <option>Peko Flex</option>
            <option>Peko Fast</option>
          </select>
          <input type="date" className="filter-select" />
          <input className="filter-input" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)} />
        </div>
        <div className="table-wrap">
          <table>
            <thead><tr><th>Date</th><th>Product</th><th>Description</th><th>Amount</th><th>Status</th></tr></thead>
            <tbody>
              {filtered.map((r, i) => (
                <tr key={i}>
                  <td>{r.date}</td>
                  <td>{r.product}</td>
                  <td>{r.description}</td>
                  <td style={{ fontWeight: 600 }}>AED {r.amount.toLocaleString()}</td>
                  <td><span className="badge badge-green">{r.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Charts */}
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 20 }}>
        <div className="card" style={{ padding: 20 }}>
          <div className="section-title" style={{ marginBottom: 16 }}>Payments Over Time</div>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data.chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#F0F0F0" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#FF4B4B" strokeWidth={2} dot={{ fill: '#FF4B4B' }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="card" style={{ padding: 20 }}>
          <div className="section-title" style={{ marginBottom: 16 }}>Product Usage</div>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie data={data.productUsage} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {data.productUsage.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
