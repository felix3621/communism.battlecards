const express = require('express');
const router = express.Router();
const auth = require('../authentication.cjs');
const db = require('../database.cjs');
const avatars = require('../Avatars.json');


var client;
async function connectDB() {
    client = await db.connect();
}
connectDB()

router.get('/get', auth.checkUser, async (req, res) => {
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username})

    res.json({selected: avatars[result.avatar], avatars: avatars})
})

router.post('/select', auth.checkUser, async (req, res) => {
    if (avatars[req.body.newCard]) {
        await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$set:{avatar: req.body.newCard}})
        res.json()
    } else {
        res.status(500).send("invalid card")
    }
})

module.exports = router;