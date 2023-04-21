const handleRSS = require('../main');

module.exports = async (req, res) => {
  console.log(req.headers["x-forwarded-for"]);
  const list = await handleRSS();
  res.status(200).json(list);
}
