'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Culqi = function Culqi(codigo_comercio, llave_comercio, baseUrl) {
  _classCallCheck(this, Culqi);

  this.codigo_comercio = codigo_comercio;
  this.llave_comercio = llave_comercio;
  this.baseUrl = baseUrl;
};

/*Culqi.INTEGRACION = 'https://integ-pago.culqi.com/api/v1';
Culqi.PRODUCCION  = 'https://pago.culqi.com/api/v1';*/

console.log('Culqi', Culqi);

exports.default = Culqi;

module.exports = Culqi;