Osu.config(function($routeProvider) {
  var app = 'static/base/js/app/';

  $routeProvider
  .when('/', {
    controller: 'ChatController',
    controllerAs: 'ChatCtrl',
    templateUrl: app + 'chat/chat.tpl.html'
  }).when('/login', {
    controller: 'AuthController',
    controllerAs: 'AuthCtrl',
    templateUrl: app + 'auth/login.tpl.html'
  }).when('/register', {
    controller: 'AuthController',
    controllerAs: 'AuthCtrl',
    templateUrl: app + 'auth/auth.tpl.html'
  });
});
