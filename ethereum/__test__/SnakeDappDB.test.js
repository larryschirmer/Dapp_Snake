const assert = require('assert');
const Web3 = require('web3');
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));

const compiled = require('../build/SnakeDappDB.json');

const encode = string => {
  let number = '';

  string.split('').forEach((_, i) => {
    const charCode = string.charCodeAt(i) - 32;

    number += charCode;
  });

  return +number;
};

const decode = number => {
  if (!+number) return '';

  let numArr = number.toString().split('');
  let chars = [];

  while (numArr.length > 0)
    chars = [...chars, +numArr.splice(0, 2).reduce((acc, num) => acc + num, '')];

  return chars
    .map(charCode => String.fromCharCode(charCode + 32))
    .reduce((str, char) => str + char, '');
};

const getScoresList = async instance => {
  // Get scores
  let names = await instance.methods.getPlayerNames().call();
  names = names.split(',').map(numName => decode(numName));

  // Get addresses
  let addresses = await instance.methods.getPlayerAddresses().call();
  addresses = addresses.split(',');

  // Get scores
  let scores = await instance.methods.getPlayerScores().call();
  scores = scores.split(',');

  return [...new Array(3).fill()].map((_, i) => ({
    name: names[i],
    address: addresses[i],
    score: scores[i],
  }));
};

let account1, account2, DappSnake, DappSnakeInstance, gasPrice, gas;

beforeEach(async () => {
  [account1, account2] = await web3.eth.getAccounts();

  DappSnake = new web3.eth.Contract(compiled.interface, null, {
    data: compiled.bytecode,
  });

  await web3.eth
    .getGasPrice()
    .then(averageGasPrice => (gasPrice = Math.floor(averageGasPrice)))
    .catch(console.error);

  await DappSnake.deploy()
    .estimateGas()
    .then(estimatedGas => (gas = Math.floor(estimatedGas * 1.2)))
    .catch(console.error);

  await DappSnake.deploy()
    .send({ from: account1, gasPrice, gas })
    .then(instance => (DappSnakeInstance = instance));
});

describe('Contract', async () => {
  it('deploys a contract', async () => {
    assert.ok(DappSnakeInstance.options.address);
  });

  it('sets a name for a senders address', async () => {
    const playerAddress = account1;
    const playerName = 'sir_hiss';
    const playerInfo = [account1, encode(playerName)];

    await DappSnakeInstance.methods.setName(...playerInfo).send({ from: playerAddress, gas });

    const setName = await DappSnakeInstance.methods.getName(playerAddress).call();

    assert.equal(decode(setName), playerName);
  });

  it('returns a score from a player', async () => {
    // Configure Players
    const playerInfo = {
      name: 'sir_hiss',
      address: account1,
      score: 123,
    };
    const emptyPlayer = {
      name: '',
      address: '0x0000000000000000000000000000000000000000',
      score: '0',
    };
    //Register player name
    await DappSnakeInstance.methods
      .setName(playerInfo.address, encode(playerInfo.name))
      .send({ from: playerInfo.address, gas });
    //Set each player's high score
    await DappSnakeInstance.methods
      .setScore(playerInfo.address, playerInfo.score)
      .send({ from: playerInfo.address, gas });
    //Get scores
    const scoresList = await getScoresList(DappSnakeInstance);

    assert.deepEqual([playerInfo, emptyPlayer, emptyPlayer], scoresList);
  });

  it('returns complete information for highest scores in correct order', async () => {
    // Configure Players
    const playerInfo0 = {
      name: 'sir_hiss',
      address: account1,
      score: [123, 1230, 12300],
    };
    const playerInfo1 = {
      name: 'kaa',
      address: account2,
      score: [4560, 12],
    };

    //Register player names
    await DappSnakeInstance.methods
      .setName(playerInfo0.address, encode(playerInfo0.name))
      .send({ from: playerInfo0.address, gas });

    await DappSnakeInstance.methods
      .setName(playerInfo1.address, encode(playerInfo1.name))
      .send({ from: playerInfo1.address, gas });

    //Set each player's high score
    // [123,0,0]
    await DappSnakeInstance.methods
      .setScore(playerInfo0.address, playerInfo0.score[0])
      .send({ from: playerInfo0.address, gas });

    // [4560, 123, 0]
    await DappSnakeInstance.methods
      .setScore(playerInfo1.address, playerInfo1.score[0])
      .send({ from: playerInfo1.address, gas });

    // [4560, 1230, 123]
    await DappSnakeInstance.methods
      .setScore(playerInfo0.address, playerInfo0.score[1])
      .send({ from: playerInfo0.address, gas });

    // [12300, 4560, 1230]
    await DappSnakeInstance.methods
      .setScore(playerInfo0.address, playerInfo0.score[2])
      .send({ from: playerInfo0.address, gas });

    // [12300, 4560, 1230]
    await DappSnakeInstance.methods
      .setScore(playerInfo1.address, playerInfo1.score[1])
      .send({ from: playerInfo1.address, gas });

    //Get scores
    const scoresList = await getScoresList(DappSnakeInstance);
    const expectedScores = [
      {
        name: 'sir_hiss',
        address: account1,
        score: '12300',
      },
      {
        name: 'kaa',
        address: account2,
        score: '4560',
      },
      {
        name: 'sir_hiss',
        address: account1,
        score: '1230',
      },
    ];

    assert.deepEqual(expectedScores, scoresList);
  });
});
