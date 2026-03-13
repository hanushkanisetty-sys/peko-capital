import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const products = [
  { id: 'flex', name: 'Peko Flex', status: 'coming-soon', icon: '🔄', desc: 'Flexible credit line for your business' },
  {
    id: 'postpaid', name: 'Post Paid', status: 'available', icon: '⚡',
    credit: 'AED 50,000', bullets: ['Net 30/60/90 terms', 'No upfront payment', 'Easy approval'],
  },
  { id: 'fast', name: 'Peko Fast', status: 'coming-soon', icon: '🚀', desc: 'Quick working capital access' },
];

export default function EligibleScreen() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState('postpaid');

  return (
    <div style={{ maxWidth: 680, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 32 }}>
        <div style={{ width: 64, height: 64, background: '#DCFCE7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px' }}>✓</div>
        <h1 className="page-title" style={{ fontSize: 26 }}>You're Eligible!</h1>
        <p style={{ color: '#6B7280', marginTop: 8 }}>Congratulations! Choose a product to get started.</p>
      </div>

      <div className="card" style={{ padding: 24, marginBottom: 24 }}>
        <h3 style={{ fontWeight: 600, marginBottom: 16 }}>Next Steps</h3>
        <div style={{ display: 'flex', gap: 16 }}>
          {['Choose Product', 'Complete Setup', 'Start Using Credit'].map((s, i) => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 10, flex: 1 }}>
              <div style={{ width: 28, height: 28, background: '#FF4B4B', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{i + 1}</div>
              <span style={{ fontSize: 13, fontWeight: 500 }}>{s}</span>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 24 }}>
        {products.map(p => {
          const isComingSoon = p.status === 'coming-soon';
          const isSelected = selected === p.id;
          return (
            <div
              key={p.id}
              className="card"
              onClick={() => !isComingSoon && setSelected(p.id)}
              style={{
                padding: 20,
                border: isSelected ? '2px solid #3B82F6' : '1.5px solid #E5E7EB',
                opacity: isComingSoon ? 0.6 : 1,
                cursor: isComingSoon ? 'not-allowed' : 'pointer',
                position: 'relative',
              }}
            >
              {isComingSoon && (
                <div style={{ position: 'absolute', top: 12, right: 12 }}>
                  <span className="badge badge-gray" style={{ fontSize: 10 }}>COMING SOON</span>
                </div>
              )}
              {isSelected && (
                <div style={{ position: 'absolute', top: 12, right: 12, width: 20, height: 20, background: '#3B82F6', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 12 }}>✓</div>
              )}
              <div style={{ fontSize: 28, marginBottom: 8 }}>{p.icon}</div>
              <h3 style={{ fontWeight: 700, fontSize: 15, marginBottom: 6 }}>{p.name}</h3>
              {p.credit && <div style={{ color: '#FF4B4B', fontWeight: 700, marginBottom: 8 }}>Up to {p.credit}</div>}
              {p.bullets && (
                <ul style={{ paddingLeft: 16, color: '#6B7280', fontSize: 12, lineHeight: 1.8 }}>
                  {p.bullets.map(b => <li key={b}>{b}</li>)}
                </ul>
              )}
              {p.desc && <p style={{ fontSize: 12, color: '#9CA3AF' }}>{p.desc}</p>}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginTop: 32, marginBottom: 24 }}>
        <button className="btn btn-primary" style={{ width: 'auto', minWidth: 200 }} onClick={() => navigate('/capital/dashboard')}>
          Apply Now
        </button>
        <button className="btn btn-outline" style={{ width: 'auto', minWidth: 120 }} onClick={() => navigate('/capital/eligibility')}>
          Go Back
        </button>
      </div>

      <div style={{ textAlign: 'center', color: '#9CA3AF', fontSize: 12 }}>
        Powered by <strong>Zelo</strong>
      </div>
    </div>
  );
}
