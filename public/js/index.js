const test = async () => {
  console.log("Finding a game");
  const p1 = await findGame();
  console.log("Joining game");
  const p2 = await findGame();

  const bf = new Battlefield(p1);
  const bf2 = new Battlefield(p2);

  bf.ready();
  bf2.ready();

  setTimeout(() => bf.attack("MOVE_NAME"), 7000);
};

test();
