var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var _ = require('lodash');
var uuid = require('node-uuid');

var verificationSchema = new Schema({
  date: { type: Date, default: Date.now },
  trail: { type: String, required: true, unique: true },
  verified: { type: Boolean, require: true, default: false },
  _earlybird: { type: Schema.Types.ObjectId, ref: 'Earlybird' }
});

var Verification = mongoose.model('Verification', earlybirdSchema);
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
