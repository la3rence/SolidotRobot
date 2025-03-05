import { Collection, MongoClient } from "mongodb";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

describe("db.js", () => {
    const MONGO_URI = "mongodb://localhost.com:27017/solidotrobot";

    beforeEach(() => {
        vi.stubEnv('MONGODB_URI', MONGO_URI);
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    vi.mock("dotenv/config");

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

        // use async import so that MONGODB_URI env var is loaded after test.
        const { getCollection } = await import("./db.js");

        const result = await getCollection(collectionName);

        expect(result).toBeDefined(); // (Collection);
        expect(process.env.MONGODB_URI).toEqual(MONGO_URI);
        expect(spyConnect).toHaveBeenCalled();
    });
});