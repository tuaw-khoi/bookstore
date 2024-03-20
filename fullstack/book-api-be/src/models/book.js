"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      book.belongsToMany(models.cart, { through: "CartBook" });
    }
  }
  book.init(
    {
      title: DataTypes.STRING,
      genre: DataTypes.STRING,
      price: DataTypes.FLOAT,
      description: DataTypes.STRING,
      published_year: DataTypes.STRING,
      stock_quantity: DataTypes.STRING,
      imgUrl: DataTypes.STRING,
      author: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "book",
    }
  );
  return book;
};
