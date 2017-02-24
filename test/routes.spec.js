process.env.NODE_ENV = 'test';
var server = require('../server/server.js');
var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);

describe('API Routes', function() {
  describe('GET /api/grudges', function() {
    it('should return grudges', function(done) {
      chai.request(server)
        .get('/api/grudges')
        .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json; // jshint ignore:line
        res.body.should.be.a('array')
        done();
        });
    });

  })
})
