const express = require('express')
const router = express.Router();

router.get('/cards', (req, res) => {
    res.json(require('../data/Cards.json'));
})

router.get('/avatars', (req, res) => {
    res.json(require('../data/Avatars.json'));
})

module.exports = router;
