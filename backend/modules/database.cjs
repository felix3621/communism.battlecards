const { MongoClient } = require("mongodb");
require('dotenv').config();

const mDBClient = new MongoClient(process.env.MONGODB_URI);

module.exports = mDBClient;