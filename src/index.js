//setup our variables to use the npm packages
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");

//setup the application variable and get the port defined
var app = express();
var PORT = process.env.PORT || 8080;

//set the static route for the handlebars pages
app.use(express.static("public"));

//make sure our application can use json and use the URL encoded correctly
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//setup the view engine and define handlebars default layout
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

//require our controller to get the routes up and running
var routes = require("./controllers/index.js");

//fire up the routes
app.use(routes);

//Open the port and listen for requests
app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});

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
