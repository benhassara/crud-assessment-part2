process.env.NODE_ENV = 'test';

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server/app');
var Exercise = require('../server/models/exercise');
var should = chai.should();

chai.use(chaiHttp);

describe('Exercises', function() {

  Exercise.collection.drop();

  beforeEach(function(done) {
    new Exercise({
      name: 'Reddit Clone',
      description: 'Use Angular to create your own clone of Reddit.',
      tags: ['angular', 'reddit', 'mvc']
    }).save(function(err) {
      done();
    });
  });

  afterEach(function(done) {
    Exercise.collection.drop();
    done();
  });

  it('should list all exercises on GET /exercises', function(done) {
    chai.request(server)
      .get('api/v1/exercises')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body[0].should.have.property('_id');
        res.body[0].should.have.property('name');
        res.body[0].name.should.be.a('string');
        res.body[0].name.should.equal('Reddit Clone');
        res.body[0].should.have.property('description');
        res.body[0].description.should.be.a('string');
        res.body[0].description.should.equal('Use Angular to create your own clone of Reddit.');
        res.body[0].should.have.property('tags');
        res.body[0].tags.should.be.a('array');
        res.body[0].tags.should.equal(['angular', 'reddit', 'mvc']);
      });
  });

  it('should return a single exercise on GET /exercise/:id');

  it('should add an exercise on POST /exercises');

  it('should let you edit an exercise entry on PUT /exercise/:id');

  it('should delete an exercise on DELETE /exercise/:id');
});