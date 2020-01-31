// Initialize env
require("dotenv").config();
const { createServer } = require("./server");

const main = async () => {
  const server = await createServer();

  server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
  });
};

main();
