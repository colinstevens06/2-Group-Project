const test = async () => {
  const p1 = await findGame();
  //const p2 = await findGame();

  const bf = new Battlefield(p1);

  bf.ready();
};

test();
test();
