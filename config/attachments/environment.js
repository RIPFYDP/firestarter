var environment = {};
var development = require('../environments/development');
var test = require('../environments/test');
var staging = require('../environments/staging');
var fs = require('fs');

environment = {
  init: function(app) {
    environment.development = development;
    environment.test = test;
    environment.staging = staging;

    switch (app.get('env')) {
      case 'development':
        environment.current = development;
        break;
      case 'test':
        environment.current = test;
        break;
      case 'staging':
        environment.current = staging;
        break;
      default:
        environment.current = development;
    }

    environment.current.init(app);
  }
};



module.exports = environment;
