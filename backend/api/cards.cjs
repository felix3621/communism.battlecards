const express = require('express');
const auth = require('../modules/authentication.cjs');
const db = require('../modules/database.cjs');
const fr = require('../modules/fileReader.cjs');
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

router.get('/getAllCards', async (req, res) => {
    try {
        let settings = JSON.parse(fr.read('../settings.json'));
        if (settings.getAllCards || req.user.admin) {
            let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username});

            let deck = []
            let newCards = [];

            for (let i = 0; i < require('../data/Cards.json').length; i++) {
                deck.push(i);
                newCards.push(i);
            }

            await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$set: {inventory: [], deck, newCards}});

            logger.info(`'${req.user.username}' ran getAllCards, previous cards: ${JSON.stringify({deck: result.deck, inventory: result.inventory}, null, 2)}`, "api/cards/getAllCards");
            
            res.status(200).send("Cards changed");
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (e) {
        res.status(500).send("Server Error");
    }
});

router.get('/getXp', async (req, res) => {
    try {
        let settings = JSON.parse(fr.read('../settings.json'));
        if (settings.getXp || req.user.admin) {
            let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username});

            await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$set:{xp: settings.getXpAmount, rewards: {xp: settings.getXpAmount-result.xp}}});
            
            res.status(200).send("Cards changed");

            logger.info(`'${req.user.username}' ran getXp, previous XP: ${result.xp}`, "api/account/getXp");
        } else {
            res.status(401).send("Unauthorized");
        }
    } catch (e) {
        res.status(500).send("Server Error");
    }
});

router.get('/getDeck', async (req, res) => {
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username});

    let deck = [];

    for (let i = 0; i < result.deck.length; i++) {
        deck.push(require('../data/Cards.json')[result.deck[i]]);
    }

    res.json(deck);
});
router.get('/getInventory', async (req, res) => {
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username});

    let inventory = [];
    for (let i = 0; i < result.inventory.length; i++) {
        inventory.push(require('../data/Cards.json')[result.inventory[i]]);
    }

    res.json(inventory);
});

router.post('/addToDeck', async (req, res) => {
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username});
    if (typeof result.inventory[req.body.WhatItemIndex] == "number") { // Check if item exsist
        if (typeof result.deck[req.body.WhatIndexToReplace] == "number" && result.deck.length>req.body.WhatIndexToReplace) { // check if card exsist in deck
            let temp = result.deck[req.body.WhatIndexToReplace];
            result.deck[req.body.WhatIndexToReplace] = result.inventory[req.body.WhatItemIndex];
            result.inventory.push(temp);
        } else {
            result.deck.push(result.inventory[req.body.WhatItemIndex]);
            result.inventory.splice(req.body.WhatItemIndex, 1);
        }
        logger.info(`'${req.user.username}' moved card with id ${result.deck[result.deck.length-1]} (${require('../data/Cards.json')[result.deck[result.deck.length-1]].Name}) into deck`, "api/card/addToDeck");
    } else if (result.deck[req.body.WhatIndexToReplace]>=0 && result.deck.length>req.body.WhatIndexToReplace) { //Remove from deck
        result.inventory.push(result.deck[req.body.WhatIndexToReplace]);
        result.deck.splice(req.body.WhatIndexToReplace,1);
        logger.info(`'${req.user.username}' moved card with id ${result.inventory[result.inventory.length-1]} (${require('../data/Cards.json')[result.inventory[result.inventory.length-1]].Name}) into inventory`, "api/card/addToDeck");
    }

    await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$set:{deck: result.deck, inventory: result.inventory}});

    res.json({deck: result.deck, inventory: result.inventory});
});

module.exports = router;