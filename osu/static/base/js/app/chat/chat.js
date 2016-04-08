Osu.controller('ChatController', ChatController);
ChatController.inject = ['$cookies'];

function ChatController($scope, $http, $cookies, ChatService, AuthService) {


  $scope.init = function() {
    getUser(function() {
      $scope.idToNames();
      setInterval(function() {
        $scope.getMessages();
      }, 1000);
    });
  }

  function getUser(c) {
    $http.get('/api/current/').success(function(data) {
      $scope.user = data.id;
      if(c) c();
    });
  }

  $scope.post = function(message) {
    if($scope.user) {
      ChatService.create(message, $scope.user).success(function() {
        $scope.body = '';
      });
    } else {
      alert('Not logged in.');
    }
  }


  $scope.getMessages = function() {
    ChatService.list().success(function(data) {
      $scope.messages = data;
      $scope.$apply;
    });
  }

  $scope.idToNames = function() {
    $scope.uMap = new Map();
    AuthService.list().success(function(data) {
      for (var c = 0; c < data.results.length; c++) {
        var key = data.results[c].id;
        $scope.uMap.set(key, data.results[c].username);
      }
    });
  }

  $scope.map = function(key) {
    return $scope.uMap.get(key);
  }

}
