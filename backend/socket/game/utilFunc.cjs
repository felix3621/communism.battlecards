const logger = require("../../modules/logger.cjs");

const data = require("./data.cjs");
const c_stone = require("./classes/stone.cjs");

async function getDisplayName(username, value) {
    let result = await data.db.getClient().db("communism_battlecards").collection("accounts").findOne({username: username});
    if (result)
        value.displayName = result.display_name;
}

//TODO: insert or increment instead of set
async function giveCard(username) {
    let cardID = Math.floor(Math.random() * data.cards.length);
    logger.info(`Rewarded '${username}' with card id ${cardID} (${data.cards[cardID].Name})`, "socket/game/utilFunc/giveRewards");

    await data.db.getClient().db("communism_battlecards").collection("accounts").updateOne({username: username},{
        $push: {newCards: cardID, inventory: cardID}
    });
}

async function giveXP(username, points) {
    await data.db.getClient().db("communism_battlecards").collection("accounts").updateOne({username: username},{$inc: {xp: points}});

    logger.info(`Rewarded '${username}' with ${points} points`, "socket/game/utilFunc/giveXP");
}

async function getPlayerInfo(username, player, game) {
    let result = await data.db.getClient().db("communism_battlecards").collection("accounts").findOne({username: username});

    player.DisplayName = result.display_name;
    player.Deck = [];
    for (let i = 0; i < result.deck.length; i++) {
        player.Deck.push(data.cards[result.deck[i]]);
    }
    player.Avatar = new c_stone.stone({...data.avatars[result.avatar]});
    game.DataLoaded++;
}

module.exports = {
    getDisplayName,
    giveCard: giveCard,
    giveXP: giveXP,
    getPlayerInfo,
};