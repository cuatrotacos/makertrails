angular.module('App')
  .factory('AppFactory', function($http, $state, $window){

    // Switch between local and deployed server
    var url;
    url = 'http://localhost:8000';
    // url = 'http://makertrails.herokuapp.com'

    function logout () {
      window.localStorage.removeItem('makerTrailsSession');
      window.localStorage.removeItem('makerTrailsUserID');
      $http({
        method: 'GET',
        url: url + '/logout'
      })
      .then(function (loggedOut) {
        if (loggedOut.status === 200) {
          $state.go('login')
          return
        };
      })
    }

    function authenticateFunction () {
      return !!window.localStorage.makerTrailsSession
    }

    var login = function(username, password, window){
      $http ({
        method: 'POST',
        url: url + '/login',
        data: {
          username: username,
          password: password
        }
      })
      .then(function(success){
        window.localStorage.setItem('makerTrailsSession', success.data.sessionID)
        window.localStorage.setItem('makerTrailsUserID', success.data.userID)
        if (authenticateFunction()) {
          $state.go('createNewMap')
        }else{
          $state.go('login')
        }
      }, function(err){
        console.log(err);
      })
    };
    var signup = function(username, password, email){
      return $http ({
        method: 'POST',
        url: url + '/signup',
        data: {
          username: username,
          password: password,
          email: email
        }
      })
      .then(function(isUser){
        login(isUser.data.name, isUser.data.password, $window)
      }, function(err){
        console.log(err);
      })
    };
    return{
      login: login,
      signup: signup,
      authenticateFunction: authenticateFunction,
      logout: logout
    }
  })
