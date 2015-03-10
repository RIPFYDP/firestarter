var express = require('express');
var environment = require('./config/attachments/environment');
var mongoConnector = require('./config/attachments/mongoose_connector');
var global = require('./config/attachments/global');

var app = {
  main: function(env) {
    process.env.NODE_ENV = env;
    global.setEnvVariables();
    app.express = express();
    environment.init(app.express);
    mongoConnector.init(app.express);
  },

  express: {}
};

module.exports = app;
