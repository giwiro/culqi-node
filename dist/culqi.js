'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var baseUrl_integracion = 'https://integ-pago.culqi.com/api/v1';
var baseUrl_produccion = 'https://pago.culqi.com/api/v1';

var paths = {
  crearToken: '/tokens',
  crearCargo: '/cargos',
  consultarCargo: '/cargos',
  devolverCargo: '/cargos',
  crearPlan: '/planes',
  crearSuscripcion: '/suscripciones',
  cancelarSuscripcion: '/suscripciones'
};

var _createPromise = function _createPromise(url, method, headers, body, validateParams) {
  return new _bluebird2.default(function (resolve, reject) {

    if (validateParams && body) {
      var keys = Object.keys(body);

      for (var i in validateParams) {
        if (keys.indexOf(validateParams[i]) == -1) {
          return reject({
            body: {
              objeto: 'error',
              mensaje: 'Falta el parámetro: ' + validateParams[i]
            }
          });
        }
      }
    }

    (0, _request2.default)({ url: url, method: method, headers: headers, json: true, body: body }, function (error, response, body) {
      if (error) {
        return reject(error);
      }

      return resolve(response);
    });
  });
};

var Culqi = function () {
  function Culqi(codigo_comercio, llave_comercio, env) {
    _classCallCheck(this, Culqi);

    this.codigo_comercio = codigo_comercio;
    this.llave_comercio = llave_comercio;
    this.baseUrl = baseUrl_integracion;

    if (env && (env.toLowerCase() == 'prod' || env.toLowerCase() == 'produccion')) {
      this.baseUrl = baseUrl_produccion;
    }

    this._headers = {
      'Authorization': 'Bearer ' + this.llave_comercio,
      'User-Agent': 'request',
      'Accept': 'application/json'
    };
  }

  _createClass(Culqi, [{
    key: 'crearToken',
    value: function crearToken(params) {

      var url = this.baseUrl + paths.crearToken;
      var fields = ["correo_electronico", "nombre", "apellido", "numero", "cvv", "m_exp", "a_exp", "guardar"];

      return _createPromise(url, 'POST', Object.assign({}, this._headers, { 'Authorization': 'Bearer ' + this.codigo_comercio }), params, fields);
    }
  }, {
    key: 'crearCargo',
    value: function crearCargo(params) {

      var url = this.baseUrl + paths.crearCargo;
      var fields = ["token", "moneda", "monto", "descripcion", "pedido", "codigo_pais", "ciudad", "usuario", "direccion", "telefono", "nombres", "apellidos", "correo_electronico"];

      return _createPromise(url, 'POST', this._headers, params, fields);
    }
  }, {
    key: 'consultarCargo',
    value: function consultarCargo(params) {

      var url = this.baseUrl + paths.consultarCargo + '/' + params.id;
      var fields = ["id"];

      return _createPromise(url, 'GET', this._headers, params, fields);
    }
  }, {
    key: 'devolverCargo',
    value: function devolverCargo(params) {

      params.codigo_comercio = this.codigo_comercio;

      var url = this.baseUrl + paths.devolverCargo + '/' + params.id + '/devolver';
      var fields = ["id", "codigo_comercio", "numero_pedido", "monto"];

      return _createPromise(url, 'POST', this._headers, params, fields);
    }
  }, {
    key: 'crearPlan',
    value: function crearPlan(params) {

      params.codigo_comercio = this.codigo_comercio;

      var url = this.baseUrl + paths.crearPlan;
      var fields = ["moneda", "monto", "id", "periodo", "nombre", "intervalo", "gracia", "gracia_medida", "ciclos"];

      return _createPromise(url, 'POST', this._headers, params, fields);
    }
  }, {
    key: 'crearSuscripcion',
    value: function crearSuscripcion(params) {

      var url = this.baseUrl + paths.crearSuscripcion;
      var fields = ["token", "codigo_pais", "direccion", "ciudad", "usuario", "telefono", "nombre", "apellido", "correo_electronico", "plan_id"];

      return _createPromise(url, 'POST', this._headers, params);
    }
  }, {
    key: 'cancelarSuscripcion',
    value: function cancelarSuscripcion(params) {

      var url = this.baseUrl + paths.cancelarSuscripcion + '/' + params.id;
      params.codigo_comercio = this.codigo_comercio;
      var fields = ["id", "codigo_pais", "direccion", "ciudad", "telefono", "nombre", "correo_electronico", "apellido", "usuario", "plan", "token"];

      return _createPromise(url, 'DELETE', this._headers, params, fields);
    }
  }]);

  return Culqi;
}();

module.exports = Culqi;