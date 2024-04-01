const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

class Blog extends Model {}

Blog.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    blogName: {
      type: DataTypes.STRING(255),
    },
    blogDetails: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "blog",
    timestamps: false,
    sequelize,
  }
);

module.exports = Blog;
