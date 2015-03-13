var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var _ = require('lodash');

var verificationSchema = new Schema({
  date: { type: Date, default: Date.now },
  trail: { type: String, required: true, unique: true }
});

var Verification = mongoose.model('Verification', earlybirdSchema);
module.exports = Verification;


git commit --amend --date="Sat Mar 13 14:00 2015 +0100"
