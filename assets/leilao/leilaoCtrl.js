/**
 * Created by seneda on 16/11/15.
 */

angular.module('appAz').controller('leilaoCtrl', function($rootScope, $location)
{
    $rootScope.activetab = $location.path();
});

angular.module('appAz').controller('leilaoController', function($scope, $http) {
    $scope.adicionaLeilao = function(){
        $http.post('http://localhost:3000/leilao', $scope.leilao)
            .success(function (response) {
                delete $scope.leilao;
                return false;
            })
    }

    $scope.source = new kendo.data.DataSource({
        pageSize: 3,
            transport: {
                read: function (o) {

                    $http.get('http://localhost:3000/leilao')
                        .success(function (response) {
                            //console.log(response);
                            o.success(response);
                        })
                        .error(function (data) {
                            console.log(data)
                            o.error(data);
                        });

                }
            }
        })


});








