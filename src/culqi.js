import request from 'request';

const baseUrl_integracion = 'https://integ-pago.culqi.com/api/v1';
const baseUrl_produccion = 'https://pago.culqi.com/api/v1';

const paths = {
  crearToken: '/tokens',
  crearCargo: '/cargos',
  consultarCargo: '/cargos',
  devolverCargo: '/cargos',
  crearPlan: '/planes',
  crearSuscripcion: '/suscripciones',
  cancelarSuscripcion: '/suscripciones'
}

const _createPromise = (url, method, headers, body, validateParams) => {
  return new Promise((resolve, reject) => {

    if (validateParams && body) {
      const keys = Object.keys(body); 

      for (let i in validateParams) {
        if (keys.indexOf(validateParams[i]) == -1) {
          return reject({
            body: {
              objeto: 'error',
              mensaje: 'Falta el parámetro: ' + validateParams[i]
            }
          });
        }
      }
    }

    request({ url, method, headers, json: true, body }, (error, response, body) => {
      if (error) {
        return reject(error);
      }

      return resolve(response);
    })
  })
}

class Culqi {

  constructor (codigo_comercio, llave_comercio, env) {
    this.codigo_comercio = codigo_comercio;
    this.llave_comercio = llave_comercio;
    this.baseUrl = baseUrl_integracion;

    // Validate env
    if (env && (env.toLowerCase() == 'prod' || env.toLowerCase() == 'produccion')) {
      this.baseUrl = baseUrl_produccion;
    }

    // Set bearer header and others
    this._headers = {
      'Authorization': 'Bearer ' + this.llave_comercio,
      'User-Agent': 'request',
      'Accept': 'application/json'
    }
  }

  crearToken (params) {
    
    const url = this.baseUrl + paths.crearToken;
    const fields = ["correo_electronico", "nombre", "apellido", "numero", "cvv", "m_exp", "a_exp", "guardar"];

    return _createPromise(url, 'POST', Object.assign({},this._headers, {'Authorization': 'Bearer ' + this.codigo_comercio}), params, fields);
  }

  crearCargo (params) {
    
    const url = this.baseUrl + paths.crearCargo;
    const fields = ["token", "moneda", "monto", "descripcion", "pedido", "codigo_pais", "ciudad", "usuario", "direccion", "telefono", "nombres", "apellidos", "correo_electronico"];

    return _createPromise(url, 'POST', this._headers, params, fields);
  }

  consultarCargo (params) {
    
    const url = this.baseUrl + paths.consultarCargo + '/' + params.id;
    const fields = ["id"];

    return _createPromise(url, 'GET', this._headers, params, fields);
  }

  devolverCargo (params) {

    params.codigo_comercio = this.codigo_comercio;

    const url = this.baseUrl + paths.devolverCargo + '/' + params.id + '/devolver';
    const fields = ["id", "codigo_comercio", "numero_pedido", "monto"];

    return _createPromise(url, 'POST', this._headers, params, fields);
  }

  crearPlan (params) {

    params.codigo_comercio = this.codigo_comercio;
    
    const url = this.baseUrl + paths.crearPlan;
    const fields = ["moneda", "monto", "id", "periodo", "nombre", "intervalo", "gracia", "gracia_medida", "ciclos"];

    return _createPromise(url, 'POST', this._headers, params, fields);
  }

  crearSuscripcion (params) {
    
    const url = this.baseUrl + paths.crearSuscripcion;
    const fields = ["token", "codigo_pais", "direccion", "ciudad", "usuario", "telefono", "nombre", "apellido", "correo_electronico", "plan_id"];

    return _createPromise(url, 'POST', this._headers, params);
  }

  cancelarSuscripcion (params) {
    
    const url = this.baseUrl + paths.cancelarSuscripcion + '/' + params.id;
    params.codigo_comercio = this.codigo_comercio;
    const fields = ["id", "codigo_pais", "direccion", "ciudad", "telefono", "nombre", "correo_electronico", "apellido", "usuario", "plan", "token"];
    
    return _createPromise(url, 'DELETE', this._headers, params, fields);
  }


}


//Compat mode
module.exports = Culqi;