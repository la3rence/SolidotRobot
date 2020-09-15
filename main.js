const db = require('./utils/db');
const parser = require('./utils/rss-parser');
const fanfou = require('./utils/fanfou');
const URL = require('url');
const tableName = 'solidot';

function getSidFromLink(link) {
    var arg = URL.parse(link, true);
    return parseInt(arg.query.sid);
}

async function doRss() {
    var list = [];
    const feed = await parser.parseURL('http://www.solidot.org/index.rss');
    var fanfouClient = await fanfou.authFan();
    await Promise.all(
        feed.items.map(async article => {
            var linkCount = await db.count(tableName, { link: article.link });
            var resFromFanfou = {};
            if (linkCount > 0) {
                console.log(`已发布: ${article.title}`)
                var beforeSid = getSidFromLink(article.link) - 20;
                var beforeLink = "https://www.solidot.org/story?sid=" + beforeSid;
                var beforeLinkCount = await db.count(tableName, { link: beforeLink });
                if (beforeLinkCount > 0) {
                    // console.log(`删除旧链接 ${beforeLink}`);
                    await db.deleteOne(tableName, { link: beforeLink });
                } else {
                    // console.log(`旧链接 ${beforeLink} 已被删除`);
                }
            } else {
                console.log(`执行发布: ${article.title}`);
                await db.insertOne(tableName, { link: article.link });
                try {
                    resFromFanfou = await fanfouClient.post('/statuses/update', { status: `${article.title} ${article.link}` });
                } catch (err) {
                    console.log(err);
                    // fanfou.expireAuth();
                }
            }
            list.push(resFromFanfou);
        }));
    return list;
}

module.exports = doRss;

// const schedule = require('node-schedule');
// function main() {
//     schedule.scheduleJob('*/1 * * * * *', async () => {
//         await doRss();
//     });
// }