const express = require('express');
const path = require('path');
const fs = require('fs').promises;
const auth = require('../modules/authentication.cjs');
const router = express.Router();

router.get('/get', auth.checkUser, async (req, res) => {
    const filepath = path.join(__dirname,"../../shared/emoji.json")

    try {
        await fs.access(filepath);
        res.sendFile(filepath);
    } catch (error) {
        console.error(error);
        res.status(404).send('File not found');
    }
})

module.exports = router;