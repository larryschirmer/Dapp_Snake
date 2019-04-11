const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');
const contractFileName = 'SnakeDappDB.sol';

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath);

const campaignPath = path.resolve(__dirname, 'contracts', contractFileName);
const source = fs.readFileSync(campaignPath, 'utf8');

var input = {
  language: 'Solidity',
  sources: {
    [contractFileName]: {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};

fs.ensureDirSync(buildPath);
const output = JSON.parse(solc.compile(JSON.stringify(input)));

if (output.errors) {
  output.errors.forEach(err => {
    console.log(err.formattedMessage);
  });
} else {
  const contracts = output.contracts[contractFileName];
  for (let contractName in contracts) {
    const { abi, evm } = contracts[contractName];

    fs.writeFileSync(
      path.resolve(buildPath, `${contractName}.json`),
      JSON.stringify({ interface: abi, bytecode: '0x' + evm.bytecode.object }, null, 2),
      'utf8',
    );
  }
}
