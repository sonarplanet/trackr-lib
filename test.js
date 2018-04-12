const trackr = require('./trackr-lib')

const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.listen(3000, function () {

  console.log("*** Start trackr ***")

  const nodeUrl = "ws://localhost:8546"

  const addressToTrack = "0x40C76cf136c270c2F1053398f1718b3fFe2574c4"

  console.log("\ttrack : "+addressToTrack+ " from node @ "+nodeUrl)

  trackr.watch(nodeUrl,addressToTrack,(error,tx)=>{
    if( !error ) console.log("--> new tx ("+tx+") with "+addressToTrack)
    else console.log(error)
  })

})