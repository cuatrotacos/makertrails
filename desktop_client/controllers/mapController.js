angular.module("App.createMap", []) //Placeholder name
.controller("MapController", MapController)

function MapController($scope, MapFactory){
  angular.extend($scope, MapFactory);
  $scope.selectedLocations = [];
  $scope.mapInfo = {
    "user": 1 //Hardcoded until backend is fixed
  };
  $scope.map = new GMaps({
    div: '#map',
    lat: 34.0192316,
    lng: -118.4943091,
    zoom: 15
  });
  $scope.submitMap = function(){
    console.log("You at least clicked on submit map...")
    // $scope.postMap({
    //   "mapInfo": $scope.mapInfo,
    //   "locationsInfo": $scope.selectedLocations
    // })
  }
}
