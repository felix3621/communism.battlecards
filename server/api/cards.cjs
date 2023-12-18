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
    
})

router.post('/removeFromDeck', auth.checkUser, (req, res) => {
    
}) 

router.post('/addToDeck', auth.checkUser, (req, res) => {
    
}) 

module.exports = router;