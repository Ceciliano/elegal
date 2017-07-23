angular.module('appGrades', ['ngRoute', 'ngResource'])

  //---------------
  // Services
  //---------------

  .factory('grades', ['$resource', function($resource) {
    return $resource('/grades/:_id/:idLoja', null, {'update': { method:'PUT' }});
  }])

  //---------------
  // Controllers
  //---------------
  .controller('ListaGradesController', ['$scope', '$location', 'grades', '$routeParams', '$http', function ($scope, $location, grades, $routeParams, $http) {

        $scope.grades = [];

        listarGrades();

        function listarGrades(){
            grades.query({"idLoja": $routeParams.idLoja}, function(grades) {
                $scope.grades = grades;
            },
            function(erro){
                console.log('Erro ao recuperar as grades. Erro: ' + erro);
            });
        }

        $scope.removerGrade = function(grade) {
            grades.delete({"_id": grade._id},
            function(){
                var indice = $scope.grades.indexOf(grade);
                $scope.grades.splice(indice, 1);
            },
            function(erro){
                console.log('Erro ao remover a grade. Erro: ' + erro);
            });
        };
  }])

  .controller('NovaGradeController', ['$scope', '$location', 'grades', '$routeParams', '$http', function ($scope, $location, grades, $routeParams, $http) {

    $scope.grade = {'loja':$routeParams.idLoja};

    $scope.submeter = function() {
        grades.save($scope.grade,
        function(grade) {
            console.log('Grade salva com sucesso.');
        }, function(erro) {
            console.log('Erro ao salvar a grade. Erro: ' + erro);
        });
    };
  }])

  .controller('EditGradeController', ['$scope', '$location', 'grades', '$routeParams', '$http', function ($scope, $location, grades, $routeParams, $http) {

    $scope.grade = {};

    console.log('_id: ' + $routeParams.idGrade);
    console.log('idLoja: ' + $routeParams.idLoja);

    grades.get({"_id":$routeParams.idGrade, "idloja":$routeParams.idLoja},
    function(grade) {
        $scope.grade = grade;
    },
    function(erro) {
        console.log('Erro ao buscar a grade. Erro: ' + erro);
    });

    $scope.submeter = function() {

        grades.update({"_id":$scope.grade._id}, $scope.grade,
        function(grade){
            console.log('Grade atualizada com sucesso.');
        },
        function(erro){
            console.log('Erro ao atualizar a grade. Erro ' + erro);
        });
    };
  }])

  //---------------
  // Routes
  //---------------

  .config(['$routeProvider', function ($routeProvider) {

    $routeProvider
    .when('/:idLoja', {
        templateUrl: '/listaGrades',
        controller: 'ListaGradesController'
     })
     .when('/novo/:idLoja', {
         templateUrl: '/formularioGrade',
         controller: 'NovaGradeController'
      })
     .when('/edit/:idGrade/:idLoja', {
         templateUrl: '/formularioGrade',
         controller: 'EditGradeController'
      });
  }]);
