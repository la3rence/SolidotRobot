const url = require('url');
const MongoClient = require('mongodb').MongoClient
require('dotenv').config();

const mongodbAddress = process.env.MONGODB_URI;
let cachedDb = null;
let currentClient = null;
async function connectToDatabase(uri) {
    if (cachedDb) {
        return cachedDb
    }
    const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    currentClient = client;
    const db = await client.db(url.parse(uri).pathname.substr(1))
    cachedDb = db
    return db
}

async function getCollection(collectionName) {
    const db = await connectToDatabase(mongodbAddress);
    return db.collection(collectionName);
}

module.exports.findAllByCollection = async (collectionName) => {
    const table = await getCollection(collectionName);
    return table.find({}).toArray();
}

module.exports.insertOne = async (collectionName, oneRecord) => {
    const table = await getCollection(collectionName);
    return table.insertOne(oneRecord);
}

module.exports.deleteOne = async (collectionName, whereObj) => {
    const table = await getCollection(collectionName);
    return table.deleteOne(whereObj);
}

module.exports.count = async (collectionName, whereObj) => {
    const table = await getCollection(collectionName);
    return table.countDocuments(whereObj);
}

module.exports.connect = async () => {
    const db = await connectToDatabase(mongodbAddress);
    return db;
}

module.exports.close = async () => {
    await currentClient.close();
}