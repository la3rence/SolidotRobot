var doRss = require('../main');

module.exports = async (req, res) => {
  var json =  await doRss();
  res.status(200).json(json)
}