// 饭否 SDK
const Fanfou = require('fanfou-sdk');
require('dotenv').config();

let fanfou_client;
let authed = false;

async function authFan() {
    if(authed === true) {
        console.log("已登录过饭否");
        return fanfou_client;
    } else {
        console.log("登录饭否");
        fanfou_client = new Fanfou({
            consumerKey: process.env.consumerKey,
            consumerSecret: process.env.consumerSecret,
            username: process.env.username,
            password: process.env.password
        });
        await fanfou_client.xauth();
        authed = true;
        return fanfou_client;
    }
}

function expireAuth(){
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
}