<img src="https://raw.githubusercontent.com/giwiro/culqi-node/master/assets/culqi.jpg" width="350" />

# culqi-node
Node.js wrapper for [Culqi](https://www.culqi.com/) web services. It is written in typescript using pure Node.js api with 0 runtime dependencies.

[![npm version](https://badge.fury.io/js/culqi-node.svg)](https://badge.fury.io/js/culqi-node)
[![Build Status](https://circleci.com/gh/giwiro/culqi-node.svg?style=shield)](https://app.circleci.com/pipelines/github/giwiro/culqi-node?branch=master)
[![Coverage Status](https://coveralls.io/repos/github/giwiro/culqi-node/badge.svg?branch=master)](https://coveralls.io/github/giwiro/culqi-node?branch=master)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![types](https://img.shields.io/npm/types/culqi-node)]()
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
[![Known Vulnerabilities](https://snyk.io/test/github/giwiro/culqi-node/badge.svg)](https://snyk.io/test/github/giwiro/culqi-node)

### Install
```sh
# Get latest version
$ npm install culqi-node
```

### Quick start
```javascript
const Culqi = require('culqi-node');
const culqi = new Culqi({
    privateKey: 'sk_test_xxxxxxxxxxxxxxxx',
});

(async () => {
    const token = await culqi.tokens.getToken({
        id: 'tkn_test_xxxxxxxxxxxxxxxx',
    });
    console.log(token.id);
})();
```

### Common operations
In a regular flow, some other culqi frontend library such as the [Android](https://github.com/culqi/culqi-android) or 
[CulqiJS](https://www.culqi.com/docs/#/pagos/js), would generate the token in a "safe" way. That token is going to be
the input for generating charges.

#### Create charge

```javascript
const Culqi = require('culqi-node');
const culqi = new Culqi({
    privateKey: 'sk_test_xxxxxxxxxxxxxxxx',
});

(async () => {
    const charge = await culqi.charges.createCharge({
        amount: '10000',
        currency_code: 'PEN',
        email: 'richard@piedpiper.com',
        source_id: 'tkn_test_xxxxxxxxxxxxxxxx',
    });

    console.log(charge.id);
})();
```

#### Create charge and the capture it

```javascript
const Culqi = require('culqi-node');
const culqi = new Culqi({
    privateKey: 'sk_test_xxxxxxxxxxxxxxxx',
});

(async () => {
    const charge = await culqi.charges.createCharge({
        amount: '10000',
        currency_code: 'PEN',
        email: 'richard@piedpiper.com',
        source_id: 'tkn_test_xxxxxxxxxxxxxxxx',
        capture: false,
    });
    
    // Do some other operations, such as custom self-made fraud prevention

    const capturedCharge = await culqi.charges.captureCharge({
        // chr_test_xxxxxxxxxxxxxxxx
        id: charge.id,
    });
    
    // This should be true
    console.log(capturedCharge.capture);
})();
```

#### Refund charge

```javascript
const Culqi = require('culqi-node');
const culqi = new Culqi({
    privateKey: 'sk_test_xxxxxxxxxxxxxxxx',
});

(async () => {
    const refund = await culqi.refunds.createRefund({
        amount: 2000,
        charge_id: 'chr_test_xxxxxxxxxxxxxxxx',
        reason: 'Fraud',
    });
    
    console.log(refund.id);
})();
```

### Uncommon operations

#### Create token
Normally you wouldn't create the token by yourself. To do so, or if any credit card data 
goes through your server, you will need to
be [PCI compliant](https://www.pcisecuritystandards.org/documents/PCI-DSS-v3_2-SAQ-D_Merchant-rev1_1.pdf?agreement=true&time=1508189914058).
More information [here](https://culqi.zendesk.com/hc/es/articles/360024196973--Por-qu%C3%A9-me-aparece-el-siguiente-mensaje-Tu-c%C3%B3digo-de-comercio-no-est%C3%A1-autorizado-para-hacer-este-tipo-de-operaciones-PCI-).

In order to create a token, you will need to create a `Culqi` instance a bit differently.
You will need to provide the `pciCompliant` property as `true` and `publicKey`.

```javascript
const Culqi = require('culqi-node');
const culqi = new Culqi({
    privateKey: 'sk_test_xxxxxxxxxxxxxxxx',
    pciCompliant: true,
    publicKey: 'pk_test_xxxxxxxxxxxxxxxx',
});

(async () => {
    const token = await culqi.tokens.createToken({
        card_number: '4111111111111111',
        cvv: '123',
        expiration_month: '09',
        expiration_year: '2025',
        email: 'richard@piedpiper.com',
    });
    
    console.log(token.id);
})();
```


### Available operations

#### [Token](https://www.culqi.com/api/#/tokens)

- Create token
- Get token
- Get tokens
- Update token

#### [Charges](https://www.culqi.com/api/#/cargos)

- Create charge
- Get charge
- Get charges
- Update charge
- Capture charge

#### [Refunds](https://www.culqi.com/api/#/devoluciones)

- Create refund
- Get refund
- Get refunds
- Update refund

#### [Customers](https://www.culqi.com/api/#/clientes)

- Create customer
- Get customer
- Get customers
- Update customer
- Delete customer

#### [Cards](https://www.culqi.com/api/#/tarjetas)

- Create card
- Get card
- Get cards
- Update card
- Delete card

#### [Plans](https://www.culqi.com/api/#/planes)

- Create plan
- Get plan
- Get plans
- Update plan
- Delete plan

#### [Subscriptions](https://www.culqi.com/api/#/suscripciones)

- Create subscription
- Get subscription
- Get subscriptions
- Update subscription
- Delete subscription

#### [Orders](https://www.culqi.com/api/#/ordenes)

- Create order
- Confirm order
- Get order
- Get orders
- Update order
- Delete order

#### [Events](https://www.culqi.com/api/#/eventos)

- Get event
- Get events
