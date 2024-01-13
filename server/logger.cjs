const fs = require('fs');
const path = require('path');

const dir = "../log"
const extension = ".log"


const directoryPath = path.join(__dirname, dir);

function getDate(time) {
    return `${time.getFullYear()}-${(time.getMonth() + 1).toString().padStart(2, '0')}-${time.getDate().toString().padStart(2, '0')}`
}

function log(level, msg, trace) {
    let time = new Date();

    let string = "["
    string += getDate(time)
    string += " "
    string += String(time.getHours()).padStart(2, "0")
    string += ":"
    string += String(time.getMinutes()).padStart(2, "0")
    string += ":"
    string += String(time.getSeconds()).padStart(2, "0")
    string += "] ["
    string += (trace ? trace+"/" : "")
    string += level
    string += "]: "
    string += msg

    console.log(string)

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    let filePath = path.join(directoryPath, getDate(time) + extension);
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, string);
    } else {
        fs.appendFileSync(filePath, '\n' + string);
    }
}

logger = {
    debug: (msg, trace) => log("DEBUG", msg, trace),
    info: (msg, trace) => log("INFO", msg, trace),
    warn: (msg, trace) => log("WARN", msg, trace),
    error: (msg, trace) => log("ERROR", msg, trace)
};

module.exports = logger;