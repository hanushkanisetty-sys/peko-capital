const express = require('express');
const router = express.Router();

router.post('/check', (req, res) => {
  const { uaeRegistered, vatRegistered, fundsRaised, amount } = req.body;
  if (uaeRegistered === true || uaeRegistered === 'true') {
    return res.json({ eligible: true });
  }
  res.json({
    eligible: false,
    reasons: [
      'Your company is not registered in the UAE',
      'VAT registration is required for eligibility',
      'Additional documentation may be needed'
    ]
  });
});

module.exports = router;
