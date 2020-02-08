const express = require("express");
const path = require("path");
const app = express();

//set the port for the app
const PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname + "/public/html"));
app.engine("html", require("ejs").renderFile);

var routes = require("./src/controllers/pokemon_controller");

app.use(routes);

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});