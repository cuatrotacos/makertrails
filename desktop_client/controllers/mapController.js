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
  $scope.createMap = function(){
    if($scope.selectedLocations.length !== 0){
      MapFactory.createMap($scope.mapInfo, $scope.selectedLocations)
      .then(function (success) {
        $scope.selectedLocations = [];
        MapFactory.refreshMap($scope.selectedLocations, null, $scope.map)
        $scope.mapInfo = {
          "user": 1 //Hardcoded until backend is fixed
        };
      })
    }
  }
  $scope.renameLocation = function (selectedLocations, index, newName) {
    MapFactory.renameLocation(selectedLocations, index, newName)
    MapFactory.refreshMap(selectedLocations, null, $scope.map)
  }
}
