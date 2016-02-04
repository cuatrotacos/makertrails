angular.module('App.login', [])
  .controller('LoginController', function($scope, $http, $state, $window, AppFactory){
    $scope.login = function(){
      AppFactory.login($scope.username, $scope.password, $window)
    }
  });
