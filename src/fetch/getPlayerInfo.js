const wait = ms => new Promise(res => setTimeout(res, ms));

const playerInfo0 = {
  name: 'kaa',
  address: '0xabcdef12345',
};

// const playerInfo1 = {};

export default async () => {
  await wait(2500);
  return playerInfo0;
};
