/**
 * Created by seneda on 15/11/15.
 */
angular.module('appAz').controller('unidadeCtrl', function($rootScope, $location)
{

    $rootScope.activetab = $location.path();
});


angular.module('appAz').controller('unidadeController', function($scope, $http)
{
   $scope.gridOptions = {
       toolbar: [{name: "create", text:"Novo"}],
       columns: [{
           field: "nome",
           title: "Nome",
           editable :false,
           filterable: {
               cell: {
                   enabled: true,
                   delay: 1000,
                   operator: "contains"
               }
           }
       },
           { command: ["edit", "destroy"], title: "&nbsp;", width: "220px" }],
       editable: "inline",
       pageable: true,
       refresh: true,
        dataSource: {
            pageSize: 10,
            transport: {
                read: function (e) {
                    $http.get('http://localhost:3000/unidade').
                        success(function(response) {
                            e.success(response);
                        }).
                        error(function(data, status, headers, config) {
                            alert('something went wrong');
                            console.log(status);
                            e.error(data);
                        });
                },
                update: function (e) {
                    $http.put('http://localhost:3000/unidade/' + e.data.id, e.data)
                        .success(function (response) {
                            e.success(response);
                        })
                        .error(function (data, status, headers, config) {
                            e.error(data);
                        });
                },
                create: function (e){
                    $http.post('http://localhost:3000/unidade', e.data)
                        .success(function (response) {
                            e.success(response);
                        })
                        .error(function (data, status, headers, config) {
                            e.error(data);
                        });
                },
                destroy: function (e) {
                    $http.delete('http://localhost:3000/unidade/' + e.data.id)
                        .success(function(response) {
                            e.success(response)
                        }).
                        error(function(data, status, headers, config) {
                            alert('something went wrong')

                        });
                },


            },
            schema: {
                data: function (data) {
                    return data;
                },
                total: function (data) {
                    return data.length;
                },  //!important for the CRUD operation!
                model: {
                    id: "id",
                    fields: {
                        nome: { type: "string" },
                    }
                }
            }

        }
    }
});



