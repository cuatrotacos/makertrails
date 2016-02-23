angular.module('App.login', [])
.controller('LoginController', function($scope, $http, $state, $window, AppFactory, $uibModal){
  $scope.login = function(){
    AppFactory.login($scope.username, $scope.password, $window)
  }

  $scope.openDemo = function () {
    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: '../templates/demoModal.html',
      controller: 'DemoModalController',
      size: large
    })
  }
});
