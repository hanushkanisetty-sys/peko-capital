// In-memory store — resets on server restart (fine for demo)
const store = {
  availableCredit: 50000,
  totalCreditLimit: 50000,
  currentMonthTotal: 2500,

  postpaidTransactions: [
    {
      id: 1,
      transactionId: 'PP-INV001',
      date: '2025-01-15',
      invoiceNumber: 'INV-001',
      merchant: 'City Power Company',
      category: 'Electricity',
      amount: 789,
      status: 'Paid',
    },
    {
      id: 2,
      transactionId: 'PP-INV002',
      date: '2025-01-12',
      invoiceNumber: 'INV-002',
      merchant: 'Dubai Water',
      category: 'Utilities',
      amount: 450,
      status: 'Paid',
    },
    {
      id: 3,
      transactionId: 'PP-INV003',
      date: '2025-01-10',
      invoiceNumber: 'INV-003',
      merchant: 'Etisalat',
      category: 'Telecom',
      amount: 1261,
      status: 'Paid',
    },
  ],

  statements: [
    { id: 1, date: '2025-01-31', name: 'January 2026', amount: 789, status: 'Paid' },
    { id: 2, date: '2024-12-31', name: 'December 2025', amount: 1200, status: 'Paid' },
    { id: 3, date: '2024-11-30', name: 'November 2025', amount: 980, status: 'Paid' },
  ],

  notifications: [
    {
      id: 1,
      type: 'payment',
      title: 'Payment Added to PostPaid',
      message: 'Your DEWA payment of AED 789 has been added to your January 2026 PostPaid bill.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: 2,
      type: 'bill',
      title: 'Bill Due Soon',
      message: 'Your January 2026 PostPaid bill of AED 2,459 is due on 31 January 2026.',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: 3,
      type: 'eligibility',
      title: 'Eligibility Approved',
      message: 'Congratulations! You have been approved for Peko PostPaid with a credit limit of AED 50,000.',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
    {
      id: 4,
      type: 'system',
      title: 'Payment Completed',
      message: 'Your payment to City Power Company of AED 789 was completed successfully.',
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      read: false,
    },
  ],
};

// ── Transaction helpers ──────────────────────────────────────────────────────

store.getTotalSpent = () =>
  store.postpaidTransactions.reduce((sum, t) => sum + t.amount, 0);

store.addTransaction = ({ merchant, category, amount }) => {
  const newId = store.postpaidTransactions.length + 1;
  const txId = 'PP-' + Math.random().toString(36).slice(2, 11).toUpperCase();
  const today = new Date().toISOString().split('T')[0];

  const tx = {
    id: newId,
    transactionId: txId,
    date: today,
    invoiceNumber: `INV-${String(newId).padStart(3, '0')}`,
    merchant,
    category: category || 'General',
    amount,
    status: 'Paid',
  };

  store.postpaidTransactions.unshift(tx);
  store.currentMonthTotal += amount;
  store.availableCredit = Math.max(0, store.availableCredit - amount);

  return tx;
};

// ── Notification helpers ─────────────────────────────────────────────────────

store.addNotification = ({ type, title, message }) => {
  const newId = store.notifications.length
    ? Math.max(...store.notifications.map(n => n.id)) + 1
    : 1;
  const notif = {
    id: newId,
    type,
    title,
    message,
    timestamp: new Date().toISOString(),
    read: false,
  };
  store.notifications.unshift(notif);
  return notif;
};

store.markRead = (id) => {
  const notif = store.notifications.find(n => n.id === Number(id));
  if (notif) notif.read = true;
};

store.markAllRead = () => {
  store.notifications.forEach(n => { n.read = true; });
};

module.exports = store;
