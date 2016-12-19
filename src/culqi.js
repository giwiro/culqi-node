import request from 'request'

const baseUrl_integracion = 'https://integ-pago.culqi.com/api/v1';
const baseUrl_produccion = 'https://pago.culqi.com/api/v1';

const paths = {
  crearCargo: '/cargos'
}

class Culqi {

  constructor (codigo_comercio, llave_comercio, env) {
    this.codigo_comercio = codigo_comercio;
    this.llave_comercio = llave_comercio;
    this.baseUrl = baseUrl_integracion;

    if (env && (env.toLowerCase() == 'prod' || env.toLowerCase() == 'produccion')) {
      this.baseUrl = baseUrl_produccion;
    }
  }

  crearCargo (params) {
    request
      .post(this.baseUrl + paths.crearCargo, {
        'auth': {
          'bearer': this.llave_comercio
        }
      })
      .on('response', (response) => {
        console.log(response.statusCode) // 200
        console.log(response.headers['content-type']) // 'image/png'
      })
      .on('error', () => {

      })
  }
}



//Compat mode
module.exports = Culqi;
//export default Culqi;