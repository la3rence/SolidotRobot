const handleRSS = require('../main');

// in-memory rate limit
const history = {};

module.exports = async (req, res) => {
  const ip = req.headers["x-forwarded-for"];
  if (history[ip] > Date.now() - 1000 * 60 * 20){
    console.warn(`Rate limit exceeded - ${ip}: ${history[ip]}`);
    res.status(200).json([]);
    return;
  }
  history[ip] = Date.now();
  const list = await handleRSS();
  res.status(200).json(list);
}
