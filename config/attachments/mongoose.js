var mongoose = require('mongoose');
var Q = require('q');
var _ = require('lodash');

var environment = require('./environment');
var Mongoose = function() {};

Mongoose.prototype.connect = function() {
  var deferred = Q.defer();
  var url = environment.current.database.fullUrl;
  var options = {};
  var variables = process.env.ENV_VARIABLES;

  if (_.isEmpty(variables.APP_MONGODB_USERNAME)
    && _.isEmpty(variables.APP_MONGODB_PASSWORD)) {

    options = {
      user: variables.APP_MONGODB_USERNAME,
      pass: variables.APP_MONGODB_PASSWORD
    };

    mongoose.connect(url, options, function(err) {
      if (err) {
        deferred.reject(err);
      }

      deferred.resolve(mongoose);
    });

  } else {

    mongoose.connect(url, function(err) {
      if (err) {
        deferred.reject(err);
      }

      deferred.resolve(mongoose);
    });
  }

  return deferred.promise;
};

module.exports = Mongoose;
