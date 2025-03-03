import { MongoClient } from "mongodb";
import { describe, expect, it, vi } from "vitest";
import { getCollection } from "./db.cjs";
import { Collection } from "mongodb";

describe("db.js", () => {
    it("getCollection - should connect to database and return a reference to a MongoDB Collection", async () => {

        const mockDb = {
            collection: vi.fn(async () => new Collection(this, "demo"))
        };

        const mockClient = {
            db: vi.fn(async () => mockDb)
        };

        const spyConnect = vi.spyOn(MongoClient.prototype, 'connect').mockReturnValue(Promise.resolve(mockClient));

        const result = await getCollection();

        expect(result).toBeDefined();
        expect(spyConnect).toHaveBeenCalled();

    });
});