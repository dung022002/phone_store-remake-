const DataTypes = require("sequelize");
const { sequelize } = require("../sequelize");
const Staff = require("./staff");

const Salary = sequelize.define("salary", {
  staffId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  month: {
    type: DataTypes.STRING,
  },
  year: {
    type: DataTypes.STRING,
  },
});

Staff.hasMany(Salary, { foreignKey: "staffId" });
Salary.belongsTo(Staff, { foreignKey: "staffId" });

module.exports = Salary;
