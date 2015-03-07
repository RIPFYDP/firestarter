var chai = require('chai');
var expect = chai.expect;
var Q = require('q');
var _ = require('lodash');
var app = require('../../../app');
var faker = require('faker');

var Earlybird = require('../../../app/models/earlybird');

describe('earlybird model', function() {

  before(function(done) {
    app.main('test');
    server = app.express.listen(3001);
    done();
  });

  after(function(done) {
    server.close();
    done();
  });

  it('.insertOneQ', function(done) {
    var eb = { email: faker.internet.email() };

    Earlybird.insertOneQ(eb)
    .then(function(earlybird) {
      expect(earlybird).to.be.a('object');
      expect(earlybird.email).to.equal(eb.email);
      done();
    }, function(err) {
      console.log('error:', err);
      expect(err).to.equal(null);
      done();
    });
  });

});
