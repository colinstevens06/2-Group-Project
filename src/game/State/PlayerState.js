class PlayerState {
  constructor(cid, username) {
    this.cid = cid;
    this.username = username;
    this.ready = false;
    this.mons = [{ name: "name__", hp: 250 }]; // TODO handle mons in state
    this.outMon = this.mons[0];
  }
}

module.exports = PlayerState;
