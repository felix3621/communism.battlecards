const BaseXP = 10;
const Multiplier = 1.05;


xp = {};

xp.getLevel = (current_xp) => {
    let level = 1;
    let xpRequired = BaseXP;

    while (current_xp >= xpRequired) {
        level++;
        xpRequired = xpRequired + Math.floor(BaseXP * Math.pow(Multiplier, level - 1));
    }

    return level - 1;
}
xp.getXp = (current_xp) => {
    if (current_xp == undefined)
        current_xp = 0;
    let level = 1;
    let xpRequired = BaseXP;
    let xpPrevious = 0;

    while (current_xp >= xpRequired) {
        level++;
        xpPrevious = xpRequired
        xpRequired = xpRequired + Math.floor(BaseXP * Math.pow(Multiplier, level - 1));
    }

    return current_xp - xpPrevious;
}
xp.getXpForNextLevel = (current_xp) => {
    let level = 1;
    let xpRequired = BaseXP;
    let xpPrevious = 0;

    while (current_xp >= xpRequired) {
        level++;
        xpPrevious = xpRequired
        xpRequired = xpRequired + Math.floor(BaseXP * Math.pow(Multiplier, level - 1));
    }

    return xpRequired - xpPrevious
}

module.exports = xp;