const express = require('express');
const router = express.Router();
const auth = require('../authentication.cjs');
const db = require('../database.cjs');
const cards = require('../Cards.json');
const fr = require('../fileReader.cjs');
const logger = require('../logger.cjs');
const ld = require('lodash');

var client;
async function connectDB() {
    client = await db.connect();
}
connectDB()

router.get('/getAllCards', auth.checkUser, async (req, res) => {
    try {
        let settings = JSON.parse(fr.read('./settings.json'))
        if (settings.getAllCards || req.user.admin) {
            let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username})

            let old_deck = result.deck
            let old_inventory = result.inventory
    
            result.inventory = []
    
            result.deck = []
    
            for (let i = 0; i < cards.length; i++) {
                result.deck.push(i)
            }

            logger.info(
                req.user.username + ": old_deck="+JSON.stringify(old_deck)+", old_inventory="+JSON.stringify(old_inventory)+", new_deck="+JSON.stringify(result.deck)+", new_inventory="+JSON.stringify(result.inventory),
                req.originalUrl
            )
    
            await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$set:result})
            
            res.status(200).send("Cards changed")
        } else {
            res.status(401).send("Unauthorized")
        }
    } catch (e) {
        res.status(500).send("Server Error")
    }
})

router.get('/getXp', auth.checkUser, async (req, res) => {
    try {
        var settings = JSON.parse(fr.read('./settings.json'))
        if (settings.getXp || req.user.admin) {

            logger.info(
                req.user.username + ": old_xp="+req.user.xp.totalXp+", new_xp="+settings.getXpAmount,
                req.originalUrl
            )

            await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$set:{xp: settings.getXpAmount}})
            
            res.status(200).send("Cards changed")
        } else {
            res.status(401).send("Unauthorized")
        }
    } catch (e) {
        res.status(500).send("Server Error")
    }
})


router.get('/getDeck', auth.checkUser, async (req, res) => {
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username})

    let deck = new Array()

    for (let i = 0; i < result.deck.length; i++) {
        deck.push(cards[result.deck[i]]);
    }

    res.json(deck)
})
router.get('/getInventory', auth.checkUser, async (req, res) => {
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username})



    let inventory = new Array()
    for (let i = 0; i < result.inventory.length; i++) {
        inventory.push({card:cards[result.inventory[i].card],count:result.inventory[i].count});
    }

    res.json(inventory)
})

router.post('/addToDeck', auth.checkUser, async (req, res) => {
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username})
    let old_result = ld.cloneDeep(result)
    if (result.inventory[req.body.WhatItemIndex]) { // Check if item exsist
        if (result.deck[req.body.WhatIndexToReplace]>=0&&result.deck.length>req.body.WhatIndexToReplace) { // check if card exsist in deck
            var temp = result.deck[req.body.WhatIndexToReplace]; 
            result.deck[req.body.WhatIndexToReplace] = result.inventory[req.body.WhatItemIndex].card;
            result.inventory[req.body.WhatItemIndex].count--;
            var item = result.inventory.find(obj => obj.card == temp);
            if (item) {
                item.count++;
            } else {
                result.inventory.push({card:temp,count:1});
            }
        } else {
            result.deck.push(result.inventory[req.body.WhatItemIndex].card);
            result.inventory[req.body.WhatItemIndex].count--;
        }
        if (result.inventory[req.body.WhatItemIndex].count<=0) {
            result.inventory.splice(req.body.WhatItemIndex,1);
        }
    } else if (result.deck[req.body.WhatIndexToReplace]>=0&&result.deck.length>req.body.WhatIndexToReplace) { //Remove from deck
        item = result.inventory.find(obj => obj.card == result.deck[req.body.WhatIndexToReplace]);
        if (item) {
            item.count++;
        } else {
            result.inventory.push({card:result.deck[req.body.WhatIndexToReplace],count:1});
        }
        result.deck.splice(req.body.WhatIndexToReplace,1);
    }

    logger.debug(
        req.user.username + ": old_deck="+JSON.stringify(old_result.deck)+", old_inventory="+JSON.stringify(old_result.inventory)+", new_deck="+JSON.stringify(result.deck)+", new_inventory="+JSON.stringify(result.inventory),
        req.originalUrl
    )
    

    await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$set:result})


    res.json({deck: result.deck, inventory: result.inventory})
}) 

module.exports = router;