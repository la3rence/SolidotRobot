import Fanfou from "fanfou-sdk";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { authFan, expireAuth } from "./fanfou.js";

describe("fanfou.js", () => {

    const CONSUMERKEY = 'consumer-key';
    const CONSUMERSECRET = 'consumer-secret';
    const USERNAME = 'username';
    const PASSWORD = 'password';

    const configureEnvVars = () => {
        vi.stubEnv('CONSUMERKEY', CONSUMERKEY);
        vi.stubEnv('CONSUMERSECRET', CONSUMERSECRET);
        vi.stubEnv('USERNAME', USERNAME);
        vi.stubEnv('PASSWORD', PASSWORD);
    };

    beforeEach(() => {
        configureEnvVars();
    });

    afterEach(() => {
        vi.unstubAllEnvs();
    });

    vi.mock(import("dotenv"), () => {
        return {
            config: vi.fn()
        }
    });

    it("authFan - should return an instance of `Fanfou` client when not authed and call fanfou_client.xauth", async () => {
        const spyXauth = vi.spyOn(Fanfou.prototype, 'xauth').mockImplementation(async () => { });

        const result = await authFan();

        expect(result).toBeInstanceOf(Fanfou);
        expect(spyXauth).toHaveBeenCalledOnce();

        // env vars should be set
        expect(process.env.CONSUMERKEY).toEqual(CONSUMERKEY);
        expect(process.env.CONSUMERSECRET).toEqual(CONSUMERSECRET);
        expect(process.env.USERNAME).toEqual(USERNAME);
        expect(process.env.PASSWORD).toEqual(PASSWORD);
    });

    it("authFan - should return an instance of `Fanfou` client already authenticated", async () => {
        const spyXauth = vi.spyOn(Fanfou.prototype, 'xauth').mockImplementation(async () => { });

        const spyGet = vi.spyOn(Fanfou.prototype, 'get').mockImplementation(async (_uri) => { });

        // call authFan() 2 times so that we run the code as authenticated.
        await authFan();
        const result = await authFan();

        expect(spyXauth).toHaveBeenCalledTimes(2);
        expect(spyGet).toHaveBeenCalled();
        expect(result).toBeInstanceOf(Fanfou);
    });

    it('expireAuth - should change authed to false', async () => {
        // get authenticated
        // await authFan();

        expireAuth();
    });
});