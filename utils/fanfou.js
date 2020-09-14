// 饭否 SDK
const Fanfou = require('fanfou-sdk');
require('dotenv').config();

async function authFan() {
    console.log("登录饭否");
    const ff = new Fanfou({
        consumerKey: process.env.consumerKey,
        consumerSecret: process.env.consumerSecret,
        username: process.env.username,
        password: process.env.password
    });
    await ff.xauth();
    return ff;
}

module.exports.getTimeline = async () => {
    var ff = await authFan();
    const timeline = await ff.get('/statuses/home_timeline', { count: 5 });
    return timeline;
}

module.exports.postStatus = async (text) => {
    var ff = await authFan();
    console.log("发布消息");
    const status = await ff.post('/statuses/update', { status: text });
    return status;
}