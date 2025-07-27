import { Db, MongoClient } from "mongodb";
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
        { connectTimeoutMS: 6000, maxIdleTimeMS: 6000 }
    )
    currentClient = client;
    const dbName = new URL(uri).pathname.replace(/^\//, "");
    const db = await client.db(dbName);
    cachedDb = db;
    return db;
}

export const getCollection = async (collectionName) => {
    const db = await connectToDatabase(mongodbAddress);
    return db.collection(collectionName);
}
