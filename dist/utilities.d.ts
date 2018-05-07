/**
 * Return true if given addresses are the same
 * @param address1 the first address to test
 * @param address2 the second address to test
 */
export declare function addressesAreEquals(address1: string, address2: string): boolean;
/**
 * A filter on addresses returning `true` only for addresses matching first parameter.
 * @param address1 the address to match in order to get true
 */
export declare function filterAddressesAreEqualsTo(address1: string): (address: string) => boolean;
/**
 * A filter for transactions returning `true` only if given address matches transaction sender or receiver address.
 * @param address the address transaction sender or receiver must match in order to return true
 */
export declare function filterTransactionsUsingAddress(address: string): (transaction: any) => boolean;
/**
 * Call given callback on each block's transaction matching given filter.
 * Callback parameter is filtered transaction hash.
 * @param {(any)=>boolean} filter the filter used to selected transactions in block
 * @param {(string)=>void} newTxCallback callback called on matching transactions.
 * @returns {(any)=>void} a function calling callback on given block's transactions matching given filter.
 */
export declare function applyOnFilteredBlockTransactions(filter: (transaction: any) => boolean, newTxCallback: (tx: string) => void): ((block: any) => void);
