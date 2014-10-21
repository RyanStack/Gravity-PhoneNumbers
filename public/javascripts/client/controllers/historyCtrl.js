//History Controller

App.controller('historyCtrl', function($scope, $http, NumbersAlgorithm, dataProvider) {
  dataProvider.getUploadHistory().then(function(data) {
    $scope.phoneUploads = data;
  });
});