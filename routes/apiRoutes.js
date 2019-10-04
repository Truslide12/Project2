var db = require("../models/");
​
module.exports = function(app) {
  app.get("/api/posts/", function(req, res) {
    db.Post.findAll({}).then(function(dbPost) {
      res.json(dbPost);
    });
  });
};
// GET route for getting all of the posts
​
// Get route for returning posts of a specific category
app.get("/api/posts/scores/:scores", function(req, res) {
  db.Post.findAll({
    where: {
      scores: req.params.scores
    },
    order: [["scores", "DESC"], ["last_date"]]
  }).then(function(dbPost) {
    res.json(dbPost);
  });
});
​
// Get route for retrieving a single post
// app.get("/api/posts/:id", function (req, res) {
//   db.Post.findOne({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(function (dbPost) {
//       res.json(dbPost);
//     });
// });
​
// POST route for saving a new post
app.post("/api/posts", function(req, res) {
    console.log(req.body);
    db.Post.create({
      id: req.body.id,
      user_name: req.body.user_name,
      scores: req.body.scores,
      last_date: req.body.last_date
    });
  })
  .then(function(dbPost) {
    res.json(dbPost);
  });
​
// DELETE route for deleting posts
// app.delete("/api/posts/:id", function (req, res) {
//   db.Post.destroy({
//     where: {
//       id: req.params.id
//     }
//   })
//     .then(function (dbPost) {
//       res.json(dbPost);
//     });
// });
​
// PUT route for updating posts
// app.put("/api/posts", function (req, res) {
//   db.Post.update(req.body,
//     {
//       where: {
//         id: req.body.id
//       }
//     })
//     .then(function (dbPost) {
//       res.json(dbPost);
//     });
// });
