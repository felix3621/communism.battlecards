const db = require("./database.cjs");
const CryptoJS = require('crypto-js');

var client;
async function connectDB() {
    client = await db.connect();
}
connectDB()

let auth = {}

auth.encrypt = (text) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};

auth.decrypt = (data) => {
    return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
};

async function checkUser(username, password) {
    let base = client.db("communism_battlecards").collection("accounts")
    let result = await base.findOne({username: username, password: password})
    if (result) {
        return {username: result.username, display_name: result.display_name}
    }
    return null;
}

auth.checkUser = async(req, res, next) => {
    if (req.body.username && req.body.password) {
        let user = await checkUser(req.body.username, req.body.password)
        if (user) {
            req.user = user
            let userToken = auth.encrypt(JSON.stringify([auth.encrypt(req.body.username), auth.encrypt(req.body.password)]))
            res.cookie('userToken', userToken, { httpOnly: true });
            return next()
        } else {
            res.status(401).json({ message: 'Unauthorized credentials' });
        }
    } else if (req.cookies && req.cookies.userToken) {
        let token = JSON.parse(auth.decrypt(req.cookies.userToken))
        let username = auth.decrypt(token[0])
        let password = auth.decrypt(token[1])
        
        if (token[2] && auth.decrypt(token[2]) == "true") {
            if (createTestUsers) {
                let user = await checkUser(username, password)
                if (user) {
                    req.user = user
                    return next()
                } else {
                    res.clearCookie('userToken');
                    res.status(401).json({ message: 'Unauthorized credentials' });
                }
            } else {
                res.clearCookie('userToken');
                res.status(401).json({ message: 'Unauthorized credentials' });
            }
        } else if (req.body.createTestUser == null || req.body.createTestUser == true) {
            let user = await checkUser(username, password)
            if (user) {
                req.user = user
                return next()
            } else {
                res.status(401).json({ message: 'Unauthorized token' });
            }
        } else {
            res.status(401).json({ message: 'Unauthorized credentials' });
        }
    } else {
        if (createTestUsers && req.body.createTestUser == null || req.body.createTestUser == true) {
            let base = client.db("communism_battlecards").collection("accounts")
            
            let userCount = await base.countDocuments({testUser: true});
            req.user = {username: "test_"+userCount, display_name: "test "+userCount, testUser: true}

            let userToken = auth.encrypt(JSON.stringify([auth.encrypt("test_"+userCount), auth.encrypt("test"), auth.encrypt("true")]))
            res.cookie('userToken', userToken, { httpOnly: true })
            return next()
        }
        res.status(401).json({ message: 'Unauthorized' });
    }
}
module.exports = auth;