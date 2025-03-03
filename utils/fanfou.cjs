'use strict';
const Fanfou = require('fanfou-sdk');
require('dotenv').config();

/**
 * @type{Fanfou}
 */
let fanfou_client;
let authed = false;

async function authFan() {
    if (authed === true) {
        console.log("Already authed... Checking token...");
        let user;
        try {
            user = await fanfou_client.get("/account/verify_credentials");
            if (user) {
                console.log("Token is valid.");
                return fanfou_client;
            }
        } catch (error) {
            console.error(error);
            authed = false;
        }
    }
    console.log("Token Expired. Login to Fanfou.");
    fanfou_client = new Fanfou({
        consumerKey: process.env.CONSUMERKEY,
        consumerSecret: process.env.CONSUMERSECRET,
        username: process.env.USERNAME,
        password: process.env.PASSWORD
    });
    await fanfou_client.xauth();
    authed = true;
    return fanfou_client;
}

function expireAuth() {
    authed = false;
}

// module.exports.getTimeline = async () => {
//     var ff = await authFan();
//     const timeline = await ff.get('/statuses/home_timeline', { count: 5 });
//     return timeline;
// }

// module.exports.postStatus = async (text) => {
//     var ff = await authFan();
//     const status = await ff.post('/statuses/update', { status: text });
//     return status;
// }

module.exports = {
    authFan, expireAuth,
};