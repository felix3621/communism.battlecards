const db = require("./database.cjs");
const CryptoJS = require('crypto-js');

let auth = {}

auth.encrypt = (text) => {
    return CryptoJS.enc.Base64.stringify(CryptoJS.enc.Utf8.parse(text));
};

auth.decrypt = (data) => {
    return CryptoJS.enc.Base64.parse(data).toString(CryptoJS.enc.Utf8);
};

async function checkUser(username, password) {
    let client = await db.connect()
    let result = await client.db("communism_battlecards").collection("accounts").findOne({username: username, password: password})
    await client.close()
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

        let user = await checkUser(username, password)
        if (user) {
            req.user = user
            return next()
        } else {
            res.status(401).json({ message: 'Unauthorized token' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
}
module.exports = auth;