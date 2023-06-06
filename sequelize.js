const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("phone store remake", "postgres", "02102002", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = { sequelize };
