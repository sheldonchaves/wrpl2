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

        

        $scope.editarPerfilDeRevenda = function(){
           var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: './view/perfil-revenda.html',
              controller: 'ModalInstancePerfilDeRevendaCtrl'
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
    .controller("ModalInstancePerfilDeRevendaCtrl", function($scope, $rootScope, $uibModalInstance) {

        

        $scope.close = function(){
            $uibModalInstance.close();
        }


        $scope.editarLinhaBranca = function(produto){
            var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: './view/editar-linhaBranca.html',
              controller: 'ModalProdutoCtrl',
              resolve: {
                produto: function () {
                  return produto;
                }
              }
            });
        }

        $scope.removerLinhaBranca = function(produto){
            $rootScope.linhaBranca.splice(produto.id,1);
        }

        $scope.adicionarLinhaBranca = function(){
             var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: './view/editar-linhaBranca.html',
              controller: 'ModalProdutoCtrl',
              resolve: {
                produto: function () {
                  return "";
                }
              }
            });
        }

        $scope.editarConcorrenteRevenda = function(produto){
             var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: './view/editar-concorrente.html',
              controller: 'ModalProdutoCtrl',
              resolve: {
                produto: function () {
                  return produto;
                }
              }
            });
        }

        $scope.removerConcorrenteRevenda = function(produto){
            $rootScope.concorrentesRevenda.splice(produto.id,1);
        }

        $scope.adicionarConcorrenteRevenda = function(){
             $scope.adicionarLinhaBranca = function(){
             var modalInstance = $uibModal.open({
              animation: true,
              templateUrl: './view/editar-concorrente.html',
              controller: 'ModalProdutoCtrl',
              resolve: {
                produto: function () {
                  return "";
                }
              }
            });
        }
    }

        $scope.adicionarPontualNaLista = function (pontual) {
          $uibModalInstance.close();
          $rootScope.pontuais.unshift(pontual)
        }
     })
     .controller("ModalProdutoCtrl", function($scope, $rootScope, $uibModalInstance, produto) {

        $scope.produto = produto;

        $scope.close = function(){
            $uibModalInstance.close();
        }

        $scope.adicionarConcorrente = function(contato){
            if(!!contato.id){
                $uibModalInstance.close();
            }else{
                contato.id = $rootScope.contatos.length;
                $rootScope.contatos.push(contato);    
                $uibModalInstance.close();
            }
            
        }

         $scope.adicionarLinha = function(contato){
            if(!!contato.id){
                $uibModalInstance.close();
            }else{
                contato.id = $rootScope.contatos.length;
                $rootScope.contatos.push(contato);    
                $uibModalInstance.close();
            }
            
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
            {"x": "VALORES", "LB": 47, "LM":36,"OUTROS":25,"TOS":37,"MARKUP":23}
        ];
        $rootScope.dadosGraficosColunas = 
        [
            {"id": "LB", "type": "bar", "name": "LB"},
            {"id": "LM", "type": "bar", "name": "LM"},
            {"id": "OUTROS", "type": "bar", "name": "OUTROS"},
            {"id": "TOS", "type": "bar", "name": "TOS"},
            {"id": "MARKUP", "type": "bar", "name": "MARKUP"}
        ];

        $rootScope.datax = {"id": "x"};

        $rootScope.perfilLoja1 = 0;
        $rootScope.perfilLoja2 = 1;
        $rootScope.perfilLoja3 = 1;
        $rootScope.perfilLoja4 = 0;

        $rootScope.linhaBranca = 
        [
            {id:0,nome:"ELECTROLUX",quantidade:"45%"},
            {id:1,nome:"PANASONIC",quantidade:"25%"},
            {id:2,nome:"SAMSUNG",quantidade:"30%"},
            {id:3,nome:"ATLAS",quantidade:"5%"}

        ]

        $rootScope.concorrentesRevenda = 
        [
            {id:0,nome:"ELECTROLUX",quantidade:"45%"},
            {id:1,nome:"PANASONIC",quantidade:"25%"},
            {id:2,nome:"SAMSUNG",quantidade:"30%"},
            {id:3,nome:"ATLAS",quantidade:"5%"}

        ]

        $rootScope.categoriaLinks = 
        [
           {
            nome:"Acesso Restrito",
            icone:"",
            links:[
                    {
                        titulo:"ZTLV18 - Administração Menu",
                        url:""
                    },
                    {
                        titulo:"ZTLV14 - Cod. De marca e Categoria Mix",
                        url:""
                    },
                    {titulo:"ZTLV19 - Cadastro Ação Promo. E Mapa da Mina",url:""},{titulo:"ZTLV15 - Texos Fixos - Simulação e OV",url:""},{titulo:"ZTLV20 - TAB PRE Atribuir Marca e Categ",url:""},{titulo:"ZTLV11 - ZROUTE",url:""},{titulo:"ZTABP - Gerar de tabela de Preço",url:""},{titulo:"ZEXEC - Exceção de materiais - TAB preço",url:""}]},
           {
            nome:"Cliente",
            icone:"",
            links:[
                    {
                        titulo:"XD03 - Consulta Cadastro Cliente",
                        url:""
                    },
                    {
                        titulo:"ZTLV09 -Relação de telefones",
                        url:""
                    }]
           },
           {nome:"Atividades",icone:"",links:[{titulo:"ZTLV22 - Criar Providência",url:""},{titulo:"ZC10 - Relatório de atividades",url:""},{titulo:"MM03 - Cadastro de Produto",url:""}]},
           {nome:"Estoque",icone:"",links:[{titulo:"ZVSCE17 - Sintese de Estoque",url:""},{titulo:"ZMBE - Consulta Estoque",url:""}]},
           {nome:"Ordem/NF",icone:"",links:[{titulo:"ZV20 - Lista Ordem",url:""},{titulo:"ZV40 - Lista Ordem Orig.",url:""},{titulo:"VA01 - Criar Ordem R3",url:""},{titulo:"VA02 - Alterar Ordem R3",url:""},{titulo:"ZVC16 - Ordens Faturadas",url:""},{titulo:"ZSTR14 - Posição de Entrega",url:""},{titulo:"J1B3N - Exibir NF",url:""},{titulo:"ZSTR52 - Rel de ocorrências",url:""},{titulo:"ZSER - Consulta nº série do Produto",url:""}]},
           {nome:"Meta/Var",icone:"",links:[{titulo:"ZV57 - Informações Gerenciais",url:""}]},
           {nome:"Cred/Cob",icone:"",links:[{titulo:"FBL6N - Partidas Individuais",url:""},{titulo:"ZFI46 - Crédito do Cliente - Média ",url:""},{titulo:"FD33 - Crédito do Cliente",url:""},{titulo:"ZFE15 - Rel. Fretes Contas RE",url:""}]},
           {nome:"Verbas",icone:"",links:[{titulo:"CJ37 - Empenho da verbas",url:""},{titulo:"CJ30 - 1º Empenho na Campanha",url:""},{titulo:"CJ31 - Consulta de verbas",url:""},{titulo:"CJ20N - Criar Campanha",url:""},{titulo:"ZPSR1 - Extrato Detalhado PEP",url:""},{titulo:"ZTLV10G - Consulta Bonificação",url:""}]}
        ]


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
