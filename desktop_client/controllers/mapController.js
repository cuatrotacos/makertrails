angular.module("App.createMap", ['ngMessages']) //Placeholder name
.controller("MapController", MapController)

function MapController($scope, $document, $timeout, MapFactory){
  angular.extend($scope, MapFactory);
  $scope.markers = [];
  $scope.selectedLocations = [];
  $scope.mapInfo = {}

  var mapOptions = {
    center: new google.maps.LatLng(34.0192118, -118.4942816),
    zoom: 15,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    scrollwheel: false
  }

  $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);

  navigator.geolocation.getCurrentPosition(function(position) {
    var currentLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    $scope.map.panTo(currentLocation);
    // $scope.map.setCenter(position.coords.latitude, position.coords.longitude);
    var homeMarker = new google.maps.Marker({
      position: currentLocation,
      icon: {
        path: google.maps.SymbolPath.BACKWARD_CLOSED_ARROW,
        fillColor: "blue",
        fillOpacity: 1,
        strokeWeight: 0,
        scale: 5
      },
      animation: google.maps.Animation.DROP,
      title: "You are here!",
      zIndex: 999,
      map: $scope.map
    });
    var homeWindow = new google.maps.InfoWindow({
      content : "You are here!"
    })
    homeMarker.addListener('click', function() {
      homeWindow.open($scope.map, homeMarker)
    })
  });

  $scope.createMap = function(){
    if($scope.selectedLocations.length !== 0){
      MapFactory.createMap($scope.mapInfo, $scope.selectedLocations)
      .then(function (success) {
        console.log("Map posted successfully!")
        for (var i=0; i< $scope.selectedLocations.length; i++){
          $scope.markers[i].circle.setMap(null);
          $scope.markers[i].setMap(null);
        }
        $scope.markers = [];
        $scope.selectedLocations = [];
        $scope.mapInfo.name = "";
        $scope.mapInfo.description = "";
      }, function(err){
        console.log("Map failed to post");
        console.log(err);
      })
    }
  };

  $scope.renameLocation = function (selectedLocations, markers, index, location) {
    selectedLocations[index].name = location.name;
    markers[index].title = location.name;
    var newContent = '<p><strong>' + location.name + '</strong></p>' +
                  '<p>' + location.msg + '</p>';
         //       '<a id="delete">remove</a>';
    markers[index].addListener('click', function() {
      markers[index].markerWindow.setContent(newContent);
     // markerWindow.setContent(newContent);
      markers[index].markerWindow.open($scope.map, markers[index]);
  // var del = document.getElementById("delete");
    //del.addEventListener("click", function(/*selectedLocations1, markers1, index1, map1*/){
    //  $scope.removeLocation(selectedLocations, markers, index, map);
    //  $scope.$apply();
   // });

  });
    
    selectedLocations[index].editing = false;
  };

  $scope.showDirections = function(){
    var dir = new google.maps.DirectionsRenderer({
      map: $scope.map
    });
    var waypts = [];
    for(var i = 1; i < $scope.markers.length-1; i++){
      waypts.push({location: $scope.markers[i].position, stopover: true});

    };
    var coords = {
      destination: $scope.markers[$scope.markers.length-1].position,
      origin: $scope.markers[0].position,
      waypoints: waypts,
      travelMode: google.maps.TravelMode.DRIVING
    };

    var directionsService = new google.maps.DirectionsService();
    directionsService.route(coords, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        dir.setDirections(response);
      }
    });

  }

  $scope.removeLocation = function(selectedLocations, markers, index, map){
    markers[index].circle.setMap(null);
    markers[index].setMap(null);
    selectedLocations.splice(index,1);
    markers.splice(index, 1);
  };

}
