import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastProvider } from './components/ToastContext';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import CapitalLanding from './pages/capital/CapitalLanding';
import EligibilityForm from './pages/capital/EligibilityForm';
import EligibleScreen from './pages/capital/EligibleScreen';
import NotEligibleScreen from './pages/capital/NotEligibleScreen';
import CapitalDashboard from './pages/capital/CapitalDashboard';
import PostpaidDashboard from './pages/postpaid/PostpaidDashboard';
import PostpaidBill from './pages/postpaid/PostpaidBill';
import PostpaidStatement from './pages/postpaid/PostpaidStatement';
import PostpaidPayBill from './pages/postpaid/PostpaidPayBill';
import PostpaidPayBillSuccess from './pages/postpaid/PostpaidPayBillSuccess';
import BillPayments from './pages/BillPayments';
import Checkout from './pages/checkout/Checkout';
import PostpaidConfirm from './pages/checkout/PostpaidConfirm';
import PostpaidProcessing from './pages/checkout/PostpaidProcessing';
import PostpaidSuccess from './pages/checkout/PostpaidSuccess';
import CheckoutSuccess from './pages/checkout/CheckoutSuccess';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 40, textAlign: 'center' }}>
          <h2 style={{ fontWeight: 700, marginBottom: 12 }}>Something went wrong</h2>
          <p style={{ color: '#6B7280', marginBottom: 20 }}>Please refresh the page or try again later.</p>
          <button
            style={{ background: '#FF4B4B', color: '#fff', border: 'none', borderRadius: 8, padding: '10px 24px', cursor: 'pointer', fontWeight: 600 }}
            onClick={() => this.setState({ hasError: false })}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="capital" element={<CapitalLanding />} />
              <Route path="capital/eligibility" element={<EligibilityForm />} />
              <Route path="capital/eligible" element={<EligibleScreen />} />
              <Route path="capital/not-eligible" element={<NotEligibleScreen />} />
              <Route path="capital/dashboard" element={<CapitalDashboard />} />
              <Route path="postpaid" element={<PostpaidDashboard />} />
              <Route path="postpaid/bill" element={<PostpaidBill />} />
              <Route path="postpaid/statement" element={<PostpaidStatement />} />
              <Route path="postpaid/pay-bill" element={<PostpaidPayBill />} />
              <Route path="postpaid/pay-bill-success" element={<PostpaidPayBillSuccess />} />
              <Route path="bill-payments" element={<BillPayments />} />
              <Route path="checkout" element={<Checkout />} />
              <Route path="checkout/postpaid-confirm" element={<PostpaidConfirm />} />
              <Route path="checkout/postpaid-processing" element={<PostpaidProcessing />} />
              <Route path="checkout/postpaid-success" element={<PostpaidSuccess />} />
              <Route path="checkout/success" element={<CheckoutSuccess />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </ErrorBoundary>
  );
}
