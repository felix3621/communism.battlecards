const express = require('express');
const router = express.Router();
const auth = require('../authentication.cjs');
const db = require('../database.cjs');
const fr = require('../fileReader.cjs');
const logger = require('../logger.cjs');

var client;
async function connectDB() {
    client = await db.connect();
}
connectDB()

router.post('/login', auth.checkUser, (req, res) => {
    res.json(req.user)
})
router.post('/signup', async(req, res) => {
    let settings = JSON.parse(fr.read('./settings.json'))
    let username = req.body.username;
    let password = req.body.password;
    let display_name = req.body.display_name;

    if (username && password && display_name) {
        password = auth.encrypt(password)
        let base = client.db("communism_battlecards").collection("accounts")
        let check = await base.findOne({username: username})
        if (!check && !(/^test_\d+/).test(username)) { //does not exist AND will not interfere with testusers
            let user = {
                username: username,
                password: password,
                display_name: display_name,
                avatar: settings.defaultAvatar,
                deck: settings.defaultDeck,
                inventory: settings.defaultInventory,
                xp: settings.defaultXp
            }

            logger.debug(
                JSON.stringify(user),
                req.originalUrl
            )

            let result = await base.insertOne(user)

            let userToken = auth.encrypt(JSON.stringify([auth.encrypt(username), auth.encrypt(password)]))
            res.cookie('userToken', userToken, { httpOnly: true });
            res.json(result)
        } else {
            res.status(403).send("Username already exists")
        }
    } else {
        res.status(500).send("Internal server error")
    }
})
router.post('/logout', (req, res) => {
    // cookie be gone
    res.clearCookie('userToken');
    res.json({ message: 'Logout successful' });
})
router.post('/clearRewards', auth.checkUser, async (req, res) => {
    await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$unset:{previousGame:'',previousTournament:'',newCards:''}})
})

module.exports = router;