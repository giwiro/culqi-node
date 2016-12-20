const Culqi = require('../dist/culqi');
const locals = require('../locals.json') || {};
const shortid = require('shortid');
const culqi = new Culqi(locals.codigo_comercio, locals.llave_comercio, locals.env);
console.log('culqi', culqi);

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
  }).then(function (response, body) {
    var token = response.body.id;
    console.log('token', token);
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
      }).then(function (response2) {
        console.log('statusCode2', response2.statusCode);
        console.log('response2.body', response2.body);
      })
  })
  .catch(function (err) {
    console.log('err', err);
  });