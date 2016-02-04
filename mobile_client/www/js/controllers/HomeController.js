angular.module('app.HomeController', [])

.controller('HomeController', homeController);

function homeController($scope, $state) {
  $scope.goToMapList = function() {
    $state.go('selectMap');
  };
}