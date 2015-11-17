$(document).ready(function() {
    $("#menu").kendoMenu({
    });
});

angular.module('appAz',['ngRoute', 'kendo.directives']).config(['$routeProvider' , function($routeProvider)
{
    $routeProvider
        .when('/leilao', {
            templateUrl : 'leilao/leilao.html',
            controller  : 'leilaoCtrl'
        }).when('/empresa', {
            templateUrl : 'empresa/empresa.html',
            controller  : 'empresaCtrl',
        }).when('/unidade', {
            templateUrl : 'unidade/unidade.html',
            controller  : 'unidadeCtrl'
        }).when('/lote', {
            templateUrl : 'lote/lote.html',
            controller  : 'loteCtrl',
        }).when('/comprador', {
            templateUrl : 'comprador/comprador.html',
            controller  : 'compradorCtrl',
        }).otherwise ({ redirectTo: '/' });
}]).controller('loteCtrl', function($rootScope, $location)
{
    $rootScope.activetab = $location.path();
}).controller('compradorCtrl', function($rootScope, $location)
{
    $rootScope.activetab = $location.path();
});

