const db = require('./utils/db');
const parser = require('./utils/rss-parser');
const fanfou = require('./utils/fanfou');
const tableName = 'solidot';

async function doRss() {
    const feed = await parser.parseURL('http://www.solidot.org/index.rss');
    await Promise.all(
        feed.items.map(async article => {
            var linkCount = await db.count(tableName, { link: article.link });
            if (linkCount > 0) {
                console.log(`已发布: ${article.title}`)
            } else {
                console.log(`未发布: ${article.title}`);
                await db.insertOne(tableName, { link: article.link });
                await fanfou.postStatus(`${article.title} ${article.link}`);
            }
        }));
}

module.exports = doRss;

// const schedule = require('node-schedule');
// function main() {
//     schedule.scheduleJob('*/1 * * * * *', async () => {
//         await doRss();
//     });
// }