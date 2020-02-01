// Initialize env
require("dotenv").config();
// Import Externals
// Import Internals
const { initGameServer, initExpressServer } = require("./server");

const main = async () => {
  // Create the express instance
  const expressServer = await initExpressServer();

  // Create the game server
  const gameServer = await initGameServer(expressServer);

  // Listen
  const port = process.env.PORT;
  gameServer.listen(port, () => console.log(`Listening on port ${port}`));
};

main();
