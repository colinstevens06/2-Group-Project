let client = new Colyseus.Client("ws://localhost:7000");

const join = async () => {
  const room = await client.create("battle", { user: "username" });
  room.onMessage(msg => {
    console.log(msg);
  });

  room.onStateChange(async state => {
    console.log(state);
  });
};

join();
