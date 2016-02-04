angular.module('app.SignupController', [])
.controller('SignupController', function($scope, $http, LoginFactory){
  $scope.data = {};
  $scope.signup = function(){
    LoginFactory.signup($scope.data.username, $scope.data.password, $scope.data.email)
  }
});
