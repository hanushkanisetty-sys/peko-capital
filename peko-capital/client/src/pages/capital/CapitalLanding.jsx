import React from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
  {
    icon: '⚡',
    name: 'Peko Postpaid',
    desc: 'Buy now, pay later for all your business expenses. Consolidate bills into one monthly payment.',
  },
  {
    icon: '🔄',
    name: 'Peko Flex',
    desc: 'Flexible credit line that grows with your business. Access funds when you need them most.',
  },
  {
    icon: '🚀',
    name: 'Peko Fast',
    desc: 'Quick access to working capital. Get funded in 24 hours with minimal documentation.',
  },
];

export default function CapitalLanding() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 900, margin: '40px auto', padding: '0 32px' }}>
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <h1 className="page-title" style={{ fontSize: 32, textAlign: 'center' }}>Peko Capital</h1>
        <p style={{ fontSize: 16, color: '#6B7280', marginTop: 10, marginBottom: 12, textAlign: 'center' }}>
          Empower your business with flexible, innovative finance solutions.
        </p>
        <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.7, textAlign: 'center', maxWidth: 600, margin: '0 auto' }}>
          Peko Capital provides reliable working capital solutions tailored to your business needs.
          Whether you need to manage cash flow, expand operations, or handle unexpected expenses,
          we've got the right financial product for you.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, width: '100%', marginBottom: 8 }}>
        {products.map(p => (
          <div key={p.name} className="card" style={{ padding: 28 }}>
            <div style={{ fontSize: 36, marginBottom: 12 }}>{p.icon}</div>
            <h3 style={{ fontWeight: 700, marginBottom: 8, fontSize: 16 }}>{p.name}</h3>
            <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, marginBottom: 20 }}>{p.desc}</p>
            <button className="btn btn-outline-red btn-sm">Learn more</button>
          </div>
        ))}
      </div>

      <div style={{ textAlign: 'center' }}>
        <button
          className="btn btn-primary"
          style={{ display: 'block', margin: '32px auto', width: 'fit-content', padding: '14px 48px', fontSize: 15 }}
          onClick={() => navigate('/capital/eligibility')}
        >
          Check Your Eligibility
        </button>
      </div>

      <div style={{ marginTop: 24, paddingTop: 24, borderTop: '1px solid #F0F0F0', color: '#9CA3AF', fontSize: 12, textAlign: 'center' }}>
        Credit provided by <strong>Zelo</strong>. We are a distributor of Zelo.
        <span style={{ marginLeft: 8, fontWeight: 700, color: '#6B7280' }}>Zelo</span>
      </div>
    </div>
  );
}
