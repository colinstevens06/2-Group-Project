let client = new Colyseus.Client("ws://localhost:7000"); // TODO Update to heroku URI

const findGame = async () => {
  let room;
  try {
    room = await client.joinOrCreate("battle", {
      username: "user-" + Math.random(),
      lobbyName: "BF-" + Math.random()
    });
  } catch (error) {
    console.log("FAILED ", error);
    return;
  }

  await setListeners(room);

  return room;
};
