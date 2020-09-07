var db = require('./utils/db');
const parser = require('./utils/rss-parser');
const fanfou = require('./utils/fanfou');
const schedule = require('node-schedule');
const tableName = 'solidot';

async function doRss() {
    const feed = await parser.parseURL('https://www.solidot.org/index.rss');
    await Promise.all(
        feed.items.map(async article => {
            var linkCount = await db.count(tableName, { link: article.link });
            if (linkCount > 0) {
                console.log(`已发布: ${article.title}`)
            } else {
                console.log(`未发布: ${article.title}`);
                await fanfou.postStatus(`${article.link} :${article.contentSnippet}`);
                await db.insertOne(tableName, { link: article.link });
            }
        }));
}

function main() {
    schedule.scheduleJob('0 */5 * * * *', async () => {
        console.log('scheduleCronstyle:' + new Date());
        await doRss();
    });
}
module.exports = main;