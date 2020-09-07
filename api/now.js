const app = require('../main');

module.exports = (req, res) => {
  app.callback()(req, res);
};