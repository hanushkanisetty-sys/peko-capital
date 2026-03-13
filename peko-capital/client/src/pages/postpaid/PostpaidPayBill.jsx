import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const payMethods = [
  { id: 'cashback', label: 'Use your cashback', sub: 'AED 100 available' },
  { id: 'card', label: 'Debit / Credit / ATM Cards', sub: 'Visa  •  Mastercard  •  Amex' },
  { id: 'express', label: 'Express Checkout', sub: 'Apple Pay  •  Samsung Pay' },
  { id: 'voucher', label: 'I have a voucher code', sub: '' },
  { id: 'crypto', label: 'Crypto Currency', sub: '' },
];

const invoiceAmount = 2459;
const vat = 123;
const total = invoiceAmount + vat;

export default function PostpaidPayBill() {
  const navigate = useNavigate();
  const [method, setMethod] = useState('card');
  const [coupon, setCoupon] = useState('');

  return (
    <div>
      <h1 className="page-title">Pay Monthly Invoice</h1>
      <p className="page-subtitle">Billing period: January 2026</p>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Left */}
        <div>
          <div className="card" style={{ padding: 24, marginBottom: 20 }}>
            <div className="section-title" style={{ marginBottom: 16 }}>Select Payment Method</div>
            {payMethods.map(m => (
              <div key={m.id} style={{ marginBottom: 14 }}>
                <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: 'pointer' }}>
                  <input
                    type="radio"
                    name="pay"
                    value={m.id}
                    checked={method === m.id}
                    onChange={() => setMethod(m.id)}
                    style={{ marginTop: 3, accentColor: '#FF4B4B' }}
                  />
                  <div>
                    <div style={{ fontWeight: 500, fontSize: 14 }}>{m.label}</div>
                    {m.sub && <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: 2 }}>{m.sub}</div>}
                  </div>
                </label>
              </div>
            ))}
          </div>

          <div className="card" style={{ padding: 24 }}>
            <div className="section-title" style={{ marginBottom: 16 }}>Order Review</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Billing Period</label>
                <input className="form-input" defaultValue="January 2026" readOnly style={{ background: '#F9FAFB' }} />
              </div>
              <div className="form-group">
                <label className="form-label">Total Transactions</label>
                <input className="form-input" defaultValue="5" readOnly style={{ background: '#F9FAFB' }} />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Amount Due</label>
                <input className="form-input" defaultValue={`AED ${invoiceAmount.toLocaleString()}`} readOnly style={{ background: '#F9FAFB' }} />
              </div>
              <div className="form-group">
                <label className="form-label">Account</label>
                <input className="form-input" defaultValue="SAVOLL LLC PostPaid Account" readOnly style={{ background: '#F9FAFB' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div>
          <div className="card" style={{ padding: 20, marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 12 }}>Apply Coupon</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className="form-input"
                style={{ flex: 1 }}
                placeholder="Promo code"
                value={coupon}
                onChange={e => setCoupon(e.target.value)}
              />
              <button className="btn btn-outline" style={{ whiteSpace: 'nowrap' }}>Apply</button>
            </div>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div className="section-title" style={{ marginBottom: 16 }}>Total Amount</div>
            {[
              ['Invoice Amount', `AED ${invoiceAmount.toLocaleString()}`],
              ['VAT 5%', `AED ${vat}`],
            ].map(([l, v]) => (
              <div key={l} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                <span style={{ color: '#6B7280', fontSize: 13 }}>{l}</span>
                <span style={{ fontWeight: 500 }}>{v}</span>
              </div>
            ))}
            <div className="divider" style={{ margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
              <span style={{ fontWeight: 700 }}>Total</span>
              <span style={{ fontWeight: 800, fontSize: 18, color: '#FF4B4B' }}>AED {total.toLocaleString()}</span>
            </div>
            <button
              className="btn btn-primary btn-full"
              onClick={() => navigate('/postpaid/pay-bill-success')}
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
