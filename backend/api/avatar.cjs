const express = require('express');
const auth = require('../modules/authentication.cjs');
const db = require('../modules/database.cjs');
const xp = require('../modules/xp.cjs');
const logger = require('../modules/logger.cjs');
const avatars = require('../../shared/Avatars.json');
const router = express.Router();

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

        logger.debug(
            req.user.username + ": old_avatar="+result.avatar+", new_avatar="+req.body.newCard,
            req.originalUrl
        )

        await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$set:{avatar: req.body.newCard}})
        res.status(200).send("Action completed")
    } else {
        res.status(500).send("invalid card")
    }
})

module.exports = router;