const path = require('path')
const solc = require('solc')
const fs = require('fs-extra')

const buildPath = path.resolve(__dirname, 'build')
fs.removeSync(buildPath)

const campaignPath = path.resolve(__dirname, 'contracts', 'SnakeDappDB.sol')
const source = fs.readFileSync(campaignPath, 'utf8')
const output = solc.compile(source, 1).contracts

fs.ensureDirSync(buildPath)

const writeContractToFile = contract => {
  fs.outputJsonSync(
    path.resolve(buildPath, `${contract.replace(':', '')}.json`),
    output[contract],
  )
}

for (let contract in output) writeContractToFile(contract)
