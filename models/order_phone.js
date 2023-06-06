const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../sequelize");

const OrderPhone = sequelize.define("orderPhone", {
  orderId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  phoneId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
});

module.exports = OrderPhone;
