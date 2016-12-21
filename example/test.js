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
        "plan_id": "plan-basico"
      }).then(function (response2) {
        console.log('statusCode2', response2.statusCode);
        console.log('response2.body', response2.body);
      })
  })
  .catch(function (err) {
    console.log('err', err);
  });