"use strict";

const parser = require("./utils/rss-parser");
const fanfou = require("./utils/fanfou");
const URL = require("url");
const touchiness = require("./utils/touchiness");
const feedURL = "https://www.solidot.org/index.rss";

function getSidFromLink(link) {
  const arg = URL.parse(link, true);
  return parseInt(arg.query.sid);
}

async function handleRSS(dbCollection) {
  let list = [];
  const feed = await parser.parseURL(feedURL);
  const fanfouClient = await fanfou.authFan();
  await Promise.all(
    feed.items.map(async (article) => {
      const linkCount = await dbCollection.countDocuments({
        link: article.link,
      });
      let resFromFanfou = {};
      if (linkCount > 0) {
        console.log(`Published: ${article.title}`);
        const beforeSid = getSidFromLink(article.link) - 30;
        const beforeLink = `https://www.solidot.org/story?sid=${beforeSid}`;
        const beforeLinkCount = await dbCollection.countDocuments({
          link: beforeLink,
        });
        if (beforeLinkCount > 0) {
          console.log(`Deleting ${beforeLink}`);
          await dbCollection.deleteOne({ link: beforeLink });
        }
      } else {
        try {
          const title = article.title;
          for (const originalKey in touchiness) {
            title.replace(
              new RegExp(originalKey, "gm"),
              touchiness[originalKey]
            );
          }
          console.log(`Executing post: ${article.title}`);
          await dbCollection.insertOne({ link: article.link });
          console.log(`Call Fanfou API: ${article.title}`);
            resFromFanfou = await fanfouClient.post("/statuses/update", {
              status: `${title} ${article.link}`,
            });
        } catch (err) {
          console.warn(err);
          fanfou.expireAuth();
        }
      }
      list.push(resFromFanfou);
    })
  );
  return list;
}

module.exports = handleRSS;
