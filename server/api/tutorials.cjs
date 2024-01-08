const express = require('express');
const router = express.Router();
const auth = require('../authentication.cjs');
const path = require('path');
const fs = require('fs').promises;

router.get('/get/:tutorial', auth.checkUser, async (req, res) => {
    if (req.params.tutorial) {
        const filepath = path.join(__dirname,"..","Tutorials",req.params.tutorial+".json")

        try {
            await fs.access(filepath);
            res.sendFile(filepath);
        } catch (error) {
            console.error(error);
            res.status(404).send('File not found');
        }
    } else {
        res.status(500).send("invalid tutorial")
    }
})

module.exports = router;