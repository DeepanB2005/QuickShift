// src/routes/payments.js
const express = require('express');
const router = express.Router();

// Example GET endpoint for payments
router.get('/', (req, res) => {
  res.send('Payments route is working!');
});

module.exports = router;
