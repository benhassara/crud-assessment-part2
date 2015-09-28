angular.module('exercisesApp')
  .factory('exercises', exercises);

exercises.$inject = ['$http'];

function exercises($http) {
  var obj = {};

  var list = [];

  obj.populateExercises = function() {
    return $http.get('/api/v1/exercises');
  };

  obj.getExercises = function() {
    return list;
  };

  obj.setExercises = function(set) {
    list = set;
  };

  obj.addExercise = function(newExercise) {
    list.push(newExercise);
  };

  obj.post = function(payload) {
    return $http.post('/api/v1/exercises', payload);
  };

  obj.put = function(id, payload) {
    return $http.put('/api/v1/exercise/' + id, payload);
  };

  obj.delete = function(id) {
    return $http.delete('/api/v1/exercise/' + id);
  };

  return obj;
}
