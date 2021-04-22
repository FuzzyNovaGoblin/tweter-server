const express = require('express');

const mysqlFunctions = require('./mysqlFunctions');

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'Hello, World!'
  });
});

router.use('/sql', mysqlFunctions);

module.exports = router;
