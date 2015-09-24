angular.module('exercisesApp')
  .factory('httpFact', httpFact)
  .factory('exercises', exercises);

httpFact.$inject = ['$http'];
exercises.$inject = ['httpFact'];

function httpFact($http) {
  var obj = {};

  obj.get = function(url) {
    return $http.get(url);
  };

  obj.post = function(url, payload) {
    return $http.post(url, payload);
  };

  return obj;
}

function exercises(httpFact) {
  var obj = {};

  obj.all = [];

  obj.getAllExercises = function() {
    httpFact.get('/api/v1/exercises').then(function(response) {
      obj.all = response.data;
    });
  };

  return obj;
}
