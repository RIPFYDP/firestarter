var express = require('express');
var routes = express.Router();

var applicationController = require('../app/controllers/application_controller');
var pagesController = require('../app/controllers/pages_controller');

routes.get('/*', applicationController.index);

routes.get('/', pagesController.index);

module.exports = routes;
