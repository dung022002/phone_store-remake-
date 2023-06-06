const DataTypes = require("sequelize");
const { sequelize } = require("../sequelize");
const Order = require("./order");

const Customer = sequelize.define("customer", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userName: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
  },
});
Customer.hasMany(Order, { foreignKey: "customerId" });
Order.belongsTo(Customer, { foreignKey: "customerId" });

module.exports = Customer;
