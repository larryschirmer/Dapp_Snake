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

  it('sets a name for a senders address', async () => {
    const playerAddress = accounts[0];
    const playerName = 'sir hiss';
    await contract.methods
      .setName(playerAddress, playerName)
      .send({ from: playerAddress, gas: '1000000' });

    const setName = await contract.methods.getName(playerAddress).call();

    assert.equal(setName, playerName);
  });

  it('returns scores from two players', async () => {
    // Configure Players
    const playerName0 = {
      name: 'sir hiss',
      address: accounts[0],
      score: 123,
    };

    const playerName1 = {
      name: 'kaa',
      address: accounts[1],
      score: 456,
    };

    //Register player names
    await contract.methods
      .setName(playerName0.address, playerName0.name)
      .send({ from: playerName0.address, gas: '1000000' });

    await contract.methods
      .setName(playerName1.address, playerName1.name)
      .send({ from: playerName1.address, gas: '1000000' });

    //Set each player's high score
    await contract.methods
      .setScore(playerName0.address, playerName0.score)
      .send({ from: playerName0.address, gas: '1000000' });

    await contract.methods
      .setScore(playerName1.address, playerName1.score)
      .send({ from: playerName1.address, gas: '1000000' });

    //Get scores
    const scores = await contract.methods.scores().call();

    assert.deepEqual([playerName0.score, playerName1.score], scores);
  });

  it('returns complete information for highest scores', async () => {
    // Configure Players
    const playerName0 = {
      name: 'sir hiss',
      address: accounts[0],
      score: [123, 1230, 12300],
    };

    const playerName1 = {
      name: 'kaa',
      address: accounts[1],
      score: [4560, 12],
    };

    //Register player names
    await contract.methods
      .setName(playerName0.address, playerName0.name)
      .send({ from: playerName0.address, gas: '1000000' });

    await contract.methods
      .setName(playerName1.address, playerName1.name)
      .send({ from: playerName1.address, gas: '1000000' });

    //Set each player's high score
    await contract.methods
      .setScore(playerName0.address, playerName0.score[0])
      .send({ from: playerName0.address, gas: '1000000' });

    await contract.methods
      .setScore(playerName1.address, playerName1.score[0])
      .send({ from: playerName1.address, gas: '1000000' });

    await contract.methods
      .setScore(playerName0.address, playerName0.score[1])
      .send({ from: playerName0.address, gas: '1000000' });

    await contract.methods
      .setScore(playerName0.address, playerName0.score[2])
      .send({ from: playerName0.address, gas: '1000000' });

    await contract.methods
      .setScore(playerName1.address, playerName1.score[1])
      .send({ from: playerName1.address, gas: '1000000' });

    //Get scores
    const scores = await contract.methods.scores().call();

    const expectedScores = [
      playerName0.score[0],
      playerName1.score[0],
      playerName0.score[1],
      playerName0.score[2],
      playerName1.score[1],
    ];
    assert.deepEqual(expectedScores, scores);

    // Sort scores highest first
    const tokenizedScores = scores.map((score, index) => {
      return {
        index,
        score,
      };
    });

    const sortedScores = tokenizedScores.sort((a, b) => b.score - a.score);

    // Get additional info for highest three scores only
    const score0 = await contract.methods.scoresComplete(sortedScores[0].index).call();
    const score1 = await contract.methods.scoresComplete(sortedScores[1].index).call();
    const score2 = await contract.methods.scoresComplete(sortedScores[2].index).call();

    const highScores = [
      {
        name: score0.name,
        address: score0.playerAddress,
        score: score0.score,
      },
      {
        name: score1.name,
        address: score1.playerAddress,
        score: score1.score,
      },
      {
        name: score2.name,
        address: score2.playerAddress,
        score: score2.score,
      },
    ];

    const expectedHighScores = [
      {
        name: playerName0.name,
        address: playerName0.address,
        score: playerName0.score[2],
      },
      {
        name: playerName1.name,
        address: playerName1.address,
        score: playerName1.score[0],
      },
      {
        name: playerName0.name,
        address: playerName0.address,
        score: playerName0.score[1],
      },
    ];

    assert.deepEqual(expectedHighScores, highScores);
  });
});
