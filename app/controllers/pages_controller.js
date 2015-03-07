var Q = require('q');

var pagesController = {
  index: function(req, res, next) {
    res.render('pages/index');
  }
};

module.exports = pagesController;
