const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");
const OrderPhone = require("./order_phone");
const Staff = require("./staff");

const Order = sequelize.define("order", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  staffId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Order.hasMany(OrderPhone, { foreignKey: "orderId" });
OrderPhone.belongsTo(Order, { foreignKey: "orderId" });

module.exports = Order;
