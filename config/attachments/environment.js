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

    environment.setVariables();
    environment.current.init(app);
  },

  setVariables: function() {
    var variables = {};
    var fileLocation = '/etc/firestarter/firestarter.json';

    // Damn it, I like using #existsSync()
    if (fs.existsSync(fileLocation)) {
      var file = fs.readFileSync(fileLocation, 'utf8');
      variables = JSON.parse(file);
    }

    environment.current.variables = variables;
  }
};



module.exports = environment;
