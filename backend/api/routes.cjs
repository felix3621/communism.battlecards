const express = require('express');
const db = require("../modules/database.cjs");
const auth = require('../modules/authentication.cjs');
const fr = require('../modules/fileReader.cjs');
const router = express.Router();

var client;
async function connectDB() {
    client = await db.connect();
}
connectDB()

router.use(async (req, res, next) => {
    try {
        let settings = JSON.parse(fr.read('../settings.json'))
        if (settings.lockdown == true) {
            try {
                if (req.body.username && req.body.password) {
                    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.username, password: auth.encrypt(req.body.password)})
                    if (result && (result.admin == true || result.root == true)) {
                        let userToken = auth.encrypt(JSON.stringify([auth.encrypt(req.body.username), auth.encrypt(auth.encrypt(req.body.password))]))
                        res.cookie('userToken', userToken, { httpOnly: true });

                        return next()
                    }
                } else if (req.cookies && req.cookies.userToken) {
                    let token = JSON.parse(auth.decrypt(req.cookies.userToken))
                    let username = auth.decrypt(token[0])
                    let password = auth.decrypt(token[1])
                    
                    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: username, password: password})
                    if (result && (result.admin == true || result.root == true)) {
                        let userToken = auth.encrypt(JSON.stringify([auth.encrypt(username), auth.encrypt(password)]))
                        res.cookie('userToken', userToken, { httpOnly: true });

                        return next()
                    }
                }
                res.status(401).send("System Lockdown");
            } catch (e) {
                res.status(401).send("System Lockdown");
            }
        } else {
            return next()
        }
    } catch (e) {
        return next()
    }
})

router.use('/account', require('./account.cjs'))
router.use('/cards', require('./cards.cjs'))
router.use('/avatar', require('./avatar.cjs'))
router.use('/tutorials', require('./tutorials.cjs'))
router.use('/admin', require('./admin.cjs'))
router.use('/friend', require('./friend.cjs'))
module.exports = router;