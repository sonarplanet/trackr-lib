var exports = module.exports = {}

const Web3 = require('web3-eth')

/**
 * Listen new transactions and return its hash when address occurs in 'from' or 'to' property.
 * Start listening from latest block. 
 * Address matching is case insensitive.
 * @param {string} nodeUrl url of the Ethereum node to communicate with
 * @param {string} address an Ethereum address to watch
 * @param {function} callback function called when event occurs. First argument is error and second is transaction hash
 */
exports.watch = (nodeUrl,address,callback) => {

    var web3 = new Web3(nodeUrl)

    web3.subscribe('newBlockHeaders',(error,_)=> { if( error ) callback(error) })
        .on('data', (newBlock)=>{
            web3.getBlock(newBlock.hash,true)
                .then( block => {
                    for(var i in block.transactions ) {
                        let transaction = block.transactions[i]
                        if( ( transaction.from != null && transaction.from.toLowerCase() === address.toLowerCase() )
                            || ( transaction.to != null && transaction.to.toLowerCase() === address.toLowerCase() ) ){
                            callback(null,transaction.hash)
                        }
                    }
                })
        })
        .on('error',callback)
}