var Q = require('q');
var Earlybird = require('../models/earlybird');

var pagesController = {
  index: function(req, res, next) {
    // TODO: Show in dev and staging only
    var diagnostics = {
      GMAIL_USER: process.env.GMAIL_USER,
      GMAIL_PASS: process.env.GMAIL_PASS,
      NODE_ENV: process.env.NODE_ENV
    };

    res.render('pages/index', { diagnostics: diagnostics });
  },

  postSignUp: function(req, res) {
    var email = req.body.email;

    Earlybird.insertOneAndSendEmailQ({ email: email })
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
