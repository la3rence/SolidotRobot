const url = require('url');
const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();

const mongodbAddress = process.env.MONGODB_URI;
let cachedDb = null;
let currentClient = null;

async function connectToDatabase(uri) {
    if (cachedDb) {
        return cachedDb;
    }
    const client = await MongoClient.connect(uri,
            { useNewUrlParser: true, useUnifiedTopology: true, connectTimeoutMS: 10000, maxIdleTimeMS: 10000 }
         )
    currentClient = client;
    const db = await client.db(url.parse(uri).pathname.substr(1))
    cachedDb = db
    return db
}

module.exports.getCollection = async (collectionName) => {
    const db = await connectToDatabase(mongodbAddress);
    return db.collection(collectionName);
}