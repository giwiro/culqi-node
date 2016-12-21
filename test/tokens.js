const Culqi = require('../dist/culqi');
var chai = require('chai');
const locals = require('../locals.json') || {};
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const culqi = new Culqi(locals.codigo_comercio, locals.llave_comercio, locals.env);

describe('Tokens', function() {

  describe('#crearToken()', function () {
    it('should create token', function (done) {
      culqi
        .crearToken({
          "correo_electronico": "wmuro@me.com",
          "nombre": "William",
          "apellido": "Muro",
          "numero": 4444333322221111,
          "cvv": 123,
          "m_exp": 9,
          "a_exp": 2019,
          "guardar": true
        }).should.eventually.have.property('statusCode', 200).notify(done);
    });
  })
  
});