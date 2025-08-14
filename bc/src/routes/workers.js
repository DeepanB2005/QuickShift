// src/routes/workers.js
const express = require('express');
const router = express.Router();

// Example GET endpoint for workers
router.get('/', (req, res) => {
  res.send('Workers route is working!');
});

module.exports = router;
