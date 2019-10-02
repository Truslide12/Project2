module.exports = function (sequelize, DataTypes) {
  var Post = sequelize.define("Post", {
    user_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    scores: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    last_date: {
      type: DataTypes.DATETIME
    }
  });
  return Post;
};
