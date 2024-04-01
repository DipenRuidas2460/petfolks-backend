const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    phone: {
      type: DataTypes.STRING(55),
    },
    photo: {
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
    tableName: "user",
    timestamps: false,
    sequelize,
  }
);

module.exports = User;
