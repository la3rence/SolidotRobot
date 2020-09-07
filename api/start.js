var m = require('../main');

module.exports = async (req, res) => {
    m();
    // Respond with a JSON string of all users in the collection
    res.status(200).json({ "hello": "world" })
  }