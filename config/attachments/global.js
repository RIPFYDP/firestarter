var fs = require('fs');
var _ = require('lodash');

var global = {
  // TODO: change to async
  setEnvVariables: function() {
    var variables = {};
    var fileLocation = '/etc/firestarter/firestarter.json';

    // Damn it, I like using #existsSync()
    if (fs.existsSync(fileLocation)) {
      var file = fs.readFileSync(fileLocation, 'utf8');
      variables = JSON.parse(file);
    }

    _.each(variables, function(value, key) {
      process.env[key] = value;
    });

    process.env.APP_NAME = '6Compass';
    process.env.PROTOCOL = 'http';
    process.env.HOST = 'localhost:3000';
  }
};

module.exports = global;
