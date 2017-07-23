angular.module('app', ['ngRoute', 'ngResource'])

  //---------------
  // Services
  //---------------

  .factory('categorias', ['$resource', function($resource) {
    return $resource('/categorias/:_id/:idLoja', null, {'update': { method:'PUT' }});
  }])

  //---------------
  // Controllers
  //---------------
  .controller('ListaCategoriasController', ['$scope', 'categorias', '$location', '$routeParams', '$http', function ($scope, categorias, $location, $routeParams, $http) {

        $scope.categorias = [];

        listarCategorias();

        function listarCategorias() {
            categorias.query({"idLoja":$routeParams.idLoja},
                function(categorias) {
                    $scope.categorias = categorias;
                },
                function(erro) {
                    console.log(erro);
                });
        }

        $scope.removerCategoria = function(categoria) {
            console.log('Removendo categoria: ' + categoria._id);
            categorias.delete({"_id":categoria._id},
            function() {
                var indice = $scope.categorias.indexOf(categoria);
                $scope.categorias.splice(indice, 1);
            },
            function(erro) {
                console.log('Erro ao remover a categoria.')
            });
        };
  }])

  .controller('NovaCategoriaController', ['$scope', 'categorias', '$location', '$routeParams', '$http', function ($scope, categorias, $location, $routeParams, $http) {

    $scope.categoria = {'loja':$routeParams.idLoja};
    $scope.opcoes = [{'value':true, 'label': 'Sim'}, {'value':false, 'label': 'Não'}];

    $scope.submeter = function() {
           categorias.save($scope.categoria,
           function(categoria) {
             console.log('Categoria ' + categoria.nome + ' salva com sucesso.');
           },
           function(erro) {
             console.log(erro);
          });
    };

  }])

  .controller('EditCategoriaController', ['$scope', 'categorias', '$location', '$routeParams', '$http', function ($scope, categorias, $location, $routeParams, $http) {

    $scope.opcoes = [{'value':true, 'label': 'Sim'}, {'value':false, 'label': 'Não'}];

    $scope.categoria = {};

    categorias.get({"_id":$routeParams.idCategoria, "idLoja":$routeParams.idLoja},
        function(categoria) {
            $scope.categoria = categoria;
        },
        function(erro) {
            console.log(erro);
        });

    $scope.submeter = function() {
        categorias.update({"_id":$scope.categoria._id}, $scope.categoria,
        function(categoria) {
            console.log('Categoria ' + categoria._id + ' atualizada com sucesso.');
        },
        function(erro){
            console.log('Erro ao atualizar categoria.');
        });
    };
  }])

  //---------------
  // Routes
  //---------------

  .config(['$routeProvider', function ($routeProvider) {

    $routeProvider
    .when('/:idLoja', {
        templateUrl: '/listaCategorias',
        controller: 'ListaCategoriasController'
     })
     .when('/novo/:idLoja', {
         templateUrl: '/formularioCategoria',
         controller: 'NovaCategoriaController'
      })
     .when('/edit/:idCategoria/:idLoja', {
         templateUrl: '/formularioCategoria',
         controller: 'EditCategoriaController'
      });
  }]);
