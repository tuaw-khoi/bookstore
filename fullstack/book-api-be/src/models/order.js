"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.hasMany(models.OrderDetail);
    }
  }
  Order.init(
    {
      orderDate: DataTypes.DATE,
      customerName: DataTypes.STRING,
      totalAmount: DataTypes.FLOAT,
      status: DataTypes.STRING,
      payment_method: DataTypes.STRING,
      shipping_address: DataTypes.STRING,
      notes: DataTypes.STRING,
      phoneNumber: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
