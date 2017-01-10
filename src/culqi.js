import request from 'request';

const baseUrlIntegracion = 'https://integ-pago.culqi.com/api/v1';
const baseUrlProduccion = 'https://pago.culqi.com/api/v1';

const paths = {
  crearToken: '/tokens',
  crearCargo: '/cargos',
  consultarCargo: '/cargos',
  devolverCargo: '/cargos',
  crearPlan: '/planes',
  crearSuscripcion: '/suscripciones',
  cancelarSuscripcion: '/suscripciones'
};

const createPromise = (url, method, headers, body, validateParams) => {
  return new Promise((resolve, reject) => {
    if (validateParams && body) {
      const keys = Object.keys(body);
      for (let i in validateParams) {
        if (keys.indexOf(validateParams[i]) === -1) {
          return reject({
            body: {
              objeto: 'error',
              mensaje: 'Falta el parámetro: ' + validateParams[i]
            }
          });
        }
      }
    }

    return request({ url, method, headers, json: true, body }, (error, response) => {
      if (error) {
        return reject(error);
      }
      return resolve(response);
    });
  });
};

class Culqi {

  constructor(codigoComercio, llaveComercio, env) {
    this.codigoComercio = codigoComercio;
    this.llaveComercio = llaveComercio;
    this.baseUrl = baseUrlIntegracion;

    // Validate env
    if (env && env.toLowerCase() === 'prod') {
      this.baseUrl = baseUrlProduccion;
    }

    // Set bearer header and others
    this.headers = {
      Authorization: 'Bearer ' + this.llaveComercio,
      'User-Agent': 'request',
      Accept: 'application/json'
    };
  }

  crearToken(params) {
    const url = this.baseUrl + paths.crearToken;
    const fields = [
      'correo_electronico',
      'nombre',
      'apellido',
      'numero',
      'cvv',
      'm_exp',
      'a_exp',
      'guardar'
    ];
    const newHeader = Object.assign({}, this.headers, {
      Authorization: 'Bearer ' + this.codigoComercio
    });

    return createPromise(url, 'POST', newHeader, params, fields);
  }

  crearCargo(params) {
    const url = this.baseUrl + paths.crearCargo;
    const fields = [
      'token',
      'moneda',
      'monto',
      'descripcion',
      'pedido',
      'codigo_pais',
      'ciudad',
      'usuario',
      'direccion',
      'telefono',
      'nombres',
      'apellidos',
      'correo_electronico'
    ];

    return createPromise(url, 'POST', this.headers, params, fields);
  }

  consultarCargo(params) {
    const url = this.baseUrl + paths.consultarCargo + '/' + (params || {}).id;
    const fields = ['id'];

    return createPromise(url, 'GET', this.headers, params, fields);
  }

  devolverCargo(params) {
    params.codigo_comercio = this.codigoComercio;
    const url = this.baseUrl + paths.devolverCargo + '/' + params.id + '/devolver';
    const fields = [
      'codigo_comercio',
      'id',
      'numero_pedido',
      'monto'
    ];

    return createPromise(url, 'POST', this.headers, params, fields);
  }

  crearPlan(params) {
    params.codigo_comercio = this.codigoComercio;
    const url = this.baseUrl + paths.crearPlan;
    const fields = [
      'codigo_comercio',
      'moneda',
      'monto',
      'id',
      'periodo',
      'nombre',
      'intervalo',
      'gracia',
      'gracia_medida',
      'ciclos'
    ];

    return createPromise(url, 'POST', this.headers, params, fields);
  }

  crearSuscripcion(params) {
    const url = this.baseUrl + paths.crearSuscripcion;
    const fields = [
      'token',
      'codigo_pais',
      'direccion',
      'ciudad',
      'usuario',
      'telefono',
      'nombre',
      'apellido',
      'correo_electronico',
      'plan_id'
    ];

    return createPromise(url, 'POST', this.headers, params, fields);
  }

  cancelarSuscripcion(params) {
    const url = this.baseUrl + paths.cancelarSuscripcion + '/' + params.id;
    params.codigo_comercio = this.codigoComercio;
    const fields = [
      'codigo_comercio',
      'id',
      'codigo_pais',
      'direccion',
      'ciudad',
      'telefono',
      'nombre',
      'correo_electronico',
      'apellido',
      'usuario',
      'plan',
      'token'
    ];
    return createPromise(url, 'DELETE', this.headers, params, fields);
  }
}


// Compat mode
module.exports = Culqi;
