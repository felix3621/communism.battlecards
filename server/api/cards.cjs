const express = require('express');
const router = express.Router();
const auth = require('../authentication.cjs');
const db = require('../database.cjs');
const cards = require('../Cards.json');


router.get('/getDeck', auth.checkUser, async (req, res) => {
    let client = await db.connect()
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username})
    await client.close()

    let deck = new Array()

    for (let i = 0; i < result.deck.length; i++) {
        deck.push(cards[result.deck[i]]);
    }

    res.json(deck)
})
router.get('/getInventory', auth.checkUser, async (req, res) => {
    let client = await db.connect()
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username})
    await client.close()



    let inventory = new Array()
    for (let i = 0; i < result.inventory.length; i++) {
        inventory.push({card:cards[result.inventory[i].card],count:result.inventory[i].count});
    }

    res.json(inventory)
})

router.post('/addToDeck', auth.checkUser, async (req, res) => {
    //Database
    let client = await db.connect()
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username})
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



    await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$set:result})


    await client.close()
    res.json({deck: result.deck, inventory: result.inventory})
}) 

module.exports = router;