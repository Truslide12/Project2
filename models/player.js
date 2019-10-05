module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define("Player", {
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
    }
  });
  return Player;
};
