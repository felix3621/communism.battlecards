const express = require('express');
const db = require("../modules/database.cjs");
const auth = require('../modules/authentication.cjs');
const fr = require('../modules/fileReader.cjs');
const logger = require('../modules/logger.cjs');
const router = express.Router();

let client;
async function connectDB() {
    client = await db.connect();
}
connectDB();

router.use((req, res, next) => {
    if (client == null) {
        res.status(500).send("Server starting");
    } else {
        next();
    }
})

router.use(async (req, res, next) => {
    try {
        let settings = JSON.parse(fr.read('../settings.json'));
        if (Object.is(settings.lockdown, true)) {
            try {
                if (req.body.username && req.body.password) {
                    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.username, password: auth.encrypt(req.body.password)});
                    if (result && (Object.is(result.admin, true) || Object.is(result.root, true))) {
                        let userToken = auth.encrypt(JSON.stringify([auth.encrypt(req.body.username), auth.encrypt(auth.encrypt(req.body.password))]));
                        res.cookie('userToken', userToken, { httpOnly: true });

                        let logMsg;
                        if (Object.is(result.root, true))
                            logMsg = "Root user";
                        else if (Object.is(result.admin, true))
                            logMsg = "Admin user";
                        logger.warn(`${logMsg} '${req.body.username}' logged in during lockdown`, "api-routes");

                        return next()
                    }
                } else if (req.cookies && req.cookies.userToken) {
                    let token = JSON.parse(auth.decrypt(req.cookies.userToken));
                    let username = auth.decrypt(token[0]);
                    let password = auth.decrypt(token[1]);
                    
                    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: username, password: password});
                    if (result && (Object.is(result.admin, true) || Object.is(result.root, true))) {
                        let userToken = auth.encrypt(JSON.stringify([auth.encrypt(username), auth.encrypt(password)]));
                        res.cookie('userToken', userToken, { httpOnly: true });

                        return next();
                    }
                }
                res.status(401).send("System Lockdown");
            } catch (e) {
                res.status(401).send("System Lockdown");
            }
        } else {
            return next();
        }
    } catch (e) {
        return next();
    }
})

router.get('/ping', (req, res) => {
    // Respond to health check
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is online');
});

router.use('/account', require('./account.cjs'));
router.use('/cards', require('./cards.cjs'));
router.use('/avatar', require('./avatar.cjs'));
router.use('/tutorials', require('./tutorials.cjs'));
router.use('/admin', require('./admin.cjs'));
router.use('/friend', require('./friend.cjs'));
router.use('/emoji', require('./emoji.cjs'));
router.use('/data', require('./data.cjs'));
module.exports = router;