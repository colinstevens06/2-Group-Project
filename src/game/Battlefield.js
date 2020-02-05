const { Room } = require("colyseus");
const { GameState, GamePhase } = require("./State");
const WsSchemas = require("./WsSchema");
const WsMsgType = require("./WsMsgTypes");
const WarMap = require("./WarMap");
const action = require("./Action");
const { socketier } = require("packetier");
const { delay } = require("../util");

/**
 * Battlefield Room.
 */
class Battlefield extends Room {
  constructor() {
    super();
    /**
     * @type {GameState}
     */
    this.state;
    this.maxClients = 2;
    this.lobbyName = "BF-" + this.roomId;
  }

  /**
   * @returns {boolean} `true` if the room has space for one more player.
   */
  get isOpen() {
    return this.clients.length !== this.maxClients;
  }

  /**
   * Starts the countdown and starts game logic.
   */
  async start() {
    this.state.phase = GamePhase.STARTING;

    // Countdown
    for (
      this.state.countdown = 5;
      this.state.countdown > 0;
      this.state.countdown -= 1
    ) {
      await delay(1000);
    }

    // Start
    this.state.phase = GamePhase.PLAYING;

    // Now we await player 1's move
  }

  /**
   * Called when room is initialized.
   *
   * Expects `options` to match `options.create`
   *
   * @param {*} options - Lobby Options
   */
  onCreate(options) {
    WarMap.set(this.roomId, this);
    this.setState(new GameState());
    console.log("Created room", this.roomId);
  }

  // TODO Authorize client based on provided options before WebSocket handshake is complete
  onAuth(client, options, request) {
    return true;
  }

  /**
   * Handles client joining the room.
   *
   * @param {*} client
   * @param {*} options
   * @param {*} auth
   */
  onJoin(client, options, auth) {
    if (!this.state.host) {
      this.state.setHost(client.id, options.username); // TODO Change to JWT
      this.lobbyName = options.lobbyName || this.roomId;
    } else {
      this.state.setChallenger(client.id, options.username); // TODO Change to JWT
    }

    console.log(`Player ${client.id} joined ${this.roomName} ${this.roomId}`);

    // Set lobby to ready if 2 players are here
    if (!this.isOpen) {
      this.state.phase = GamePhase.READY;
    }
  }

  // When a client sends a message
  onMessage(client, message) {
    const player = this.state.player(client.id);

    if (!player) {
      return this.send(
        client,
        socketier(WsMsgType.ERR, { msg: "unknown client" })
      );
    }

    // Validate message type
    /**
     * @type {{value: {type: string, payload}}}
     */
    const { value } = WsSchemas.MessageSchema.validate(message);

    if (!value) {
      return this.send(
        client,
        socketier(WsMsgType.ERR, { msg: "invalid packet" })
      );
    }

    // Handle phase-independent messages
    switch (value.type) {
      // Handle ready-up/un-ready
      case WsMsgType.READY:
        player.ready = value.payload.ready;
        if (
          this.state.host.ready &&
          this.state.challenger &&
          this.state.challenger.ready
        ) {
          this.start();
        }
        break;
      // Handle ACTIONS: Moves & Swaps
      case WsMsgType.ACTION:
        if (this.state.phase !== GamePhase.PLAYING) {
          this.send(
            client,
            socketier(WsMsgType.ERR, { msg: "Game has not started" })
          );
        } else {
          const act = action.from(value.payload.action);
          if (act) {
            act.handle(this, value.payload);
          } else {
            this.send(
              client,
              socketier(WsMsgType.ERR, {
                msg: "Invalid action",
                type: "action"
              })
            );
          }
        }
        break;
      default:
        console.log(`Unknown Message Type: ${value}`);
    }
  }

  // TODO Handle post-game stats
  onLeave(client, clientWantedTo) {
    console.log(`Player ${client.id} left ${this.roomName} ${this.roomId}`);
    if (this.state.phase !== GamePhase.END) {
      if (client.id === this.state.host.cid) {
        // If the host leaves
        this.broadcast(
          socketier(WsMsgType.LEAVE, { msg: "Host left. Game cancelled." })
        );
        this.state.phase === GamePhase.CANCEL;
        this.disconnect();
      } else {
        if (
          this.state.phase === GamePhase.WAITING ||
          this.state.phase === GamePhase.READY
        ) {
          // If the client leaves before the game
          this.broadcast(
            socketier(WsMsgType.LEAVE, {
              msg: "Challenger left, waiting for new player"
            })
          );
        } else if (this.state.phase === GamePhase.PLAYING) {
          // If the client leave during the game
          this.broadcast(
            socketier(WsMsgType.END, { msg: "Challenger abandoned the game." })
          );
          this.disconnect();
        }
      }
    }
  }

  // Cleanup callback, called after there are no more clients in the room. (see `autoDispose`)
  onDispose() {
    console.log("Disposed", this.roomId);
    WarMap.remove(this.roomId);
  }
}

module.exports = Battlefield;
