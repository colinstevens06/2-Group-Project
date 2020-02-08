/** @type {Battlefield} */
let bf, bf2;

const test = async () => {
  console.log("Finding a game");
  const p1 = await findGame();
  console.log("Joining game");
  const p2 = await findGame();

  bf = new Battlefield(p1);
  bf2 = new Battlefield(p2);

  bf.ready();
  bf2.ready();
};

test();
