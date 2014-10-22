//Upload Controller

App.controller('uploadCtrl', function($scope, $http, NumbersAlgorithm, dataProvider) {

  $scope.showContent = function($fileContent){
        $scope.successU = false;
        $scope.content = $fileContent;
        $scope.brokenDown = $scope.content.split('\n')
        $scope.decoded = NumbersAlgorithm.perform($scope.brokenDown)
    };
  $scope.submit = function() {
    dataProvider.uploadPhoneList($scope.brokenDown)
    $scope.content = null;
    $scope.successU = true;

  }

});