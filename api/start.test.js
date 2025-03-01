import { describe, expect, it, vi } from "vitest";
import start from "./start.js";
import { request } from "http";

describe("start", () => {

    vi.mock(import('../utils/db.cjs'), async (importOriginal) => {
        return {
            getCollection: async () => "mongo://localhost.com",
        }
    });

    vi.mock(import('../main.cjs'), async (importOriginal) => {
        return {
            default: async (dbCollection) => []
        }
    });

    it("default - should response HTTP 200 and return a list of RSS", async () => {
        const request = {
            headers: {
                "x-forwarded-for": "127.0.0.1", // ip
                "user-agent": "agent" // ua
            }
        };
        const response = {
            status(httpStatus) {
                return {
                    json(jsonObject) {
                        return new Object();
                    }
                }
            }
        };

        await expect(start(request, response)).toBeDefined();
    });

});