var App = angular.module('MyApp', []);

App.controller('numbersCtrl', function($scope, $http, NumbersAlgorithm) {

  $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
        $scope.brokenDown = $scope.content.split('\n')
        $scope.decoded = NumbersAlgorithm.perform($scope.brokenDown)
    };
  });


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


//Angular Factory for Number Algorithm

App.factory('NumbersAlgorithm', function() {
  return {
    perform: function(numbersArray) {
      console.log(numbersArray)
    }

  }
})