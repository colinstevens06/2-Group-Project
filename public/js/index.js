const test = async () => {
  const p1 = await findGame();
  const p2 = await findGame();
  let p3;

  setTimeout(() => p2.leave(), 5000);
  setTimeout(async () => (p3 = await findGame()), 9000);

  setTimeout(
    () => p3.send({ type: "action", payload: { action: "attack" } }),
    11000
  );
};

test();
