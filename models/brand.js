const { DataTypes } = require("sequelize");
const { sequelize } = require("../sequelize");
const Phone = require("./phone");

const Brand = sequelize.define("brand", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  brandName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Brand.hasMany(Phone, { foreignKey: "brandId" });

module.exports = Brand;
