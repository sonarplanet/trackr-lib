# trackr-lib


## Description

Trackr-lib is a javascript library to track Ethereum address.

`trackr.watch` sends an event when a new transaction contains a given Ethereum address as `from` or `to` property.

The node from which library is fetching data is configurable. You can only communicate through websocket due to dependency limitation.


## How to install

Trackr-lib is available on our github public repo.

```bash
yarn add sonarplanet/trackr-lib#publish
```

```bash
npm install sonarplanet/trackr-lib#publish
```

N.B: If you don't specify `#publish` branch, you will get the dev package.

## How to use

```javascript

import * as trackr from 'trackr-lib'

trackr.watch(
    "ws://localhost:8546", /* Ethereum node url */
    "0x40C76cf136c270c2F1053398f1718b3fFe2574c4", /* Ethereum pub-key */
    (tx:string) => { /* new transaction hash */ },
    (error:Error) => { /* error occurs */ })

```

The Ethereum node fetching data is given as first parameter and identified as follow : `ws://<IP_MACHINE>:<PORT>`. 

## How to build

1. `yarn`
2. `yarn build`
3. `yarn test` 


Remove built files : `yarn clean`

Remove built files AND `node_modules` : `yarn cleanAll`