const express = require('express');
const router = express.Router();

router.use('/account', require('./account.cjs'))
router.use('/cards', require('./cards.cjs'))
router.use('/avatar', require('./avatar.cjs'))
module.exports = router;