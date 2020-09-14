var doRss = require('../main');

module.exports = async (req, res) => {
  var res = await doRss();
  res.status(200).json(res);
}