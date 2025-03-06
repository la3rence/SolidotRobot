import { describe, expect, it, vi } from "vitest";
import start from "./start.js";

describe("start.js", () => {

    vi.mock(import('../utils/db.js'), async (importOriginal) => {
        return {
            getCollection: async () => vi.fn(),
        }
    });

    vi.mock(import('../main.js'), async (importOriginal) => {
        return {
            default: async (_dbCollection) => vi.fn()
        }
    });

    class Request {
        headers = {};
        constructor(ip, agent) {
            this.headers = {
                "x-forwarded-for": ip, // ip
                "user-agent": agent // ua
            };
        }
    }

    class Response {
        status(_httpStatus) {
            return this;
        }

        json(object) {
            return JSON.stringify(object);
        }
    }

    it("default - should response HTTP 200 and return a list of RSS, given an IP and Agent", async () => {

        const ip = "localhost.com";
        const agent = "agent_007";
        const request = new Request(ip, agent);
        const response = new Response();

        const spyResponseStatus = vi.spyOn(Response.prototype, 'status');

        // Call start
        await start(request, response);

        expect(spyResponseStatus).toHaveBeenCalledWith(200);
    });

});