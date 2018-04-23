import * as trackr from '../trackr-lib'

import * as express from 'express'

const app = express()

app.listen(3000, ()=>{

  console.log("*** Start trackr ***")

  const nodeUrl = "wss://sonarplanet-eth-node.cleverapps.io/"

  const addressToTrack = "0x40C76cf136c270c2F1053398f1718b3fFe2574c4"

  console.log("\ttrack : "+addressToTrack+ " from node @ "+nodeUrl)

  trackr.watch(
    nodeUrl,addressToTrack,
    (tx)=> console.log("--> new tx ("+tx+") with "+addressToTrack),
    (error)=>console.log("an error occurs : "+JSON.stringify(error)))

})