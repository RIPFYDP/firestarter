var chai = require('chai');
var expect = chai.expect;
var Q = require('q');
var _ = require('lodash');
var app = require('../../../app');
var faker = require('faker');

var Verification = require('../../../app/models/verification');
var Earlybird = require('../../../app/models/earlybird')

describe('verification model', function() {

  before(function(done) {
    app.main('test');
    server = app.express.listen(3001);
    done();
  });

  after(function(done) {
    server.close();
    done();
  });

  it('.prepareQ', function(done) {
    var eb = { email: faker.internet.email() };
    var earlybirdId = {};

    Earlybird.insertOneQ(eb)
    .then(function(earlybird) {
      earlybirdId = earlybird._id;
      return Verification.prepareQ(earlybird._id)
    })
    .then(function(verification) {
      expect(verification).to.be.a('object');
      expect(verification.trail).to.be.a('string');
      expect(verification.verified).to.equal(false);
      expect(verification._earlybird).to.equal(earlybirdId);
      done();
    })
    .catch(function(err) {
      console.log('error:', err);
      expect(err).to.equal(null);
      done();
    })
    .done();
  });

});
