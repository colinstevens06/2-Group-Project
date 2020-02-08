class Battlefield {
  constructor(room) {
    this.room = room;
    /**
     * @type {{host, challenger, phase: string, turn: number}}
     */
    this.state = room.state;
    this.initialize(room);
  }

  /**
   * Sets the room's callbacks.
   *
   * @param {*} room - Colyseus room
   */
  initialize(room) {
    room.onMessage(msg => {
      console.log("Incoming", msg);
    });

    room.onStateChange(async state => {
      console.log("State", state);
      this.state = state;
    });

    room.onLeave(code => {
      console.log(`Left Room with code ${code}`);
    });

    room.onError(msg => {
      console.log("Error", msg);
    });
  }

  /**
   * Performes an action only if the room is set.
   *
   * @param {function} callback - A callback function bound to this instance.
   */
  enroomed(callback) {
    if (this.room) {
      callback.bind(this);
      return callback();
    }
  }

  /**
   * Tells the server the client is ready by default.
   *
   * @param {boolean} set - Optionally overrides the default readyness.
   */
  async ready(set) {
    this.enroomed(() => {
      this.room.send(
        socketier("ready", { ready: typeof set === "boolean" ? set : true })
      );
    });
  }

  async attack(move) {
    this.enroomed(() => {
      this.room.send(socketier("action", { action: "attack", attack: move }));
    });
  }
}

let client = new Colyseus.Client("ws://localhost:7000"); // TODO Update to heroku URI

/**
 * Finds or creates a new lobby.
 *
 * @returns {Battlefield} the Colyseus room that was joined or made
 */
const findGame = async () => {
  let room;

  try {
    room = await client.joinOrCreate("battle", {
      username: "user-" + Math.random(),
      lobbyName: "BF-" + Math.random(),
      authToken: null // TODO Auth tokens
    });
  } catch (error) {
    console.log("FAILED ", error);
    return null;
  }

  return new Battlefield(room);
};
