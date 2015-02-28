var Nightmare = require('nightmare');
var chai = require('chai');
var expect = chai.expect;
var app = require('../../../../app');

describe('/', function() {
  this.timeout(50000);

  before(function(done) {
    app.main('test');
    server = app.express.listen(3001);
    done();
  });

  after(function(done) {
    server.close();
    done();
  });

  beforeEach(function() {
    nightmare = new Nightmare();
  });

  it('', function(done) {
    nightmare.goto('http://localhost:3001/')
    .run(done);
  });
});
