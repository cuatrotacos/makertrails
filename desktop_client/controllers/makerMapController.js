angular.module('App.MakerMapController', [])

.controller('MakerMapController', makerMapController);

function makerMapController($scope, $http, $state, $stateParams, MakerMapFactory) {


  $scope.mapID = $stateParams.mapID;
  $scope.markers = [];
  $scope.map;

  $scope.getMap = function() {
    MakerMapFactory.getLocationsNoProgress($scope.mapID)
    .then(function(data) {
      $scope.map = MakerMapFactory.renderMap();
      $scope.locations = data.data;
      $scope.markers = MakerMapFactory.setMarkers($scope.locations, $scope.map);
      $scope.myLocation = null;
      $scope.$apply;
      // navigator.geolocation.watchPosition($scope.userLocationChange,
      //   MakerMapFactory.userLocationError);
      MakerMapFactory.setBounds($scope.map);
    });
  };

  // $scope.$on('$viewContentLoaded', function(){
    (function(d, s, id) {
      console.log("inside facebookButton");
      var fbscript = angular.element('#facebook-jssdk');
      FB = null;
      if(fbscript){
        console.log("Removing fbscript from page");
        fbscript.remove();
      }
      var navbar = angular.element('#facebook-holder');
      navbar.append('<div class="fb-share-button" data-href="http://localhost:8000/#/makerMap/' + $scope.mapID + '" data-layout="button_count"></div>');
      var js, fjs = d.getElementsByTagName(s)[0];
      // if (d.getElementById(id)) return;
      js = d.createElement(s);
      js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.5";
      fjs.parentNode.insertBefore(js, fjs);
    })(document, 'script', 'facebook-jssdk');
  // });

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
      travelMode: google.maps.TravelMode.DRIVING,
      avoidHighways: true
    };

    var directionsService = new google.maps.DirectionsService();
    directionsService.route(coords, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        dir.setDirections(response);
      }
    });
  }

  $scope.getMap();
}



// (document, 'script', 'facebook-jssdk');
// $scope.facebookButton(document, 'script', 'facebook-jssdk');
//
//
//
// $scope.$on('$viewContentLoaded', function() {
//     (function(d, s, id) {
//         FB = null;
//         var js, fjs = d.getElementsByTagName(s)[0];
//         //if (d.getElementById(id)) return;
//         js = d.createElement(s); js.id = id;
//         js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=204269043065238";
//         fjs.parentNode.insertBefore(js, fjs);
//       }(document, 'script', 'facebook-jssdk'));
// });
