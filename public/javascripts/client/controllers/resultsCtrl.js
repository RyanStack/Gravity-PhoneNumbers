//Results Controller

App.controller('resultsCtrl', function($scope, $http, NumbersAlgorithm, dataProvider) {
  dataProvider.getResults().then(function(data) {
    $scope.results = NumbersAlgorithm.perform(data);
  });
});


