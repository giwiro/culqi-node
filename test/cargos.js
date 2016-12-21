const Culqi = require('../dist/culqi');
var chai = require('chai');
const locals = require('../locals.json') || {};
const should = chai.should();
const chaiAsPromised = require('chai-as-promised');
const shortid = require('shortid');
chai.use(chaiAsPromised);

const culqi = new Culqi(locals.codigo_comercio, locals.llave_comercio, locals.env);

describe('Cargos', function() {

  let token = '';
  let cargo_id = '';
  let pedido = '';

  describe('#crearCargo()', function () {

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
          done();
        });
    });

    it('should create cargo', function (done) {
      culqi
        .crearCargo({
          "token": token,
          "moneda": "PEN",
          "monto": 19900,
          "descripcion": "Venta de prueba",
          "pedido": shortid.generate(),
          "codigo_pais": "PE",
          "ciudad": "Lima",
          "usuario": "71701956",
          "direccion": "Avenida Lima 1232",
          "telefono": 12313123,
          "nombres": "Will",
          "apellidos": "Muro",
          "correo_electronico": "wmuro@me.com"
        }).then(function (response) {
          response.statusCode.should.equal(200);
          cargo_id = response.body.id;
          pedido = response.body.pedido;
          done();
        })
        .catch(function (err) {
          console.log('err', err);
          done();
        });
    });

    
  })

  describe('#consultarCargo()', function () {
    it('should get cargo', function (done) {
      culqi
        .consultarCargo({
          'id': cargo_id
        }).should.eventually.have.property('statusCode', 200).notify(done);
    })
  })

  describe('#devolverCargo()', function () {
    it('should return cargo', function (done) {
      culqi
        .devolverCargo({
          'id': cargo_id,
          'numero_pedido': pedido,
          'monto': 100
        }).should.eventually.have.property('statusCode', 200).notify(done);
    })
  })
  
});