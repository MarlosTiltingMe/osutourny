Osu.factory("AuthService", AuthService);
AuthService.$inject = ['$cookies', '$http'];

function AuthService($cookies, $http) {

  var AuthService = {
    login: login,
    register: register,
    currentUser: currentUser,
    list: list
  };

  var token = $cookies.get('token');
  $http.defaults.headers.common['Authorization'] = 'Token ' + token;

  return AuthService;

  function login(email, password) {

    $http.post('/api-token-auth/',
    {
      username:email,
      password:password
    }).success(function(data) {
      $cookies.put('token', data.token);
    });

    return $http.post('/api-auth/login/', {
      email: email,
      password: password
    }).then(loginSuccessFn, loginErrorFn);

    function loginSuccessFn(data, status, headers, config) {
      window.location = '/';
    }

    function loginErrorFn(data, status, headers, config) {
      window.location = '/login';
    }
  }

  function register(email, username, password) {
    return $http.post('/api/users/', {
      email: email,
      username: username,
      password: password
    }).then(registerSuccessFn, registerErrorFn);

    function registerSuccessFn(data, status, headers, config) {
      AuthService.login(username, password);
      window.location = '/login';
    }

    function registerErrorFn(data, status, headers, config) {
      alert("Registration Error.");
    }
  }

  function currentUser() {
    $http.get('/api/current/').success(function(data) {

      if(data.id) {
        console.log(data.username);
        return data.username;
      }
    });
  }

  function list() {
    return $http.get('/api/users/');
  }
}
