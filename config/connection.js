var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "pwcspfbyl73eccbn.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
  port: 3306,
  user: "opseet0aa15tb506",
  password: "rbw363pxpyfmhtxx",
  database: "gcb461vpdz9w11s8"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

module.exports = connection;
