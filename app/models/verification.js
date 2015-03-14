var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var _ = require('lodash');

var verificationSchema = new Schema({
  date: { type: Date, default: Date.now },
  trail: { type: String, required: true, unique: true },
  _earlybird: { type: Schema.Types.ObjectId, ref: 'Earlybird' }
});

var Verification = mongoose.model('Verification', earlybirdSchema);
module.exports = Verification;
