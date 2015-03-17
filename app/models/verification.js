var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var _ = require('lodash');
var uuid = require('node-uuid');
var Earlybird = require('./earlybird');

var verificationSchema = new Schema({
  date: { type: Date, default: Date.now },
  trail: { type: String, required: true, unique: true },
  verified: { type: Boolean, require: true, default: false },
  _earlybird: { type: Schema.Types.ObjectId, ref: 'Earlybird' }
});

var Verification = mongoose.model('Verification', verificationSchema);
module.exports = Verification;

Verification.prepareQ = function(earlybirdId) {
  var deferred = Q.defer();

  var verification = new Verification({
    trail: uuid.v1(),
    verified: false
  });
  verification._earlybird = earlybirdId;

  verification.save(function(err, result) {
    if (err) {
      return deferred.reject(err);
    }

    return deferred.resolve(result);
  });

  return deferred.promise;
};

Verification.verifyQ = function(trail) {
  var deferred = Q.defer();

  Verification.findOneAndUpdateQ({ trail: trail }, { verified: true })
  .then(function(verification) {
    return Earlybird.findOneQ({ _id: verification._earlybird });
  }, function(err) {
    return deferred.reject(err);
  })
  .then(function(result) {
    return deferred.resolve(result);
  }, function(err) {
    return deferred.reject(err);
  });

  return deferred.promise;
};

Verification.findOneAndUpdateQ = function(conditions, data) {
  var deferred = Q.defer();

  Verification.findOneAndUpdate(conditions, data, {},function(err, result) {
    if (err) {
      return deferred.reject(err);
    }

    return deferred.resolve(result);
  });

  return deferred.promise;
};
