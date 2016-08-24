"use strict";

describe('alt-passaporte-acessos-usuario', function() {
  var _altPassaporteAcessosUsuario;
  var exemploAssinante = {};

  beforeEach(module('alt.passaporte-acessos-usuario'));

  beforeEach(inject(function($injector) {
    _altPassaporteAcessosUsuario = $injector.get('altPassaporteAcessosUsuario');

    exemploAssinante = {
      "id": 2724,
      "nome": "RAFAEL RODRIGUES GONÇALVES",
      "idExterno": "597611",
      "identificacao": "041.628.937-13",
      "administradorPassaporte": true,
      "produtos": [
        {
          "id": 37,
          "nome": "Koopon",
          "chaveProduto": "CHAVE_PRODUTO_1",
          "isModulo": false,
          "idAssinanteProdutoUsuario": 11264,
          "idDatabase": 274,
          "database": "koopon_fly",
          "schema": "_597611_37_10525b1acd67182af72e4a546d0181cc",
          "perfis": [
            {
              "id": 58,
              "nome": "Koopon - Admin"
            }
          ],
          "funcionalidades": [
            {
              "nome": "Revogar Acesso",
              "idExterno": 1
            },
            {
              "nome": "Delegar Perfil Administrador",
              "idExterno": 2
            },
            {
              "nome": "Recusar Tarefa",
              "idExterno": 3
            },
            {
              "nome": "Aceitar Tarefa",
              "idExterno": 4
            },
            {
              "nome": "<<Koopon - Pessoa>> - Listar Cliente",
              "idExterno": 5
            },
            {
              "nome": "<<Koopon - Pessoa>> - Listar Funcionário",
              "idExterno": 6
            },
            {
              "nome": "<<Koopon - Pessoa>> - Listar Fornecedor",
              "idExterno": 7
            },
            {
              "nome": "<<Koopon - Pessoa>> - Listar Sócio",
              "idExterno": 8
            },
            {
              "nome": "<<Koopon - Produto>> - Listar Produto",
              "idExterno": 9
            },
            {
              "nome": "<<Koopon - Produto>> - Listar Grupo",
              "idExterno": 10
            }
          ],
          "dependencias": [
            {
              "id": 34,
              "nome": "Koopon - PDV",
              "chaveProduto": "CHAVE_MODULO_1",
              "isModulo": true
            },
            {
              "id": 32,
              "nome": "Koopon - Pessoa",
              "chaveProduto": "CHAVE_MODULO_2",
              "isModulo": true
            },
            {
              "id": 33,
              "nome": "Koopon - Produto",
              "chaveProduto": "CHAVE_MODULO_3",
              "isModulo": true
            },
            {
              "id": 35,
              "nome": "Koopon - Integração",
              "chaveProduto": "CHAVE_MODULO_4",
              "isModulo": true
            },
            {
              "id": 36,
              "nome": "Koopon - Criação de base",
              "chaveProduto": "CHAVE_MODULO_5",
              "isModulo": true
            }
          ]
        },
        {
          "id": 37,
          "nome": "Koopon",
          "chaveProduto": "CHAVE_PRODUTO_2",
          "isModulo": false,
          "idAssinanteProdutoUsuario": 11264,
          "idDatabase": 274,
          "database": "koopon_fly",
          "schema": "_597611_37_10525b1acd67182af72e4a546d0181cc",
          "perfis": [
            {
              "id": 58,
              "nome": "Koopon - Admin"
            }
          ],
          "funcionalidades": [
            {
              "nome": "Revogar Acesso",
              "idExterno": 1
            },
            {
              "nome": "Delegar Perfil Administrador",
              "idExterno": 2
            },
            {
              "nome": "Recusar Tarefa",
              "idExterno": 3
            },
            {
              "nome": "Aceitar Tarefa",
              "idExterno": 4
            },
            {
              "nome": "<<Koopon - Pessoa>> - Listar Cliente",
              "idExterno": 5
            },
            {
              "nome": "<<Koopon - Pessoa>> - Listar Funcionário",
              "idExterno": 6
            },
            {
              "nome": "<<Koopon - Pessoa>> - Listar Fornecedor",
              "idExterno": 7
            },
            {
              "nome": "<<Koopon - Pessoa>> - Listar Sócio",
              "idExterno": 8
            },
            {
              "nome": "<<Koopon - Produto>> - Listar Produto",
              "idExterno": 9
            },
            {
              "nome": "<<Koopon - Produto>> - Listar Grupo",
              "idExterno": 10
            }
          ],
          "dependencias": [
            {
              "id": 34,
              "nome": "Koopon - PDV",
              "chaveProduto": "CHAVE_MODULO_4",
              "isModulo": true
            },
            {
              "id": 32,
              "nome": "Koopon - Pessoa",
              "chaveProduto": "CHAVE_MODULO_5",
              "isModulo": true
            },
            {
              "id": 33,
              "nome": "Koopon - Produto",
              "chaveProduto": "CHAVE_MODULO_6",
              "isModulo": true
            },
            {
              "id": 35,
              "nome": "Koopon - Integração",
              "chaveProduto": "CHAVE_MODULO_7",
              "isModulo": true
            },
            {
              "id": 36,
              "nome": "Koopon - Criação de base",
              "chaveProduto": "CHAVE_MODULO_8",
              "isModulo": true
            }
          ]
        }

      ]
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
      var _funcionalidade = 10;

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
      var _chaveProduto = "CHAVE_PRODUTO_9999";

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      var _resultado = _altPassaporteAcessosUsuario.temAcessoProduto(_chaveProduto);

      expect(_resultado).toBe(false);
    })

    it('deve retornar true, chave encontrada', function() {
      var _chaveProduto = "CHAVE_PRODUTO_1";

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      var _resultado = _altPassaporteAcessosUsuario.temAcessoProduto(_chaveProduto);

      expect(_resultado).toBe(true);
    })

    it('deve retornar true, chave encontrada no produto final', function() {
      var _chaveProduto = "CHAVE_PRODUTO_2";

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      var _resultado = _altPassaporteAcessosUsuario.temAcessoProduto(_chaveProduto);

      expect(_resultado).toBe(true);
    })

    it('deve retornar false, chave não encontrada no produto nem em um módulo', function() {
      var _chaveProduto = "CHAVE_MODULO_999";

      _altPassaporteAcessosUsuario.inicializa(exemploAssinante);

      var _resultado = _altPassaporteAcessosUsuario.temAcessoProduto(_chaveProduto);

      expect(_resultado).toBe(false);
    })

    it('deve retornar true, chave encontrada no produto que é um módulo', function() {
      var _chaveProduto = "CHAVE_MODULO_3";

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
