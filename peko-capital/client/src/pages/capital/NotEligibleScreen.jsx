import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function NotEligibleScreen() {
  const navigate = useNavigate();
  return (
    <div style={{ maxWidth: 560, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ width: 64, height: 64, background: '#FEE2E2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, margin: '0 auto 16px' }}>✕</div>
      <h1 className="page-title" style={{ fontSize: 26, marginBottom: 8 }}>Not Eligible</h1>
      <p style={{ color: '#6B7280', marginBottom: 24 }}>Sorry, you are not eligible for Peko Capital products at this time.</p>

      <div className="info-box info-box-yellow" style={{ textAlign: 'left', marginBottom: 24 }}>
        <strong>⚠ This might be because:</strong>
        <ul style={{ marginTop: 8, paddingLeft: 20, lineHeight: 1.8 }}>
          <li>Your company is not registered in the UAE</li>
          <li>VAT registration requirements are not met</li>
          <li>Insufficient documentation provided</li>
        </ul>
      </div>

      <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 24 }}>
        We request you to reapply after <strong>90 days</strong>.
      </p>

      <button className="btn btn-outline" onClick={() => navigate('/capital')}>Go back</button>
    </div>
  );
}
