angular.module('app.LoginController', [])

.controller('AuthController', function($scope, $location, $state, $ionicPopup, LoginFactory, AUTH_EVENTS) {
    $scope.username = AuthService.username();

    $scope.$on(AUTH_EVENTS.notAuthorized, function(event){
        var alertPopup = $ionicPopup.alert({
            title: 'Unauthorized!',
            template: 'You are not allowed to access this page'
        });
    });

    $scope.$on(AUTH_EVENTS.notAuthenticated, function(event){
        AuthService.logout();
        $state.go('login');
        var alertPopup = $ionicPopup.alert({
            title: 'Session Lost',
            template: 'Sorry, you have to login again'
        });
    });

    $scope.setCurrentUsername = function(name){
        $scope.username = name;
    };
})
.controller('LoginController', function($scope, $state, $ionicPopup, AuthService){
    $scope.data = {};

    $scope.login = function(data){
      AuthService.login(data.username, data.password)
      .then(function(authenticated){
        $scope.go('mapMaker', {}, {reload: true});
        $scope.setCurrentUsername(data.username);
      },
      function(err){
        var alertPopup = $ionicPopup.alert({
        title: "Login Failed",
        template: 'Please check your credentials'
      });
    })
  };
})
.controller('AuthRoutes', function($scope, $state, $http, $ionicPopup, AuthService){

  $scope.logout = function(){
    AuthService.logout();
    $state.go('login');
  };

  $scope.performValidRequest = function(){
    $http.get('http://makertrails.herokuapp.come/valid')
    .then(function(result){
      $scope.response = result;
    });
  }

  $scope.performUnauthorizedRequest = function(){
    $http.get('http://makertrails.herokuapp.come/notauthorized')
    .then(function(result){},
      function(err){
        $scope.response = err;
    });
  };

  $scope.performInvalidRequest = function(){
    $http.get('http://makertrails.herokuapp.come/notauthenticated')
    .then(function(result){},
    function(err){
      $scope.response = err;
    });
  };
});
