const express = require('express');
const auth = require('../modules/authentication.cjs');
const db = require('../modules/database.cjs');
const fr = require('../modules/fileReader.cjs');
const xp = require('../modules/xp.cjs');
const logger = require('../modules/logger.cjs');
const cards = require('../data/Cards.json');
const avatars = require('../data/Avatars.json');
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
});

router.use(auth.checkUser, (req, res, next) => {
    if (req.user.admin) {
        return next();
    } else {
        res.status(401).send("Unauthorized");
    }
});

router.get('/users', async (req, res) => {
    let result;
    if (Object.is(req.user.root, true)) {
        result = await client.db("communism_battlecards").collection("accounts").find({}).toArray();
    } else {
        result = await client.db("communism_battlecards").collection("accounts").find({admin: {$exists: false}, root: {$exists: false}}).toArray();
        result.push(await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username}));
    }
    if (result) {
        for (let i = 0; i < result.length; i++) {
            delete result[i]._id;
            delete result[i].password;
            if (!req.user.root) {
                delete result[i].admin;
            }
            result[i].level = xp.getLevel(result[i].xp);
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
        let valid = true;
        for (let i = 0; i < req.body.deck.length; i++) {
            if (typeof req.body.deck[i] != "number" || req.body.deck[i] < 0 || req.body.deck[i] >= cards.length) {
                valid = false;
            }
        }
        // Set Deck
        if (valid) {
        let getResult;
            if (Object.is(req.user.root, true)) {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});
            } else {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user, admin: {$exists: false}, root: {$exists: false}});
            }

            if (!getResult) {
                getResult = (await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username}));
            }
    
            if (getResult) {
                await client.db("communism_battlecards").collection("accounts").updateOne({username: req.body.user},{$set: {deck: req.body.deck}});
                res.json(req.body.deck);

                logger.warn(`'${req.user.username}' changed the deck of '${req.body.user}': ${JSON.stringify({old: getResult.deck, new: req.body.deck}, null, 2)}`, "api/admin/setDeck");
            } else {
                res.status(404).send("Not found");
            }
        } else {
            res.status(500).send("invalid input");
        }
    } else {
        res.status(500).send("invalid input");
    }
});


router.post('/setInventory', async (req, res) => {
    // Validator 
    if (req.body.user && req.body.inventory instanceof Array) {
        let valid = true;
        for (let i = 0; i < req.body.inventory.length; i++) {
            if (typeof req.body.inventory[i] != "number" || req.body.inventory[i] < 0 || req.body.inventory[i] >= cards.length) {
                valid = false;
            }
        }
        // Set Inventory
        if (valid) {
            let getResult;
            if (Object.is(req.user.root, true)) {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});
            } else {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user, admin: {$exists: false}, root: {$exists: false}});
            }

            if (getResult) {
                await client.db("communism_battlecards").collection("accounts").updateOne({username: req.body.user},{$set: {inventory: req.body.inventory}});
                res.json(req.body.inventory);

                logger.warn(`'${req.user.username}' changed the inventory of '${req.body.user}': ${JSON.stringify({old: getResult.inventory, new: req.body.inventory}, null, 2)}`, "api/admin/setInventory");
            } else {
                res.status(404).send("Not found");
            }
        } else {
            res.status(500).send("invalid input");
        }
    } else {
        res.status(500).send("invalid input");
    }
});

router.post('/setAvatar', async (req, res) => {
    if (req.body.user && req.body.avatar != null) {
        if (typeof req.body.avatar == "number" && req.body.avatar >= 0 && req.body.avatar < avatars.length) {
            let getResult;
            if (Object.is(req.user.root, true)) {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});
            } else {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user, admin: {$exists: false}, root: {$exists: false}});
            }

            if (!getResult) {
                getResult = (await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username}));
            }
    
            if (getResult) {
                await client.db("communism_battlecards").collection("accounts").updateOne({username: req.body.user},{$set: {avatar: req.body.avatar}});
                res.json(req.body.avatar);

                logger.warn(`'${req.user.username}' changed the avatar of '${req.body.user}' from id ${getResult.avatar} (${avatars[getResult.avatar].Name}) to id ${req.body.avatar} (${avatars[req.body.avatar].Name})`, "api/admin/setAvatar");
            } else {
                res.status(404).send("Not found");
            }
        } else {
            res.status(500).send("invalid input");
        }
    } else {
        res.status(500).send("invalid input");
    }
});

router.post('/setXp', async (req, res) => {
    if (req.body.user && !Object.is(req.body.xp, undefined)) {
        if (typeof req.body.xp == "number" && req.body.xp >= 0) {
            let getResult;
            if (Object.is(req.user.root, true)) {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});
            } else {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user, admin: {$exists: false}, root: {$exists: false}});
            }

            if (!getResult) {
                getResult = (await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username}));
            }
    
            if (getResult) {
                await client.db("communism_battlecards").collection("accounts").updateOne({username: req.body.user},{$set: {xp: req.body.xp}});
                res.json(req.body.xp);

                logger.warn(`'${req.user.username}' changed the XP of '${req.body.user}' from ${getResult.xp} to ${req.body.xp}`, "api/admin/setXp");
            } else {
                res.status(404).send("Not found");
            }
        } else {
            res.status(500).send("invalid input");
        }
    } else {
        res.status(500).send("invalid input");
    }
});

