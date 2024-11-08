const data = require("./data.cjs");

async function notMuted(user, muted, unmuted) {
    let ud = await data.db.getClient().db("communism_battlecards").collection("accounts").findOne({username: user.username});
    if (ud.mutedUntil) {
        if (ud.mutedUntil && ud.mutedUntil < new Date()) {
            await data.db.getClient().db("communism_battlecards").collection("accounts").updateOne({username: ud.username},{$unset: {mutedUntil: 1}});
            return unmuted();
        } else {

            let date = new Date(ud.mutedUntil);

            const time = date.toLocaleTimeString('no-NO', {timeZoneName: 'short'});
            const day = date.toLocaleDateString('no-NO').replaceAll(".","/");

            return muted(`${day} ${time}`);
        }
    } else {
        return unmuted();
    }
}
function getUserColorString(user, showUsername = false, opacity = 1) {
    let rtn = "";
    if (user.root)
        rtn += `<span style='color:red; opacity: ${opacity}'>&#60;[Owner]&nbsp;`;
    else if (user.admin)
        rtn += `<span style='color:orange; opacity: ${opacity}'>&#60;[Admin]&nbsp;`;
    else
        rtn += `<span style='color:aqua; opacity: ${opacity}'>&#60;`;
    return `${rtn}${user.display_name}${showUsername ? " ("+user.username+")" : ""}&#62;</span>`;
}

module.exports = {
    notMuted,
    getUserColorString,
    setData: (new_data) => {data = new_data;}
}