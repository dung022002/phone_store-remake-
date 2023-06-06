const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Inventory = sequelize.define("inventory", {
  phoneId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  storeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: false,
  },
  stocking: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Inventory;
