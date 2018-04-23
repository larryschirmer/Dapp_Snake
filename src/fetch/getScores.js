const wait = ms => new Promise(res => setTimeout(res, ms));

const scores = {
  0: {
    name: 'creator',
    address: '0x9495BA0b81f92d45C2F4cE2d4d2209e6ebdE787A',
    score: '405',
  },
  2: {
    name: 'crabby-quicksand',
    address: '0x5A477851B95d4F0CB9Bde13CD73608759A5e30E0',
    score: '102',
  },
  1: {
    name: 'grandiose-clam',
    address: '0x5Cd8Bb7a42ac10729bc87afd608b81FBE7F10337',
    score: '207',
  },
};

export default async () => {
  await wait(2000);
  return scores;
};
