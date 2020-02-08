class PlayerState {
  constructor(cid, username) {
    this.cid = cid;
    this.username = username;
    this.ready = false;
    this.mons = [];
    this.outMon = 0;
  }

  get activeMon() {
    return this.mons[this.outMon];
  }
}

module.exports = PlayerState;
