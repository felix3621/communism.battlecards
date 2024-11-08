const express = require('express');
const he = require('he');
const auth = require('../modules/authentication.cjs');
const db = require('../modules/database.cjs');
const fr = require('../modules/fileReader.cjs');
const logger = require('../modules/logger.cjs');
const router = express.Router();

let client;
async function connectDB() {
    client = await db.connect();
}
connectDB()

router.use((req, res, next) => {
    if (client == null) {
        res.status(500).send("Server starting");
    } else {
        next();
    }
})

router.post('/setDisplayName', auth.checkUser, async (req, res) => {
    if (typeof req.body.display_name == "string") {
        req.body.display_name = he.encode(req.body.display_name);
        await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$set: {display_name: req.body.display_name}});
        res.send(req.body.display_name);
        logger.info(`'${req.user.username}' changed display name from '${req.user.display_name}' to '${req.body.display_name}'`, "api/account/setDisplayName")
    } else {
        res.status(500).send("Invalid Input");
    }
})

router.post('/setPassword', auth.checkUser, async (req, res) => {
    if (typeof req.body.password == "string" && typeof req.body.newPassword == "string") {
        let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username});

        if (Object.is(result.password, auth.encrypt(req.body.password))) {
            await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$set: {password: auth.encrypt(req.body.newPassword)}});

            let userToken = auth.encrypt(JSON.stringify([auth.encrypt(req.user.username), auth.encrypt(auth.encrypt(req.body.newPassword))]));
            res.cookie('userToken', userToken, { httpOnly: true });
            res.send("Password Changed Successfully");
            logger.info(`'${req.user.username}' changed password`, "api/account/setPassword")
        } else {
            res.status(401).send("Invalid password");
        }
    } else {
        res.status(500).send("Invalid Input");
    }
})

router.post('/login', auth.checkUser, (req, res) => {
    res.json(req.user);
})
router.post('/signup', async(req, res) => {
    let settings = JSON.parse(fr.read('../settings.json'));
    let username = he.encode(req.body.username);
    let password = req.body.password;
    let display_name = he.encode(req.body.display_name);

    if (username && password && display_name) {
        password = auth.hash(password);
        let base = client.db("communism_battlecards").collection("accounts");
        let check = await base.findOne({username: username});
        if (!check && !(/^test_\d+/).test(username)) { //does not exist AND will not interfere with testusers
            let user = {
                username: username,
                password: password,
                display_name: display_name,
                avatar: settings.defaultAvatar,
                deck: settings.defaultDeck,
                inventory: settings.defaultInventory,
                xp: settings.defaultXp
            };

            let result = await base.insertOne(user);

            let userToken = auth.encrypt(JSON.stringify([auth.encrypt(username), auth.encrypt(password)]));
            res.cookie('userToken', userToken, { httpOnly: true });
            res.json(result);

            delete user.password;

            logger.info(`User created: ${JSON.stringify(user, null, 2)}`, "api/account/signup");
        } else {
            res.status(403).send("Username already exists");
        }
    } else {
        res.status(500).send("Internal server error");
    }
})
router.post('/logout', (req, res) => {
    // cookie be gone
    res.clearCookie('userToken');
    res.json({ message: 'Logout successful' });
})
router.post('/clearRewards', auth.checkUser, async (req, res) => {
    await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$unset:{previousGame:'',previousTournament:'',newCards:'',rewards: {}}});
})

module.exports = router;