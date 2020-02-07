const express = require("express");
const exphbs = require("express-handlebars");
const path = require("path");

var app = express();

var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "src/views"));

var routes = require("./src/controllers/pokemon_controller");

app.use(routes);

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});