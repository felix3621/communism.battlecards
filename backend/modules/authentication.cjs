const CryptoJS = require('crypto-js');
const db = require("./database.cjs");
const xp = require("./xp.cjs");
const cards = require("../data/Cards.json");
const fr = require('./fileReader.cjs');
const logger = require('../modules/logger.cjs');

var client;
async function connectDB() {
    client = await db.connect();
    await client.db("communism_battlecards").collection("accounts").deleteMany({testUser: true});
}
connectDB();

let auth = {};

auth.encrypt = (text) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};

auth.decrypt = (data) => {
    return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
};

auth.hash = (data) => {
    return CryptoJS.SHA256(data).toString(CryptoJS.enc.Hex);
}

async function checkUser(username, password, hashedPassword = false) {
    if (client == null)
        return null;

    if (!hashedPassword)
        password = auth.hash(password);
    
    let base = client.db("communism_battlecards").collection("accounts");
    let result = await base.findOne({username: username, password: password});
    if (result) {
        let rtn = {
            username: result.username,
            display_name: result.display_name,
            getAllCards: JSON.parse(fr.read('../settings.json')).getAllCards||result.admin||result.root,
            getXp: JSON.parse(fr.read('../settings.json')).getXp||result.admin||result.root,
            view: JSON.parse(fr.read('../settings.json')).publicView||result.admin||result.root,
            xp: {
                level: xp.getLevel(result.xp),
                xp: xp.getXp(result.xp),
                requiredXp: xp.getXpForNextLevel(result.xp),
                totalXp: result.xp
            }
        };
        if (Object.is(result.admin, true) || Object.is(result.root, true))
            rtn.admin = true;
        if (result.root)
            rtn.root = true;

        rtn.rewards = {};

        if (result.newCards) {
            let new_cards = [];

            for (let i = 0; i < result.newCards.length; i++) {
                new_cards.push(cards[result.newCards[i]]);
            }

            rtn.rewards.cards = new_cards;
        }

        if (result.rewards?.xp)
            rtn.rewards.xp = result.rewards.xp;

        if (result.previousTournament) {
            rtn.rewards.type = "Tournament";
            rtn.rewards.won = result.previousTournament.won || false;
            rtn.rewards.xp = result.previousTournament.rewardXp;
            rtn.rewards.lossCount = result.previousTournament.lossCount;
            rtn.rewards.winCount = result.previousTournament.winCount;
        } else if (result.previousGame) {
            rtn.rewards.type = "Game";
            rtn.rewards.won = result.previousGame.won;
            rtn.rewards.xp = result.previousGame.rewardXp;
        }

        if (Object.is(Object.entries(rtn.rewards).length, 0))
            delete rtn.rewards;

        return rtn;
    }
    return null;
}

auth.checkUser = async(req, res, next) => {
    try {
        let settings = JSON.parse(fr.read('../settings.json'));
        if (req.body.username && req.body.password) {
            let user = await checkUser(req.body.username, req.body.password);
            if (user) {
                req.user = user;
                let userToken = auth.encrypt(JSON.stringify([auth.encrypt(req.body.username), auth.encrypt(auth.hash(req.body.password))]));
                res.cookie('userToken', userToken, { httpOnly: true });
                logger.info(`'${req.user.username}' logged in`, "Authentication");
                return next();
            } else {
                res.status(401).send("Invalid credentials");
            }
        } else if (req.cookies && req.cookies.userToken) {
            let token = JSON.parse(auth.decrypt(req.cookies.userToken));
            let username = auth.decrypt(token[0]);
            let password = auth.decrypt(token[1]);

            let user = await checkUser(username, password, true);
            if (user) {
                req.user = user;
                return next();
            } else {
                res.clearCookie('userToken');
                res.status(401).send("Invalid token");
            }
        } else {
            if (settings.testUsers) {
                if (client == null)
                    return null;

                let base = client.db("communism_battlecards").collection("accounts");
    
                let testpsw = "test";
                
                let userCount = await base.countDocuments({testUser: true});

                let user = {
                    username: "test_"+userCount,
                    display_name: "test "+userCount,
                    testUser: true,
                    password: auth.hash(testpsw),
                    avatar: settings.defaultAvatar,
                    deck: settings.defaultDeck,
                    inventory: settings.defaultInventory,
                    xp: settings.defaultXp
                };

                await base.insertOne(user);

                req.user = await checkUser("test_"+userCount, testpsw);
    
                let userToken = auth.encrypt(JSON.stringify([auth.encrypt("test_"+userCount), auth.encrypt(auth.hash(testpsw)), auth.encrypt("true")]));
                res.cookie('userToken', userToken, { httpOnly: true });

                delete user.password;
                logger.info(`Test user created: ${JSON.stringify(user, null, 2)}`, "Authentication");

                return next();
            }
            res.status(401).send("Unauthorized");
        }
    } catch (e) {
        res.status(401).send("Unauthorized (error)");
    }
}
module.exports = auth;