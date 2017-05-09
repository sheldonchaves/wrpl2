angular.module("App.controllers", [])
    .constant('_', _)
    .controller("HomeController", function ($scope, $rootScope, $location, $uibModal) {
        "use strict";


        $scope.items = [
            {href: "#/cliente", label: 'cliente!'},
            {href: "#/tela3", label: 'tela3.'},
            {href: "#/simulacoes", label: 'termometro'}
        ];

        $scope.status = {
            isopen: false
        };

        $scope.toggled = function (open) {
        };

        $scope.toggleDropdown = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.status.isopen = !$scope.status.isopen;
        };


    })
    .controller("DevController", function ($scope, $rootScope) {


    })
    .controller("ClienteController", function ($scope, $rootScope, $location, $uibModal) {
        "use strict";

        $scope.active = 0;
        $scope.filtro2 = "";
        $scope.filtro3 = "";
        $scope.lastProcesso = 0;
        $scope.lastContato = 0;
        $scope.isBlocked = true;
        $scope.isBlockedTos = false;

        $scope.gerais = [{
            id: 0,
            titulo: 'Comportamento',
            texto: 'Texto Comportamento - Feito contato com o cliente que comentou sobre promoções de outros concorrentes'
        }, {
            id: 1,
            titulo: 'Mercado',
            texto: 'Mercado - Feito contato com o cliente que comentou sobre promoções de outros concorrentes'
        }, {
            id: 2,
            titulo: 'Concorrência',
            texto: 'Feito contato com o cliente que comentou sobre promoções de outros concorremtes'
        }
        ];

        $rootScope.pontuais = [{
            id: 0,
            data: '03.04.2017',
            texto: 'Feito contato com o cliente que comentou sobre promoções de outros concorremtes',
            user: {
                nome: "PAULA HERMANN",
                abreviado: "PHERMANN"
            }
        }, {
            id: 1,
            data: '03.04.2017',
            texto: 'Feito contato com o cliente que comentou sobre promoções de outros concorremtes',
            user: {
                nome: "PAULA HERMANN",
                abreviado: "PHERMANN"
            }
        }, {
            id: 2,
            data: '03.04.2017',
            texto: 'Feito contato com o cliente que comentou sobre promoções de outros concorremtes',
            user: {
                nome: "PAULA HERMANN",
                abreviado: "PHERMANN"
            }
        }, {
            id: 3,
            data: '03.04.2017',
            texto: 'Feito contato com o cliente que comentou sobre promoções de outros concorremtes',
            user: {
                nome: "PAULA HERMANN",
                abreviado: "PHERMANN"
            }
        }
        ];

        $scope.gridOptions = {
            enableHorizontalScrollbar : 0,
            data: 'contatos',
            columnDefs: [{
                field: 'data',
                displayName: 'Data',
                cellTemplate: '<div ng-click="grid.appScope.editarContatos(row.entity);">{{COL_FIELD}}</div>'
            }, {
                field: 'descricao',
                displayName: 'Descrição',
                cellTemplate: '<div ng-click="grid.appScope.editarContatos(row.entity);">{{COL_FIELD}}</div>'
            }, {
                field: 'emissor',
                displayName: 'Emissor',
                cellTemplate: '<div ng-click="grid.appScope.editarContatos(row.entity);">{{COL_FIELD}}</div>'
            }, {
                field: 'status',
                displayName: 'Status',
                cellTemplate: '<div ng-click="grid.appScope.editarContatos(row.entity);">{{COL_FIELD}}</div>'
            }

            ]
        };

        $scope.teste = function () {
            if ($scope.active == 0 || $scope.active == 1) {
                return true;
            } else {
                return false;
            }
        }

        $scope.excelContatos = function () {
            var blob = new Blob([document.getElementById('exportableContatos').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "Contatos.xls");
        };

        $scope.excelProcessos = function () {
            var blob = new Blob([document.getElementById('exportableProcessos').innerHTML], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8"
            });
            saveAs(blob, "Processos.xls");
        };

        $rootScope.user = {
            nome: "PAULA HERMANN",
            abreviado: "PHERMANN"
        }

        function init() {
            if ($rootScope.selectedClient == null) {

                var modalInstance = $uibModal.open({
                    animation: true,
                    templateUrl: './view/selecionar-cliente.html',
                    controller: 'ModalSelecionarClienteCtrl',
                    size: "lg",
                    resolve: {
                        items: function () {
                            return "";
                        }
                    }
                });

            }
        }

        init();

        $scope.$watch('active', function (active) {
            console.log("current value: ", active)
        });

        $scope.adicionarPontual = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './view/adicionar-pontual.html',
                controller: 'ModalInstanceCriarPontualCtrl'
            });
        };

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
        };

        $scope.editarPerfilDeRevenda = function () {
            $scope.isBlocked = !$scope.isBlocked
        };

        $scope.editarDadosCliente = function (cliente) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './view/expandir-contato.html',
                controller: 'ModalInstanceCtrl',
                size: "lg",
            });
        };

        $scope.atualizarProcesso = function () {
            $scope.filtro2 = "";
            switch ($scope.lastProcesso) {
                case 0:
                    $rootScope.processos = $rootScope.processos1;
                    $scope.lastProcesso = 1;
                    break;
                case 1:
                    $rootScope.processos = $rootScope.processos2;
                    $scope.lastProcesso = 2;
                    break;
                case 2:
                    $rootScope.processos = $rootScope.processos3;
                    $scope.lastProcesso = 0;
                    break;
                default:
                    $rootScope.processos = $rootScope.processos;
            }

        };

        $scope.atualizarContatoss = function () {
            $scope.filtro3 = "";
            switch ($scope.lastContato) {
                case 0:
                    $rootScope.contatos = $rootScope.contatos2;
                    $scope.lastContato = 1;
                    break;
                case 1:
                    $rootScope.contatos = $rootScope.contatos1;
                    $scope.lastContato = 0;
                    break;
                default:
                    $rootScope.contatos = $rootScope.contatos1;
            }

        };

        $scope.removePontual = function (pontual) {
            $rootScope.pontuais = _.without($rootScope.pontuais, _.findWhere($rootScope.pontuais, {id: pontual.id}));
        }

        $scope.gotoDev = function () {
            $location.path("/dev");
        };

        $scope.editarTos = function () {
            $scope.isBlockedTos = !$scope.isBlockedTos;
        }

        $scope.calculaTos = function () {
            $rootScope.selectedClient.revenda.tos.total = parseInt($rootScope.selectedClient.revenda.tos.refrigerador) + parseInt($rootScope.selectedClient.revenda.tos.lavadora) + parseInt($rootScope.selectedClient.revenda.tos.fogao);
        }

    })
    .controller("CaminhoCtrl", function ($scope, $rootScope, $uibModal) {


    })
    .controller("ModalSelecionarClienteCtrl", function ($scope, $rootScope, $location, $uibModalInstance, _) {
        "use strict";

        $rootScope.clientesBuscados = [];
        $scope.bloqueiaCNPJ = false;
        $scope.bloqueiaEmail = false;
        $scope.bloqueiaId = false;
        $scope.busca = {
            cnpj: "",
            id: "",
            email: ""
        };

        $scope.close = function () {
            $uibModalInstance.close();
        };

        $scope.selectClient = function (client) {
            //console.log("selectClient() " + client);
            $uibModalInstance.dismiss('cancel');

            $rootScope.selectedClient = client;
            $location.path("/cliente");
        };

        $scope.bloqueiaBusca = function () {
            if ($scope.busca.email != "") {
                $scope.bloqueiaCNPJ = true;
                $scope.bloqueiaId = true;
            } else if ($scope.busca.cnpj != "") {
                $scope.bloqueiaEmail = true;
                $scope.bloqueiaId = true;
            } else if ($scope.busca.id != "") {
                $scope.bloqueiaCNPJ = true;
                $scope.bloqueiaEmail = true;
            } else {
                $scope.bloqueiaCNPJ = false;
                $scope.bloqueiaEmail = false;
                $scope.bloqueiaId = false;
            }
        }

        $scope.goCliente = function () {
            $uibModalInstance.close();
        };

        $scope.buscarCliente = function () {
            if ($scope.busca.email != "") {
                $rootScope.clientesBuscados = _.where($rootScope.clientes, {email: $scope.busca.email});
            } else if ($scope.busca.cnpj != "") {
                $rootScope.clientesBuscados = _.where($rootScope.clientes, {cnpj: $scope.busca.cnpj});
            } else if ($scope.busca.id != "") {
                $rootScope.clientesBuscados = _.where($rootScope.clientes, {clienteEmissorId: $scope.busca.id});
            } else {
                $rootScope.clientesBuscados = [];
            }


        }

    })
    .controller("ModalInstancePerfilDeRevendaCtrl", function ($scope, $rootScope, $uibModalInstance, $uibModal, _) {
        "use strict";


        $scope.close = function () {
            $uibModalInstance.close();
        };


        $scope.editarLinhaBranca = function (produto) {
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
        };

        $scope.removerLinhaBranca = function (produto) {
            $rootScope.linhaBranca = _.without($rootScope.linhaBranca, _.findWhere($rootScope.linhaBranca, {id: produto.id}));
        };

        $scope.adicionarLinhaBranca = function () {
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
        };

        $scope.editarConcorrenteRevenda = function (produto) {
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
        };

        $scope.removerConcorrenteRevenda = function (produto) {
            $rootScope.concorrentesRevenda = _.without($rootScope.concorrentesRevenda, _.findWhere($rootScope.concorrentesRevenda, {id: produto.id}));
        };

        $scope.adicionarConcorrenteRevenda = function () {
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
        };

        $scope.adicionarPontualNaLista = function (pontual) {
            $uibModalInstance.close();
            $rootScope.pontuais.unshift(pontual);
        };
    })
    .controller("ModalProdutoCtrl", function ($scope, $rootScope, $uibModalInstance, produto) {
        "use strict";
        $scope.produto = produto;

        $scope.close = function () {
            $uibModalInstance.close();
        };

        $scope.adicionarConcorrente = function (contato) {
            if (contato.id != null && contato.id != undefined) {
                $uibModalInstance.close();
            } else {
                contato.id = $rootScope.contatos.length + 1;
                contato.quantidade = contato.quantidade + '%';
                $rootScope.concorrentesRevenda.push(contato);
                $uibModalInstance.close();
            }

        };

        $scope.adicionarLinha = function (contato) {
            if (contato.id != null && contato.id != undefined) {
                contato.quantidade = contato.quantidade + '%';
                $uibModalInstance.close();
            } else {
                contato.id = $rootScope.contatos.length + 1;
                contato.quantidade = contato.quantidade + '%';
                $rootScope.linhaBranca.push(contato);
                $uibModalInstance.close();
            }

        };

    })
    .controller("ModalEmailCtrl", function ($scope, $rootScope, $uibModalInstance) {
        "use strict";
        $scope.email = {};

        $scope.close = function () {
            $uibModalInstance.close();
        };

        $scope.adicionarEmail = function (email) {
            email.id = $rootScope.selectedClient.contatos[0].emails.length;
            $rootScope.selectedClient.contatos[0].emails.push(email);
            $uibModalInstance.close();
        };

    })
    .controller("ModalTelefoneCtrl", function ($scope, $rootScope, $uibModalInstance) {
        "use strict";
        $scope.telefone = {};

        $scope.close = function () {
            $uibModalInstance.close();
        };
        $scope.adicionarTelefone = function (telefone) {
            telefone.id = $rootScope.selectedClient.contatos[0].telefones.length;
            $rootScope.selectedClient.contatos[0].telefones.push(telefone);
            $uibModalInstance.close();
        };

    })
    .controller("ModalInstanceCriarPontualCtrl", function ($scope, $rootScope, $uibModalInstance) {
        "use strict";
        $scope.pontual = {
            texto: "",
            data: new Date()
        };

        $scope.close = function () {
            $uibModalInstance.close();
        };

        $scope.adicionarPontualNaLista = function (pontual) {
            $uibModalInstance.close();
            pontual.id = $rootScope.pontuais.length + 1;
            pontual.user = $rootScope.user;
            $rootScope.pontuais.unshift(pontual);
        };
    })
    .controller("ModalInstanceCtrl", function ($scope, $rootScope, $uibModalInstance, $uibModal, SweetAlert) {
        "use strict";
        $scope.close = function () {
            $uibModalInstance.close();
        };

        var gridOptions = {};
        gridOptions.columnDefs = [
            {field: 'Contato', displayName: 'ID'},
            {field: 'Cargo'},
            {field: 'Telefone', enableSorting: true},
            {
                field: 'Prioritário',
                cellTemplate: '<div ng-if="{{row.value}}" class="ui-grid-cell-contents tooltip-uigrid" title="{{COL_FIELD}}">' +
                '<a ng-if="" ui-sref="main.placeDetail{{placeId: {{row.entity.id}} }}">{{COL_FIELD CUSTOM_FILTERS}}</a></div>'
            },
            {field: 'Email', enableSorting: true},
            {field: 'Prioritário'}
        ];

        $scope.adicionarTelefone = function (telefone) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './view/adicionar-telefone.html',
                controller: 'ModalTelefoneCtrl'
            });
        };

        $scope.adicionarEmail = function (email) {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './view/adicionar-email.html',
                controller: 'ModalEmailCtrl'
            });
        };

        $scope.alterarPrioridade = function (item) {
            item.prioritario = !item.prioritario;
        };

        $scope.removerTodosTelefones = function () {
            $rootScope.selectedClient.contatos[0].telefones = [];
        };

        $scope.removerTodosEmails = function () {
            $rootScope.selectedClient.contatos[0].emails = [];
        };

        $scope.removerEmail = function (email) {
            var alertExclusao = {
                title: "Exclusão de email",
                text: "Tem certeza que gostaria de excluir esse email?",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Sim, excluir!",
                closeOnConfirm: false,
                closeOnCancel: true,
                showLoaderOnConfirm: true
            };
            SweetAlert.swal(
                alertExclusao, function (isConfirm) {
                    if (isConfirm) {
                        $rootScope.selectedClient.contatos[0].emails = _.without($rootScope.selectedClient.contatos[0].emails, _.findWhere($rootScope.selectedClient.contatos[0].emails, {id: email.id}));
                        SweetAlert.swal('Email excluído com sucesso.');

                    } else {
                        return;
                    }

                }
            );


        };

        $scope.removerTelefone = function (telefone) {
            $rootScope.selectedClient.contatos[0].telefones = _.without($rootScope.selectedClient.contatos[0].telefones, _.findWhere($rootScope.selectedClient.contatos[0].telefones, {id: telefone.id}));
        };

        $scope.criarContato = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './view/novo-contato.html',
                controller: 'ModalNovoContatoCtrl'
            });
        };

    })
    .controller("ModalNovoContatoCtrl", function ($scope, $rootScope, $uibModalInstance) {
        "use strict";


        $scope.close = function () {
            $uibModalInstance.close();
        };

        $scope.adicionarNovoContato = function (contato) {
            contato.telefonePrioritario = false;
            contato.emailPrioritario = false;
            $rootScope.tabelaDesnormalizada.push(contato);
            $rootScope.selectedClient.contatos.push(contato);
            $uibModalInstance.close();
        };


    })
    .controller("ModalInstanceUltimosContatosCtrl", function ($scope, $rootScope, $uibModalInstance, contato) {
        "use strict";
        $scope.contato = contato;

        $scope.isAnitgo = true;

        $scope.close = function () {
            $uibModalInstance.close();
        };

        $scope.adicionarUltimosContatos = function (contato) {
            if (!!contato.id) {
                $uibModalInstance.close();
            } else {
                contato.data = new Date();
                contato.id = $rootScope.contatos.length + 1;
                $rootScope.contatos.push(contato);
                $uibModalInstance.close();
            }

        };

        $scope.criarUltimosContatos = function (contato) {
            $scope.isAntigo = false;
            $scope.contato = {};
        };

    })
    .controller("Tela3Controller", function ($scope, $rootScope) {


    })
    .controller("SimulacoesController", function ($scope, $rootScope, $location) {
        "use strict";
        $scope.gotoDev = function () {
            $location.path("/dev");
        };

    })
    .controller("TermometroController", function ($scope, $rootScope) {


    })
    .controller("ClientesController", function ($scope, $rootScope) {


    })
    .controller("MainController", function ($scope, $rootScope, $filter, $uibModal, $document, $location) {
        "use strict";
        $rootScope.gotoCliente = function () {
            $rootScope.selectedClient = null;
            $location.path("/selecionarCliente");
        };

        $rootScope.linksMenu = [{
            nome: 'Cliente',
            link: '/cliente',
            icon: 'fa-user'

        }, {
            nome: 'Simulações',
            link: '/simulacoes',
            icon: 'fa-usd'

        }];

        $rootScope.divLink = function () {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: './view/sap-links.html',
                controller: 'ModalSelecionarClienteCtrl'
            });
        }

        $rootScope.dadosGraficos = [
            {"x": "VALORES", "LB": 47, "LM": 36, "OUTROS": 25, "TOS": 37, "MARKUP": 23}
        ];

        $rootScope.dadosGraficosColunas = [
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

        $rootScope.linhaBranca = [
            {id: 0, nome: "ELECTROLUX", quantidade: "45%"},
            {id: 1, nome: "PANASONIC", quantidade: "25%"},
            {id: 2, nome: "SAMSUNG", quantidade: "30%"},
            {id: 3, nome: "ATLAS", quantidade: "5%"}

        ];

        $rootScope.concorrentesRevenda = [
            {id: 0, nome: "ELECTROLUX", quantidade: "45%"},
            {id: 1, nome: "PANASONIC", quantidade: "25%"},
            {id: 2, nome: "SAMSUNG", quantidade: "30%"},
            {id: 3, nome: "ATLAS", quantidade: "5%"}

        ];

        $rootScope.categoriaLinks = [
            {
                nome: "Acesso Restrito",
                icone: "",
                links: [
                    {
                        titulo: "ZTLV18 - Administração Menu",
                        url: ""
                    },
                    {
                        titulo: "ZTLV14 - Cod. De marca e Categoria Mix",
                        url: ""
                    },
                    {
                        titulo: "ZTLV19 - Cadastro Ação Promo. E Mapa da Mina",
                        url: ""
                    }, {
                        titulo: "ZTLV15 - Texos Fixos - Simulação e OV",
                        url: ""
                    }, {titulo: "ZTLV20 - TAB PRE Atribuir Marca e Categ", url: ""}, {
                        titulo: "ZTLV11 - ZROUTE",
                        url: ""
                    }, {
                        titulo: "ZTABP - Gerar de tabela de Preço",
                        url: ""
                    }, {titulo: "ZEXEC - Exceção de materiais - TAB preço", url: ""}]
            },
            {
                nome: "Cliente",
                icone: "",
                links: [
                    {
                        titulo: "XD03 - Consulta Cadastro Cliente",
                        url: ""
                    },
                    {
                        titulo: "ZTLV09 -Relação de telefones",
                        url: ""
                    }]
            },
            {
                nome: "Atividades",
                icone: "",
                links: [{titulo: "ZTLV22 - Criar Providência", url: ""}, {
                    titulo: "ZC10 - Relatório de atividades",
                    url: ""
                }, {titulo: "MM03 - Cadastro de Produto", url: ""}]
            },
            {
                nome: "Estoque",
                icone: "",
                links: [{titulo: "ZVSCE17 - Sintese de Estoque", url: ""}, {
                    titulo: "ZMBE - Consulta Estoque",
                    url: ""
                }]
            },
            {
                nome: "Ordem/NF",
                icone: "",
                links: [{titulo: "ZV20 - Lista Ordem", url: ""}, {
                    titulo: "ZV40 - Lista Ordem Orig.",
                    url: ""
                }, {titulo: "VA01 - Criar Ordem R3", url: ""}, {
                    titulo: "VA02 - Alterar Ordem R3",
                    url: ""
                }, {titulo: "ZVC16 - Ordens Faturadas", url: ""}, {
                    titulo: "ZSTR14 - Posição de Entrega",
                    url: ""
                }, {titulo: "J1B3N - Exibir NF", url: ""}, {
                    titulo: "ZSTR52 - Rel de ocorrências",
                    url: ""
                }, {titulo: "ZSER - Consulta nº série do Produto", url: ""}]
            },
            {nome: "Meta/Var", icone: "", links: [{titulo: "ZV57 - Informações Gerenciais", url: ""}]},
            {
                nome: "Cred/Cob",
                icone: "",
                links: [{
                    titulo: "FBL6N - Partidas Individuais",
                    url: ""
                }, {titulo: "ZFI46 - Crédito do Cliente - Média ", url: ""}, {
                    titulo: "FD33 - Crédito do Cliente",
                    url: ""
                }, {titulo: "ZFE15 - Rel. Fretes Contas RE", url: ""}]
            },
            {
                nome: "Verbas",
                icone: "",
                links: [{titulo: "CJ37 - Empenho da verbas", url: ""}, {
                    titulo: "CJ30 - 1º Empenho na Campanha",
                    url: ""
                }, {titulo: "CJ31 - Consulta de verbas", url: ""}, {
                    titulo: "CJ20N - Criar Campanha",
                    url: ""
                }, {titulo: "ZPSR1 - Extrato Detalhado PEP", url: ""}, {
                    titulo: "ZTLV10G - Consulta Bonificação",
                    url: ""
                }]
            }
        ];

        $rootScope.$on('$routeChangeSuccess', function (e, current, pre) {
            $rootScope.currentRoute = $location.path();
        });

        $rootScope.currentRoute = "/home";

        $rootScope.processos = [
            { data: "14.04.17", cliente: "Carrefour", processo: 423476, status: "Pendente"},
            { data: "20.04.17", cliente: "Carrefour", processo: 564654, status: "Pendente"}
        ];

        $rootScope.processos1 = [
            { data: "14.04.17", cliente: "Carrefour", processo: 423476, status: "Em processamento"},
            { data: "20.04.17", cliente: "Carrefour", processo: 564654, status: "Cancelado"}
        ];

        $rootScope.processos2 = [
            { data: "14.04.17", cliente: "Carrefour", processo: 423476, status: "Finalizado"},
            { data: "20.04.17", cliente: "Carrefour", processo: 564654, status: "Encerrado"}
        ];

        $rootScope.processos3 = [
            { data: "14.04.17", cliente: "Carrefour", processo: 423476, status: "Pendente"},
            { data: "20.04.17", cliente: "Carrefour", processo: 564654, status: "Pendente"}
        ];

        $rootScope.contatos = [
            {

                data: "14.04.17",
                descricao: "0000456456",
                emissor: 423476,
                status: "Atualização: 03.05.2017 - PHERMANN\n\nAguardando retorno do cliente"
            },
            {

                data: "14.04.17",
                descricao: "0000456457",
                emissor: 423476,
                status: "Atualização: 03.05.2017 - PHERMANN\n\nAguardando retorno do cliente"
            },
            {

                data: "20.04.17",
                descricao: "0000456458",
                emissor: 564654,
                status: "Atualização: 03.05.2017 - PHERMANN\n\nAguardando retorno do cliente"
            }

        ];

        $rootScope.contatos2 = [
            {

                data: "14.04.17",
                descricao: "11111456456",
                emissor: 423476,
                status: "Atualização: 03.05.2017 - PHERMANN\n\nAguardando retorno do cliente"
            },
            {

                data: "14.04.17",
                descricao: "1111456457",
                emissor: 423476,
                status: "Atualização: 03.05.2017 - PHERMANN\n\nAguardando retorno do cliente"
            },
            {

                data: "20.04.17",
                descricao: "1111456458",
                emissor: 564654,
                status: "Atualização: 03.05.2017 - PHERMANN\n\nAguardando retorno do cliente"
            }

        ];

        $rootScope.contatos1 = [
            {

                data: "14.04.17",
                descricao: "0000456456",
                emissor: 423476,
                status: "Atualização: 03.05.2017 - PHERMANN\n\nAguardando retorno do cliente"
            },
            {

                data: "14.04.17",
                descricao: "0000456457",
                emissor: 423476,
                status: "Atualização: 03.05.2017 - PHERMANN\n\nAguardando retorno do cliente"
            },
            {

                data: "20.04.17",
                descricao: "0000456458",
                emissor: 564654,
                status: "Atualização: 03.05.2017 - PHERMANN\n\nAguardando retorno do cliente"
            }

        ];

        $rootScope.agrupadoresClientes = [
            {
                clienteEmissorId: 974651321318,
                razao: "CARREFOUR",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                status: "EM PROCESSAMENTO",
                contato: {
                    numero: 45698744,
                    nome: "José Cachoeira",
                    agrupador: {
                        numero: 45698744,
                        nome: "José Cachoeira"
                    },
                    supervisor: {
                        numero: 45648948,
                        nome: "Paula Hermann"
                    },
                    cargo: "Gerente",
                    telefones: [
                        {
                            numero: "+55 11 1234-5678",
                            prioritario: true
                        },
                        {
                            numero: "+55 11 7894-4563",
                            prioritario: false
                        }
                    ],
                    emails: [
                        {
                            email: "comercial@carrefour.com.br",
                            prioritario: true
                        },
                        {
                            email: "joao@carrefour.com.br",
                            prioritario: false
                        }
                    ]
                }
            },
            {
                clienteEmissorId: 974651321318,
                razao: "CARREFOUR",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                status: "EM PROCESSAMENTO",
                contato: {
                    numero: 45698744,
                    nome: "José Cachoeira",
                    agrupador: {
                        numero: 45698744,
                        nome: "José Cachoeira"
                    },
                    supervisor: {
                        numero: 45648948,
                        nome: "Paula Hermann"
                    },
                    cargo: "Gerente",
                    telefones: [
                        {
                            numero: "+55 11 1234-5678",
                            prioritario: true
                        },
                        {
                            numero: "+55 11 7894-4563",
                            prioritario: false
                        }
                    ],
                    emails: [
                        {
                            email: "comercial@carrefour.com.br",
                            prioritario: true
                        },
                        {
                            email: "joao@carrefour.com.br",
                            prioritario: false
                        }
                    ]
                }
            }
        ];

        $rootScope.clientes = [
            {
                clienteEmissorId: 974651321318,
                razao: "CARREFOUR",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                revenda: {
                    numeroLojas: 12,
                    faturamentoMensal: 1234567,
                    lb: 12,
                    tos: {
                        refrigerador: 12,
                        fogao: 12,
                        lavadora: 15,
                        total: 39
                    },
                    principalSegmento: 123,
                    principalSegmentoValor: 12,
                    markup: 12,
                    data: "12.12.2012"
                },
                email: "carrefour@carrefour.com",
                inscricaoEstadual: "255155603",
                contatoPrioritario: {
                    numero: 45698744,
                    nome: "José Cachoeira",
                    prioritario: true,
                    agrupador: {
                        numero: 45698744,
                        nome: "José Cachoeira"
                    },
                    supervisor: {
                        numero: 45648948,
                        nome: "Paula Hermann"
                    },
                    cargo: "Gerente",
                    telefones: [
                        {
                            id: 0,
                            numero: "+55 11 1234-5678",
                            prioritario: true
                        },
                        {
                            id: 1,
                            numero: "+55 11 7894-4563",
                            prioritario: false
                        }
                    ],
                    emails: [
                        {
                            id: 0,
                            email: "joao@carrefour.com.br",
                            prioritario: true
                        },
                        {
                            id: 1,
                            email: "comercial@carrefour.com.br",
                            prioritario: false
                        }
                    ]

                },
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente1",
                email: "cliente1@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente2",
                email: "cliente2@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente3",
                email: "cliente3@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente4",
                email: "cliente4@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente5",
                email: "cliente5@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente6",
                email: "cliente6@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente7",
                email: "cliente7@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente8",
                email: "cliente8@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente9",
                email: "cliente9@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente10",
                email: "cliente10@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente11",
                email: "cliente11@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente12",
                email: "cliente12@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente13",
                email: "cliente13@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente14",
                email: "cliente14@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente15",
                email: "cliente15@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente16",
                email: "cliente16@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente17",
                email: "cliente17@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente18",
                email: "cliente18@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente19",
                email: "cliente19@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente20",
                email: "cliente20@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente21",
                email: "cliente21@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            },
            {
                clienteEmissorId: 974651321318,
                razao: "Cliente22",
                email: "cliente22@carrefour.com",
                cnpj: "08.675.549/0001-56",
                cidade: "SÃO PAULO",
                endereco: "RUA PROCOPIO LOHN",
                uf: "SP",
                pais: "BRASIL",
                domicilioFiscal: "SC 0015",
                cep: "88410-000",
                inscricaoEstadual: "255155603",
                contatos: [
                    {
                        numero: 45698744,
                        nome: "José Cachoeira",
                        prioritario: true,
                        agrupador: {
                            numero: 45698744,
                            nome: "José Cachoeira"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Gerente",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "joao@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    },
                    {
                        numero: 45698744,
                        nome: "Comercial",
                        prioritario: false,
                        agrupador: {
                            numero: 45698744,
                            nome: "Comercial"
                        },
                        supervisor: {
                            numero: 45648948,
                            nome: "Paula Hermann"
                        },
                        cargo: "Comercial",
                        telefones: [
                            {
                                id: 0,
                                numero: "+55 11 1234-5678",
                                prioritario: true
                            },
                            {
                                id: 1,
                                numero: "+55 11 7894-4563",
                                prioritario: false
                            }
                        ],
                        emails: [
                            {
                                id: 0,
                                email: "comercial@carrefour.com.br",
                                prioritario: true
                            },
                            {
                                id: 1,
                                email: "Comercial@carrefour.com.br",
                                prioritario: false
                            }
                        ]
                    }
                ]
            }


        ];

        $rootScope.ultimosProcessos = [];

        $rootScope.tabelaDesnormalizada = [
            {
                contato: "Ricardo",
                cargo: "Comprador",
                telefone: "4932330591",
                telefonePrioritario: false,
                email: "compras@lamarsupercenter.com.br",
                emailPrioritario: true
            },
            {
                contato: "Ricardo",
                cargo: "Comprador",
                telefone: "4932331883",
                telefonePrioritario: false,
                email: "",
                emailPrioritario: false
            },
            {
                contato: "Ricardo",
                cargo: "Comprador",
                telefone: "4932331807",
                telefonePrioritario: false,
                email: "",
                emailPrioritario: false
            },
            {
                contato: "Keli",
                cargo: "Gerente",
                telefone: "4932331884",
                telefonePrioritario: false,
                email: "keli@lamarsupercenter.com.br",
                emailPrioritario: false
            },
            {
                contato: "Keli",
                cargo: "Gerente",
                telefone: "4932331806",
                telefonePrioritario: false,
                email: "gerente@lamarsupercenter.com.br",
                emailPrioritario: true
            },
            {
                contato: "Keli",
                cargo: "Gerente",
                telefone: "",
                telefonePrioritario: false,
                email: "kelicompras@lamarsupercenter.com.br",
                emailPrioritario: false
            },
            {
                contato: "Keli",
                cargo: "Gerente",
                telefone: "",
                telefonePrioritario: false,
                email: "keligerente@lamarsupercenter.com.br",
                emailPrioritario: false
            }
        ];

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
        }];


    });
