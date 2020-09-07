const app = require('../app');

module.exports = (req, res) => {
  app.callback()(req, res);
};