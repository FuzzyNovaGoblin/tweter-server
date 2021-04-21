const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
   res.json(['😀', '😳', '🙄']);
});

router.get('/2/', (req, res) => {
   res.json(['😀', '😳', '😀', '😳', '😀', '😳', '🙄']);
});

module.exports = router;
