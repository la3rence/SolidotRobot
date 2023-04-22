const handleRSS = require('../main');

// in-memory rate limit
const history = {};
const timeout = 1000 * 60 * 30;

module.exports = async (req, res) => {
  const ip = req.headers["x-forwarded-for"];
  const ua = req.headers["user-agent"];
  const timestamp = Data.now() - timeout;
  if (history[ip] > timestamp || history[ua] > timestamp) {
    console.info(`Rate limit exceeded - ${ip} ${ua}`);
    res.status(200).json([]);
    return;
  }
  const now = Date.now();
  history[ip] = now;
  history[ua] = now;
  const list = await handleRSS();
  res.status(200).json(list);
}
