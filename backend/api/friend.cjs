const express = require('express');
const auth = require('../modules/authentication.cjs');
const db = require('../modules/database.cjs');
const xp = require('../modules/xp.cjs');
const logger = require('../modules/logger.cjs');
const avatar = require('../../shared/Avatars.json')
const router = express.Router();

var client;
async function connectDB() {
    client = await db.connect();
}
connectDB()

router.get('/get', auth.checkUser, async (req, res) => {
    let check = await client.db("communism_battlecards").collection("friends").find({users: {$elemMatch: {$eq: req.user.username}}}).toArray();

    if (check) {
        var rtn = []

        for (let i = 0; i < check.length; i++) {
            let un;
            if (check[i].users[0] == req.user.username)
                un = check[i].users[1]
            else
                un = check[i].users[0]
    
            let ud = await client.db("communism_battlecards").collection("accounts").findOne({username: un});
    
            rtn.push({
                username: ud.username,
                display_name: ud.display_name,
                level: xp.getLevel(ud.xp),
                avatar: avatar[ud.avatar]
            })
        }
        res.json(rtn)
    } else {
        res.json({})
    }
})

router.post('/searchForUsers', auth.checkUser, async (req, res) => {
    if (typeof req.body.search == "string") {
        let check = await client.db("communism_battlecards").collection("accounts").find({}).toArray();

        for (let i = 0; i < check.length; i++) {
            if (!(check[i].username.startsWith(req.body.search) || check[i].display_name.startsWith(req.body.search))) {
                check.splice(i,1);
                i--;
            }
        }

        check.sort((a, b) => {
            //sort:root
            if (a.root && !b.root) {
                return -1;
            } else if (b.root && !a.root) {
                return 1;
            }

            //sort:admin
            if (a.admin && !b.admin) {
                return -1;
            } else if (b.admin && !a.admin) {
                return 1;
            }

            //sort:username
            const usernameA = a.username;
            const usernameB = b.username;
        
            if (usernameA < usernameB) {
                return -1;
            } else if (usernameA > usernameB) {
                return 1;
            } else {
                return 0;
            }
        });

        let rtn = []

        for (let i = 0; i < check.length; i++) {
            rtn.push({
                username: check[i].username,
                display_name: check[i].display_name,
                level: xp.getLevel(check[i].xp),
                avatar: avatar[check[i].avatar]
            })
        }

        res.json(rtn)
    } else {
        res.status(500).send("Invalid Input")
    }
})

router.get('/getUser/:user', auth.checkUser, async (req, res) => {
    let check = await client.db("communism_battlecards").collection("accounts").findOne({username: req.params.user});
    if (check) {
        res.json({
            username: check.username,
            display_name: check.display_name,
            level: xp.getLevel(check.xp),
            avatar: avatar[check.avatar]
        })
    } else {
        res.status(404).send("User not found")
    }
})

router.post('/add', auth.checkUser, async (req, res) => {
    if (typeof req.body.user == "string") {
        let user = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});

        if (user) {
            let friendElement = await client.db("communism_battlecards").collection("friends").findOne({users: {$elemMatch: {$eq: req.user.username}, $elemMatch: {$eq: req.body.user}}});

            if (friendElement) {
                await client.db("communism_battlecards").collection("friends").updateOne({_id: friendElement._id}, {$set: {accept: {[req.user.username]: true}}})
                logger.warn(req.user.username + " accepted friend request with " + req.body.user,req.originalUrl)
                res.send("Updated successfully")
            } else {
                await client.db("communism_battlecards").collection("friends").insertOne({users: [req.user.username, req.body.user], accept: {[req.user.username]: true, [req.body.user]: false}})
                logger.warn(req.user.username + " sent friend request to " + req.body.user,req.originalUrl)
                res.send("Added successfully")
            }
        } else {
            res.status(500).send("User Does Not Exist")
        }
    } else {
        res.status(500).send("Invalid input")
    }
})

module.exports = router;