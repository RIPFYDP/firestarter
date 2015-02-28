var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Q = require('q');
var cheerio = require('cheerio');
var _ = require('lodash');
var Request = require('./request');

var earlybirdSchema = new Schema({
  date: { type: Date, default: Date.now },
});

var Earlybird = mongoose.model('Earlybird', earlybirdSchema);
module.exports = Earlybird;
