angular.module('app.MakerMapFactory', [])

.factory('MakerMapFactory', makerMapFactory);

function makerMapFactory($http, $q, $state, $ionicLoading, $ionicPopup, $stateParams, CollisionFactory, SelectMapFactory) {

  var url;
  // url = 'http://localhost:8000';
  // url = 'http://still-sands-90078.herokuapp.com'
  url = 'https://makertrailsv2.herokuapp.com'

  var renderMap = function() {
    //displays loading animation
    $ionicLoading.show({
      template: 'Getting your current location...',
      showBackdrop: true,
    });

    //config options for default map
    var myLocation = new google.maps.LatLng(34.0192118, -118.4942816);
    var mapOptions = {
      center: myLocation,
      zoom: 18,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0
    };

    //creates default map with above options
    return new google.maps.Map(document.getElementById("map"), mapOptions);
  };

  var deleteMarkers = function(markers){
    for(i=0; i<markers.length; i++){
        markers[i].setMap(null);
        markers[i].circle.setMap(null);
    }
    markers = [];
  }

  var setMarkers = function(locations, map) {
    var markers = []
    for (var i = 0; i < locations.length; i++) {
      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(locations[i].lat, locations[i].lon),
        icon: {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          fillColor: locations[i].visited ? "green" : "red",
          fillOpacity: 1,
          strokeWeight: 2,
          scale: 5
        },
        map: map
      })
      var circle = new google.maps.Circle({
        center: new google.maps.LatLng(locations[i].lat, locations[i].lon),
        radius: locations[i].radius,
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: locations[i].visited ? "green" : "red",
        fillOpacity: 0.6,
        map: map
      });
      marker.circle = circle
      markers.push(marker);
    }
    return markers;
  }

  var getMapLocations = function(mapID) {
    var q = $q.defer();
    $http.get(url + '/progress?mapId='+mapID)
      .then(function(data) {
        q.resolve(data);
      },function(err) {
        q.reject(err);
      });
    return q.promise;
  }

  var userLocationError = function(err) {
    console.log("user location failed", err);
  }

  return {
    url: url,
    renderMap: renderMap,
    setMarkers: setMarkers,
    getMapLocations: getMapLocations,
    userLocationError: userLocationError
  };
}
