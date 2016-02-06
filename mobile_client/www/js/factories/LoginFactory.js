angular.module('app.LoginFactory', [])
.factory('LoginFactory', loginFactory);

function loginFactory($q, $http, $state, $ionicPopup) {
  var username = '';
  var isAuthenticated = false;

  function setTokenAndHttpHeaders(token) {
    isAuthenticated = true;
    // window.localStorage.setItem('makertrailsToken', token); //store token locally
    $http.defaults.headers.common['makertrails-token'] = token; //send token in header with every http request
  }

  var login = function(name, pass) {
    $http({
      method: 'POST',
      url: 'http://makertrails.herokuapp.com/login',
      data: {
        username: name,
        password: pass
      }
    })
    .then(function(success) {
      username = name;
      console.log(name)
      console.log(success.data['makertrails-token'])
      setTokenAndHttpHeaders(success.data['makertrails-token']);
      $state.go('home');
    }, function(err) {
      var popup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please enter correct username or password'
      });
    });
  };

  var logout = function() {
    username = '';
    isAuthenticated = false;
    window.localStorage['makertrails-token'] = undefined;
    $http.defaults.headers.common['makertrails-token'] = undefined;
    $state.go('login');
  };

  return {
    login: login,
    logout: logout,
    username: function() {return username;},
    isAuthenticated: function() {return isAuthenticated;}
  };
}
