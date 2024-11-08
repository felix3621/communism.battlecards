const fs = require('fs');
const path = require('path');
const ld = require('lodash');

const dir = "../log";
const extension = ".log";


const directoryPath = path.join(__dirname, dir);

function getDate(time) {
    return `${time.getFullYear()}-${(time.getMonth() + 1).toString().padStart(2, '0')}-${time.getDate().toString().padStart(2, '0')}`;
}

function log(level, msg, trace) {
    let time = new Date();

    let timeString = `[${getDate(time)} ${String(time.getHours()).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}:${String(time.getSeconds()).padStart(2, "0")}]`;
    let stackString = `[${trace ? trace+"/" : ""}${level}]`;

    let string = `${timeString} ${stackString}: ${msg}`;

    switch (level) {
        case "DEBUG":
            console.debug(string);
            break;
        case "INFO":
            console.info(string);
            break;
        case "WARN":
            console.warn(string);
            break;
        case "ERROR":
            console.error(string);
            break;
    }

    if (!fs.existsSync(directoryPath)) {
        fs.mkdirSync(directoryPath, { recursive: true });
    }

    let filePath = path.join(directoryPath, getDate(time) + extension);
    if (!Object.is(level, "DEBUG"))
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, string);
        } else {
            fs.appendFileSync(filePath, '\n' + string);
        }

    //delete logs over 1 week old
    time.setDate(time.getDate() - 7);

    try {
        fs.readdir(directoryPath, (err, files) => {
            if (err) {
                let errMSG = `${timeString} [log/ERROR]: ${err}`;
                console.log(errMSG);
                fs.appendFileSync(filePath, '\n' + errMSG);
                return;
            }
    
            files.forEach((file) => {
                let fp = path.join(directoryPath, file);
                let stat = fs.statSync(fp);
    
                if (stat.isFile()) {
                    let fileDate = ld.cloneDeep(time);
                    let fnArray = file.split(".")[0].split("-");
    
                    fileDate.setFullYear(Number(fnArray[0]));
                    fileDate.setMonth(Number(fnArray[1]-1));
                    fileDate.setDate(Number(fnArray[2]));
    
                    if (fileDate < time) {
                        fs.unlink(fp, (unlinkErr) => {
                            if (unlinkErr) {
                                let errMSG = `${timeString} [log/ERROR]: Error deleting log "${fp}": ${unlinkErr}`;
                                console.log(errMSG);
                                fs.appendFileSync(filePath, '\n' + errMSG);
                            } else {
                                console.log(`Deleted log: ${fp}`);

                                
                                let msg = `${timeString} [log/INFO]: Deleted log: ${fp}`;
                                console.log(msg);
                                fs.appendFileSync(filePath, '\n' + msg);
                            }
                        });
                    }
                }
            });
        });
    } catch (e) {
        let errMSG = `${timeString} [log/ERROR]: LogDeletionError: ${e.mmessage}`;
        console.log(errMSG);
        fs.appendFileSync(filePath, '\n' + errMSG);
    }
}

logger = {
    debug: (msg, trace) => log("DEBUG", msg, trace),
    info: (msg, trace) => log("INFO", msg, trace),
    warn: (msg, trace) => log("WARN", msg, trace),
    error: (msg, trace) => log("ERROR", msg, trace)
};

module.exports = logger;