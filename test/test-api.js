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
    var newExercise = new Exercise({
      name: 'Reddit Clone',
      description: 'Use Angular to create your own clone of Reddit.',
      tags: ['angular', 'reddit', 'mvc']
    });
    newExercise.save(function(err) {
      done();
    });
  });

  afterEach(function(done) {
    Exercise.collection.drop();
    done();
  });

  it('should list all exercises on GET /exercises', function(done) {
    chai.request(server)
      .get('/api/v1/exercises')
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
        done();
      });
  });

  it('should return a single exercise on GET /exercise/:id', function(done) {
    new Exercise({
      name: 'Rock Paper Scissors',
      description: 'Use Angular to create an in browser version of rocl, paper, scissors.',
      tags: ['angular','game','warmup']
    }).save(function(err, data) {
      chai.request(server)
        .get('/api/v1/exercise/' + data._id)
        .end(function (error, res) {
          res.should.have.status(200);
          res.should.be.json;
          res.body.should.be.a('object');
          res.body.should.have.property('_id');
          res.body.should.have.property('name');
          res.body.name.should.be.a('string');
          res.body.name.should.equal('Rock Paper Scissors');
          res.body.should.have.property('description');
          res.body.description.should.be.a('string');
          res.body.description.should.equal('Use Angular to create an in browser version of rocl, paper, scissors.');
          res.body.should.have.property('tags');
          res.body.tags.should.be.a('array');
          done();
        });
    });
  });

  it('should add an exercise on POST /exercises', function(done) {
    chai.request(server)
      .post('/api/v1/exercises')
      .send({
        'name': 'Node Translator',
        'description': 'A translator app that uses Microsoft Translate.',
        'tags': ['node','express','group project']
      })
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('message');
        res.body.message.should.be.a('string');
        res.body.message.should.equal('SUCCESS');
        res.body.should.have.property('entry');
        res.body.entry.should.be.a('object');
        res.body.entry.should.have.property('_id');
        res.body.entry.should.have.property('name');
        res.body.entry.name.should.be.a('string');
        res.body.entry.name.should.equal('Node Translator');
        res.body.entry.should.have.property('description');
        res.body.entry.description.should.be.a('string');
        res.body.entry.description.should.equal('A translator app that uses Microsoft Translate.');
        res.body.entry.should.have.property('tags');
        res.body.entry.tags.should.be.a('array');
        done();
      });
  });

  it('should let you edit an exercise entry on PUT /exercise/:id', function(done) {
    chai.request(server)
      .get('/api/v1/exercises')
      .end(function(err, res) {
        chai.request(server)
          .put('/api/v1/exercise/' + res.body[0]._id)
          .send({
            name: 'UPDATED NAME',
            description: 'UPDATED DESCRIPTION',
            tags: ['UPDATED', 'TAGS']
          })
          .end(function(error, response) {
            response.should.have.status(200);
            response.should.be.json;
            response.body.should.have.property('message');
            response.body.message.should.be.a('string');
            response.body.message.should.equal('UPDATED');
            response.body.should.have.property('entry');
            response.body.entry.should.be.a('object');
            response.body.entry.should.have.property('_id');
            response.body.entry.should.have.property('name');
            response.body.entry.name.should.be.a('string');
            response.body.entry.name.should.equal('UPDATED NAME');
            response.body.entry.should.have.property('description');
            response.body.entry.description.should.be.a('string');
            response.body.entry.description.should.equal('UPDATED DESCRIPTION');
            response.body.entry.should.have.property('tags');
            response.body.entry.tags.should.be.a('array');
            done();
          });
      });
  });

  it('should delete an exercise on DELETE /exercise/:id', function(done) {
    chai.request(server)
      .get('/api/v1/exercises')
      .end(function(error, response) {
        chai.request(server)
          .delete('/api/v1/exercise/' + response.body._id)
          .end(function(err, res) {
            res.should.have.status(200);
            res.should.be.json;
          });
      });
  });
});
