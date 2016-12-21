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

const culqi = new Culqi(locals.codigo_comercio, locals.llave_comercio, locals.env);

describe('Suscripciones', function() {

  var token = '';
  var plan = '';
  var suscripcion = '';

  describe('#crearSuscripcion()', function () {

    it('should generate token', function (done) {
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
        }).then(function (response) {
          response.statusCode.should.equal(200);
          token = response.body.id;
          done();
        })
        .catch(function (err) {
          console.log('err', err);
          done(err);
        });
    });

    it('should create plan', function (done) {
      const plan_name = "plan-" + shortid.generate();
      culqi
        .crearPlan({
          "moneda": "PEN",
          "monto": "1000",
          "id": plan_name,
          "periodo": "dias",
          "nombre": "Plan de prueba",
          "intervalo": 2,
          "gracia": 5,
          "gracia_medida": "dias",
          "ciclos": 12
        }).then(function (response) {
          response.statusCode.should.equal(200);
          plan = plan_name;
          done();
        })
        .catch(function (err) {
          console.log('err', err);
          done(err);
        });
    });

    it('should create suscripcion', function (done) {
      culqi
        .crearSuscripcion({
          "token": token,
          "codigo_pais": "PE",
          "direccion": "Avenida Lima 123213",
          "ciudad": "Lima",
          "usuario": "soporteculqi",
          "telefono": 1234567789,
          "nombre": "Jon",
          "apellido": "Doe",
          "correo_electronico": "soporte@culqi.com",
          "plan_id": plan
        }).then(function (response) {
          response.statusCode.should.equal(200);
          suscripcion = response.body.id;
          done();
        })
        .catch(function (err) {
          console.log('err', err);
          done(err);
        });

    });
  })

  describe('#cancelarSuscripcion()', function () {
    it('should cancel suscripcion', function (done) {
      culqi
        .cancelarSuscripcion({
          "id": suscripcion,

          "codigo_pais": "PE",
          "direccion": "Avenida Lima 123213",
          "ciudad": "Lima",
          "telefono": "1234567789",
          "nombre": "Jose",
          "correo_electronico": "jose@gmail.com",
          "apellido": "Perez",
          "usuario": "jose@gmail.com",
          "plan": plan,
          "token": "SpjUIHwclWLQJQBW0RJXuJM2kCCAOwh3"
        }).should.eventually.have.property('statusCode', 200).notify(done);
    });
  })
  
});