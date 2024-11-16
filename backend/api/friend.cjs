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
connectDB()

router.use(auth.checkUser);

router.use((req, res, next) => {
    if (client == null) {
        res.status(500).send("Server starting");
    } else {
        next();
    }
})

router.get('/get', async (req, res) => {
    let check = await client.db("communism_battlecards").collection("friends").find({users: {$elemMatch: {$eq: req.user.username}}}).toArray();

    if (check) {
        let rtn = []

        for (let i = 0; i < check.length; i++) {
            if (check[i].accept[check[i].users[0]] && check[i].accept[check[i].users[1]]) {
                let un;
                if (Object.is(check[i].users[0], req.user.username))
                    un = check[i].users[1];
                else
                    un = check[i].users[0];
        
                let ud = await client.db("communism_battlecards").collection("accounts").findOne({username: un});
        
                rtn.push({
                    username: ud.username,
                    display_name: ud.display_name,
                    level: xp.getLevel(ud.xp),
                    avatar: require('../data/Avatars.json')[ud.avatar]
                });
            }
        }
        res.json(rtn);
    } else {
        res.json({});
    }
});

router.post('/searchForUsers', async (req, res) => {
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

        let rtn = [];

        for (let i = 0; i < check.length; i++) {
            rtn.push({
                username: check[i].username,
                display_name: check[i].display_name,
                level: xp.getLevel(check[i].xp),
                avatar: require('../data/Avatars.json')[check[i].avatar]
            });
        }

        res.json(rtn);
    } else {
        res.status(500).send("Invalid Input");
    }
});

router.get('/getUser/:user', async (req, res) => {
    let check = await client.db("communism_battlecards").collection("accounts").findOne({username: req.params.user});
    if (check) {
        res.json({
            username: check.username,
            display_name: check.display_name,
            level: xp.getLevel(check.xp),
            avatar: require('../data/Avatars.json')[check.avatar]
        });
    } else {
        res.status(404).send("User not found");
    }
});

router.get('/getRequests', async (req, res) => {
    let check = await client.db("communism_battlecards").collection("friends").find({users: {$elemMatch: {$eq: req.user.username}}}).toArray();

    if (check) {
        var rtn = [];

        for (let i = 0; i < check.length; i++) {
            if (!(check[i].accept[check[i].users[0]] && check[i].accept[check[i].users[1]])) {
                let un;
                if (Object.is(check[i].users[0], req.user.username))
                    un = check[i].users[1];
                else
                    un = check[i].users[0];
        
                let ud = await client.db("communism_battlecards").collection("accounts").findOne({username: un});
        
                let back = {
                    username: ud.username,
                    display_name: ud.display_name,
                    level: xp.getLevel(ud.xp),
                    avatar: require('../data/Avatars.json')[ud.avatar]
                };

                if (check[i].accept[req.user.username]) {
                    back.direction = "out";
                } else {
                    back.direction = "in";
                }
                
                rtn.push(back);
            }
        }
        res.json(rtn);
    } else {
        res.json({});
    }
});

router.post('/acceptRequest', async (req, res) => {
    if (typeof req.body.accept == "boolean" && typeof req.body.username == "string") {
        let check = await client.db("communism_battlecards").collection("friends").findOne({users: {$elemMatch: {$eq: req.user.username}, $elemMatch: {$eq: req.body.username}}});
        if (check) {
            if (req.body.accept) {
                if (Object.is(check.users[1], req.user.username) && !check.accept[check.users[1]]) {
                    await client.db("communism_battlecards").collection("friends").updateOne({users: {$elemMatch: {$eq: req.user.username}, $elemMatch: {$eq: req.body.username}}}, {$set: {accept: {[check.users[1]]: true, [check.users[0]]: check.accept[check.users[0]]}}});
                    res.status(200).send("Request accepted");

                    logger.info(`'${req.user.username}' accepted friend request from '${req.body.username}'`, "api/friend/acceptRequest");
                } else if (Object.is(check.users[0], req.user.username) && !check.accept[check.users[0]]) {
                    await client.db("communism_battlecards").collection("friends").updateOne({users: {$elemMatch: {$eq: req.user.username}, $elemMatch: {$eq: req.body.username}}}, {$set: {accept: {[check.users[0]]: true, [check.users[1]]: check.accept[check.users[1]]}}});
                    res.status(200).send("Request accepted");

                    logger.info(`'${req.user.username}' accepted friend request from '${req.body.username}'`, "api/friend/acceptRequest");
                } else {
                    res.status(500).send("Internal server error");
                }
            } else {
                await client.db("communism_battlecards").collection("friends").deleteOne({users: {$elemMatch: {$eq: req.user.username}, $elemMatch: {$eq: req.body.username}}});
                res.status(200).send("Request denied");

                logger.info(`'${req.user.username}' denied friend request from '${req.body.username}'`, "api/friend/acceptRequest");
            }
        } else {
            res.status(404).send("Unable to find request");
        }
    } else {
        res.status(500).send("Invalid input");
    }
});

router.post('/sendRequest', async (req, res) => {
    if (typeof req.body.username == "string") {
        let check = await client.db("communism_battlecards").collection("friends").findOne({users: {$elemMatch: {$eq: req.user.username}, $elemMatch: {$eq: req.body.username}}});
        if (check) {
            res.status(418).send("You already have a request to this user, or you are friends");
        } else {
            let user = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.username});
            if (user) {
                await client.db("communism_battlecards").collection("friends").insertOne({users: [req.user.username, req.body.username], accept: {[req.user.username]:true,[req.body.username]:false}});
                res.status(200).send("Request sent");

                logger.info(`'${req.user.username}' sent friend request to '${req.body.username}'`, "api/friend/sendRequest");
            } else {
                res.status(404).send("User not found");
            }
        }
    } else {
        res.status(500).send("Invalid input");
    }
});

module.exports = router;