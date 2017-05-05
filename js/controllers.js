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
    .controller("DevController", function($scope, $rootScope) {


    })
    .controller("ClienteController", function($scope, $rootScope, $location, $uibModal) {
        $scope.gerais = [{
            id:0,
            titulo:'Comportamento',
            texto:'Texto Comportamento - Feito contato com o cliente que comentou sobre promoções de outros concorrentes'},{
            id:1,
            titulo:'Mercado',
            texto:'Mercado - Feito contato com o cliente que comentou sobre promoções de outros concorrentes'},{
            id:2,
            titulo:'Concorrência',
            texto:'Feito contato com o cliente que comentou sobre promoções de outros concorremtes'}
            ];
        $rootScope.pontuais = [{
            id:0,
            data:'03.04.2017 - 09:36:45',
            texto:'Feito contato com o cliente que comentou sobre promoções de outros concorremtes'},{
            id:1,
            data:'03.04.2017 - 09:36:45',
            texto:'Feito contato com o cliente que comentou sobre promoções de outros concorremtes'},{
            id:2,
            data:'03.04.2017 - 09:36:45',
            texto:'Feito contato com o cliente que comentou sobre promoções de outros concorremtes'},{
            id:3,
            data:'03.04.2017 - 09:36:45',
            texto:'Feito contato com o cliente que comentou sobre promoções de outros concorremtes'}
        ];

        function init(){
            if($rootScope.selectedClient == null){
                $location.path("/caminho");
            }
        }
        init();

        $scope.adicionarPontual = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './view/adicionar-pontual.html',
                controller: 'ModalInstanceCriarPontualCtrl'
            });
        }

        $scope.editarContatos = function (contato) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './view/editar-contato.html',
                controller: 'ModalInstanceUltimosContatosCtrl',
                resolve: {
                    contato: function () {
                        return contato;
                    }
                }
            });
        }

        
        $scope.editarDadosSlide = function(index){
            alert(index);
        }

         $scope.editarDadosCliente = function(cliente){
           var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: './view/expandir-contato.html',
              controller: 'ModalInstanceCtrl'
            });
        }

        $scope.gotoDev = function() {
            $location.path("/dev");
        }

        
    })
    .controller("CaminhoCtrl", function($scope, $rootScope, $uibModal) {

          $scope.selecionarCliente = function(size, parentSelector){
           var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: './view/selecionar-cliente.html',
              controller: 'ModalSelecionarClienteCtrl',
              resolve: {
                items: function () {
                  return "";
                }
              }
            });
        }   

    })
    .controller("ModalSelecionarClienteCtrl", function($scope, $rootScope, $location, $uibModalInstance, $timeout)  {



        $scope.selectClient = function (client) {
            console.log("selectClient() " + client);
            $uibModalInstance.dismiss('cancel');

            $rootScope.selectedClient = client;
            $location.path("/cliente");
        }

        $scope.goCliente = function(){
            $uibModalInstance.close();

        }

    })
    .controller("ModalInstanceCriarPontualCtrl", function($scope, $rootScope, $uibModalInstance) {

        $scope.pontual = {
            texto:"",
            data: new Date()
        }

        $scope.close = function(){
            $uibModalInstance.close();
        }

        $scope.adicionarPontualNaLista = function (pontual) {
          $uibModalInstance.close();
          $rootScope.pontuais.unshift(pontual)
        }
    })
    .controller("ModalInstanceCtrl", function($scope, $rootScope, $uibModalInstance) {
        $scope.close = function(){
            $uibModalInstance.close();
        }

    })
    .controller("ModalInstanceUltimosContatosCtrl", function($scope, $rootScope, $uibModalInstance, contato) {

        $scope.contato = contato;

        $scope.isAnitgo = true;

        $scope.close = function(){
            $uibModalInstance.close();
        }

        $scope.adicionarUltimosContatos = function(contato){
            if(!!contato.id){
                $uibModalInstance.close();
            }else{
                contato.data = new Date()
                contato.id = $rootScope.contatos.length + 1;
                $rootScope.contatos.push(contato);    
                $uibModalInstance.close();
            }
            
        }

         $scope.criarUltimosContatos = function(contato){
            $scope.isAntigo = false;
            $scope.contato = {};
        }

    })
    .controller("Tela3Controller", function($scope, $rootScope) {


    })
    .controller("SimulacoesController", function($scope, $rootScope, $location) {
        $scope.gotoDev = function() {
            $location.path("/dev");
        }

    })
    .controller("TermometroController", function($scope, $rootScope) {


    })
    .controller("ClientesController", function($scope, $rootScope) {


    })
    .controller("MainController", function($scope, $rootScope, $filter, $uibModal, $document, $location) {



        $rootScope.linksMenu = [{
            nome: 'Cliente',
            link: '/cliente',
            icon: 'fa-user'

        }, {
            nome: 'Simulações',
            link: '/simulacoes',
            icon: 'fa-usd'

        }];

        $rootScope.dadosGraficos =
        [
            {"x": "%LB", "top-1": 10, "top-2": 12},
            {"x": "%LM", "top-1": 11, "top-2": 13},
            {"x": "%OUTROS", "top-1": 12, "top-2": 14},
            {"x": "%TOS", "top-1": 13, "top-2": 15},
            {"x": "%MARCKUP", "top-1": 14, "top-2": 16}
        ];
        $rootScope.dadosGraficosColunas = 
        [
            {"id": "top-1", "type": "bar", "name": "Top one"}
        ];


        $rootScope.$on('$routeChangeSuccess', function(e, current, pre) {
            $rootScope.currentRoute = $location.path();
        });

        $rootScope.currentRoute = "/home";

        $rootScope.processos = [
            {id:1,	data:"14.04.17 - 17:30",	cliente:"Carrefour",	processo:423476, status:"Em processamento"},
            {id:1,	data:"20.04.17 - 17:30",	cliente:"Carrefour",	processo:564654, status:"Encerrado"}
        ]

        $rootScope.contatos = [
            {id:1,	data:"14.04.17 - 17:30",	descricao:"0000456456",	emissor:423476, status:"Atualização: 03.05.2017 - PHERMANN\n\nAguardando retorno do cliente"},
            {id:2,	data:"14.04.17 - 17:30",	descricao:"0000456457",	emissor:423476, status:"Atualização: 03.05.2017 - PHERMANN\n\nAguardando retorno do cliente"},
            {id:3,	data:"20.04.17 - 17:30",	descricao:"0000456458",	emissor:564654, status:"Atualização: 03.05.2017 - PHERMANN\n\nAguardando retorno do cliente"}
        ]

        $rootScope.clientes = [
            {
                clienteEmissorId:974651321318,
                razao:"CARREFOUR",
                cnpj:"08.675.549/0001-56",
                cidade:"SÃO PAULO",
                uf:"SP",
                contato:{
                    numero:45698744,
                    nome:"José Cachoeira",
                    agrupador:{
                        numero:45698744,
                        nome:"José Cachoeira"
                    },
                    supervisor:{
                        numero:45648948,
                        nome:"Paula Hermann"
                    },
                    cargo:"Gerente",
                    telefones:[
                        {
                            numero:"+55 11 1234-5678",
                            prioritario:true
                        },
                        {
                            numero:"+55 11 7894-4563",
                            prioritario:false
                        }
                    ],
                    emails:[
                        {
                            email:"comercial@carrefour.com.br",
                            prioritario:true
                        },
                        {
                            email:"joao@carrefour.com.br",
                            prioritario:false
                        }
                    ]
                }
            }
        ];

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
