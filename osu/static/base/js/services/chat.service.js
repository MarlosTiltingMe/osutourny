Osu.factory("ChatService", ChatService);
ChatService.$inject = ['$cookies', '$http'];

function ChatService($cookies, $http) {

  function list() {
    return $http.get('/api/messages/');
  }

  function create(body, user) {
    return $http.post('/api/messages/', {body:body, author:user})
  }


  var ChatService = {
    list: list,
    create: create
  }
  return ChatService;
}
