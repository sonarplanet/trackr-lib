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
 * Search given address in given block's transactions (`from` field or `to` field).
 * Return matching transactions hash into an array.
 * @param {string} address
 * @param {any} block
 * @returns {string[]} an array containing all matching transactions hash
 */
export function findAddressInBlock(address: string, block: any): string[] {
  return block.transactions
    .filter((transaction: any) => {
      return addressesAreEquals(transaction.from, address) || addressesAreEquals(transaction.to, address);
    })
    .map((transaction: any) => transaction.hash);
}
