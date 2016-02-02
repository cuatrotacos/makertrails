angular.module('app.SignupController', [])
  .controller('SignupController', function($scope, $http, LoginFactory){
    $scope.signup = function(){
      return LoginFactory.signup($scope.username, $scope.password, $scope.email)
    }
  });
