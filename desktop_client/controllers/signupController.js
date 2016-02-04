angular.module('App.signup', [])
  .controller('SignupController', function($scope, $http, AppFactory){
    $scope.signup = function(){
      return AppFactory.signup($scope.username, $scope.password, $scope.email)
    }
  });
