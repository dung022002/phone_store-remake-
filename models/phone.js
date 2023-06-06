const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");
const OrderPhone = require("./order_phone");

const Phone = sequelize.define("phone", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  image: {
    type: DataTypes.STRING,
  },
  modelName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dimension: {
    type: DataTypes.STRING,
  },
  chipset: {
    type: DataTypes.STRING,
  },
  displayType: {
    type: DataTypes.STRING,
  },
  displaySize: {
    type: DataTypes.STRING,
  },
  displayResolution: {
    type: DataTypes.STRING,
  },
  refreshRate: {
    type: DataTypes.STRING,
  },
  mainCamera: {
    type: DataTypes.STRING,
  },
  selfieCamera: {
    type: DataTypes.STRING,
  },
  memory: {
    type: DataTypes.STRING,
  },
  storage: {
    type: DataTypes.STRING,
  },
  SIM: {
    type: DataTypes.STRING,
  },
  battery: {
    type: DataTypes.STRING,
  },
  charge: {
    type: DataTypes.STRING,
  },
  security: {
    type: DataTypes.STRING,
  },
  releaseYear: {
    type: DataTypes.STRING,
  },
  price: {
    type: DataTypes.STRING,
  },
});

Phone.hasMany(OrderPhone, { as: "order", foreignKey: "phoneId" });
OrderPhone.belongsTo(Phone, { as: "phone", foreignKey: "phoneId" });

module.exports = Phone;
