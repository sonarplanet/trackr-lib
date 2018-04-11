const Web3 = require('web3-eth')

var web3 = new Web3(Web3.givenProvider || "ws://localhost:8546");

module.exports.watch = (address,callback) => {

    const newBlockSubscription = web3.subscribe(
        'newBlockHeaders',
        (error,result)=>{
            if( error ) callback(error)
        })
    .on('data', (newBlock)=>{
        web3.getBlock(newBlock.hash,true)
            .then( block => {
                for(var i in block.transactions ) {
                    let transaction = block.transactions[i]
                    if( ( transaction.from != null && transaction.from.toLowerCase() === address )
                        || ( transaction.to != null && transaction.to.toLowerCase() === address ) ){
                        callback(null,transaction.hash)
                    }
                }
            })
    })
    .on('error',callback)
}