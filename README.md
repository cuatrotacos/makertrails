<h5> How token authentication works </h5>

<h4>You have to npm install for this to work!!!!</h4>

*Login and Signup will now return an object that follow this format:*

```javascript
{
  "username": name,
  'makertrails-token': sessionID
}
```

*Here it is in real life.*

```javascript
{
  "username": "Pato",
  "makertrails-token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjEsInVzZXJuYW1lIjoiUGF0byJ9.Xoe3d822jHfj5179OpVtVYvsYPjisNgbn_mrSboPn9k"
}
```

*The token is a magically encrypted with the userId and username. So when the backend decodes the token by saying the magic words...*

```javascript
jwt.decode(token, 'magic-words')
```

*Voila! We get:*

```javascript
{ userId: 1, username: 'Pato' }
```

*But thats all taken care of in the server. All the front end needs to do is make sure that token gets passed with every http request. Do that by adding this line:*

```javascript
$http.defaults.headers.common['makertrails-token'] = success.data['makertrails-token'];
```

*This adds the token as a a header to everything. Now, you no longer need to manually include the userId for:*

1. POST requests to mapInfo
2. GET requests to progressId
3. POST requests to review

*The server will decode your 'makertrails-token' header and know which user is making the call.*

*Wow, that's really cool.*

*For authentication between different view on your app, you still probably want to use localstorage. Here's how the desktop does it.*

```javascript
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
  }
```

*When you log out, you no longer needs to send an http request to logout. This is because we are no longer using sessions that must be destroyed by the server. To disable a token when a user wants to log out, re-assign it to "undefined." Here's how the desktop does it:*

```javascript
function logout () {
  window.localStorage.removeItem("makertrails-token");
  window.localStorage.removeItem('makertrails-username');
  $http.defaults.headers.common['makertrails-token'] = "undefined";
  $state.go('login');
  return;
}
```

*If you want to test on postman, you now need to include a token in every header.*

![Postman example with token](./bin/postman-token.png)

*That's about it. Good luck, tacos.*
