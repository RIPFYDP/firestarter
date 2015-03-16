var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var _ = require('lodash');
var validator = require('validator');
var Email = require('./email');
var Verification = require('./verification');

var validators = {
  isEmail: function(val) {
    return validator.isEmail(val);
  }
};

var toValidate = {
  url: [validators.isEmail, 'Please use a valid email.']
};

var earlybirdSchema = new Schema({
  date: { type: Date, default: Date.now },
  email: { type: String, required: true, validate: toValidate.url, unique: true }
});

var Earlybird = mongoose.model('Earlybird', earlybirdSchema);
module.exports = Earlybird;

Earlybird.insertOneQ = function(data) {
  var deferred = Q.defer();

  Earlybird.create(data, function(err, result) {
    if (err) {
      return deferred.reject(err);
    }
    deferred.resolve(result);
  });

  return deferred.promise;
};

Earlybird.insertOneAndSendEmailQ = function(data) {
  var deferred = Q.defer();
  var returnEB;

  Earlybird.insertOneQ(data)
  .then(function(earlybird) {
    returnEB = earlybird;
    return Verification.prepareQ(earlybird.id);
  }, function(err) {
    return deferred.reject(err);
  })
  .then(function(verification) {
    return Email.sendDefault(returnEB.email, verification.trail);
  }, function(err) {
    return deferred.reject(err);
  })
  .then(function(result) {
    return deferred.resolve(returnEB);
  }, function(err) {
    return deferred.reject(err);
  });

  return deferred.promise;
};
