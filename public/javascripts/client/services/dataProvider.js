App.factory('dataProvider', function($http) {
  return ({
    getUploadHistory: getUploadHistory,
    getResults: getResults,
    uploadPhoneList: uploadPhoneList
  })

  function getUploadHistory () {
      var promise = $http.get('/phoneList').then(function(response) {
        return response.data[0].uploads
      });
      return promise
    }


  function getResults () {
    var promise = $http.get('/phoneList').then(function(response) {
        var allNumbers = [];
        var phoneUploads = response.data[0].uploads
        for (var i=0; i<phoneUploads.length; i++) {
          for (var j=0; j<phoneUploads[i].list.length; j++) {
            allNumbers.push(phoneUploads[i].list[j])
          }
        }
        return allNumbers;
      });
      return promise
  }



  function uploadPhoneList(list) {
     return $http.post('/phoneListUpload', list).success(function(data) {});
  }





})