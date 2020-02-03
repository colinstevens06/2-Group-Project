const setListeners = async room => {
  room.onMessage(msg => {
    console.log("Incoming", msg);
  });

  room.onStateChange(async state => {
    console.log("State", state);
  });

  room.onLeave(code => {
    console.log(`Left Room with code ${code}`);
  });

  room.onError(msg => {
    console.log("Error", msg);
  });
};
