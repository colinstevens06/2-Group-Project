let client = new Colyseus.Client("ws://localhost:7000"); // TODO Update to heroku URI

/**
 * Finds or creates a new lobby.
 *
 * @returns {*} the Colyseus room that was joined or made
 */
const findGame = async () => {
  let room;

  try {
    room = await client.joinOrCreate("battle", {
      username: "user-" + Math.random(),
      lobbyName: "BF-" + Math.random()
    });
  } catch (error) {
    console.log("FAILED ", error);
    return null;
  }

  return room;
};
