var fs = require('fs');
var _ = require('lodash');

var setHash = function(hash) {
  _.each(hash, function(value, key) {
    process.env[key] = value;
  });
};

var developmentVariables = {
  'APP_NAME': '6Compass',
  'PROTOCOL': 'http',
  'HOST': 'localhost:3000'
};

var stagingVariables = {
  'APP_NAME': '6Compass',
  'PROTOCOL': 'http',
  'HOST': '104.236.91.35'
};

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

    setHash(variables);

    if (process.env.ENVIRONMENT === 'development') {
      setHash(developmentVariables);
    } else if (process.env.ENVIRONMENT === 'staging') {
      setHash(stagingVariables);
    }
  }
};

module.exports = global;
