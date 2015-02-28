var Q = require('q');

var controlPanelController = {
  index: function(req, res, next) {
    res.render('pages/index');
  }
};

module.exports = controlPanelController;
