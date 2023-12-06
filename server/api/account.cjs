const express = require('express');
const router = express.Router();
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/communism_battlecards";

router.post('/login', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;

    if (username && password) {
        console.log("auth")
        MongoClient.connect(url, (err, db) => {
            //TODO: shit doesn't work here
            console.log("db")
            if (err) throw err;
            db.collection("accounts").findOne({}, (error, result) => {
                console.log("test")
                if (error) {
                    res.json({error: error});
                } else {
                    res.json({result: result});
                }
                db.close()
            });
        });
    } else {
        res.status(500).send("error")
    }
})
router.post('/signup', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let display_name = req.body.display_name;

    if (username && password && display_name) {

    } else {
        res.status(500).send("error")
    }
})
router.post('/logout', (req, res) => {
    
})

module.exports = router;