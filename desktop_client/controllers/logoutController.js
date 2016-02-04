angular.module('App.logout', [])
  .controller('LogoutController', function($scope, $http, $state, $window, AppFactory){
    $scope.logout = function(){
      console.log("+++ 4 logoutController.js logout")
      AppFactory.logout();
    }
  });
