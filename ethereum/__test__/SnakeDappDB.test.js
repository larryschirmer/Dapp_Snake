const assert = require('assert');
const ganache = require('ganache-cli');
const Web3 = require('web3');
const web3 = new Web3(ganache.provider());

const compiled = require('../build/SnakeDappDB.json');

let accounts, contract;

beforeEach(async () => {
  accounts = await web3.eth.getAccounts();

  contract = await new web3.eth.Contract(JSON.parse(compiled.interface))
    .deploy({ data: compiled.bytecode })
    .send({ from: accounts[0], gas: '1000000' });
});

describe('Contract', async () => {
  it('deploys a contract', async () => {
    assert.ok(contract.options.address);
  });
});
