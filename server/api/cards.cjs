const express = require('express');
const router = express.Router();
const auth = require('../authentication.cjs');
const db = require('../database.cjs');
const cards = require('../Cards.json');
const fr = require('../fileReader.cjs');


var client;
async function connectDB() {
    client = await db.connect();
}
connectDB()

router.get('/getAllCards', auth.checkUser, async (req, res) => {
    try {
        let settings = JSON.parse(fr('./settings.json'))
        if (settings.getAllCards || req.user.admin) {
            let result = await client.db("communism_battlecards").collection("accounts").findOne({username: req.user.username})
    
            result.inventory = []
    
            result.deck = []
    
            for (let i = 0; i < cards.length; i++) {
                result.deck.push(i)
            }
    
            await client.db("communism_battlecards").collection("accounts").updateOne({username: req.user.username},{$set:result})
            
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
    //Database
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


    res.json({deck: result.deck, inventory: result.inventory})
}) 

module.exports = router;