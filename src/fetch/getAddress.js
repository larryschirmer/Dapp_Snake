const wait = ms => new Promise(res => setTimeout(res, ms));

const address = '0xabcdef12345';

export default async () => {
  await wait(2500);
  return address;
};
