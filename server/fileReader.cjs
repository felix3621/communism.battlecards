const fs = require('fs');
const path = require('path');

module.exports = (fileName) => {
    return fs.readFileSync(path.resolve(__dirname, fileName), 'utf8');
}