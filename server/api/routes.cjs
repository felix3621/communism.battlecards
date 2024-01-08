const express = require('express');
const router = express.Router();

router.use('/account', require('./account.cjs'))
router.use('/cards', require('./cards.cjs'))
router.use('/avatar', require('./avatar.cjs'))
router.use('/tutorials', require('./tutorials.cjs'))
module.exports = router;