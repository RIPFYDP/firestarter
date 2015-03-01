var Q = require('q');
var _ = require('lodash');
var faker = require('faker');
var mongoose = require('mongoose');
var devEnv = require('../config/environments/development');
var testEnv = require('../config/environments/test');

var Earlybird = require('../app/models/earlybird');

var taskHelpers = {
  mongooseConnect: function(env) {
    var deferred = Q.defer();

    if (env === 'test') {
      mongoose.connect(testEnv.database.fullUrl);
      setTimeout(function() {
        deferred.resolve(mongoose);
      }, 2000);
    } else if (env === 'development') {
      mongoose.connect(devEnv.database.fullUrl);
      setTimeout(function() {
        deferred.resolve(mongoose);
      }, 2000);
    }

    return deferred.promise;
  },

  insertEarlybirds: function() {
    return null
  },

  mongooseClose: function() {
    return Q.fcall(mongoose.connection.close);
  }
};

module.exports = taskHelpers;
