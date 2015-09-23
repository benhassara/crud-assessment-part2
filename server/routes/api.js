var express = require('express');
var router = express.Router();
var mongoose = require('mongoose-q')(require('mongoose'), {spread:true});
var Exercise = require('../models/exercise');

router.get('/', function(req, res, next) {
  res.send({message: 'API file linked'});
});

// GET all exercises
router.get('/exercises', function(req, res, next) {
  Exercise.findQ()
    .then(function(result) {res.json(result);})
    .catch(function(err) {res.json({'error': err});})
    .done();
});

// GET single exercise
router.get('/exercise/:id', function(req, res, next) {
  Exercise.findByIdQ(req.params.id)
    .then(function (result) {res.json(result);})
    .catch(function(err) {res.json({'error': err});})
    .done();
});

// POST exercise
router.post('/exercises', function(req, res, next) {
  var newExercise = new Exercise({
    name: req.body.name,
    description: req.body.description,
    tags: req.body.tags
  });
  newExercise.saveQ()
    .then(function(result) {
      res.json({
        message: 'SUCCESS',
        entry: newExercise
      });
    })
    .catch(function(err) {res.json({message: 'POST FAILURE'});})
    .done();
});

// PUT update an exercise
router.put('/exercise/:id', function(req, res, next) {
  Exercise.findByIdAndUpdateQ(req.params.id, req.body, {new: true})
    .then(function(data) {
      res.json({
        'message': 'UPDATED',
        'entry': data
      });
    }).catch(function(err) {res.json(err);})
    .done();
});

module.exports = router;

function parsePut(data) {
  var out = {};

  if (data.name) {out.name = data.name;}
  if (data.description) {out.description = data.description;}
  if (data.tags.length !== 0) {out.tags = data.tags;}

  return out;
}
