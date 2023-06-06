const DataTypes = require("sequelize");
const { sequelize } = require("../sequelize");
const Order = require("./order");

const Staff = sequelize.define("staff", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.STRING,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  positionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
  },
  userName: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});

module.exports = Staff;
