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

describe('Cargos', function() {

  var token = '';
  var cargo_id = '';
  var pedido = '';

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
          done(err);
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
          done(err);
        });
    });

    it('should fail at create cargo because incorrect params', function (done) {
      culqi
        .crearCargo({
          "token": 'gfhfgh',
          "moneda": "USSSS",
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
          "correo_electronico": 23423423432
        }).should.eventually.have.property('statusCode', 400).notify(done);
    });

    it('should fail at create cargo because no complete params', function (done) {
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
        }).catch(function (err) {
          err.body.objeto.should.equal('error');
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

    it('should fail at get cargo because incorrect params', function (done) {
      culqi
        .consultarCargo({
          'id': 'asdas'
        }).should.eventually.have.property('statusCode', 400).notify(done);
    })

    it('should fail at get cargo because no complete params', function (done) {
      culqi
        .consultarCargo().should.eventually.have.property('statusCode', 400).notify(done);
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

    /*it('should fail at return cargo because incorrect params', function (done) {
      culqi
        .devolverCargo({
          'id': 5,
          'numero_pedido': 456,
          'monto': 100
        }).should.eventually.have.property('statusCode', 400).notify(done);
    })*/

    it('should fail at return cargo because no complete params', function (done) {
      culqi
        .devolverCargo({
          'id': cargo_id,
          'monto': 100
        }).catch(function (err) {
          err.body.objeto.should.equal('error');
          done();
        });
    })
  })
  
});