const db = require('../../modules/database.cjs');

const emojis = require('../../data/emoji.json');

let dbConnected = false;
db.on('open', _=> {dbConnected = true})
db.on('topologyClosed', _=> {dbConnected = false})

let client;

async function connectDB() {
    client = await db.connect();
}
connectDB();

const users = [];

module.exports = {
    db: {
        getConnected: () => dbConnected,
        getClient: () => client
    },
    users,
    emojis
}