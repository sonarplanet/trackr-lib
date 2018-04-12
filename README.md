# trackr-lib


## Description

Trackr-lib is a javascript library to track Ethereum address.

`Trackr.watch` sends an event when a new transaction contains a given Ethereum address as `from` or `to` property.

The node from which library is fetching data is configurable. You can only communicate through websocket due to dependency limitation.

## How to use

```javascript

 const nodeUrl = "ws://localhost:8546"

 const address = "0x40C76cf136c270c2F1053398f1718b3fFe2574c4"

trackr.watch(nodeUrl,address,(error,tx)=>{
    if( !error ){
        /* new transaction hash */
    } else {
        /* error occurs */
    })
```

The Ethereum node fetching data is given as first parameter and identified as follow : `ws://<IP_MACHINE>:<PORT>`. Sample connects to a local node (`127.0.0.1`) on default port (`8546`).

A sample is availble in `./test.js`. This sample instanciates an express webserver in order to call `tracker.watch` and wait for events.