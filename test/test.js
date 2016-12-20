var chai = require('chai');
var Culqi = require('../dist/culqi');
var locals = require('../locals.json') || {};
var should = chai.should();
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

var culqi = new Culqi(locals.codigo_comercio, locals.llave_comercio, locals.env);

/*beforeEach(function() {
  var culqi = new Culqi(locals.codigo_comercio, locals.llave_comercio, locals.env);
  return 
});*/

describe('Culqi', function() {

  describe('#createToken()', function () {
    it('should create token', function (done) {
      /*var arr = [];

      assert.equal(arr.length, 0);*/

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
        }).should.eventually.equal('foo').notify(done);
    });
  })
  
});