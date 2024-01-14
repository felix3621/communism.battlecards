const { MongoClient } = require("mongodb");
require('dotenv').config();
var url = "mongodb://127.0.0.1:27017";

const mDBClient = new MongoClient(process.env.MONGODB_URI);

module.exports = mDBClient