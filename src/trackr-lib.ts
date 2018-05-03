const Web3 = require("web3");
import * as Utilities from "./utilities";

/**
 * Listen new transactions and return its hash when address occurs in 'from' or 'to' property.
 * Start listening from latest block.
 * Address matching is case insensitive.
 * @param {string} nodeUrl url of the Ethereum node to communicate with
 * @param {string} address an Ethereum address to watch
 * @param {function} newTxCallback function called when a new transaction related to address, appears on the blockchain
 * @param {function} errorCallback function called when an error occurs
 */
export function watch(
  nodeUrl: string,
  address: string,
  newTxCallback: (tx: string) => void,
  errorCallback: (error: Error) => void
): void {
  const web3 = new Web3(nodeUrl).eth;

  web3
    .subscribe("newBlockHeaders")
    .on("data", (blockHeader: any) => {
      web3.getBlock(blockHeader.number, true).then((block: any) => {
        Utilities.findAddressInBlock(address, block).forEach(
          (transactionHash: string) => newTxCallback(transactionHash)
        );
      });
    })
    .on("error", errorCallback);
}
