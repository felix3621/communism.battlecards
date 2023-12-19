const express = require('express');
const router = express.Router();
const auth = require('../authentication.cjs');
const db = require('../database.cjs');
const avatars = require('../Avatars.json');

router.get('/get', auth.checkUser, async (req, res) => {
    let client = await db.connect()
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username})
    await client.close()

    res.json({selected: avatars[result.avatar], avatars: avatars})
})

router.post('/select', auth.checkUser, async (req, res) => {
    let client = await db.connect()

    if (avatars[req.body.newCard]) {
        await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$set:{avatar: req.body.newCard}})
        res.json()
    } else {
        res.status(500).send("invalid card")
    }
    await client.close()
})

module.exports = router;