# trackr-lib


## Description

Trackr-lib is a javascript library to track Ethereum address.

`trackr.watch` sends an event when a new transaction contains a given Ethereum address as `from` or `to` property.

The node from which library is fetching data is configurable. You can only communicate through websocket due to dependency limitation.

## How to use

```javascript

trackr.watch(
    "ws://localhost:8546", /* Ethereum node url */
    "0x40C76cf136c270c2F1053398f1718b3fFe2574c4", /* Ethereum pub-key */
    (tx:string) => { /* new transaction hash */ },
    (error:Error) => { /* error occurs */ })

```

The Ethereum node fetching data is given as first parameter and identified as follow : `ws://<IP_MACHINE>:<PORT>`. 

### Test 

A sample is availble in `./test.js`. 

It does : 

* instanciate an express webserver 
* call `tracker.watch` and wait for events (print them in console).
* connect to a local node (`127.0.0.1`) on default port (`8546`).
* track `0x40C76cf136c270c2F1053398f1718b3fFe2574c4` public key.

Feel free to update the `src/test/test.ts` file to fit your needs (set ethereum node address and pub-key to track).

