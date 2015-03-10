var fs = require('fs');

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

    process.env.ENV_VARIABLES = variables;
  }
};

module.exports = global;
