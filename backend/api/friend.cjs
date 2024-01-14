const express = require('express');
const auth = require('../modules/authentication.cjs');
const db = require('../modules/database.cjs');
const router = express.Router();

var client;
async function connectDB() {
    client = await db.connect();
}
connectDB()

router.get('/get', auth.checkUser, async (req, res) => {
    //return all friends
})

router.get('/allUsers', auth.checkUser, async (req, res) => {
    let base = client.db("communism_battlecards").collection("accounts")
    let check = await base.find({}).toArray();

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

    let rtn = []

    for (let i = 0; i < check.length; i++) {
        rtn.push({username: check[i].username, display_name: check[i].display_name})
    }

    res.json(rtn)
})

router.post('/add', auth.checkUser, async (req, res) => {
    //add friend
})

router.post('/remove', auth.checkUser, async (req, res) => {
    //remove friend
})

module.exports = router;