router.post('/setDisplayName', async (req, res) => {
    if (req.body.user && !Object.is(req.body.displayName, undefined)) {
        if (typeof req.body.displayName == "string") {
            let getResult;
            if (Object.is(req.user.root, true)) {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});
            } else {
                getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user, admin: {$exists: false}, root: {$exists: false}});
            }

            if (!getResult) {
                getResult = (await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username}));
            }
    
            if (getResult) {
                await client.db("communism_battlecards").collection("accounts").updateOne({username: req.body.user},{$set: {display_name: req.body.displayName}});
                res.json(req.body.displayName);

                logger.warn(`'${req.user.username}' changed the display name of '${req.body.user}' from ${getResult.displayName} to ${req.body.displayName}`, "api/admin/setDisplayName");
            } else {
                res.status(404).send("Not found");
            }
        } else {
            res.status(500).send("invalid input");
        }
    } else {
        res.status(500).send("invalid input");
    }
});

router.post('/resetUser', async (req, res) => {
    if (req.body.user) {
        let getResult;
        if (Object.is(req.user.root, true)) {
            getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});
        } else {
            getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user, admin: {$exists: false}, root: {$exists: false}});
        }

        if (!getResult) {
            getResult = (await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username}));
        }

        if (getResult) {
            let settings = JSON.parse(fr.read('../settings.json'));

            let newUser = {
                username: getResult.username,
                password: getResult.password,
                display_name: getResult.display_name,
                avatar: settings.defaultAvatar,
                deck: settings.defaultDeck,
                inventory: settings.defaultInventory,
                xp: settings.defaultXp
            };

            if (getResult.admin)
                newUser.admin = getResult.admin;
            if (getResult.root)
                newUser.root = getResult.root;

            await client.db("communism_battlecards").collection("accounts").deleteOne({username: req.body.user});
            await client.db("communism_battlecards").collection("accounts").insertOne(newUser);

            delete newUser._id;
            delete getResult._id;

            delete newUser.password;

            if (!req.user.root && newUser.admin) {
                delete newUser.admin;
            }

            newUser.level = xp.getLevel(newUser.xp);

            res.json(newUser);

            delete getResult.password;
            delete newUser.level;

            logger.warn(`'${req.user.username}' Reset a user: ${JSON.stringify({old: getResult, new: newUser}, null, 2)}`, "api/admin/resetUser");
        } else {
            res.status(404).send("Not found");
        }
    } else {
        res.status(500).send("invalid input");
    }
});

function rootCheck (req, res, next) {
    if (req.user.root) {
        return next();
    } else {
        res.status(401).send("unauthorized");
    }
}

router.post('/setAdmin', rootCheck, async (req, res) => {
    if (req.body.user && typeof req.body.admin == 'boolean') {
        let getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});

        if (getResult && !getResult.root) {
            await client.db("communism_battlecards").collection("accounts").updateOne({username: req.body.user},{$set: {admin: req.body.admin}});
            res.send(req.body.admin);

            logger.warn(`'${req.user.username}' ${(req.body.admin ? "added" : "removed")} '${req.body.user}' as admin`, "api/admin/setAdmin");
        } else {
            res.status(404).send("Not found");
        }
    } else {
        res.status(500).send("invalid input");
    }
});

router.post('/deleteUser', rootCheck, async (req, res) => {
    if (req.body.user && !Object.is(req.body.user, req.user.username)) {
        let getResult = await client.db("communism_battlecards").collection("accounts").findOne({username: req.body.user});

        if (getResult && !getResult.root) {
            delete getResult._id;
            await client.db("communism_battlecards").collection("accounts").deleteOne({username: req.body.user});
            res.status(200).send("User deleted");

            logger.warn(`'${req.user.username}' deleted a user: ${JSON.stringify(getResult, null, 2)}`, "api/admin/deleteUser");
        } else {
            res.status(404).send("Not found");
        }
    } else {
        res.status(500).send("invalid input");
    }
});

router.post('/settings', rootCheck, async (req, res) => {
    let original_settings = JSON.parse(fr.read('../settings.json'));
    let settings = {...original_settings};

    let edited = false;
    
    Object.entries(settings).forEach(([key, value]) => {
        if (!Object.is(req.body[key], undefined)) {
            settings[key] = req.body[key];
            edited = true
        }
    });

    if (edited) {
        fr.write('../settings.json', JSON.stringify(settings, null, 4));
        logger.warn(`'${req.user.username}' changed settings: ${JSON.stringify({old: original_settings, new: settings}, null, 2)}`, "api/admin/settings");
    }

    res.json(settings);
});

module.exports = router;
