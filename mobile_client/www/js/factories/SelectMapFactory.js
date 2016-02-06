angular.module('app.SelectMapFactory', [])

.factory('SelectMapFactory', function($http) {
  var allMaps;

  function displayMaps() {
    return $http({
        method: "GET",
        url: 'https://makertrails.herokuapp.com/mapInfo'
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
