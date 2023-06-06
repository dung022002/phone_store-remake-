const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Store = sequelize.define("store", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  addressId: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Store;
