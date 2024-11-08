const db = require('../../modules/database.cjs');

const avatars = require('../../data/Avatars.json');
const cards = require('../../data/Cards.json');

let dbConnected = false;
db.on('open', _=> {dbConnected = true})
db.on('topologyClosed', _=> {dbConnected = false})

let client;

async function connectDB() {
    client = await db.connect();
}
connectDB();

//Game Info
const queuedUsers = [];
const battleUsers = [];
const battles = [];
const tournaments = [];

const tournamentViewers = [];

//Game Memory
let gameID = 0;
let tournamentID = 0;
//Game Settings
const tickSpeed = 0.1;
const roundTime = 30/tickSpeed;
const winPoints = 5;
const lossPoints = 1;
const tournamentWinPoints = 10;
const reconnectTime = 10;

module.exports = {
    db: {
        getConnected: () => dbConnected,
        getClient: () => client
    },
    game: {
        queuedUsers,
        battleUsers,
        battles,
        tournaments,
        tournamentViewers
    },
    config: {
        gameID,
        tournamentID,
        tickSpeed,
        roundTime,
        winPoints,
        lossPoints,
        tournamentWinPoints,
        reconnectTime
    },
    avatars,
    cards
}