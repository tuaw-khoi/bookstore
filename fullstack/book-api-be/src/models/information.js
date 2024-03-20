"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class information extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      information.belongsTo(models.User);
    }
  }
  information.init(
    {
      phoneNumber: DataTypes.STRING,
      address: DataTypes.STRING,
      UserId: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "information",
    }
  );
  return information;
};
