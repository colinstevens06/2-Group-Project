class PlayerState {
  constructor(cid, username) {
    this.cid = cid;
    this.username = username;
    this.ready = false;
    this.mons = [{ name: "name__", hp: 10 }]; // TODO handle mons in state
    this.outMon = 0;
  }

  get activeMon() {
    return this.mons[this.outMon];
  }
}

module.exports = PlayerState;
