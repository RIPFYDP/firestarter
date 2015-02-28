var chai = require('chai');
var expect = chai.expect;
var Q = require('q');
var _ = require('lodash');
var app = require('../../../app');

var Earlybird = require('../../../app/models/earlybird');

describe('entity model', function() {

  before(function(done) {
    app.main('test');
    server = app.express.listen(3001);
    done();
  });

  after(function(done) {
    server.close();
    done();
  });

  it('', function(done) {
  });

});
