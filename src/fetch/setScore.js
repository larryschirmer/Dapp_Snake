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

export default async score => {
  if (web3Error) return;

  const contract = await new web3.eth.Contract(
    JSON.parse(config.contractInterface),
    config.contractAddress,
  );

  const [playerAddress] = await web3.eth.getAccounts();

  await contract.methods
    .setScore(playerAddress, score)
    .send({ from: playerAddress, gas: '1000000' });
};
