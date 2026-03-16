import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function EligibilityForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ fundsRaised: '', amount: '', uaeRegistered: '', vatRegistered: '' });

  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    if (form.uaeRegistered === 'yes') {
      navigate('/capital/eligible');
    } else {
      navigate('/capital/not-eligible');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div className="card" style={{ maxWidth: 580, width: '100%', padding: 36 }}>
        <h2 style={{ fontWeight: 700, fontSize: 22, marginBottom: 6 }}>Check Eligibility</h2>
        <p style={{ color: '#6B7280', fontSize: 14, marginBottom: 28 }}>
          Fill in the details below to see if you qualify for Peko Capital products.
        </p>

        <div className="form-group">
          <label className="form-label">Upload Documents</label>
          <div style={{ border: '2px dashed #E5E7EB', borderRadius: 8, padding: 32, textAlign: 'center', background: '#F9FAFB' }}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>📄</div>
            <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 12 }}>Click to upload documents</p>
            <button className="btn btn-outline btn-sm">Browse File</button>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Have you raised any funds?</label>
            <input className="form-input" value={form.fundsRaised} onChange={e => set('fundsRaised', e.target.value)} placeholder="e.g. Seed round, VC..." />
          </div>
          <div className="form-group">
            <label className="form-label">If yes, how much?</label>
            <input className="form-input" value={form.amount} onChange={e => set('amount', e.target.value)} placeholder="Amount in AED" />
          </div>
        </div>

        <div className="form-row" style={{ marginBottom: 8 }}>
          <div className="form-group">
            <label className="form-label">Is your company registered in the UAE?</label>
            <div className="radio-group">
              {['yes', 'no'].map(v => (
                <label key={v} className="radio-label">
                  <input type="radio" name="uae" value={v} checked={form.uaeRegistered === v} onChange={() => set('uaeRegistered', v)} />
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label className="form-label">Are you VAT registered?</label>
            <div className="radio-group">
              {['yes', 'no'].map(v => (
                <label key={v} className="radio-label">
                  <input type="radio" name="vat" value={v} checked={form.vatRegistered === v} onChange={() => set('vatRegistered', v)} />
                  {v.charAt(0).toUpperCase() + v.slice(1)}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="info-box info-box-yellow" style={{ marginBottom: 24 }}>
          ℹ️ This eligibility check will not affect your credit score.
        </div>

        <div style={{ display: 'flex', gap: 12 }}>
          <button className="btn btn-primary flex-1" style={{ flex: 1 }} onClick={submit}>
            Check Your Eligibility
          </button>
          <button className="btn btn-outline" onClick={() => navigate('/capital')}>Go back</button>
        </div>
      </div>
    </div>
  );
}
