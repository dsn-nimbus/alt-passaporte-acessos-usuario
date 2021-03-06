;(function(ng) {
  "use strict";

  // FUNCIONAMENTO:
  // Este módulo irá facilitar a verificação e validação dos acessos do usuário autenticado pelo passaporte.
  // Funcionará como um singleton, sendo iniciado com um objeto de assinante e sendo atualizado conforme necessidade.
  // NÃO deve haver mais uma instância, isso quebrará todos os bindings em views/diretivas.
  // O primeiro binding deve ser reaproveitado em todos os locais do sistemas que necessitarem de funcionalidades.

  ng.module('alt.passaporte-acessos-usuario', [])
    .provider('altPassaporteAcessosUsuario', [function() {
      var self = this;

      self._assinante = null;
      
      self._assinantePreenchido = function() {
        return !!self._assinante;
      };

      self.inicializa = function(obj) {
        if (!ng.isObject(obj) || !Object.keys(obj).length) {
          throw new TypeError('Parâmetro de inicialização deve ser um objeto.');
        }

        if (!ng.isArray(obj.produtos) || !obj.produtos.length) {
          throw new TypeError('Parâmetro de inicialização deve conter um array de produtos.');
        }

        self._assinante = obj;
      };

      self.atualiza = function(novoAssinante) {
        if (!ng.isObject(novoAssinante) || !Object.keys(novoAssinante).length) {
          throw new TypeError('Parâmetro de atualização deve ser um objeto.');
        }

        if (!ng.isArray(novoAssinante.produtos) || !novoAssinante.produtos.length) {
          throw new TypeError('Parâmetro de atualização deve conter um array de produtos.');
        }

        self._assinante = novoAssinante;
      };

      self.temAcessoFuncionalidade = function(funcionalidade) {
        if (!self._assinantePreenchido()) {
          return;
        }

        if (!funcionalidade) {
          throw new TypeError('Funcionalidade não informada para verificação de acesso.');
        }

        for (var indiceProd = self._assinante.produtos.length - 1; indiceProd >= 0; indiceProd--) {
          var funcionalidades = self._assinante.produtos[indiceProd].funcionalidades;
          if (!funcionalidades) {
            continue;
          }

          for (var indiceFuncionalidade = 0, len = funcionalidades.length; indiceFuncionalidade < len; indiceFuncionalidade++) {
            if (funcionalidades[indiceFuncionalidade].idExterno === funcionalidade) {
              return true;
            }
          }
        }

        return false;
      };

      self.temAcessoProduto = function(chaveProduto) {
        if (!self._assinantePreenchido()) {
          return;
        }

        if (!chaveProduto) {
          throw new TypeError('Chave do produto não informada para verificação de acesso.');
        }

        for (var i = 0; i < self._assinante.produtos.length; i++) {
          var produto = self._assinante.produtos[i];
          if (produto.chaveProduto === chaveProduto && !produto.isCancelado) {
            return true;
          }

          for (var j = 0; j < self._assinante.produtos[i].dependencias.length; j++) {
            var dependencia = self._assinante.produtos[i].dependencias[j];
            if (dependencia.chaveProduto === chaveProduto && !dependencia.isCancelado) {
              return true;
            }
          }
        }

        return false;
      };

      self.$get = [function() {
        return self;
      }];
    }]);
}(window.angular));
