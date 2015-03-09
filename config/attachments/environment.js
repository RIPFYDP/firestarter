var environment = {};
var development = require('../environments/development');
var test = require('../environments/test');
var staging = require('../environment/staging');
var fs = require('fs');

environment = {
  init: function(app) {
    environment.development = development;
    environment.test = test;

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

    environment.setVariables();
    environment.current.init(app);
  },

  setVariables: function() {
    var variables = JSON.parse(fs.readFileSync('/etc/firestarter/firestarter', 'utf8'));
    environment.current.variables = variables;
  }
};



module.exports = environment;
