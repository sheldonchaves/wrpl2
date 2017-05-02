angular.module('App', ["App.controllers", "App.services", "App.directives", "App.filters",  "ngRoute", "ngResource", 'ui.bootstrap', 'ngCsv'
    


    ])
    .config(function($routeProvider) {

        $routeProvider
            .when('/home', {
                templateUrl: 'view/home.html',
                controller: 'HomeController'
            })
            .when('/cliente', {
                templateUrl: 'view/cliente.html',
                controller: 'ClienteController'
            })
            .when('/tela3', {
                templateUrl: 'view/tela3.html',
                controller: 'Tela3Controller'
            })
            .when('/simulacoes', {
                templateUrl: 'view/simulacoes.html',
                controller: 'SimulacoesController'
            })
            .when('/termometro', {
                templateUrl: 'view/termometro.html',
                controller: 'TermometroController'
            })
            .when('/clientes', {
                templateUrl: 'view/clientes.html',
                controller: 'ClientesController'
            })
            .otherwise({ redirectTo: 'home' });

    });
