'use strict';
// 饭否 SDK
const Fanfou = require('fanfou-sdk');
// for local dev using .env to expose env values
require('dotenv').config();

let fanfou_client;
let authed = false;

async function authFan() {
    if (authed === true) {
        console.log("已登录过饭否，检查 Token 是否有效...");
        let user;
        try {
            user = await fanfou_client.get("/account/verify_credentials");
            if (user) {
                console.log("Token 有效!");
                return fanfou_client;
            }
        } catch (error) {
            console.log("出现异常");
            authed = false;
        }
    }
    console.log("Token 失效，登录饭否");
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
//     console.log("发布消息");
//     const status = await ff.post('/statuses/update', { status: text });
//     return status;
// }

module.exports = {
    authFan, expireAuth,
};