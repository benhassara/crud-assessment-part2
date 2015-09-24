angular.module('exercisesApp')
  .controller('AddExercise', AddExercise);

AddExercise.$inject = ['$scope', 'httpFact', 'exercises'];

function AddExercise($scope, httpFact, exercises) {
  exercises.getAllExercises();

  $scope.postExercise = function() {
    $scope.ex.tags = $scope.ex.tags.split(',');
    $scope.ex.tags.forEach(function(tag, i) {
      $scope.ex.tags[i] = tag.trim();
    });

    httpFact.post('/api/v1/exercises', $scope.ex)
      .then(function(response){
        console.log(exercises);
        exercises.all.push(response.data);
        $scope.ex = {};
      });
  };

}
