"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.information);
      User.hasOne(models.cart);
    }
  }
  User.init(
    {
      fullName: DataTypes.STRING,
      email: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.STRING,
        defaultValue: "0",
      },
      informationId: {
        type: DataTypes.UUID,
      },
      cartId: {
        type: DataTypes.UUID,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  /* hook*/
  User.afterCreate(async (user, options) => {
    try {
      const information = await sequelize.models.information.create({
        UserId: user.id,
      });
      const cart = await sequelize.models.cart.create({ UserId: user.id });
      user.informationId = information.id;
      user.cartId = cart.id;
      await user.save();
    } catch (error) {
      console.error("Error creating information or cart:", error);
      throw new Error("Failed to create information or cart");
    }
  });
  return User;
};
