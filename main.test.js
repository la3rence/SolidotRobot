import Fanfou from "fanfou-sdk";
import { afterEach, describe, expect, it, vi } from "vitest";
import { default as handleRSS } from "./main.js";
import { Collection } from "mongodb";
import parser from "./utils/rss-parser.cjs";

describe('main.js', () => {

    const mockParser = vi.hoisted(() => {
        return {
            default: vi.fn(),
        }
    })

    vi.mock(import("./utils/rss-parser.cjs"), async (importOriginal) => {
        return {
            default: mockParser.default
        };
    });

    vi.mock(import('./utils/fanfou.cjs'), async (importOriginal) => {
        const actual = await importOriginal();
        return {
            ...actual,
            authFan: async () => Promise.resolve(new Fanfou({}))
        };
    });


    vi.mock(import("mongodb"), async (importOriginal) => {
        const actual = await importOriginal();
        const collection = vi.fn();
        collection.prototype.countDocuments = vi.fn(async ({ }) => 1);
        collection.prototype.deleteOne = vi.fn();
        return {
            ...actual,
            Collection: collection
        }
    });

    it("handleRSS - should return a list of response with one empty item from fanfou client", async () => {
        const items = [{
            link: 'localhost.com/element?sid=1',
            title: 'A title',
        }];

        parser.parseURL = vi.fn(async () => { return { items: [...items] } })

        const dbCollection = new Collection();

        const result = await handleRSS(dbCollection);

        await expect(result).toEqual([{}]);
    });


    it("handleRSS - should return an empty list of response from fanfou client", async () => {
        parser.parseURL = vi.fn(async (_feedUrl) => { return { items: [] } });
        mockParser.default.mockImplementation(parser);

        mockParser.default.mockImplementation(parser);

        const dbCollection = new Collection();

        const result = await handleRSS(dbCollection);

        await expect(result).toEqual([]);
    });


    afterEach(() => {
        mockParser.default.mockRestore();
    });

});