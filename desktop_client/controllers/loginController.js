angular.module('App.login', [])
.controller('LoginController', function($scope, $http, $state, $window, AppFactory, $uibModal){
  $scope.login = function(){
    AppFactory.login($scope.username, $scope.password, $window)
  }

  $scope.openDemo = function () {
    var modalInstance = $uibModal.open({
      animation: true,
      templateUrl: '../templates/demoModal.html',
      windowClass: 'app-modal-window'
    })
  }
});
