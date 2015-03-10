var fs = require('fs');

var global = {
  setVariables: function(app) {
    var variables = {};
    var fileLocation = '/etc/firestarter/firestarter.json';

    // Damn it, I like using #existsSync()
    if (fs.existsSync(fileLocation)) {
      var file = fs.readFileSync(fileLocation, 'utf8');
      variables = JSON.parse(file);
    }
  }
};

module.exports = global;
