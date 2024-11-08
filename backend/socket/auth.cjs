const auth = require("../modules/authentication.cjs");
const fr = require("../modules/fileReader.cjs");

async function authenticate(cookies, data) {
    let cookie = cookies
        .split(';')
        .map(cookie => cookie.trim())
        .find(cookie => cookie.startsWith('userToken=')
        );
    if (cookie) {
        cookie = cookie.replace(/^userToken=/, '');
    } else {
        return null;
    }


    let token = JSON.parse(auth.decrypt(decodeURIComponent(cookie)));
    let username = auth.decrypt(token[0]);
    let password = auth.decrypt(token[1]);

    let result = await data.db.getClient().db("communism_battlecards").collection("accounts").findOne({username: username, password: password});
    if (result) {
        return username;
    }
    return null;
}
async function authorizeSocket(socket, request, data) {
    let cookie = request.headers.cookie;
    let username;
    if (cookie) {
        username = await authenticate(cookie, data);
    }
    if (!username) {
        socket.close(1008, 'Authentication failed');
        return false;
    }
    return username;
}
async function handleSocketAuthentication(socket, request, data) {
    if (!data.db.getConnected()) {
        socket.close(1000, "server starting");
        return false;
    }
    let username = await authorizeSocket(socket, request, data);
    if (!username) {
        socket.close(1000, "Unauthorized");
        return false;
    }

    let ud = await data.db.getClient().db("communism_battlecards").collection("accounts").findOne({username: username});
    if (JSON.parse(fr.read('../settings.json')).lockdown) {
        if (!ud.admin && !ud.root) {
            socket.close(1008, "LOCKDOWN");
            return false;
        }
    }

    return ud;
}

module.exports = {
    handleSocketAuthentication
}