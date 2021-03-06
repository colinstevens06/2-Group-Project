// Initialize env
require("dotenv").config();
// Import Externals
// huh
// Import Internals
const { initGameServer, initExpressServer } = require("./server");

const main = async () => {
  console.log("Creating REST Server...");
  // Create the express instance
  const expressServer = await initExpressServer();
  console.log("\tDONE");

  console.log("Creating Game Server...");
  // Create the game server
  const gameServer = await initGameServer(expressServer);
  console.log("\tDONE");

  // Listen
  const port = process.env.PORT;
  console.log(`Opening Server Port ${port}`);
  gameServer.listen(port);
};

main();
