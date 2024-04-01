const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

class Post extends Model {}

Post.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    petCategory: {
      type: DataTypes.STRING(255),
    },
    description: {
      type: DataTypes.TEXT,
    },
    petPhoto: {
      type: DataTypes.STRING(100),
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "post",
    timestamps: false,
    sequelize,
  }
);

module.exports = Post;
