const Phone = require("../models/phone");

async function allPhone() {
  const data = await Phone.findAll();
  return data;
}

async function create(data) {
  const newPhone = await Phone.create(data);
  return newPhone;
}

async function deletePhone(id) {
  return Phone.destroy({
    where: { id },
  });
}

async function update(id, data) {
  await Phone.update(data, { where: { id } });
  const detail = await Phone.findByPk(id);
  return detail;
}

async function phoneDetail(id) {
  const data = await Phone.findOne({ where: { id } });
  return data;
}

module.exports = { allPhone, create, deletePhone, update, phoneDetail };
