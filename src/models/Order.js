const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/dbConfig");
const Product = require("./Product");
const User = require("./User");

class Order extends Model {}

Order.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    productId: {
      type: DataTypes.BIGINT,
    },
    userId: {
      type: DataTypes.BIGINT,
    },
    date: {
      type: DataTypes.DATE,
    },
    status: {
      type: DataTypes.INTEGER,
      comment: "1 = success, 2 = pending, 3 = failed!",
    },
    totalPrice: {
      type: DataTypes.STRING(50),
    },
    paymentId: {
      type: DataTypes.STRING(100),
    },
    paymentMethod: {
      type: DataTypes.STRING(100),
    },
    paymentStatus: {
      type: DataTypes.INTEGER,
      comment: "1 = success, 2 = pending, 3 = failed!",
    },
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  },
  {
    tableName: "order",
    timestamps: false,
    sequelize,
  }
);

Order.belongsTo(Product, { foreignKey: "productId", as: "products" });
Order.belongsTo(User, { foreignKey: "userId", as: "users" });

module.exports = Order;
