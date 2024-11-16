const express = require('express');
const auth = require('../modules/authentication.cjs');
const db = require('../modules/database.cjs');
const xp = require('../modules/xp.cjs');
const logger = require('../modules/logger.cjs');
const router = express.Router();

let client;
async function connectDB() {
    client = await db.connect();
}
connectDB();

router.use(auth.checkUser);

router.use((req, res, next) => {
    if (client == null) {
        res.status(500).send("Server starting");
    } else {
        next();
    }
});

router.get('/get', async (req, res) => {
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username});

    let user_avatars = [require('../data/Avatars.json')[0]];

    for (let i = 1; i < require('../data/Avatars.json').length; i++) {
        if (require('../data/Avatars.json')[i].unlockRequirements <= xp.getLevel(result.xp)) {
            user_avatars.push(require('../data/Avatars.json')[i]);
        } else {
            user_avatars.push({
                Locked:true,
                Requirement:require('../data/Avatars.json')[i].unlockRequirements,
                Name:"Locked",
                Description:"Unlock card at level "+require('../data/Avatars.json')[i].unlockRequirements,
            });
            if (Object.is(result.avatar, i)) {
                result.avatar = 0;
                await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$set:{avatar: 0}});
            }
        }
    }

    res.json({selected: require('../data/Avatars.json')[result.avatar], avatars: user_avatars});
});

router.post('/select', async (req, res) => {
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username});
    if (require('../data/Avatars.json')[req.body.newCard] && (Object.is(req.body.newCard, 0) || require('../data/Avatars.json')[req.body.newCard].unlockRequirements<=xp.getLevel(result.xp))) {

        await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$set:{avatar: req.body.newCard}});
        res.status(200).send("Action completed");

        logger.info(`'${req.user.username}' selected avatar with id ${req.body.newCard} (${require('../data/Avatars.json')[req.body.newCard].Name})`, "api/avatar/select");
    } else {
        res.status(500).send("invalid card");
    }
});

module.exports = router;