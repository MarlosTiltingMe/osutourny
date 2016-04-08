Osu.controller('AuthController', AuthController);
AuthController.inject = ['$cookies'];

function AuthController($scope, $http, $cookies, AuthService) {


  function getToken() {
    return $cookies.get('token');
  }

  $http.defaults.headers.common['Authorization'] = 'Token ' + getToken();

  $scope.init = function() {
    currentUser();
  }

  $scope.register = function(email, username, password) {
    AuthService.register(email, username, password);
  }
  $scope.login = function(username, password) {
    AuthService.login(username, password);
  }
  $scope.logout = function() {
    AuthService.logout();
  }
  $scope.isAuthenticated = function() {
    if ($scope.userModel) {
      return true;
    } else {
      return false;
    }
  }

  function currentUser() {

    $http.get('/api/current/').success(function(data) {
      if(data.id) {
        $scope.userModel = data.username;
      } else {
        $scope.userModel = 'Anon';
      }
    });
  }
}
