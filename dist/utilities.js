"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Return true if given addresses are the same
 * @param address1 the first address to test
 * @param address2 the second address to test
 */
function addressesAreEquals(address1, address2) {
    let result = false;
    if (address1 && address2) {
        result = address1.toLowerCase() === address2.toLowerCase();
    }
    return result;
}
exports.addressesAreEquals = addressesAreEquals;
/**
 * A filter on addresses returning `true` only for addresses matching first parameter.
 * @param address1 the address to match in order to get true
 */
function filterAddressesAreEqualsTo(address1) {
    return (address2) => {
        return addressesAreEquals(address1, address2);
    };
}
exports.filterAddressesAreEqualsTo = filterAddressesAreEqualsTo;
/**
 * A filter for transactions returning `true` only if given address matches transaction sender or receiver address.
 * @param address the address transaction sender or receiver must match in order to return true
 */
function filterTransactionsUsingAddress(address) {
    return (transaction) => {
        let filterAddress = filterAddressesAreEqualsTo(address);
        return filterAddress(transaction.from) || filterAddress(transaction.to);
    };
}
exports.filterTransactionsUsingAddress = filterTransactionsUsingAddress;
/**
 * Call given callback on each block's transaction matching given filter.
 * Callback parameter is filtered transaction hash.
 * @param {(any)=>boolean} filter the filter used to selected transactions in block
 * @param {(string)=>void} newTxCallback callback called on matching transactions.
 * @returns {(any)=>void} a function calling callback on given block's transactions matching given filter.
 */
function applyOnFilteredBlockTransactions(filter, newTxCallback) {
    return (block) => {
        return block.transactions
            .filter(filter)
            .map((transaction) => transaction.hash)
            .forEach((hash) => newTxCallback(hash));
    };
}
exports.applyOnFilteredBlockTransactions = applyOnFilteredBlockTransactions;
//# sourceMappingURL=utilities.js.map