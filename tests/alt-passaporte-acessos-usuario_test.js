"use strict";

describe('alt-passaporte-acessos-usuario', function() {
  var _altPassaporteAcessosUsuario;
  var exemploAssinante = {};

  beforeEach(module('alt.passaporte-acessos-usuario'));

  beforeEach(inject(function($injector) {
    _altPassaporteAcessosUsuario = $injector.get('altPassaporteAcessosUsuario');

    exemploAssinante = {
      "administradorPassaporte": true,
      "identificacao": "36.462.778/0001-60",
      "produtos": [
        {
          "schema": "_900000",
          "database": "koopon",
          "idAssinanteProdutoUsuario": 5921,
          "idDatabase": 5,
          "chaveProduto": "CHAVE_1",
          "nome": "Koopon1",
          "id": 15,
          "perfil": {
            "nome": "Koopon - Empresa - ADMIN",
            "id": 24
          },
          "funcionalidades": [
            {
              "nome": "Aceitar Procuração",
              "idExterno": 1,
              "id": 153,
              "tipoFuncionalidade": "COMUM"
            },
            {
              "nome": "Revogar Procuração",
              "idExterno": 2,
              "id": 154,
              "tipoFuncionalidade": "COMUM"
            },
            {
              "nome": "Listar Procurações",
              "idExterno": 3,
              "id": 152,
              "tipoFuncionalidade": "COMUM"
            },
            {
              "nome": "Delegar Perfil Administrador",
              "idExterno": 4,
              "id": 46,
              "tipoFuncionalidade": "DELEGAR_PERFIL_ADMINISTRADOR"
            },
            {
              "nome": "Recusar Tarefa",
              "idExterno": 5,
              "id": 44,
              "tipoFuncionalidade": "RECUSAR_TAREFA"
            },
            {
              "nome": "Aceitar Tarefa",
              "idExterno": 6,
              "id": 45,
              "tipoFuncionalidade": "ACEITAR_TAREFA"
            }
          ]
        },
        {
          "nome": "Módulo Koopon1",
          "chaveProduto": "CHAVE_MODULO",
          "isModulo": true,
          "perfil": {}
        },
        {
          "schema": "_teste_dsn_nimbus",
          "database": "koopon_1",
          "idAssinanteProdutoUsuario": 8513,
          "idDatabase": 15,
          "chaveProduto": "CHAVE_2",
          "nome": "Koopon2",
          "id": 15,
          "perfil": {
            "nome": "Koopon - Empresa - ADMIN",
            "id": 24
          },
          "funcionalidades": [
            {
              "idExterno": "44",
              "nome": "Recusar Tarefa",
              "id": 44,
              "tipoFuncionalidade": "RECUSAR_TAREFA"
            },
            {
              "idExterno": "45",
              "nome": "Aceitar Tarefa",
              "id": 45,
              "tipoFuncionalidade": "ACEITAR_TAREFA"
            },
            {
              "idExterno": "46",
              "nome": "Delegar Perfil Administrador",
              "id": 46,
              "tipoFuncionalidade": "DELEGAR_PERFIL_ADMINISTRADOR"
            }
          ]
        }
      ],
      "idExterno": "900000",
      "nome": "ALTERDATA TECNOLOGIA EM INFORMATICA LTDA",
      "id": 2002
    }
  }));

  describe('criação', function() {
    it('deve ter altPassaporteAcessosUsuario como um objeto', function() {
      expect(typeof _altPassaporteAcessosUsuario).toBe('object');
    });

    it('deve ter _assinante como null', function() {
      expect(_altPassaporteAcessosUsuario._assinante).toEqual(null);
    });

    it('deve ter _assinantePreenchidoInicializacao como false', function() {
      expect(_altPassaporteAcessosUsuario._assinantePreenchidoInicializacao).toBe(false);
    });
  })

  describe('inicializa', function() {
    it('deve dar erro, nada passado para a inicialização', function() {
      expect(function() {
        _altPassaporteAcessosUsuario.inicializa();
      }).toThrow(new TypeError('Parâmetro de inicialização deve ser um objeto.'));
    })

    it('deve dar erro, null passado para a inicialização', function() {
      var _obj = null;

      expect(function() {
        _altPassaporteAcessosUsuario.inicializa(_obj);
      }).toThrow(new TypeError('Parâmetro de inicialização deve ser um objeto.'));
    })

    it('deve dar erro, objeto vazio passado para a inicialização', function() {
      var _obj = {};

      expect(function() {
        _altPassaporteAcessosUsuario.inicializa(_obj);
      }).toThrow(new TypeError('Parâmetro de inicialização deve ser um objeto.'));
    })

    it('deve dar erro, objeto passado não contém array de produto', function() {
      var _obj = {
        a: true
      };

      expect(function() {
        _altPassaporteAcessosUsuario.inicializa(_obj);
      }).toThrow(new TypeError('Parâmetro de inicialização deve conter um array de produtos.'));
    })

    it('deve dar erro, objeto passado contém array de produto vazio', function() {
      var _obj = {
        a: true,
        produtos: []
      };

      expect(function() {
        _altPassaporteAcessosUsuario.inicializa(_obj);
      }).toThrow(new TypeError('Parâmetro de inicialização deve conter um array de produtos.'));
    })

    it('deve dar erro, objeto passado contém array de produtos, mas sem funcionalidades', function() {
      var _obj = {
        a: true,
        produtos: [
          {b: false}
        ]
      };

      expect(function() {
        _altPassaporteAcessosUsuario.inicializa(_obj);
      }).toThrow(new TypeError('Parâmetro de inicialização deve conter um array de funcionalidades dentro do produto.'));
    })

    it('NÃO deve dar erro, objeto passado contém array de produtos, sem funcionalidades, mas é um módulo', function() {
      var _obj = {
        a: true,
        produtos: [
          {b: false, isModulo: true}
        ]
      };

      expect(function() {
        _altPassaporteAcessosUsuario.inicializa(_obj);
      }).not.toThrow();
    })

    it('NÃO deve dar erro, objeto passado contém array de produtos, sem funcionalidades, mas é um módulo - junto com outros produtos', function() {
      var _obj = {
        a: true,
        produtos: [
          {b: false, isModulo: true},
          {b: true, funcionalidades: [
            {idExterno: 'a', chaveProduto: 'b'}
          ]}
        ]
      };

      expect(function() {
        _altPassaporteAcessosUsuario.inicializa(_obj);
      }).not.toThrow();
    })

    it('deve dar erro, objeto passado contém array de produtos, com funcionalidades, mas este último encontra-se vazio', function() {
      var _obj = {
        a: true,
        produtos: [
          {
            b: false,
            funcionalidades: []
          }
        ]
      };

      expect(function() {
        _altPassaporteAcessosUsuario.inicializa(_obj);
      }).toThrow(new TypeError('Parâmetro de inicialização deve conter um array de funcionalidades dentro do produto.'));
    })

    it('não deve dar erro, parâmetro passados corretamente', function() {
      var _obj = {
        a: true,
        produtos: [
          {
            b: false,
            funcionalidades: [
              {
                nome: "Aceitar Procuração",
                id: 153,
                tipoFuncionalidade: "COMUM"
              }
            ]
          }
        ]
      };

      expect(function() {
        _altPassaporteAcessosUsuario.inicializa(_obj);
      }).not.toThrow();
    })

    it('deve preencher a propriedade de _assinante corretamente', function() {
      var _obj = {
        a: true,
        produtos: [
          {
            b: false,
            funcionalidades: [
              {
                nome: "Aceitar Procuração",
                id: 153,
                tipoFuncionalidade: "COMUM"
              }
            ]
          }
        ]
      };

      _altPassaporteAcessosUsuario.inicializa(_obj);

      expect(_altPassaporteAcessosUsuario._assinante).toEqual(_obj);
    })

    it('deve preencher a propriedade de _assinante corretamente - produtos completos e módulos', function() {
      var _obj = {
        a: true,
        produtos: [
          {
            b: false,
            funcionalidades: [
              {
                nome: "Aceitar Procuração",
                id: 153,
                tipoFuncionalidade: "COMUM"
              }
            ]
          },
          {
            b: true,
            isModulo: true
          }
        ]
      };

      _altPassaporteAcessosUsuario.inicializa(_obj);

      expect(_altPassaporteAcessosUsuario._assinante).toEqual(_obj);
    })
  })

  describe('temAcessoFuncionalidade', function() {
    it('deve dar erro, acessos não inicializados', function() {
      var _funcionalidade = "123";

      expect(function() {
        _altPassaporteAcessosUsuario.temAcessoFuncionalidade(_funcionalidade);
      }).toThrow(new TypeError('Assinante não inicializado, utilize .inicializa(assinante).'));
    })

    it('deve dar erro, chave para procura de acesso não passada', function() {
      var _funcionalidade = undefined;

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      expect(function() {
        _altPassaporteAcessosUsuario.temAcessoFuncionalidade(_funcionalidade);
      }).toThrow(new TypeError('Funcionalidade não informada para verificação de acesso.'));
    })

    it('deve retornar false, chave não encontrada', function() {
      var _funcionalidade = 9999;

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      var _resultado = _altPassaporteAcessosUsuario.temAcessoFuncionalidade(_funcionalidade);

      expect(_resultado).toBe(false);
    })

    it('deve retornar true, chave encontrada', function() {
      var _funcionalidade = 6;

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      var _resultado = _altPassaporteAcessosUsuario.temAcessoFuncionalidade(_funcionalidade);

      expect(_resultado).toBe(true);
    })

    it('deve retornar true, chave encontrada no assinante final', function() {
      var _funcionalidade = "46";

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      var _resultado = _altPassaporteAcessosUsuario.temAcessoFuncionalidade(_funcionalidade);

      expect(_resultado).toBe(true);
    })
  })

  describe('temAcessoProduto', function() {
    it('deve dar erro, acessos não inicializados', function() {
      var _chaveProduto = "123";

      expect(function() {
        _altPassaporteAcessosUsuario.temAcessoProduto(_chaveProduto);
      }).toThrow(new TypeError('Assinante não inicializado, utilize .inicializa(assinante).'));
    })

    it('deve dar erro, chave para procura de acesso não passada', function() {
      var _chaveProduto = undefined;

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      expect(function() {
        _altPassaporteAcessosUsuario.temAcessoProduto(_chaveProduto);
      }).toThrow(new TypeError('Chave do produto não informada para verificação de acesso.'));
    })

    it('deve retornar false, chave não encontrada', function() {
      var _chaveProduto = "CHAVE_9999";

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      var _resultado = _altPassaporteAcessosUsuario.temAcessoProduto(_chaveProduto);

      expect(_resultado).toBe(false);
    })

    it('deve retornar true, chave encontrada', function() {
      var _chaveProduto = "CHAVE_1";

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      var _resultado = _altPassaporteAcessosUsuario.temAcessoProduto(_chaveProduto);

      expect(_resultado).toBe(true);
    })

    it('deve retornar true, chave encontrada no produto final', function() {
      var _chaveProduto = "CHAVE_2";

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      var _resultado = _altPassaporteAcessosUsuario.temAcessoProduto(_chaveProduto);

      expect(_resultado).toBe(true);
    })

    it('deve retornar true, chave encontrada no produto que é um módulo', function() {
      var _chaveProduto = "CHAVE_MODULO";

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      var _resultado = _altPassaporteAcessosUsuario.temAcessoProduto(_chaveProduto);

      expect(_resultado).toBe(true);
    })
  })

  describe('atualiza', function() {
    it('deve dar erro, assinante não inicializado', function() {
      expect(function() {
        _altPassaporteAcessosUsuario.atualiza();
      }).toThrow(new TypeError('Assinante não inicializado, utilize .inicializa(assinante).'));
    })

    it('deve dar erro, nada passado para a atualização', function() {
      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      expect(function() {
        _altPassaporteAcessosUsuario.atualiza();
      }).toThrow(new TypeError('Parâmetro de atualização deve ser um objeto.'));
    })

    it('deve dar erro, null passado para a atualização', function() {
      var _obj = null;

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      expect(function() {
        _altPassaporteAcessosUsuario.atualiza(_obj);
      }).toThrow(new TypeError('Parâmetro de atualização deve ser um objeto.'));
    })

    it('deve dar erro, objeto vazio passado para a atualização', function() {
      var _obj = {};

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      expect(function() {
        _altPassaporteAcessosUsuario.atualiza(_obj);
      }).toThrow(new TypeError('Parâmetro de atualização deve ser um objeto.'));
    })

    it('deve dar erro, objeto passado não contém array de produto', function() {
      var _obj = {
        a: true
      };

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      expect(function() {
        _altPassaporteAcessosUsuario.atualiza(_obj);
      }).toThrow(new TypeError('Parâmetro de atualização deve conter um array de produtos.'));
    })

    it('deve dar erro, objeto passado contém array de produto vazio', function() {
      var _obj = {
        a: true,
        produtos: []
      };

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      expect(function() {
        _altPassaporteAcessosUsuario.atualiza(_obj);
      }).toThrow(new TypeError('Parâmetro de atualização deve conter um array de produtos.'));
    })

    it('deve dar erro, objeto passado contém array de produtos, mas sem funcionalidades', function() {
      var _obj = {
        a: true,
        produtos: [
          {b: false}
        ]
      };

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      expect(function() {
        _altPassaporteAcessosUsuario.atualiza(_obj);
      }).toThrow(new TypeError('Parâmetro de atualização deve conter um array de funcionalidades dentro do produto.'));
    })

    it('NÃO deve dar erro, objeto passado contém array de produtos, sem funcionalidades, mas é um módulo - apenas produto que é módulo', function() {
      var _obj = {
        a: true,
        produtos: [
          {b: false, isModulo: true}
        ]
      };

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      expect(function() {
        _altPassaporteAcessosUsuario.atualiza(_obj);
      }).not.toThrow();
    })

    it('NÃO deve dar erro, objeto passado contém array de produtos, sem funcionalidades, mas é um módulo - módulos e outros produtos juntos', function() {
      var _obj = {
        a: true,
        produtos: [
          {b: false, isModulo: false, funcionalidades: [{idExterno: 'a', chaveProduto: 'b'}]},
          {b: false, isModulo: true},
          {b: false, isModulo: false, funcionalidades: [{idExterno: 'a', chaveProduto: 'b'}]}
        ]
      };

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      expect(function() {
        _altPassaporteAcessosUsuario.atualiza(_obj);
      }).not.toThrow();
    });

    it('deve dar erro, objeto passado contém array de produtos, com funcionalidades, mas este último encontra-se vazio', function() {
      var _obj = {
        a: true,
        produtos: [
          {
            b: false,
            funcionalidades: []
          }
        ]
      };

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      expect(function() {
        _altPassaporteAcessosUsuario.atualiza(_obj);
      }).toThrow(new TypeError('Parâmetro de atualização deve conter um array de funcionalidades dentro do produto.'));
    })

    it('não deve dar erro, parâmetro passados corretamente', function() {
      var _obj = {
        a: true,
        produtos: [
          {
            b: false,
            funcionalidades: [
              {
                nome: "Aceitar Procuração",
                id: 153,
                tipoFuncionalidade: "COMUM"
              }
            ]
          }
        ]
      };

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      expect(function() {
        _altPassaporteAcessosUsuario.atualiza(_obj);
      }).not.toThrow();
    })

    it('deve fazer a atualização corretamente e ter acesso a nova funcionalidade', function() {
      var _obj = {
        a: true,
        produtos: [
          {
            b: false,
            funcionalidades: [
              {
                nome: "Aceitar Procuração",
                id: 153,
                idExterno: 9999,
                tipoFuncionalidade: "COMUM"
              }
            ]
          }
        ]
      };

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      expect(_altPassaporteAcessosUsuario.temAcessoFuncionalidade(9999)).toBe(false);

      _altPassaporteAcessosUsuario.atualiza(_obj);

      expect(_altPassaporteAcessosUsuario.temAcessoFuncionalidade(9999)).toBe(true);
    })

    it('deve fazer a atualização corretamente e ter acesso a nova funcionalidade', function() {
      var _obj = {
        a: true,
        produtos: [
          {
            b: false,
            funcionalidades: [
              {
                nome: "Aceitar Procuração",
                id: 153,
                idExterno: 9999,
                tipoFuncionalidade: "COMUM"
              }
            ]
          }
        ]
      };

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);
      _altPassaporteAcessosUsuario.atualiza(_obj);

      expect(_altPassaporteAcessosUsuario._assinante).toBe(_obj);
    })
  })
});
