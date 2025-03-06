import { Db, MongoClient } from "mongodb";
import url from "url";
import "dotenv/config";
import process from "process";

const mongodbAddress = process.env.MONGODB_URI;
let cachedDb = null;

/**
 * @type {MongoClient}
 */
let currentClient = null;

/**
 * 
 * @param {string} uri 
 * @returns {Db}
 */
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

export const getCollection = async (collectionName) => {
    const db = await connectToDatabase(mongodbAddress);
    return db.collection(collectionName);
}
