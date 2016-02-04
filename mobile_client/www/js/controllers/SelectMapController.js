angular.module('app.SelectMapController', [])

.controller('SelectMapController', function($scope, SelectMapFactory){
  $scope.data = {};

  $scope.selectMap = function() {
    SelectMapFactory.selectMap($scope.data.mapID);
    console.log('inside selectMap', $scope.data.mapID)
  }

  $scope.$on('$ionicView.loaded', function(){
    console.log('inside displayMaps')
    $scope.allMaps = SelectMapFactory.displayMaps().then(function(maps){
      $scope.allMaps = maps
    });
  })
});
