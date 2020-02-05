//get our mysql variable ready
const mysql = require("mysql");

//this first part is to check for HEROKU
if (process.env.JAWSDB_URL) {
  //use the JAWSDB connection setup
  connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
  //this is for local testing
  connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "pokegame"
  });
}

//create our connection, and, have some fun with the status
connection.connect(function(err, res) {
  if(err) {
    console.log("Houston, we have a problem", err);
    throw err;
  } else {
    console.log("Houston, we have lift ID " + connection.threadId);
    return res;
  }
});

//export our connection
module.exports = connection;
