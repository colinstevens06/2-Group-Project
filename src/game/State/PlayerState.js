class PlayerState {
  constructor(cid, username) {
    this.cid = cid;
    this.username = username;
    this.ready = false;
    this.mons = []; // TODO handle mons in state
  }
}

module.exports = PlayerState;
