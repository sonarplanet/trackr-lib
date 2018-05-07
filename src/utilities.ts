/**
 * Return true if given addresses are the same
 * @param address1 the first address to test
 * @param address2 the second address to test
 */
export function addressesAreEquals(address1: string, address2: string): boolean {
  let result = false;
  if (address1 && address2) {
    result = address1.toLowerCase() === address2.toLowerCase();
  }
  return result;
}

/**
 * A filter on addresses returning `true` only for addresses matching first parameter.
 * @param address1 the address to match in order to get true
 */
export function filterAddressesAreEqualsTo(address1: string): (address: string) => boolean {
  return (address2: string) => {
    return addressesAreEquals(address1, address2);
  };
}

/**
 * A filter for transactions returning `true` only if given address matches transaction sender or receiver address.
 * @param address the address transaction sender or receiver must match in order to return true
 */
export function filterTransactionsUsingAddress(address: string): (transaction: any) => boolean {
  return (transaction: any) => {
    let filterAddress = filterAddressesAreEqualsTo(address);
    return filterAddress(transaction.from) || filterAddress(transaction.to);
  };
}

/**
 * Call given callback on each block's transaction matching given filter.
 * Callback parameter is filtered transaction hash.
 * @param {(any)=>boolean} filter the filter used to selected transactions in block
 * @param {(string)=>void} newTxCallback callback called on matching transactions.
 * @returns {(any)=>void} a function calling callback on given block's transactions matching given filter.
 */
export function applyOnFilteredBlockTransactions(
  filter: (transaction: any) => boolean,
  newTxCallback: (tx: string) => void,
): ((block: any) => void) {
  return (block: any) => {
    return block.transactions
      .filter(filter)
      .map((transaction: any) => transaction.hash)
      .forEach((hash: string) => newTxCallback(hash));
  };
}
