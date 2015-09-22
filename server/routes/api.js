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

module.exports = router;
