var Culqi = require('../dist/culqi');

var culqi = new Culqi('codigo_comercio', 'api_key', 'env');

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
.then(function (resp) {
  console.log('crearCargo resp:', resp);
})
.catch(function (err) {

  if (typeof err.body != 'object') {
    console.log('Bad request');
    return; 
  }

  console.log('error', err.body);
  
})