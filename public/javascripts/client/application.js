var App = angular.module('MyApp', []);

App.controller('numbersCtrl', function($scope, $http) {

  $scope.InputFile = "";
  $scope.numbersAlgo = function() {
    console.log($scope.InputFile)

  }

  });