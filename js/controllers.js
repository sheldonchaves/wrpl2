angular.module("App.controllers", [])
    .controller("HomeController", function($scope, $rootScope, $location) {




        $scope.items = [
            { href: "#/cliente", label: 'cliente!' },
            { href: "#/tela3", label: 'tela3.' },
            { href: "#/simulacoes", label: 'termometro' }
        ];

        $scope.status = {
            isopen: false
        };

        $scope.toggled = function(open) {};

        $scope.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };










    })
    .controller("ClienteController", function($scope, $rootScope) {


    })
    .controller("Tela3Controller", function($scope, $rootScope) {


    })
    .controller("SimulacoesController", function($scope, $rootScope) {


    })
    .controller("TermometroController", function($scope, $rootScope) {


    })
    .controller("ClientesController", function($scope, $rootScope) {


    })
    .controller("MainController", function($scope, $rootScope, $filter, $uibModal, $document, $location) {

        $rootScope.linksMenu = [{
            nome: 'Home',
            link: '/home',
            icon: 'fa-home'
        }, {
            nome: 'Cliente',
            link: '/cliente',
            icon: 'fa-user'

        }, {
            nome: 'Tela3',
            link: '/tela3',
            icon: 'fa-bar-chart'

        }, {
            nome: 'Simulações',
            link: '/simulacoes',
            icon: 'fa-usd'

        }, {
            nome: 'Termometro',
            link: '/termometro',
            icon: 'fa-thermometer-half'

        }, {
            nome: 'Clientes',
            link: '/clientes',
            icon: 'fa-users'

        }];

        $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
            $rootScope.currentRoute = $location.path();
        });

        $rootScope.currentRoute = "/home";



        $rootScope.ultimosProcessos = [];


        $rootScope.products = [{
                material: '',
                cor: '',
                voltagem: '',
                cond_pagamento: '',
                qnt: '',
                sit_carga: '',
                perc_flex: '',
                perc_redux: '',
                perc_pvl: '',
                cond_frete: '',
                valor_frete: '',
                valor_frete_mlog: '',
                valor_nf_unit: '',
                valor_nf_total: '',
                valor_c_icms: '',
                valor_c_ipi: '',
                valor_c_icms_st: '',
                centro: '',
                loc_expedicao: '',
                perc_juros: '',
                valor_icms: '',
                valor_ipi: '',
                valor_icms_st: '',
                valor_negociado: ''
            }

        ];



    });
