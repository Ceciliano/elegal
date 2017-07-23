angular.module('app', ['ngRoute', 'ngResource'])

  //---------------
  // Services
  //---------------
  .factory('Lojas', ['$resource', function($resource) {
    return $resource('/lojas/:id', null, {
      'update': { method:'PUT' }
    });
  }])
  //---------------
  // Controllers
  //---------------

  .controller('WebController', ['$scope', 'Lojas', '$location', '$window', function ($scope, Lojas, $location, $window) {
      $scope.save = function(){

      if(!$scope.newLoja || $scope.newLoja.length < 1) return;
      var loja = new Lojas({ nome: $scope.newLoja, ativo: false });

      loja.$save(function(){
        $window.location.href = "http://" + loja.url + ".localhost:3000";
      });
    }
  }])

  //---------------
  // Routes
  //---------------

  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/web.html',
        controller: 'WebController'
      });
  }]);
