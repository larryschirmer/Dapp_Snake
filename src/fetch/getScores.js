import Web3 from 'web3';
import config from '../contractConfig.json';

let web3;
let web3Error = false;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  // We are in the browser and metamask is running.
  web3 = new Web3(window.web3.currentProvider);
} else {
  web3Error = true;
}

export default async () => {
  if (web3Error)
    return [
      {
        name: '...',
        address: 'enable metamask for Rinkeby',
        score: '...',
      },
    ];

  const contract = await new web3.eth.Contract(
    JSON.parse(config.contractInterface),
    config.contractAddress,
  );

  //Get scores
  const scores = await contract.methods.scores().call();

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

  return highScores;
};
