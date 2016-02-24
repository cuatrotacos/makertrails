angular.module('App')

.factory('MakerMapFactory', MakerMapFactory);


function MakerMapFactory($http, $q, $state, $stateParams, $rootScope) {
  var url = $rootScope.url;
  var markerWindow = new google.maps.InfoWindow();
  var bounds = new google.maps.LatLngBounds();
  var makerMapFactory = {};

  makerMapFactory.renderMap = function() {
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

  makerMapFactory.deleteMarkers = function(markers) {
    for (i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
      markers[i].circle.setMap(null);
    }
    markers = [];
  };

  makerMapFactory.setMarkers = function(locations, map) {

    var markers = [];

    locations.forEach(function(loc, i){
      var pos = new google.maps.LatLng(locations[i].lat, locations[i].lon);
      var marker = new google.maps.Marker({
        position: pos,
        icon: {
          path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
          fillColor: locations[i].visited ? "green" : "red",
          fillOpacity: 1,
          strokeWeight: 2,
          scale: 5
        },
        map: map
      });
      var circle = new google.maps.Circle({
        center: new google.maps.LatLng(locations[i].lat, locations[i].lon),
        radius: locations[i].radius,
        strokeOpacity: 1,
        strokeWeight: 2,
        fillColor: locations[i].visited ? "green" : "red",
        fillOpacity: 0.6,
        map: map
      });

      var content = '<p><strong>' + locations[i].name + '</strong></p>' +
                      '<p>' + locations[i].msg + '</p>';

      marker.addListener('click', function() {
        markerWindow.setContent(content);
        markerWindow.open(map, marker);
      });
      marker.circle = circle;
      marker.markerWindow = markerWindow;

      bounds.extend(pos);

      markers.push(marker);
    });
    return markers;
  };

  makerMapFactory.getMapLocations = function(mapID) {
    var q = $q.defer();
    $http.get(url + '/progress?mapId=' + mapID)
      .then(function(data) {
        q.resolve(data);
      }, function(err) {
        q.reject(err);
      });
    return q.promise;
  };

  makerMapFactory.getLocationsNoProgress = function(mapID) {
    var q = $q.defer();
    $http.get(url + '/mapInfo/' + mapID)
      .then(function(data) {
        q.resolve(data);
      }, function(err) {
        q.reject(err);
      });
    return q.promise;
  };

  makerMapFactory.userLocationError = function(err) {
    console.log("user location failed", err);
  };

  makerMapFactory.setBounds = function(map){
    map.fitBounds(bounds);
  }

  return makerMapFactory;
}
