/**
 * Created by seneda on 16/11/15.
 */

angular.module('appAz').controller('empresaCtrl', function ($rootScope, $location) {
    $rootScope.activetab = $location.path();
}).controller('empresaController', function ($scope, $http) {


    $scope.adicionaEmpresa = function () {
        $http.post('http://localhost:3000/empresa', $scope.empresa)
            .success(function (response) {
                delete $scope.empresa;
                $('#idRefresh').data('kendoGrid').dataSource.read();
                $('#idRefresh').data('kendoGrid').refresh();
                return false;
            })
    };

    $scope.editarEmpresa = function (){
        console.log('entrei');
    };

    $scope.gridOptions = {
        columns: [{
            field: "cnpj",
            title: "CNPJ",
            width: "110px",
            filterable: {
                cell: {
                    enabled: true,
                    delay: 1000,
                    operator: "contains"
                }
            }
        },
            {
                field: "razaosocial",
                title: "Razão Social",
                width: "180px",
                filterable: {
                    cell: {
                        enabled: true,
                        delay: 1000,
                        operator: "contains"
                    }
                }
            },
            {
                field: "telefone",
                title: "Telefone",
                width: "60px",
                filterable: {
                    cell: {
                        enabled: true,
                        delay: 1000,
                        operator: "contains"
                    }
                }
            },
            {
                field: "email",
                title: "E-mail",
                width: "170px",
                filterable: {
                    cell: {
                        enabled: true,
                        delay: 1000,
                        operator: "contains"
                    }
                }
            },
            //{command: [{text: "Visualizar", click: editarEmpresa, }}],
            {command: ["edit", "destroy"], title: "&nbsp;", width: "90px"}],
        editable: "inline",
        pageable: true,
        refresh: true,
        dataSource: {
            pageSize: 5,
            transport: {
                read: function (e) {
                    $http.get('http://localhost:3000/empresa').
                        success(function (response) {
                            e.success(response);
                        }).
                        error(function (data, status, headers, config) {
                            alert('something went wrong');
                            console.log(status);
                            e.error(data);
                        });
                },
                update: function (e) {
                    $http.put('http://localhost:3000/empresa/' + e.data.id, e.data)
                        .success(function (response) {
                            $scope.tela = response;
                            console.log($scope.tela);
                            e.success(response);
                        })
                        .error(function (data, status, headers, config) {
                            e.error(data);
                        });
                },
                create: function (e) {
                    $http.post('http://localhost:3000/empresa', e.data)
                        .success(function (response) {
                            e.success(response);
                        })
                        .error(function (data, status, headers, config) {
                            e.error(data);
                        });
                },
                destroy: function (e) {
                    alert('Está ação excluirá também um registro de comprador. Prosseguir?')
                    $http.delete('http://localhost:3000/empresa/' + e.data.id)
                        .success(function (response) {
                            e.success(response)
                        }).
                        error(function (data, status, headers, config) {
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
                        nome: {type: "string"},
                    }
                }
            }

        }
    }
});

$(document).ready(function () {

    var validator = $("#validaForm").kendoValidator().data("kendoValidator"),
        status = $(".status");

    $("form").submit(function (event) {
        event.preventDefault();
        if (validator.validate()) {
            status.text("Hooray! Your tickets has been booked!")
                .removeClass("invalid")
                .addClass("valid");
        } else {
            status.text("Oops! There is invalid data in the form.")
                .removeClass("valid")
                .addClass("invalid");
        }
    });
});