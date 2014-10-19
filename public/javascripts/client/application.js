var App = angular.module('MyApp', ['ngRoute']);

  // configure our routes
  App.config(function($routeProvider) {
    console.log("in provider")
    $routeProvider
      // route for the home page
      .when('/upload', {
        templateUrl : '../templates/upload.html',
        controller  : 'numbersCtrl'
      })
      // route for the about page
      .when('/results', {
        templateUrl : '../templates/results.html',
        // controller  : 'aboutController'
      })
      // route for the contact page
      .when('/history', {
        templateUrl : '../templates/history.html',
        // controller  : 'contactController'
      })
      .otherwise({
        redirectTo: '/'
      });
  });



// Application controllers

App.controller('numbersCtrl', function($scope, $http, NumbersAlgorithm) {

  $scope.showContent = function($fileContent){
        $scope.content = $fileContent;
        $scope.brokenDown = $scope.content.split('\n')
        $scope.decoded = NumbersAlgorithm.perform($scope.brokenDown)
        console.log($scope.decoded)
    };
  $scope.submit = function() {
    $http.post('/phoneListUpload', $scope.brokenDown).success(function(data) {
      console.log(data)
    });
  }

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

//Application Services

//Angular Factory for Number Algorithm
App.factory('NumbersAlgorithm', function() {
  //Helper Functions
  function isNumber(obj) { return !isNaN(parseFloat(obj)) }

  function isUpperCaseLetter(obj) { return /[A-Z]/.test(obj) }

  function letterToNumber(letter) {
    if (letter == "A" || letter == "B" || letter == "C") { return 2 }
      else if (letter == "D" || letter == "E" || letter == "F") { return 3 }
        else if (letter == "G" || letter == "H" || letter == "I") { return 4 }
          else if (letter == "J" || letter == "K" || letter == "L") { return 5 }
            else if (letter == "M" || letter == "N" || letter == "O") { return 6 }
              else if (letter == "P" || letter == "R" || letter == "S") { return 7 }
                else if (letter == "T" || letter == "U" || letter == "V") { return 8 }
                  else if (letter == "W" || letter == "Q" || letter == "Y") { return 9 }
                }

              function noHyphen(str) { return !(/-/.test(str)) }

  //Decoding Algorithm

  function Algo(arr) {
  //Remove element at first index and store in listCount
  var listCount = arr.shift();
  //Declare decoded output array
  var decodedList = {};
  //Iterate through all of the untranslated telephone numbers
  for (var i=0; i<arr.length; i++) {
    var numberCounter = 0
    var decodedNumber = "";
    var phoneNumber = arr[i];
    //Iterate through each element of the untranslated telephone numbers
    for (var j=0; j<phoneNumber.length; j++) {
      var digit = phoneNumber[j]
    //Evaluate whether the digit is a number, letter, or hyphen and then act execute accordingly
    if (isNumber(digit)) {
      decodedNumber += digit
      numberCounter++
    }
    else if (isUpperCaseLetter(digit)) {
      decodedNumber += letterToNumber(digit)
      numberCounter++
    }
      //Check whether or not number counter has reached 3 and the decoded number does not already have a hyphen.  If so, concat a hyphen
      if (numberCounter == 3 && noHyphen(decodedNumber) ) {
        decodedNumber += "-"
      }
    }
    if (decodedList.hasOwnProperty(decodedNumber)) {
      decodedList[decodedNumber] += 1;
    }
    else {
      decodedList[decodedNumber] = 1
    }
  }
  return decodedList
}

return {
  perform: function(arr) {
    return Algo(arr);
  }
}
})