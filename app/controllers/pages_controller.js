var Q = require('q');
var Earlybird = require('../models/earlybird');

var pagesController = {
  index: function(req, res, next) {
    res.render('pages/index');
  },

  postSignUp: function(req, res) {
    var email = req.body.email;

    Earlybird.insertOneQ({ email: email })
    .then(function(earlybird) {
      req.flash('success', 'Thank you for signing up!');
      return res.redirect('/');
    }, function(err) {
      req.flash('danger', err.message);
      return res.redirect('/');
    });
  }
};

module.exports = pagesController;
