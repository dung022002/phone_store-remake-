const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");

const Position = sequelize.define("position", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Position;
