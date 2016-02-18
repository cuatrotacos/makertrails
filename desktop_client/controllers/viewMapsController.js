angular.module('App.viewMaps', [])
  .controller('ViewMapsController', function($scope, $http, $state, $window, AppFactory, MapFactory){
    $scope.getUserMaps = function(){
      MapFactory.getUserMaps().then(function(resp){
        $scope.userMapData = resp.data;
      });
    };
    $scope.getUserMaps();

    $scope.selectMap = function(map) {
      $state.go('makerMap', {mapID: map.id}, {reload: true});
      return;
    };

    $scope.removeMap = function(idx, id){
        MapFactory.deleteUserMaps(id).then(function(resp){
          $scope.getUserMaps();
        });
    };
  });
