import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MODAL_CONTENT = {
  'Peko Postpaid': {
    title: 'Peko Postpaid',
    subtitle: 'One credit line for all your business needs.',
    sections: [
      {
        heading: 'What is Peko Postpaid?',
        body: 'Peko Postpaid gives your business a single, flexible credit line that you can use across all Peko services—so you can operate now and settle everything in one simple payment at the end of the month. Instead of juggling multiple payments, you get a unified limit that covers expenses like subscriptions, travel, bill payments, and more within the Peko ecosystem.',
      },
      {
        heading: 'How Peko Postpaid Works',
        body: 'Use your Peko Postpaid credit line to pay for any eligible Peko service during the month. All your usage is tracked in real time in a single, easy-to-read statement. At month-end, you receive one consolidated bill and pay it in full by the due date—no scattered invoices or messy reconciliations.',
      },
      {
        heading: 'Why Businesses Love It',
        body: 'One shared credit line for all your Peko services, instead of separate limits or cards. Smoother cash flow by aligning payment timing with your incoming revenues. Less admin for finance teams with a single monthly bill and streamlined accounting.',
      },
      {
        heading: 'Who Is It For?',
        body: 'Peko Postpaid is ideal for SMEs and growing businesses that manage multiple operational expenses through Peko and want simpler cash flow and fewer payment headaches.',
      },
    ],
  },
  'Peko Flex': {
    title: 'Peko Flex',
    subtitle: 'Give your business true buy now, pay later power on every invoice.',
    sections: [
      {
        heading: 'What is Peko Flex?',
        body: 'Peko Flex lets you send or receive invoices today and spread payments over easy installments, so you can manage cash flow without slowing down operations. It brings BNPL-style flexibility to businesses, helping you cover expenses, manage suppliers, and smooth out working capital gaps.',
      },
      {
        heading: 'How Peko Flex Works',
        body: 'Choose Peko Flex when paying eligible business invoices. Convert the invoice into a simple installment plan over a predefined schedule. Repay in fixed, predictable installments while keeping your cash free for other priorities.',
      },
      {
        heading: 'Why Businesses Use It',
        body: 'Improve cash flow by avoiding large one-off payments while still paying suppliers on time. Reduce stress around short-term liquidity, especially during growth or seasonal peaks. Enjoy a streamlined, digital process instead of traditional, slow loan applications.',
      },
      {
        heading: 'Perfect For Modern SMEs',
        body: 'Peko Flex is designed for SMEs that want more control over when and how they pay, without giving up speed or reliability.',
      },
    ],
  },
  'Peko Fast': {
    title: 'Peko Fast',
    subtitle: 'Turn Invoices Into Instant Cash Flow.',
    sections: [
      {
        heading: 'What is Peko Fast?',
        body: 'Short on funds for an invoice? Peko Fast unlocks cash tied up in unpaid invoices so you can pay suppliers, meet payroll, and grab new opportunities without waiting 30–90 days to get paid.',
      },
      {
        heading: 'How Peko Fast Helps',
        body: 'Get a large percentage of your invoice value advanced quickly, instead of waiting for customer payment terms to run their course. Use that working capital to keep operations running smoothly, fund growth, or negotiate better terms with your own suppliers. Maintain your relationship with your customers while Peko Fast works in the background to support your cash flow.',
      },
      {
        heading: 'Key Benefits',
        body: 'Fast access to funds, typically within days of submitting eligible invoices. Flexible usage – choose which invoices to finance and scale as your business grows. No need to pledge property or heavy assets; your invoices act as the primary collateral.',
      },
    ],
  },
};

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

function ProductModal({ product, onClose }) {
  const content = MODAL_CONTENT[product];
  if (!content) return null;

  return (
    <div
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 1000, padding: '20px',
        animation: 'fadeIn 0.2s ease',
      }}
    >
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
      `}</style>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: '#fff', borderRadius: 12, padding: 40,
          maxWidth: 600, width: '100%', position: 'relative',
          maxHeight: '85vh', overflowY: 'auto',
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: 16, right: 16,
            background: 'none', border: 'none', fontSize: 24,
            cursor: 'pointer', color: '#6B7280', lineHeight: 1,
          }}
        >
          ×
        </button>

        <h2 style={{ fontWeight: 800, fontSize: 22, color: '#1A1A1A', marginBottom: 6 }}>
          {content.title}
        </h2>
        <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 24, lineHeight: 1.5 }}>
          {content.subtitle}
        </p>

        {content.sections.map((s, i) => (
          <div key={i}>
            <div style={{ fontWeight: 600, fontSize: 16, color: '#1A1A1A', marginTop: i === 0 ? 0 : 20 }}>
              {s.heading}
            </div>
            <p style={{ fontSize: 14, color: '#6B7280', lineHeight: 1.6, marginTop: 6 }}>
              {s.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function CapitalLanding() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(null);

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
            <button className="btn btn-outline-red btn-sm" onClick={() => setOpenModal(p.name)}>Learn more</button>
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

      {openModal && <ProductModal product={openModal} onClose={() => setOpenModal(null)} />}
    </div>
  );
}
