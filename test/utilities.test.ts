/// <reference types="jest" />

import * as Utilities from '../src/utilities';

let undefVar;
const VALID_ADDRESS = '0x612d7a97affc491e814a7d64638511280a1b395243626d0a94e34cf8cc495e7d';
const INVALID_ADDRESS_SHORT = '0x612D7A97AFFc491e814a7d64638511280';
const TRANSACTION_1 = { hash: '1', from: VALID_ADDRESS, to: VALID_ADDRESS };
const TRANSACTION_2 = { hash: '2', from: '', to: VALID_ADDRESS };
const TRANSACTION_3 = { hash: '3', from: '', to: undefVar };
const TRANSACTION_4 = { hash: '4', from: INVALID_ADDRESS_SHORT };

const A_BLOCK = {
  transactions: [TRANSACTION_1, TRANSACTION_2, TRANSACTION_3, TRANSACTION_4],
};

describe('test addressesAreEquals function', () => {
  it('addressesAreEquals', () => {
    expect(Utilities.addressesAreEquals(VALID_ADDRESS, VALID_ADDRESS)).toEqual(true);

    expect(Utilities.addressesAreEquals(VALID_ADDRESS, VALID_ADDRESS)).toEqual(true);

    expect(Utilities.addressesAreEquals(INVALID_ADDRESS_SHORT, VALID_ADDRESS)).toEqual(false);

    expect(Utilities.addressesAreEquals(VALID_ADDRESS, INVALID_ADDRESS_SHORT)).toEqual(false);

    expect(Utilities.addressesAreEquals(null, VALID_ADDRESS)).toEqual(false);

    expect(Utilities.addressesAreEquals(VALID_ADDRESS, null)).toEqual(false);

    expect(Utilities.addressesAreEquals(VALID_ADDRESS, undefVar)).toEqual(false);

    expect(Utilities.addressesAreEquals(undefVar, VALID_ADDRESS)).toEqual(false);
  });
});

describe('test filterAddressesAreEqualsTo function', () => {
  it('filterAddressesAreEqualsTo', () => {
    expect(
      [VALID_ADDRESS, INVALID_ADDRESS_SHORT, undefVar, VALID_ADDRESS].filter(
        Utilities.filterAddressesAreEqualsTo(VALID_ADDRESS),
      ),
    ).toEqual([VALID_ADDRESS, VALID_ADDRESS]);

    expect([INVALID_ADDRESS_SHORT, undefVar].filter(Utilities.filterAddressesAreEqualsTo(VALID_ADDRESS))).toEqual([]);
  });
});

describe('test filterTransactionsUsingAddress function', () => {
  it('filterTransactionsUsingAddress', () => {
    let input = A_BLOCK.transactions;
    let expected = [TRANSACTION_1, TRANSACTION_2];
    let filter = Utilities.filterTransactionsUsingAddress(VALID_ADDRESS);
    expect(A_BLOCK.transactions.filter(filter)).toEqual(expected);
  });
});

describe('test applyOnFilteredBlockTransactions function', () => {
  it('applyOnFilteredBlockTransactions', (done) => {
    const EXPECTED_CALLBACK_RESULT: string[] = ['1', '2'];

    let hashes: string[] = [];
    let filter = Utilities.filterTransactionsUsingAddress(VALID_ADDRESS);
    let callback = async (hash: string) => {
      hashes.push(hash);
      if (hashes.length == EXPECTED_CALLBACK_RESULT.length) {
        expect(hashes).toEqual(EXPECTED_CALLBACK_RESULT);
        done();
      }
    };

    Utilities.applyOnFilteredBlockTransactions(filter, callback)(A_BLOCK);
  });
});
