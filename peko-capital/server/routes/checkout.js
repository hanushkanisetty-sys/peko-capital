const express = require('express');
const router = express.Router();
const store = require('../data/store');

router.get('/postpaid-status', (req, res) => {
  res.json({
    eligible: true,
    availableCredit: store.availableCredit,
    currentMonthBill: store.currentMonthTotal,
    dueDate: '31 Jan 2026',
  });
});

module.exports = router;
