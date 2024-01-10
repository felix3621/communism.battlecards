const express = require('express');
const router = express.Router();
const auth = require('../authentication.cjs');
const db = require('../database.cjs');
const avatars = require('../Avatars.json');
const xp = require('../xp.cjs');


var client;
async function connectDB() {
    client = await db.connect();
}
connectDB()

router.get('/get', auth.checkUser, async (req, res) => {
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username})

    let user_avatars = [avatars[0]]

    for (let i = 1; i < avatars.length; i++) {
        if (avatars[i].unlockRequirements <= xp.getLevel(result.xp)) {
            user_avatars.push(avatars[i])
        } else {
            user_avatars.push({
                Locked:true,
                Requirement:avatars[i].unlockRequirements,
                Name:"Locked",
                Description:"Unlock card at level "+avatars[i].unlockRequirements,
            })
            if (result.avatar == i) {
                result.avatar = 0;
                await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$set:{avatar: 0}})
            }
        }
    }

    res.json({selected: avatars[result.avatar], avatars: user_avatars})
})

router.post('/select', auth.checkUser, async (req, res) => {
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username})
    if (avatars[req.body.newCard] && (req.body.newCard == 0 || avatars[req.body.newCard].unlockRequirements<=xp.getLevel(result.xp))) {
        await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$set:{avatar: req.body.newCard}})
        res.status(200).send("Action completed")
    } else {
        res.status(500).send("invalid card")
    }
})

module.exports = router;