import request from 'request'

const baseUrl_integracion = 'https://integ-pago.culqi.com/api/v1';
const baseUrl_produccion = 'https://pago.culqi.com/api/v1';

const paths = {
  crearToken: '/tokens',
  crearCargo: '/cargos'
}

const _createPromise = (url, method, headers, body, validateParams) => {
  return new Promise((resolve, reject) => {

    if (validateParams && body) {
      const keys = Object.keys(body); 

      //console.log('body', body);   

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
      console.log('----------------------------');
      if (!error && response.statusCode == 200) {
        return resolve(body);
      }
      return reject(response);
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
    console.log('-------- crearToken --------');
    console.log('url: ', this.baseUrl + paths.crearToken);
    console.log('params: ', params);
    
    const url = this.baseUrl + paths.crearToken;
    const fields = ["correo_electronico", "nombre", "apellido", "numero", "cvv", "m_exp", "a_exp", "guardar"];

    return _createPromise(url, 'POST', this._headers, params, fields);
  }

  crearCargo (params) {
    console.log('-------- crearCargo --------');
    console.log('url: ', this.baseUrl + paths.crearCargo);
    console.log('params: ', params);
    
    const url = this.baseUrl + paths.crearCargo;
    const fields = ["token", "moneda", "monto", "descripcion", "pedido", "codigo_pais", "ciudad", "usuario", "direccion", "telefono", "nombres", "apellidos", "correo_electronico"];

    return _createPromise(url, 'POST', this._headers, params, fields);
  }
}



//Compat mode
module.exports = Culqi;
//export default Culqi;