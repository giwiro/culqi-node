<img src="https://developers.culqi.com/assets/images/logo.svg?v=dcb8982825" alt="culqi_logo">

## Culqi-node

Wrapper de los web service de <a href="https://culqi.api-docs.io" />Culqi</a>.

[![Build Status](https://travis-ci.org/giwiro/culqi-node.svg?branch=master)](https://travis-ci.org/giwiro/culqi-node)
[![Build status](https://ci.appveyor.com/api/projects/status/j1gb5qmm4uewyxh9?svg=true)](https://ci.appveyor.com/project/giwiro/culqi-node)
[![Dependency Status](https://www.versioneye.com/user/projects/585bed370f6ff600485b15e3/badge.svg)](https://www.versioneye.com/user/projects/585bed370f6ff600485b15e3)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![npm](https://img.shields.io/npm/v/npm.svg)]()

Operaciones disponibles (v1.2 de Culqi):
  * Crear token
  * Crear cargo
  * Consultar cargo
  * Crear plan
  * Crear suscripcion
  * Cancelar suscripcion
  * Devolver cargo



### Instalación &nbsp;
```sh
# Obtener la ultima version
$ npm install culqi-node
```

### Uso &nbsp;
```sh
const Culqi = require('culqi-node');

const culqi = new Culqi(codigo_comercio, llave_comercio, env);
```

#####Parámetros:
  - `codigo_comercio` : (proporcionado por culqi)
  - `llave_comercio`  : (proporcionado por culqi)
  - `env`             : integ, prod

#####Ejemplo:
```const culqi = new Culqi('demo', 'JlhLlpOB5s1aS6upiioJkmdQ0OYZ6HLS2+/o4iYO2MQ=', 'integ');```


### Ejemplos de uso de las operaciones &nbsp;

Para ver como se usan los métodos, ver la carpeta `test`