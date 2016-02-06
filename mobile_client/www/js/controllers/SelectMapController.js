angular.module('app.SelectMapController', [])

.controller('SelectMapController', function($scope, $state, SelectMapFactory){
  $scope.data = {};

  $scope.selectMap = function(map) {
    $state.go('makerMap', {mapID: map});
  }

  $scope.$on('$ionicView.loaded', function(){
    $scope.allMaps = SelectMapFactory.displayMaps().then(function(maps){
      $scope.allMaps = maps
    });
  })
});
