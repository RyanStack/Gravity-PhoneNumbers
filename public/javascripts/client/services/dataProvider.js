//Angular Service controlling access to Node Server

App.factory('dataProvider', function($http) {

  //Return Public API
  return ({
    getUploadHistory: getUploadHistory,
    getResults: getResults,
    uploadPhoneList: uploadPhoneList
  })


  //--------------
  //Public Methods
  //--------------

  //Function to grab all uploads
  function getUploadHistory () {
      var promise = $http.get('/phoneList').then(function(response) {
        return response.data[0].uploads
      });
      return promise
    }

  //Function to grab every number/repeats ever uploaded
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


  //Post Request to upload a new phone list
  function uploadPhoneList(list) {
     return $http.post('/phoneListUpload', list).success(function(data) {});
  }

})