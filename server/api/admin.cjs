const express = require('express');
const router = express.Router();
const auth = require('../authentication.cjs');
const db = require('../database.cjs');
const cards = require('../Cards.json');
const avatars = require('../Avatars.json');

var client;
async function connectDB() {
    client = await db.connect();
}
connectDB();

router.use(auth.checkUser, (req, res, next) => {
    if (req.user.admin) {
        return next();
    } else {
        res.status(401).send("Unauthorized");
    }
})

router.get('/users', async (req, res) => {
    var result;
    if (req.user.root == true) {
        result = await client.db("communism_battlecards").collection("accounts").find({}).toArray();
    } else {
        result = await client.db("communism_battlecards").collection("accounts").find({admin: {$exists: false}, root: {$exists: false}}).toArray();
    }
    if (result) {
        for (let i = 0; i < result.length; i++) {
            delete result[i]._id
            delete result[i].password
        }
    }
    res.json(result);
})

router.get('/cards', (req, res) => {
    res.json(cards);
})

router.get('/avatars', (req, res) => {
    res.json(avatars);
})

router.post('/setDeck', async (req, res) => {
    if (req.body.user && typeof req.body.deck == "array") {
        // Validator 
        var valid = true;
        for (let i = 0; i < req.body.deck.length; i++) {
            if (typeof req.body.deck[i] != "number" || req.body.deck[i] < 0 || req.body.deck[i] >= cards.length) {
                valid = false;
            }
        }
        // Set Deck
        if (valid) {
            var getResult;
            if (req.user.root == true) {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});
            } else {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user, admin: {$exists: false}, root: {$exists: false}});
            }
    
            if (getResult) {
                await client.db("communism_battlecards").collection("accounts").updateOne({username: req.body.user},{$set: {deck: req.body.deck}});
                res.json(req.body.deck)
            } else {
                res.status(404).send("Not found")
            }
        } else {
            res.status(500).send("invalid input")
        }
    } else {
        res.status(500).send("invalid input")
    }
})

router.post('/setInventory', async (req, res) => {
        // Validator 
    if (req.body.user && typeof req.body.inventory == "array") {
        var valid = true;
        for (let i = 0; i < req.body.inventory.length; i++) {
            if (typeof req.body.inventory[i] != "object" || typeof req.body.inventory[i].card != "number" || typeof req.body.inventory[i].count != "number" || req.body.inventory[i].count < 1 || req.body.inventory[i].card<0 || req.body.inventory[i].card >= cards.length) {
                valid = false;
            }
        }
        // Set Inventory
        if (valid) {
            var getResult;
            if (req.user.root == true) {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});
            } else {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user, admin: {$exists: false}, root: {$exists: false}});
            }
    
            if (getResult) {
                await client.db("communism_battlecards").collection("accounts").updateOne({username: req.body.user},{$set: {inventory: req.body.inventory}});
                res.json(req.body.inventory)
            } else {
                res.status(404).send("Not found");
            }
        } else {
            res.status(500).send("invalid input");
        }
    } else {
        res.status(500).send("invalid input");
    }
})

router.post('/setAvatar', async (req, res) => {
    if (req.body.user && req.body.avatar) {
        if (typeof req.body.avatar == "number" && req.body.avatar >= 0 && req.body.avatar < avatars.length) {
            var getResult;
            if (req.user.root == true) {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});
            } else {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user, admin: {$exists: false}, root: {$exists: false}});
            }
    
            if (getResult) {
                await client.db("communism_battlecards").collection("accounts").updateOne({username: req.body.user},{$set: {deck: req.body.avatar}});
                res.json(req.body.avatar)
            } else {
                res.status(404).send("Not found")
            }
        } else {
            res.status(500).send("invalid input")
        }
    } else {
        res.status(500).send("invalid input")
    }
})

router.post('/setXp', async (req, res) => {
    if (req.body.user && req.body.xp) {
        if (typeof req.body.xp == "number" && req.body.xp >= 0) {
            var getResult;
            if (req.user.root == true) {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});
            } else {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user, admin: {$exists: false}, root: {$exists: false}});
            }
    
            if (getResult) {
                await client.db("communism_battlecards").collection("accounts").updateOne({username: req.body.user},{$set: {xp: req.body.xp}});
                res.json(req.body.xp)
            } else {
                res.status(404).send("Not found")
            }
        } else {
            res.status(500).send("invalid input")
        }
    } else {
        res.status(500).send("invalid input")
    }
})

router.post('/setDisplayName', async (req, res) => {
    if (req.body.user && req.user.displayName) {
        if (typeof req.body.displayName == "string") {
            var getResult;
            if (req.user.root == true) {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});
            } else {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user, admin: {$exists: false}, root: {$exists: false}});
            }
    
            if (getResult) {
                await client.db("communism_battlecards").collection("accounts").updateOne({username: req.body.user},{$set: {display_name: req.body.displayName}});
                res.json(req.body.displayName)
            } else {
                res.status(404).send("Not found")
            }
        } else {
            res.status(500).send("invalid input")
        }
    } else {
        res.status(500).send("invalid input")
    }
})

function rootCheck (req, res, next) {
    if (req.user.root) {
        return next();
    } else {
        res.status(401).send("unauthorized")
    }
}

router.post('/setAdmin', rootCheck, async (req, res) => {
    if (req.body.user && typeof req.body.admin == 'boolean') {
        getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});

        if (getResult) {
            await client.db("communism_battlecards").collection("accounts").updateOne({username: req.body.user},{$set: {admin: req.body.admin}});
            res.send(req.body.admin)
        } else {
            res.status(404).send("Not found")
        }
    } else {
        res.status(500).send("invalid input")
    }
})




//resetUser
//purgeUser
//lockdown
//testUsers

module.exports = router;
