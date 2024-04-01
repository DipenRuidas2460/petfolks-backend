const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");

class Product extends Model {}

Product.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    productName: {
      type: DataTypes.STRING(255),
    },
    category: {
      type: DataTypes.STRING(255),
    },
    description: {
      type: DataTypes.TEXT,
    },
    specification: {
      type: DataTypes.TEXT,
    },
    price: {
      type: DataTypes.STRING(50),
    },
    weight: {
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
    tableName: "product",
    timestamps: false,
    sequelize,
  }
);

module.exports = Product;
