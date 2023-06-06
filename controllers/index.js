const orderControllers = require("./order.controller");
const phoneControllers = require("./phone.controller");
const staffControllers = require("./staff.controller");
const customerControllers = require("./customer.controller");
const brandControllers = require("./brand.controller");
const positionController = require("./position.controller");

module.exports = [
  phoneControllers,
  orderControllers,
  staffControllers,
  customerControllers,
  brandControllers,
  positionController,
];
