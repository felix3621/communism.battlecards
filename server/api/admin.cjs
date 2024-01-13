const express = require('express');
const router = express.Router();
const auth = require('../authentication.cjs');
const db = require('../database.cjs');
const cards = require('../Cards.json');
const avatars = require('../Avatars.json');
const fr = require('../fileReader.cjs');
const xp = require('../xp.cjs');
const logger = require('../logger.cjs');

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
        result.push(await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username}))
    }
    if (result) {
        for (let i = 0; i < result.length; i++) {
            delete result[i]._id
            delete result[i].password
            if (!req.user.root) {
                delete result[i].admin
            }
            result[i].level = xp.getLevel(result[i].xp)
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
    if (req.body.user && req.body.deck instanceof Array) {
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

            if (!getResult) {
                getResult = (await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username}))
            }
    
            if (getResult) {
                logger.warn(
                    req.user.username + "->"+req.body.user+": old_deck="+JSON.stringify(getResult.deck)+", new_deck="+JSON.stringify(req.body.deck)+"",
                    req.originalUrl
                )
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
    if (req.body.user && req.body.inventory instanceof Array) {
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
                logger.warn(
                    req.user.username + "->"+req.body.user+": old_inventory="+JSON.stringify(getResult.inventory)+", new_inventory="+JSON.stringify(req.body.inventory),
                    req.originalUrl
                )
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
    if (req.body.user && req.body.avatar != null) {
        if (typeof req.body.avatar == "number" && req.body.avatar >= 0 && req.body.avatar < avatars.length) {
            var getResult;
            if (req.user.root == true) {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});
            } else {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user, admin: {$exists: false}, root: {$exists: false}});
            }

            if (!getResult) {
                getResult = (await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username}))
            }
    
            if (getResult) {
                logger.warn(
                    req.user.username + "->"+req.body.user+": old_avatar="+getResult.avatar+", new_avatar="+req.body.avatar,
                    req.originalUrl
                )
                await client.db("communism_battlecards").collection("accounts").updateOne({username: req.body.user},{$set: {avatar: req.body.avatar}});
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
    if (req.body.user && req.body.xp != undefined) {
        if (typeof req.body.xp == "number" && req.body.xp >= 0) {
            var getResult;
            if (req.user.root == true) {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});
            } else {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user, admin: {$exists: false}, root: {$exists: false}});
            }

            if (!getResult) {
                getResult = (await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username}))
            }
    
            if (getResult) {
                logger.warn(
                    req.user.username + "->"+req.body.user+": old_xp="+getResult.xp+", new_xp="+req.body.xp,
                    req.originalUrl
                )
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
    if (req.body.user && req.body.displayName != undefined) {
        if (typeof req.body.displayName == "string") {
            var getResult;
            if (req.user.root == true) {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});
            } else {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user, admin: {$exists: false}, root: {$exists: false}});
            }

            if (!getResult) {
                getResult = (await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username}))
            }
    
            if (getResult) {
                logger.warn(
                    req.user.username + "->"+req.body.user+": old_display_name=\""+getResult.display_name+"\", new_display_name=\""+req.body.displayName+"\"",
                    req.originalUrl
                )
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

router.post('/resetUser', async (req, res) => {
    if (req.body.user) {
        var getResult;
        if (req.user.root == true) {
            getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});
        } else {
            getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user, admin: {$exists: false}, root: {$exists: false}});
        }

        if (!getResult) {
            getResult = (await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username}))
        }

        if (getResult) {
            settings = JSON.parse(fr.read('./settings.json'))

            let newUser = {
                username: getResult.username,
                password: getResult.password,
                display_name: getResult.display_name,
                avatar: settings.defaultAvatar,
                deck: settings.defaultDeck,
                inventory: settings.defaultInventory,
                xp: settings.defaultXp
            }

            if (getResult.admin)
                newUser.admin = getResult.admin;
            if (getResult.root)
                newUser.root = getResult.root;

            await client.db("communism_battlecards").collection("accounts").deleteOne({username: req.body.user});
            await client.db("communism_battlecards").collection("accounts").insertOne(newUser);

            delete newUser._id;
            delete getResult._id;

            logger.warn(
                req.user.username + "->"+req.body.user+": old_user="+JSON.stringify(getResult)+", new_user="+JSON.stringify(newUser),
                req.originalUrl
            )

            delete newUser.password;

            if (!req.user.root && newUser.admin) {
                delete newUser.admin
            }

            newUser.level = xp.getLevel(newUser.xp)

            res.json(newUser)
        } else {
            res.status(404).send("Not found");
        }
    } else {
        res.status(500).send("invalid input");
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

        if (getResult && !getResult.root) {
            logger.warn(
                req.user.username + "->"+req.body.user+": old_admin="+(getResult.admin === undefined ? "false" : getResult.admin)+", new_admin="+req.body.admin,
                req.originalUrl
            )
            await client.db("communism_battlecards").collection("accounts").updateOne({username: req.body.user},{$set: {admin: req.body.admin}});
            res.send(req.body.admin)
        } else {
            res.status(404).send("Not found")
        }
    } else {
        res.status(500).send("invalid input")
    }
})

router.post('/deleteUser', rootCheck, async (req, res) => {
    if (req.body.user && req.body.user != req.user.username) {
        getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});

        if (getResult && !getResult.root) {
            delete getResult._id;
            logger.warn(
                req.user.username + "->"+req.body.user+": old_user="+JSON.stringify(getResult),
                req.originalUrl
            )
            await client.db("communism_battlecards").collection("accounts").deleteOne({username: req.body.user});
            res.status(200).send("User deleted")
        } else {
            res.status(404).send("Not found");
        }
    } else {
        res.status(500).send("invalid input");
    }
})

router.post('/settings', rootCheck, async (req, res) => {
    original_settings = JSON.parse(fr.read('./settings.json'));
    settings = {...original_settings};

    edited = false
    
    Object.entries(settings).forEach(([key, value]) => {
        if (req.body[key] != undefined) {
            settings[key] = req.body[key];
            edited = true
        }
    })

    if (edited) {
        logger.warn(
            req.user.username+": old_settings="+JSON.stringify(original_settings)+", new_settings="+JSON.stringify(settings),
            req.originalUrl
        )
        fr.write('./settings.json', JSON.stringify(settings, null, 4))
    }

    res.json(settings)
})

module.exports = router;
