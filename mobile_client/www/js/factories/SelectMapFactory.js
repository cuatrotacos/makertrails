angular.module('app.SelectMapFactory', [])

.factory('SelectMapFactory', function($http) {
  var allMaps;
  var url;
  // url = 'http://localhost:8000';
  // url = 'http://still-sands-90078.herokuapp.com'
  url = 'https://makertrailsv2.herokuapp.com'
  function displayMaps() {
    return $http({
        method: "GET",
        url: url + '/mapInfo'
        // headers: {
        //   "Content-Type": "application/json;charset=utf-8",
        //   "makertrails-token": window.localStorage["makertrails-token"]
        // }
      })
      .then(function(data) {
        allMaps = data.data.allMaps;
        return allMaps;
      });
  };
  return {
    displayMaps: displayMaps
  }
});
