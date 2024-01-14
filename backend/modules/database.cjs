const { MongoClient } = require("mongodb");
var url = "mongodb://127.0.0.1:27017";

const mDBClient = new MongoClient(url);

module.exports = mDBClient