angular.module('App')
.factory('MapFactory', MapFactory)

function MapFactory($http, $q){
  var mapFactory = {}

  // Switch between local and deployed server
  var url;
  url = 'http://localhost:8000';
  // url = 'http://makertrails.herokuapp.com'

  mapFactory.removeLocation = function(selectedLocations, index, map){
    selectedLocations.splice(index,1);
    map.removeMarkers();
    _.each(selectedLocations, function(location){
      map.addMarker({
        lat: location.lat,
        lng: location.lng,
        title: location.name, //Here's where the marker gets its name. We should make this editable so users can name the location whatever they want (to fill POST Body: "name")
        infoWindow: {
          content : location.name
        }
      });
    });
  };

  mapFactory.refreshMap = function(selectedLocations, index, map) {
    if(index === undefined){
      selectedLocations[index].editing = false;
    }
    map.removeMarkers();
    _.each(selectedLocations, function(location){
      map.addMarker({
        lat: location.lat,
        lng: location.lng,
        title: location.name, //Here's where the marker gets its name. We should make this editable so users can name the location whatever they want (to fill POST Body: "name")
        infoWindow: {
          content : location.name
        }
      });
    });
  };

  mapFactory.renameLocation = function (selectedLocations, index, newName) {
    selectedLocations[index].name = newName;
    selectedLocations[index].editing = false;
  }

  mapFactory.createMap = function (mapInfo, selectedLocations) {
    var dfr = $q.defer()
      $http ({
        method: 'POST',
        url: url + '/mapInfo',
        data: {
          mapInfo: mapInfo,
          locationsInfo: selectedLocations
        }
      }).then(function (success) {
        dfr.resolve(success)
      },
      function (err) {
        console.log("+++ 57 mapFactory.js err: ", err)
        dfr.reject("Map not created")
      })
      return dfr.promise;
  }

  return mapFactory;
}
