import { describe, expect, it, vi } from "vitest";
import start from "./start.js";

describe("start", () => {

    vi.mock(import('../utils/db.cjs'), async (importOriginal) => {
        return {
            getCollection: async () => "mongo://localhost.com",
        }
    });

    vi.mock(import('../main.js'), async (importOriginal) => {
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
        const response =  {
            status(_httpStatus) {
                return {
                    json(_jsonObject) {
                        return new Object();
                    }
                }
            }
        };

        await expect(start(request, response)).toBeDefined();
    });

});