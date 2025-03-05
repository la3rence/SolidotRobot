import { Collection, MongoClient } from "mongodb";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
// import { getCollection } from "./db.js";

describe("db.js", () => {
    const MONGO_URI = "mongodb://localhost.com:27017/solidotrobot";

    beforeEach(() => {
        vi.stubEnv('MONGODB_URI', MONGO_URI);
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    vi.mock("dotenv/config");

    // vi.mock(import("mongo"), (importOriginal) => {




    //     const MongoClient = vi.fn();
    //     MongoClient['connect'] = vi.fn(async (_uri, _options = {}) => mockClient);

    //     return {
    //         MongoClient
    //     }
    // });

    it("getCollection - should connect to database and return a reference to a MongoDB Collection", async () => {

        /**
         * 
         * @type {MongoClient}
         */
        const mockDb = {
            collection: vi.fn(async () => new Collection(this, "demo"))
        };

        const mockClient = {
            db: vi.fn(async () => mockDb)
        };
        const spyConnect = vi.spyOn(MongoClient, 'connect').mockImplementation(async (_uri, _options) => mockClient);

        const collectionName = "collection";
        vi.stubEnv("MONGO_URI", "mongodb://localhost.com:27017/demo");


        // use async import so that MONGO_URI env var is loaded after test.
        const { getCollection } = await import("./db.js");

        const result = await getCollection(collectionName);

        expect(result).toBeDefined(); // (Collection);
        expect(process.env.MONGODB_URI).toEqual(MONGO_URI);
        expect(spyConnect).toHaveBeenCalled();
    });
});