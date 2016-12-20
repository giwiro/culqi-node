var Culqi = require('../dist/culqi');
var locals = require('../locals.json') || {};
var culqi = new Culqi(locals.codigo_comercio, locals.llave_comercio, locals.env);
console.log('culqi', culqi);
culqi.crearCargo({
  "token": "vVhhnxxbNpFG8cfEAwhtTfK4g8sf7oOi",
  "moneda": "PEN",
  "monto": 19900,
  "descripcion": "Venta de prueba",
  "pedido": "11213351",
  "codigo_pais": "PE",
  "ciudad": "Lima",
  "usuario": "71701956",
  "direccion": "Avenida Lima 1232",
  "telefono": 12313123,
  "nombres": "Will",
  "apellidos": "Muro",
  "correo_electronico": "wmuro@me.com"
})
.then(function (response, body) {
  console.log('statusCode', response.statusCode);
})
.catch(function (err) {
  console.log('err', err);
})