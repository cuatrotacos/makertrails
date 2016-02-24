angular.module('app.LocationInfoFactory', [])
.factory('LocationInfoFactory', locationInfoFactory);

function locationInfoFactory($http, $q){
  function locationInfo(locationId){
    console.log('inside loction info infactory', locationId)
    var q = $q.defer();
    // 'https://makertrails.herokuapp.com/photos?locationId='
    $http.get('https://makertrails.herokuapp.com/review?locationId=' + locationId)
    .then(function(success){
      q.resolve(success.data.data)
      // mapData = success.data.data;
      // console.log(locationData);
    }, function(err){
      q.reject(err);
    })
    return q.promise;
  };
  return {
    locationInfo: locationInfo
  }
}
