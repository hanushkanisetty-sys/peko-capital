const express = require('express');
const router = express.Router();

router.get('/dashboard', (req, res) => {
  res.json({
    totalPayments: 247500,
    activeProducts: 3,
    upcomingPayments: 247500,
    availableCredit: 247500,
    totalCredit: 247500,
    recentActivity: [
      { date: '2025-01-15', product: 'PostPaid', description: 'City Power Company', amount: 789, status: 'Completed' },
      { date: '2025-01-12', product: 'Peko Flex', description: 'Office Supplies Ltd', amount: 450, status: 'Completed' },
      { date: '2025-01-10', product: 'Peko Fast', description: 'Logistics Partner', amount: 1200, status: 'Completed' },
      { date: '2025-01-08', product: 'PostPaid', description: 'Software License', amount: 299, status: 'Completed' },
      { date: '2025-01-05', product: 'Peko Flex', description: 'Travel Booking', amount: 3200, status: 'Completed' },
    ],
    chartData: [
      { month: 'Aug', amount: 18000 },
      { month: 'Sep', amount: 24000 },
      { month: 'Oct', amount: 21000 },
      { month: 'Nov', amount: 32000 },
      { month: 'Dec', amount: 28000 },
      { month: 'Jan', amount: 35000 },
    ],
    productUsage: [
      { name: 'PostPaid', value: 45 },
      { name: 'Peko Flex', value: 30 },
      { name: 'Peko Fast', value: 25 },
    ]
  });
});

module.exports = router;
