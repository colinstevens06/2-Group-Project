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

      if (msg.type === "attack") {
        // Play animation
        let userSprite = $("#user-sprite");
        let opponentSprite = $("#opponent-sprite");

        // console.log(thisButtonData);

        // the first animation is going to be that the user's mon will do some kind of slow rise then quick thud
        userSprite
          .animate(
            {
              width: "50%"
            },
            450
          )
          .animate(
            {
              width: "100%"
            },
            150
          );

        opponentSprite
          .delay(800)
          .animate(
            {
              width: "90%"
            },
            175
          )
          .animate(
            {
              width: "100%"
            },
            150
          )
          .animate(
            {
              width: "80%"
            },
            125
          )
          .animate(
            {
              width: "100%"
            },
            100
          )
          .animate(
            {
              width: "70%"
            },
            75
          )
          .animate(
            {
              width: "100%"
            },
            50
          )
          .animate(
            {
              width: "80%"
            },
            75
          )
          .animate(
            {
              width: "100%"
            },
            100
          )
          .animate(
            {
              width: "90%"
            },
            125
          )
          .animate(
            {
              width: "100%"
            },
            150
          );
      }
    });

    room.onStateChange(async state => {
      console.log("State", state);

      // play game end sounds
      if (state.phase === "end") {
        if (state.loser.cid === this.room.sessionId) {
          // If we lost
          const defeatSound = new Howl({
            src: ["../soundfiles/Music/defeat.mp3"]
          });

          defeatSound.play();
        } else {
          // if we won
          const victorySound = new Howl({
            src: ["../soundfiles/Music/victory.mp3"]
          });

          victorySound.play();
        }
      } else {
        $("#my-health").text(`${state.host.mons[state.host.outMon].hp}/100`);
        $("#notmy-health").text(
          `${state.challenger.mons[state.challenger.outMon].hp}/100`
        );
      }
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

let client = new Colyseus.Client("wss://nottomon.herokuapp.com");

/**
 * Finds or creates a new lobby.
 *
 * @param {string} token - JWT auth token.
 * @returns {Battlefield} the Colyseus room that was joined or made
 */
const findGame = async (token, lobbyName) => {
  let room;

  try {
    room = await client.joinOrCreate("battle", { lobbyName, token });
  } catch (error) {
    console.log("FAILED ", error);
    return null;
  }

  return new Battlefield(room);
};
