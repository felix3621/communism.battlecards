const express = require('express');
const router = express.Router();

router.use('/account', require('./account.cjs'))
router.use('/cards', require('./cards.cjs'))

module.exports = router;