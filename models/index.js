const sequelize = require("../config/connection");
const Product = require("./product");
const Category = require("./category");
const Order = require("./order");
const OrderProduct = require("./orderProduct");
const User = require("./user");

// Associations
User.hasMany(Product, { foreignKey: "userId" });
Product.belongsTo(User, { foreignKey: "userId" });

Category.hasMany(Product, { foreignKey: "categoryId" });
Product.belongsTo(Category, { foreignKey: "categoryId" });

User.hasMany(Order, { foreignKey: "userId" });
Order.belongsTo(User, { foreignKey: "userId" });

Order.belongsToMany(Product, {
  through: OrderProduct,
  foreignKey: "orderId",
  as: "products",
});

Product.belongsToMany(Order, {
  through: OrderProduct,
  foreignKey: "productId",
  as: "orders",
});
module.exports = {
  OrderProduct,
  sequelize,
  Product,
  Category,
  Order,
  User,
};
