const { DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
// const db = require("../models");
const User = require("./user");

const Order = sequelize.define(
  "Order",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    totalAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: User,
        key: "id",
      },
    },
  },
  {
    timestamps: true,
  }
);
// Order.addHook("beforeCreate", async (order, options) => {
//   const orderProducts = await db.OrderProduct.findAll({
//     where: { orderId: order.id },
//     include: [{ model: db.Product }],
//   });

//   const totalAmount = orderProducts.reduce((sum, orderProduct) => {
//     return sum + orderProduct.Product.price * orderProduct.quantity;
//   }, 0);

//   order.totalAmount = totalAmount;
// });

// Order.addHook("beforeUpdate", async (order, options) => {
//   const orderProducts = await db.OrderProduct.findAll({
//     where: { orderId: order.id },
//     include: [{ model: db.Product }],
//   });

//   const totalAmount = orderProducts.reduce((sum, orderProduct) => {
//     return sum + orderProduct.Product.price * orderProduct.quantity;
//   }, 0);

//   order.totalAmount = totalAmount;
// });

module.exports = Order;
