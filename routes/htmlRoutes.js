// *********************************************************************************
// html-routes.js - this file offers a set of routes for sending users to the various html pages
// *********************************************************************************

// Dependencies
// =============================================================
var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {
  // Each of the below routes just handles the HTML page that the user gets sent to.

  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/index.html"));
  });

  app.get("/game", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/game.html"));
  });

  app.get("/board", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/leaderboard.html"));
  });

  // app.get("/all", function(req, res) {
  //   res.sendFile(path.join(__dirname, "../public/all.html"));
  // });
};
