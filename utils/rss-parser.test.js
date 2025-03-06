import Parser from "rss-parser";
import { describe, expect, it } from "vitest";
import parser from "./rss-parser.js";

describe("rss-parser.js", () => {

    it("default - should return an instance of Parser (rss-parser)", () => {

        const result = parser;

        expect(result).toBeInstanceOf(Parser);
    });
});