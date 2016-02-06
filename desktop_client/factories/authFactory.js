angular.module('App')
  .factory('AppFactory', function($http, $state, $window){

    // Switch between local and deployed server
    var url;
    url = 'http://localhost:8000';
    // url = 'http://makertrails.herokuapp.com'

    function logout () {
      window.localStorage.removeItem("makertrails-token");
      window.localStorage.removeItem('makertrails-username');
      $http.defaults.headers.common['makertrails-token'] = "undefined";
      $state.go('login');
      return;
    }

    function authenticateFunction () {
      return !!window.localStorage["makertrails-token"]
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
        window.localStorage.setItem('makertrails-token', success.data['makertrails-token']);
        window.localStorage.setItem('makertrails-username', success.data.username);
        $http.defaults.headers.common['makertrails-token'] = success.data['makertrails-token'];
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
      .then(function(success){
        window.localStorage.setItem('makertrails-token', success.data['makertrails-token']);
        window.localStorage.setItem('makertrails-username', success.data.username);
        $http.defaults.headers.common['makertrails-token'] = success.data['makertrails-token'];
        if (authenticateFunction()) {
          $state.go('createNewMap')
        }else{
          $state.go('login')
        }
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
