import { players } from './getPlayerInfo';
const wait = ms => new Promise(res => setTimeout(res, ms));

export default async (addr, name) => {
  players[addr] = name;
  await wait(2500);
  return 'success';
};
