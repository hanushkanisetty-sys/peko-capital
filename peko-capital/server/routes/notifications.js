const express = require('express');
const router = express.Router();
const store = require('../data/store');

router.get('/', (req, res) => {
  res.json(store.notifications);
});

router.post('/read/:id', (req, res) => {
  store.markRead(req.params.id);
  res.json({ success: true });
});

router.post('/read-all', (req, res) => {
  store.markAllRead();
  res.json({ success: true });
});

module.exports = router;
