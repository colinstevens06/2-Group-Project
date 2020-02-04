const { Room } = require("colyseus");
const { GameState, GamePhase } = require("./State");
const WsSchemas = require("./WsSchema");
const WsMsgType = require("./WsMsgTypes");
const WarMap = require("./WarMap");
const { socketier } = require("packetier");

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

  get open() {
    return this.clients.length !== this.maxClients;
  }

  /**
   * Called when room is initialized.
   *
   * Expects `options` to match `options.create`
   *
   * @param {{size: number}} options - Lobby Options
   */
  onCreate(options) {
    WarMap.set(this.roomId, this);
    this.setState(new GameState());
    console.log("Created room", this.roomId);
  }

  // Authorize client based on provided options before WebSocket handshake is complete
  onAuth(client, options, request) {
    return true;
  }

  // When client successfully join the room
  onJoin(client, options, auth) {
    if (!this.state.host) {
      this.state.setHost(client.id, options.username); // TODO Change to JWT
      this.lobbyName = options.lobbyName || this.roomId;
    } else {
      this.state.setChallenger(client.id, options.username); // TODO Change to JWT
    }

    console.log(`Player ${client.id} joined ${this.roomName} ${this.roomId}`);

    this.broadcast(
      socketier(
        WsMsgType.JOIN,
        { username: options.username },
        { time: Date.now() }
      )
    );

    this.broadcast(
      socketier(WsMsgType.SETTINGS, { lobbyName: this.lobbyName })
    );

    if (this.clients.length === this.maxClients) {
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
    const { value } = WsSchemas.MessageSchema.validate(message);

    if (!value) {
      return this.send(
        client,
        socketier(WsMsgType.ERR, { msg: "invalid packet" })
      );
    }

    // Handle cases
    switch (value.type) {
      case WsMsgType.ACTION:
        this.broadcast(
          socketier(WsMsgType.ACTION, {
            user: player.cid,
            action: value.payload.action
          })
        );
        break;
      default:
        console.log("Unknown");
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
