# trackr-lib


## Description

Trackr-lib is a javascript library to track Ethereum address.

`Trackr.watch` sends an event when a new transaction contains a given Ethereum address as `from` or `to` property.

*N.B:* library connects via **websocket** to a local Ethereum node at **localhost:8546**. This limitation will be remove in the future.

## How to use

```javascript

 const address = "0x40C76cf136c270c2F1053398f1718b3fFe2574c4"

trackr.watch(address,(error,tx)=>{
    if( !error ){
        /* new transaction hash */
    } else {
        /* error occurs */
    })
```

A sample is availble in `./test.js`. This sample instanciates an express webserver in order to call `tracker.watch` and wait for events.