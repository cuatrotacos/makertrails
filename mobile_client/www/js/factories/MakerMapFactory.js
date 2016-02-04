angular.module('app.MakerMapFactory', [])

.factory('MakerMapFactory', makerMapFactory);

function makerMapFactory($http, $ionicLoading, $ionicPopup, CollisionFactory, SelectMapFactory) {
  // var mapSelected = SelectMapFactory.selectMap();
  // console.log("this is map selected", mapSelected)
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
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);
    return map;
  };

  var getMapLocations = function(http) {
    $http.get('http://makertrails.herokuapp.com/location?mapId=8')
      .then(function(data) {
        var map = renderMap(); //returns map
        var locations = data.data.locations; //save locations array
        console.log("locations data", data);

        //iterate through locations array, create marker for each location and place on map
        for (var i = 0; i < locations.length; i++) {
          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(locations[i].lat, locations[i].lon),
            map: map
          })
        }

        var myLocation = null;

        //sets interval to track changes in user position
        navigator.geolocation.watchPosition(userLocationChange, userLocationError);

        //success callback for navigator.geolocation.watchPosition()
        function userLocationChange(pos) {
          var lat = pos.coords.latitude;
          var lon = pos.coords.longitude;
          var currentLatLng = new google.maps.LatLng(lat, lon);

          for (var i = 0; i < locations.length; i++) {
            if (CollisionFactory.withinRange(lat, lon, locations[i].lat, locations[i].lon, 10)) {
              var alertPopup = $ionicPopup.alert({
                template: 'Collision!!' + locations[i].progress_id
              });

              $http.put('http://makertrails.herokuapp.com/progress', {
                  'progressId': locations[i].progress_id
                }, {
                  'currentMap': locations[i].id,
                  'Content-Type': 'applicaiton/json'
                })
                .then(function(data) {
                  console.log("success", data)
                }, function(err) {
                  console.log(err);
                })
            }
          }

          map.setCenter(currentLatLng);
          if (myLocation !== null) {
            myLocation.setPosition(currentLatLng);
          } else {
            myLocation = new google.maps.Marker({
              position: currentLatLng,
              animation: google.maps.Animation.DROP,
              map: map
            });
          }
          $ionicLoading.hide();
        }

        //error callback for navigator.geolocation.watchPosition()
        function userLocationError(err) {
          console.log("user location failed", err);
        }
      });
  }

  return {
    getMapLocations: getMapLocations
  };
}
