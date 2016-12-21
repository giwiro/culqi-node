const Culqi = require('../dist/culqi');
var chai = require('chai');
const locals = {
  codigo_comercio: process.env.CODIGO_COMERCIO,
  llave_comercio: process.env.LLAVE_COMERCIO,
  env: process.env.ENV
};
const should = chai.should();
const shortid = require('shortid');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var culqi = new Culqi(locals.codigo_comercio, locals.llave_comercio, locals.env);

describe('Planes', function() {

  describe('#crearPlan()', function () {
    it('should create plan', function (done) {
      culqi
        .crearPlan({
          "moneda": "PEN",
          "monto": "1000",
          "id": "plan-" + shortid.generate(),
          "periodo": "dias",
          "nombre": "Plan de prueba",
          "intervalo": 2,
          "gracia": 5,
          "gracia_medida": "dias",
          "ciclos": 12
        }).should.eventually.have.property('statusCode', 200).notify(done);
    });
  })
  
});