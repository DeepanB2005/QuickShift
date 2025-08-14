// src/routes/bookings.js
const express = require('express');
const router = express.Router();

// Example GET endpoint for bookings
router.get('/', (req, res) => {
  res.send('Bookings route is working!');
});

module.exports = router;
