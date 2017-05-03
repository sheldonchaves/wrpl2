angular.module('App', ["App.controllers", "App.services", "App.directives", "App.filters",  "ngRoute", "ngResource", 'ui.bootstrap', 'ngCsv', 'ngAnimate', 'ngSanitize'
    


    ])
    .config(function($routeProvider, $animateProvider) {

        $animateProvider.classNameFilter( /\banimated\b/ );

        $routeProvider
            .when('/home', {
                templateUrl: 'view/home.html',
                controller: 'HomeController'
            })
            .when('/dev', {
                templateUrl: 'view/dev.html',
                controller: 'DevController'
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
