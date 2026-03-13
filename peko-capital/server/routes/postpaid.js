const express = require('express');
const router = express.Router();
const store = require('../data/store');

router.get('/dashboard', (req, res) => {
  const transactions = store.postpaidTransactions;
  res.json({
    totalTransactions: transactions.length,
    totalSpent: store.getTotalSpent(),
    remainingCredit: store.availableCredit,
    thisMonthTotal: store.currentMonthTotal,
    currentMonthAmount: store.currentMonthTotal,
    transactions,
    statements: store.statements,
  });
});

router.get('/bill', (req, res) => {
  const transactions = store.postpaidTransactions;
  const total = store.getTotalSpent();

  const invoiceItems = transactions.slice(0, 10).map(t => {
    const words = t.merchant.split(' ');
    const initials = words.length >= 2
      ? words[0][0] + words[1][0]
      : t.merchant.slice(0, 2);
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#DDA0DD', '#F7B731', '#A29BFE'];
    const color = colors[t.id % colors.length];
    return { date: t.date, name: t.merchant, initials: initials.toUpperCase(), color, amount: t.amount };
  });

  res.json({
    billingPeriod: 'January 2026',
    totalTransactions: transactions.length,
    dueDate: '31 January 2026',
    dueAmount: total,
    invoiceItems,
  });
});

router.get('/statement', (req, res) => {
  const transactions = store.postpaidTransactions;
  const subtotal = store.getTotalSpent();
  const serviceFee = Math.round(subtotal * 0.025);

  res.json({
    period: '1st - 31st January 2026',
    paymentDueDate: '15 February 2026',
    from: {
      company: 'Peko Financial Services',
      email: 'billing@peko.com',
      website: 'www.peko.one',
    },
    billedTo: {
      company: 'SAVOLL LLC',
      address: 'Business Bay, Dubai, UAE',
      trn: 'TRN100234567890003',
    },
    accountSummary: {
      openingBalance: 0,
      amountPaid: subtotal,
      closingBalance: 0,
    },
    transactions: transactions.map(t => ({
      date: t.date,
      billType: t.category,
      merchant: t.merchant,
      amount: t.amount,
    })),
    subtotal,
    serviceFee,
    totalDue: subtotal + serviceFee,
  });
});

router.post('/confirm-payment', (req, res) => {
  const { merchantName, category, amount } = req.body;

  if (!merchantName || !amount || isNaN(Number(amount))) {
    return res.status(400).json({ success: false, error: 'merchantName and amount are required' });
  }

  const tx = store.addTransaction({
    merchant: merchantName,
    category: category || 'General',
    amount: Number(amount),
  });

  store.addNotification({
    type: 'payment',
    title: 'Payment Added to PostPaid',
    message: `Your payment of AED ${Number(amount).toLocaleString()} to ${merchantName} has been added to your PostPaid bill.`,
  });

  res.json({
    success: true,
    transactionId: tx.transactionId,
    newMonthlyTotal: store.currentMonthTotal,
    availableCredit: store.availableCredit,
    dueDate: '31 January 2026',
    transaction: tx,
  });
});

module.exports = router;
