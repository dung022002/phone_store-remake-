const Store = require("../models/store");

async function allStore() {
  return await Store.findAll();
}

async function storeDetail(id) {
  return await Store.findByPk(id);
}

async function newStore(data) {
  return await Store.create(data);
}

async function update(id, data) {
  await Store.update(data, { where: { id } });
  return Store.findByPk(id);
}

async function remove(id) {
  return await Store.destroy({ where: { id } });
}

module.exports = { allStore, storeDetail, newStore, update, remove };
