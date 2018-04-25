const wait = ms => new Promise(res => setTimeout(res, ms));

export const players = {};

export default async addr => {
  await wait(2500);

  try {
    return players[addr];
  } catch (e) {
    return {};
  }
};
