import React from 'react';
import { useNavigate } from 'react-router-dom';

const services = [
  { label: 'DEWA', icon: '🔌', company: 'Dubai Electricity & Water Authority' },
  { label: 'Etisalat', icon: '📡', company: 'Etisalat (e&)' },
  { label: 'du', icon: '📶', company: 'du Telecom' },
  { label: 'Salik', icon: '🚗', company: 'Dubai Toll Gates' },
  { label: 'Dubai Police Fines', icon: '🚔', company: 'Dubai Police' },
  { label: 'ADDC', icon: '⚡', company: 'Abu Dhabi Distribution Company' },
  { label: 'Water Bill', icon: '💧', company: 'Dubai Water Authority' },
  { label: 'Internet Bill', icon: '🌐', company: 'Broadband Services' },
];

export default function BillPayments() {
  const navigate = useNavigate();

  return (
    <div>
      <h1 className="page-title">Bill Payments</h1>
      <p className="page-subtitle">Pay your utility and government bills</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
        {services.map(svc => (
          <div
            key={svc.label}
            className="card"
            style={{ padding: 24, textAlign: 'center', transition: 'box-shadow 0.15s' }}
            onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.12)'}
            onMouseLeave={e => e.currentTarget.style.boxShadow = '0 1px 3px rgba(0,0,0,0.08)'}
          >
            <div style={{ fontSize: 36, marginBottom: 10 }}>{svc.icon}</div>
            <div style={{ fontWeight: 600, fontSize: 14, color: '#1A1A1A', marginBottom: 4 }}>{svc.label}</div>
            <div style={{ fontSize: 12, color: '#9CA3AF', marginBottom: 16 }}>{svc.company}</div>
            <button
              className="btn btn-primary btn-sm btn-full"
              onClick={() => navigate('/checkout', { state: { serviceName: svc.label, company: svc.company } })}
            >
              Pay Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
