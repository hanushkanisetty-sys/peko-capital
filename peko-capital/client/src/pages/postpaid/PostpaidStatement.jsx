import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const MOCK_DATA = {
  period: 'January 2026',
  paymentDueDate: '31 Jan 2026',
  from: {
    company: 'Peko Financial Services',
    email: 'billing@peko.ae',
    website: 'www.peko.ae',
  },
  billedTo: {
    company: 'SAVOLL LLC',
    address: 'Dubai, United Arab Emirates',
    trn: '100234567800003',
  },
  accountSummary: {
    openingBalance: 0,
    amountPaid: 4400,
    closingBalance: 2450,
  },
  transactions: [
    { date: '15 Jan 2026', billType: 'Vendor Payment', merchant: 'Office Supplies Ltd', amount: 850 },
    { date: '10 Jan 2026', billType: 'SaaS Subscription', merchant: 'Cloud Services Inc', amount: 1200 },
    { date: '05 Jan 2026', billType: 'Marketing', merchant: 'Marketing Agency', amount: 400 },
  ],
  subtotal: 2450,
  serviceFee: 0,
  totalDue: 2450,
};

export default function PostpaidStatement() {
  const navigate = useNavigate();
  const location = useLocation();
  const isDownload = new URLSearchParams(location.search).get('view') === 'download';
  const [data, setData] = useState(MOCK_DATA);

  useEffect(() => {
    axios.get('/api/postpaid/statement').then(r => setData(r.data)).catch(() => {});
  }, []);

  return (
    <div style={{ maxWidth: 760, margin: '0 auto' }}>
      {/* Breadcrumb */}
      <div style={{ fontSize: 13, color: '#9CA3AF', marginBottom: 20 }}>
        <span style={{ cursor: 'pointer', color: '#FF4B4B' }} onClick={() => navigate('/postpaid')}>PostPaid</span>
        <span> &rsaquo; </span>
        <span>Monthly Statement</span>
      </div>

      <div className="card" style={{ padding: 40 }}>
        {/* Doc Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 32 }}>
          <div>
            <h2 style={{ fontWeight: 800, fontSize: 22 }}>Monthly Statement</h2>
            <p style={{ color: '#6B7280', fontSize: 13, marginTop: 4 }}>Period: {data.period}</p>
            <p style={{ color: '#6B7280', fontSize: 13 }}>Payment Due: {data.paymentDueDate}</p>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 22, fontWeight: 800, color: '#FF4B4B' }}>Peko.</div>
          </div>
        </div>

        <div className="divider" />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, marginBottom: 28 }}>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 8 }}>From</div>
            <div style={{ fontWeight: 600 }}>{data.from.company}</div>
            <div style={{ color: '#6B7280', fontSize: 13 }}>{data.from.email}</div>
            <div style={{ color: '#6B7280', fontSize: 13 }}>{data.from.website}</div>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#9CA3AF', textTransform: 'uppercase', marginBottom: 8 }}>Billed To</div>
            <div style={{ fontWeight: 600 }}>{data.billedTo.company}</div>
            <div style={{ color: '#6B7280', fontSize: 13 }}>{data.billedTo.address}</div>
            <div style={{ color: '#6B7280', fontSize: 13 }}>TRN: {data.billedTo.trn}</div>
          </div>
        </div>

        <div className="divider" />

        <div style={{ marginBottom: 28 }}>
          <div className="section-title" style={{ marginBottom: 12 }}>Account Summary</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <tbody>
              {[
                ['Opening Balance', `AED ${data.accountSummary.openingBalance.toLocaleString()}`],
                ['Amount Paid', `AED ${data.accountSummary.amountPaid.toLocaleString()}`],
                ['Closing Balance', `AED ${data.accountSummary.closingBalance.toLocaleString()}`],
              ].map(([l, v]) => (
                <tr key={l}><td style={{ padding: '8px 0', color: '#6B7280', fontSize: 13 }}>{l}</td><td style={{ textAlign: 'right', fontWeight: 500 }}>{v}</td></tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="divider" />

        <div style={{ marginBottom: 28 }}>
          <div className="section-title" style={{ marginBottom: 12 }}>Transaction Details</div>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead><tr><th style={{ textAlign: 'left', paddingBottom: 8, color: '#9CA3AF', fontSize: 12, fontWeight: 600 }}>Date</th><th style={{ color: '#9CA3AF', fontSize: 12, fontWeight: 600 }}>Bill Type</th><th style={{ color: '#9CA3AF', fontSize: 12, fontWeight: 600 }}>Merchant</th><th style={{ textAlign: 'right', color: '#9CA3AF', fontSize: 12, fontWeight: 600 }}>Amount</th></tr></thead>
            <tbody>
              {data.transactions.map((t, i) => (
                <tr key={i} style={{ borderTop: '1px solid #F9FAFB' }}>
                  <td style={{ padding: '10px 0', fontSize: 13 }}>{t.date}</td>
                  <td style={{ fontSize: 13 }}>{t.billType}</td>
                  <td style={{ fontSize: 13 }}>{t.merchant}</td>
                  <td style={{ textAlign: 'right', fontSize: 13, fontWeight: 500 }}>AED {t.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="divider" />

        <div style={{ textAlign: 'right' }}>
          {[
            ['Subtotal', `AED ${data.subtotal.toLocaleString()}`],
            ['Service Fee', `AED ${data.serviceFee.toLocaleString()}`],
          ].map(([l, v]) => (
            <div key={l} style={{ display: 'flex', justifyContent: 'flex-end', gap: 32, marginBottom: 6 }}>
              <span style={{ color: '#6B7280', fontSize: 13 }}>{l}</span>
              <span style={{ fontWeight: 500, minWidth: 100, textAlign: 'right' }}>{v}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 32, marginTop: 8, paddingTop: 8, borderTop: '2px solid #1A1A1A' }}>
            <span style={{ fontWeight: 700 }}>Total Due</span>
            <span style={{ fontWeight: 800, fontSize: 18, minWidth: 100, textAlign: 'right' }}>AED {data.totalDue.toLocaleString()}</span>
          </div>
        </div>

        {/* Actions */}
        <div style={{ marginTop: 28 }}>
          {isDownload ? (
            <div style={{ display: 'flex', gap: 12 }}>
              <button className="btn btn-primary" style={{ flex: 1 }}>Download</button>
              <button className="btn btn-outline" style={{ flex: 1 }}>Share</button>
            </div>
          ) : (
            <button className="btn btn-primary btn-full" onClick={() => navigate('/checkout')}>
              Pay Now
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
