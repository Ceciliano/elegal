angular.module('app', ['ngRoute', 'ngResource', 'ng-file-model'])

  //---------------
  // Services
  //---------------

  .factory('Marcas', ['$resource', function($resource) {
    return $resource('/marcas/:idloja', null, {
      'update': { method:'PUT' }
    });
  }])

  .factory('Arquivos', ['$resource', function($resource) {
    return $resource('/arquivos/:idloja', null, {
      'update': { method:'PUT' }
    });
  }])

  //---------------
  // Controllers
  //---------------
  .controller('ListaMarcasController', ['$scope', 'Marcas', '$location', '$routeParams', '$http', function ($scope, Marcas, $location, $routeParams, $http) {

    $scope.marcas = [];

    $http.get('/marcas/' + $routeParams.idLoja)
    	.success(function(marcas) {
    		$scope.marcas = marcas;
    	})
    	.error(function(erro){
    		console.log(erro);
    });
  }])

  .controller('NovaMarcaController', ['$scope', 'Marcas', 'Arquivos', '$location', '$routeParams', '$http', function ($scope, Marcas, Arquivos, $location, $routeParams, $http) {

    $scope.marca = {};
    $scope.marca.loja = $routeParams.idLoja;
    $scope.opcoes = [{'value':true, 'label': 'Sim'}, {'value':false, 'label': 'Não'}];

    $scope.submeter = function() {
        if($scope.marca.logo) {
            $scope.salvarArquivo();
        }
    };

    $scope.salvarArquivo = function() {
        var arquivo = $scope.montaArquivo();
        $http.post('/arquivos', arquivo)
         .success(function(arquivo) {
            console.log('retorno' + arquivo);
            $scope.marca.logo = arquivo._id;
            $scope.salvarMarca();
         })
         .error(function(erro){
             console.log('Erro ao salvar o arquivo de imagem da marca. Erro: ' + erro);
        });
    }


    $scope.salvarMarca = function()  {
        $http.post('/marcas', $scope.marca)
        .success(function(arquivo) {
            console.log('retorno' + arquivo);
            $scope.marca = {};
            $scope.marca.loja = $routeParams.idLoja;
        })
        .error(function(erro){
            console.log('Erro ao salvar a marca. Erro: ' + erro);
        });
    }

    $scope.montaArquivo = function () {
       return new Arquivos({nome: $scope.marca.logo.name,
                                  data: $scope.marca.logo.data,
                                  tamanho: $scope.marca.logo.size,
                                  tipo: $scope.marca.logo.type,
                                  loja: $routeParams.idLoja});
    }

  }])

  //---------------
  // Routes
  //---------------

  .config(['$routeProvider','$locationProvider', function ($routeProvider, $locationProvider) {

    $routeProvider
    .when('/:idLoja', {
        templateUrl: '/lista',
        controller: 'ListaMarcasController'
     })
     .when('/novo/:idLoja', {
         templateUrl: '/formulario',
         controller: 'NovaMarcaController'
      })
     .when('/edit/:idMarca/:idLoja', {
         templateUrl: '/lista',
         controller: 'MarcaController'
      });

    //$locationProvider.html5Mode(true);
  }]);
