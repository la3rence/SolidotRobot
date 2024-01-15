const handleRSS = require("../main");
const db = require("../utils/db");

// cache this
let dbCollection = null;

const getDB = async () => {
  if (dbCollection) return dbCollection;
  dbCollection = await db.getCollection("solidot");
  return dbCollection;
};

// in-memory rate limit
const history = {};
const timeout = 1000 * 60 * 15;

module.exports = async (req, res) => {
  const ip = req.headers["x-forwarded-for"];
  const ua = req.headers["user-agent"];
  const timestamp = Date.now() - timeout;
  if (history[ip] > timestamp || history[ua] > timestamp) {
    console.info(`Rate limit exceeded - ${ip} ${ua}`);
    res.status(200).json([]);
    return;
  }
  const now = Date.now();
  history[ip] = now;
  history[ua] = now;
  const list = await handleRSS(getDB());
  res.status(200).json(list);
};
