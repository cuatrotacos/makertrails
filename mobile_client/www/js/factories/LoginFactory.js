angular.module('app.LoginFactory', [])
.factory('LoginFactory', function($http, $state, $window){
  var authenticate = false;

  function logout () {
    $window.localStorage.removeItem('makerTrailsSession');
    $window.localStorage.removeItem('makerTrailsUserID');
    $http({
      method: 'GET',
      url: 'http://makertrails.herokuapp.com/logout'
    })
    .then(function(loggedOut) {
      if(loggedOut.status === 200){
        $state.go('login')
        return
      };
    })
  }
  function authenticateFunction(){
    return !!$window.localStorage.makerTrailsSession;
  }

  var login = function(username, password, window){
    console.log('username and password', username, password)
    $http({
      method: 'POST',
      url: 'http://makertrails.herokuapp.com/login',
      data: {
        username: username,
        password: password
      }
    })
    .then(function(success){
      window.localStorage.setItem('makerTrailsSession', success.data.sessionID);
      window.localStorage.setItem('makerTrailsUserID', success.data.userID);
      if (authenticateFunction()){
        $state.go('home')
      } else {
        $state.go('login')
      }
    }, function(err){
        console.log(err)
    })
  }

  var signup = function(username, password, email){
    return $http({
      method: 'POST',
      url: 'http://makertrails.herokuapp.com/signup',
      data: {
        username: username,
        password: password,
        email: email
      }
    })
    .then(function(isUser){
      login(isUser.data.name, isUser.data.password, $window)
    }, function(err){
      console.error(err);
    })
  };
  return {
    login: login,
    signup: signup,
    authenticateFunction: authenticateFunction,
    logout: logout
  }
})
