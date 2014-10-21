//Aplication Router
var App = angular.module('MyApp', ['ngRoute']);
  // configure our routes
  App.config(function($routeProvider) {
    console.log("in provider")
    $routeProvider
      // route for the upload page
      .when('/upload', {
        templateUrl : '../templates/upload.html',
        controller  : 'uploadCtrl'
      })
      // route for the results page
      .when('/results', {
        templateUrl : '../templates/results.html',
        controller  : 'resultsCtrl'
      })
      // route for the upload history page
      .when('/history', {
        templateUrl : '../templates/history.html',
        controller  : 'historyCtrl'
      })
      // route-redirection for mispelling
      .otherwise({
        redirectTo: '/'
      });
  });


