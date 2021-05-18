"use strict";

const Sequelize = require("sequelize");
const CategoryModel = require("./Category.js");
const ProductModel = require("./Product.js");
const UserModel = require("./User.js");
const OrderModel = require("./Order.js");
const OrderProductModel = require("./Order-product.js");
const StatusModel = require("./Status.js");

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER,
  process.env.PASS,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

const Category = CategoryModel(sequelize, Sequelize);
const Product = ProductModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Order = OrderModel(sequelize, Sequelize);
const OrderProduct = OrderProductModel(sequelize, Sequelize);
const Status = StatusModel(sequelize, Sequelize);

Order.belongsToMany(Product, {
  through: OrderProduct,
});
Product.belongsToMany(Order, {
  through: OrderProduct,
});

//Category.hasMany(Product);

Product.hasOne(Category);

User.hasMany(Order);

Order.belongsTo(User);

Order.hasOne(Status);

Status.belongsTo(Order);

module.exports = {
  sequelize,
  Sequelize,
  Category,
  Product,
  User,
  Order,
  OrderProduct,
  Status,
};
