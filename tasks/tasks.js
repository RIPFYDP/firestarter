var mongoose = require('mongoose-q')(require('mongoose'));
var Q = require('q');
var developmentEnv = require('../config/environments/development');
var testEnv = require('../config/environments/test');
var taskHelpers = require('./task_helpers');

var tasks = {
  seed: function(env) {
    return Q.fcall(taskHelpers.mongooseConnect, env)
    .then(taskHelpers.insertEarlybirds)
    .fin(taskHelpers.mongooseClose);
  }
};

module.exports = tasks;
