const test = async () => {
  const p1 = await findGame();
  //const p2 = await findGame();

  const result = await fetch("http://localhost:7000/api/match");

  console.log(await result.json());
};

test();
