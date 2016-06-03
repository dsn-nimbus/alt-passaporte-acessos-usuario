;(function(ng) {
  "use strict";

  // FUNCIONAMENTO:
  // Este módulo irá facilitar a verificação e validação dos acessos do usuário autenticado pelo passaporte.
  // Funcionará como um singleton, sendo iniciado com um objeto de assinante e sendo atualizado conforme necessidade.
  // NÃO deve haver mais uma instância, isso quebrará todos os bindings em views/diretivas.
  // O primeiro binding deve ser reaproveitado em todos os locais do sistemas que necessitarem de funcionalidades.

  ng.module('alt.passaporte-acessos-usuario', [])
    .service('altPassaporteAcessosUsuario', [function AltPassaporteAcessosUsuario() {
      // _assinante não deve ser acessado do lado de fora
      this._assinante = null;
      this._assinantePreenchidoInicializacao = false;

      this._assinantePreenchido = function() {
        return !!this._assinante && !!this._assinantePreenchidoInicializacao;
      }

      this.inicializa = function(obj) {
        if (!angular.isObject(obj) || !Object.keys(obj).length) {
          throw new TypeError('Parâmetro de inicialização deve ser um objeto.');
        }

        if (!angular.isArray(obj.produtos) || !obj.produtos.length) {
          throw new TypeError('Parâmetro de inicialização deve conter um array de produtos.');
        }

        if (!angular.isArray(obj.produtos[0].funcionalidades) || !obj.produtos[0].funcionalidades.length) {
          throw new TypeError('Parâmetro de inicialização deve conter um array de funcionalidades dentro do produto.');
        }

        this._assinante = obj;
        this._assinantePreenchidoInicializacao = true;
      }

      this.temAcesso = function(funcionalidade) {
        if (!this._assinantePreenchido()) {
          throw new TypeError('Assinante não inicializado, utilize .inicializa(assinante).');
        }

        if (!funcionalidade) {
          throw new TypeError('Funcionalidade não informada para verificação de acesso.');
        }

        for (var i = 0, len = this._assinante.produtos[0].funcionalidades.length; i < len; i++) {
          if (this._assinante.produtos[0].funcionalidades[i].idExterno === funcionalidade) {
            return true;
          }
        }

        return false;
      }

      this.atualiza = function(novoAssinante) {
        if (!this._assinantePreenchido()) {
          throw new TypeError('Assinante não inicializado, utilize .inicializa(assinante).');
        }

        if (!angular.isObject(novoAssinante) || !Object.keys(novoAssinante).length) {
          throw new TypeError('Parâmetro de atualização deve ser um objeto.');
        }

        if (!angular.isArray(novoAssinante.produtos) || !novoAssinante.produtos.length) {
          throw new TypeError('Parâmetro de atualização deve conter um array de produtos.');
        }

        if (!angular.isArray(novoAssinante.produtos[0].funcionalidades) || !novoAssinante.produtos[0].funcionalidades.length) {
          throw new TypeError('Parâmetro de atualização deve conter um array de funcionalidades dentro do produto.');
        }

        this._assinante = novoAssinante;
      }
    }]);
}(window.angular));
