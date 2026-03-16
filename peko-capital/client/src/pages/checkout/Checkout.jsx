import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

// Mock: simulate user's PostPaid account status
// Possible values: 'none' | 'active' | 'blocked'
const userPostPaidStatus = 'active';

const POSTPAID_INELIGIBLE = ['Salik', 'Dubai Police Fines', 'ADDC', 'Water Bill', 'Internet Bill'];

const payMethods = [
  { id: 'cashback', label: 'Use your cashback', sub: 'AED 100 available' },
  { id: 'card', label: 'Debit / Credit / ATM Cards', sub: 'Visa, Mastercard, Amex' },
  { id: 'express', label: 'Express Checkout', sub: '  Apple Pay  •  Samsung Pay' },
  { id: 'postpaid', label: 'Pay via Post Paid', sub: 'AED 100' },
  { id: 'voucher', label: 'I have a voucher code', sub: '' },
  { id: 'crypto', label: 'Crypto Currency', sub: '' },
];

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { serviceName, company } = location.state || {};
  const [method, setMethod] = useState('card');
  const [coupon, setCoupon] = useState('');
  const [billing, setBilling] = useState({ firstName: '', lastName: '', email: '', country: '', city: '', address: '' });

  const ppEligible = !serviceName || !POSTPAID_INELIGIBLE.includes(serviceName);

  const setB = (k, v) => setBilling(b => ({ ...b, [k]: v }));
  const subtotal = 100, vat = 5, total = 105;

  const pay = () => {
    if (method === 'postpaid') {
      navigate('/checkout/postpaid-confirm', { state: { serviceName, company, amount: subtotal } });
    } else {
      navigate('/checkout/success');
    }
  };

  return (
    <div>
      <h1 className="page-title" style={{ marginBottom: 24 }}>Checkout</h1>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24 }}>
        {/* Left */}
        <div>
          <div className="card" style={{ padding: 24, marginBottom: 20 }}>
            <div className="section-title" style={{ marginBottom: 16 }}>Select Payment Method</div>
            {payMethods.map(m => {
              const isPostpaid = m.id === 'postpaid';

              // Determine PostPaid state
              // STATE 2: service not eligible (any account status)
              // STATE 1: eligible + no account
              // STATE 3: eligible + active
              // STATE 4: eligible + blocked
              let ppState = null;
              if (isPostpaid) {
                if (!ppEligible) ppState = 'ineligible';
                else if (userPostPaidStatus === 'none') ppState = 'no-account';
                else if (userPostPaidStatus === 'active') ppState = 'active';
                else if (userPostPaidStatus === 'blocked') ppState = 'blocked';
              }

              const disabled = isPostpaid && ppState !== 'active';
              const sub = isPostpaid && ppState === 'active' ? 'AED 100 · Pay by 31 Jan 2026' : m.sub;

              return (
                <div key={m.id} style={{ marginBottom: 12 }}>
                  <label style={{ display: 'flex', alignItems: 'flex-start', gap: 12, cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.5 : 1 }}>
                    <input type="radio" name="pay" value={m.id} checked={method === m.id} onChange={() => !disabled && setMethod(m.id)} style={{ marginTop: 3, accentColor: '#FF4B4B' }} disabled={disabled} />
                    <div>
                      <div style={{ fontWeight: 500, fontSize: 14 }}>{m.label}</div>
                      {sub && <div style={{ fontSize: 12, color: '#9CA3AF' }}>{sub}</div>}

                      {/* STATE 2: ineligible service */}
                      {ppState === 'ineligible' && (
                        <div className="info-box info-box-yellow" style={{ marginTop: 6, fontSize: 12 }}>
                          This service is not eligible for Post Paid
                        </div>
                      )}

                      {/* STATE 1: eligible but no PostPaid account */}
                      {ppState === 'no-account' && (
                        <div className="info-box info-box-yellow" style={{ marginTop: 6, fontSize: 12 }}>
                          <span>You don't have a PostPaid account yet. </span>
                          <span
                            onClick={() => navigate('/capital')}
                            style={{ color: '#FF4B4B', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                          >
                            Apply Now
                          </span>
                        </div>
                      )}

                      {/* STATE 4: eligible but account blocked */}
                      {ppState === 'blocked' && (
                        <div className="info-box info-box-red" style={{ marginTop: 6, fontSize: 12 }}>
                          <div>Your PostPaid bill is overdue. This service is unavailable.</div>
                          <div style={{ marginTop: 4 }}>
                            <span
                              onClick={() => navigate('/postpaid/pay-bill')}
                              style={{ color: '#FF4B4B', fontWeight: 600, cursor: 'pointer', textDecoration: 'underline' }}
                            >
                              Pay Now
                            </span>
                            <span> · Clear your due amount to continue using PostPaid.</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </label>
                </div>
              );
            })}
          </div>

          <div className="card" style={{ padding: 24, marginBottom: 20 }}>
            <div className="section-title" style={{ marginBottom: 16 }}>Order Review</div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Service Name</label>
                <input className="form-input" defaultValue={serviceName || 'Bill Payment'} key={serviceName} />
              </div>
              <div className="form-group">
                <label className="form-label">Beneficiary Number</label>
                <input className="form-input" defaultValue="1234567890" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Service</label>
                <input className="form-input" defaultValue={serviceName || 'Electricity'} key={serviceName ? serviceName + '-svc' : 'svc'} />
              </div>
              <div className="form-group">
                <label className="form-label">Company</label>
                <input className="form-input" defaultValue={company || 'City Power Co'} key={company} />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Fine Amount</label>
              <input className="form-input" defaultValue="100" />
            </div>
          </div>

          <div className="card" style={{ padding: 24 }}>
            <div className="section-title" style={{ marginBottom: 16 }}>Billing Detail</div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">First Name</label><input className="form-input" value={billing.firstName} onChange={e => setB('firstName', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">Last Name</label><input className="form-input" value={billing.lastName} onChange={e => setB('lastName', e.target.value)} /></div>
            </div>
            <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={billing.email} onChange={e => setB('email', e.target.value)} /></div>
            <div className="form-row">
              <div className="form-group"><label className="form-label">Country</label><input className="form-input" value={billing.country} onChange={e => setB('country', e.target.value)} /></div>
              <div className="form-group"><label className="form-label">City</label><input className="form-input" value={billing.city} onChange={e => setB('city', e.target.value)} /></div>
            </div>
            <div className="form-group"><label className="form-label">Address</label><input className="form-input" value={billing.address} onChange={e => setB('address', e.target.value)} /></div>
          </div>
        </div>

        {/* Right */}
        <div>
          <div className="card" style={{ padding: 20, marginBottom: 16 }}>
            <div className="section-title" style={{ marginBottom: 12 }}>Apply Coupon</div>
            <div style={{ display: 'flex', gap: 8 }}>
              <input className="form-input" style={{ flex: 1 }} placeholder="Promo code" value={coupon} onChange={e => setCoupon(e.target.value)} />
              <button className="btn btn-outline" style={{ whiteSpace: 'nowrap' }}>Apply</button>
            </div>
          </div>

          <div className="card" style={{ padding: 20 }}>
            <div className="section-title" style={{ marginBottom: 16 }}>Total Amount</div>
            {[
              ['Current Plan Balance', `AED ${subtotal}`],
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
              <span style={{ fontWeight: 800, fontSize: 18, color: '#FF4B4B' }}>AED {total}</span>
            </div>
            <button className="btn btn-primary btn-full" onClick={pay}>Pay Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
