const handleRSS = require('../main');

module.exports = async (req, res) => {
  const list = await handleRSS();
  res.status(200).json(list)
}
