var Q = require('q');
var Verification = require('../models/verification');
var Email = require('../models/email');

var verificationsController = {
  postVerify: function(req, res) {
    var trail = req.params.trail;

    Verification.verifyQ(trail)
    .then(function(earlybird) {
      return Email.verifiedQ(earlybird);
    }, function(err) {
      req.flash('danger', 'Sorry. We couldn\'t verify your account. Please email support@6compass.com');
      return res.redirect('/');
    })
    .then(function(result) {
      req.flash('success', 'Thank you for verifying your account!');
      return res.redirect('/');
    }, function(err) {
      req.flash('danger', 'Sorry. We couldn\'t verify your account. Please email support@6compass.com');
      return res.redirect('/');
    });
  }
};

module.exports = verificationsController;
