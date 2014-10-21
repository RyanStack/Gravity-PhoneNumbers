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
      .otherwise({
        redirectTo: '/'
      });
  });




//Applciations Directives

//File Reading Directive
App.directive('onReadFile', function ($parse) {
  return {
    restrict: 'A',
    scope: false,
    link: function(scope, element, attrs) {
            var fn = $parse(attrs.onReadFile);

      element.on('change', function(onChangeEvent) {
        var reader = new FileReader();

        reader.onload = function(onLoadEvent) {
          scope.$apply(function() {
            fn(scope, {$fileContent:onLoadEvent.target.result});
          });
        };

        reader.readAsText((onChangeEvent.srcElement || onChangeEvent.target).files[0]);
      });
    }
  };
});

