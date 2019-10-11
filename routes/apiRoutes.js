var db = require("../models");

module.exports = function(app) {
  // Get all examples
  app.get("/api/player", function(req, res) {
    db.Player.findAll({
      limit: 10,
      order: [["score", "DESC"]]
    }).then(function(dbPlayer) {
      res.json(dbPlayer);
    });
  });

  // Create a new example
  app.post("/api/player", function(req, res) {
    console.log(req.body);
    db.Player.create(req.body).then(function(dbPlayer) {
      res.json(dbPlayer);
    });
  });

  // app.post("/api/scores", function(req, res) {
  //   db.Post.create({
  //     id: req.body.id,
  //     user_name: req.body.user_name,
  //     scores: req.body.scores,
  //     last_date: req.body.last_date
  //   })
  //     .then(function(result) {
  //       res.status(202);
  //     })
  //     .catch(function(err) {
  //       res.status(409);
  //     });
  // });
};
