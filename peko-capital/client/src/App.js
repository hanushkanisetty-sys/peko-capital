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

window.onerror = function(msg, src, line) { document.title = msg + ' L:' + line; };

export default function App() {
  return (
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/capital" replace />} />
          <Route path="/" element={<Layout />}>
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
  );
}
