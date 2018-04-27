const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiled = require('./build/SnakeDappDB.json');
const config = require('./config.json');

const provider = new HDWalletProvider(config.seedwords, config.providerURL);
const web3 = new Web3(provider);

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();

  console.log('Attempting to deploy from account', accounts[0]);

  const result = await new web3.eth.Contract(JSON.parse(compiled.interface))
    .deploy({ data: compiled.bytecode })
    .send({ gas: '1000000', from: accounts[0] });

  console.log('Contract deployed to', result.options.address);
};
deploy();
