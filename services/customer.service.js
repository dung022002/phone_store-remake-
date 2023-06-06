const Customer = require("../models/customer");

async function allCustomer() {
  return Customer.findAll();
}

async function create(data) {
  return Customer.create(data);
}

async function customerDetail(id) {
  return Customer.findOne({ where: { id } });
}

async function deleteCustomer(id) {
  return Customer.destroy({ where: { id } });
}

async function update(id, data) {
  await Customer.update(data, { where: { id } });
  return Customer.findByPk(id);
}

module.exports = {
  allCustomer,
  create,
  customerDetail,
  deleteCustomer,
  update,
};
