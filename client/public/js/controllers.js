angular.module('exercisesApp')

  .controller('ExercisesCtrl', ExercisesCtrl);

ExercisesCtrl.$inject = ['$scope', 'exercises'];

function ExercisesCtrl($scope, exercises) {
  $scope.form = {};

  /** grab exercises from API */
  exercises.populateExercises()
    .then(function(response) {
      $scope.exerciseList = response.data;
      console.log($scope.exerciseList);
    });

  $scope.openModal = function() {
    $scope.form.title = 'Add an Exercise';
    $('#formModal').modal('show');
  };

  $scope.handleSubmit = function() {
    if ($scope.form.title === 'Add an Exercise') {
      $scope.postExercise();
    }
    else if ($scope.form.title === 'Edit Exercise') {
      $scope.updateExercise();
    }
  };

  /** Reformats tags and posts exercise */
  $scope.postExercise = function() {
    // split tags into an array and trim whitespace
    $scope.ex.tags = $scope.ex.tags.split(',');
    $scope.ex.tags.forEach(function(tag, i) {
      $scope.ex.tags[i] = tag.trim();
    });

    exercises.post($scope.ex)
      .then(function(response) {
        $scope.apply($scope.exerciseList.push(response.data.entry));
      });

    $scope.ex = {};
    $('#formModal').modal('hide');
  };

  /** open the modal for editing a single exercise */
  $scope.openForEdit = function(event) {
    var editEx;
    var searchId = event.currentTarget.parentElement.dataset.id;
    $scope.form.title = 'Edit Exercise';

    for (var i = 0; i < $scope.exerciseList.length; i++) {
      if ($scope.exerciseList[i]._id === searchId) {
          editEx = $scope.exerciseList[i];
          $scope.ex = {
            name: editEx.name,
            description: editEx.description,
            tags: editEx.tags.toString(),
            _id: editEx._id
          };
          $('#formModal').modal('show');
      }
    }
  };

  $scope.updateExercise = function() {
    // split tags into an array and trim whitespace
    $scope.ex.tags = $scope.ex.tags.split(',');
    $scope.ex.tags.forEach(function(tag, i) {
      $scope.ex.tags[i] = tag.trim();
    });

    var payload = {
      name: $scope.ex.name,
      description: $scope.ex.description,
      tags: $scope.ex.tags
    };

    exercises.put($scope.ex._id, payload)
      .then(function(response) {
        var index;

        for (var i = 0; i < $scope.exerciseList.length; i++) {
          if ($scope.exerciseList[i]._id === response.data.entry._id)
            index = i;
        }

        $scope.exerciseList[index] = response.data.entry;
        $('#formModal').modal('hide');
      });
  };
}
