const Position = require("../models/position");

async function allPosition() {
  return await Position.findAll();
}

async function detail(id) {
  return await Position.findByPk(id);
}

async function update(id, data) {
  await Position.update(data, { where: { id } });
  return Position.findByPk(id);
}

async function create(data) {
  return Position.create(data);
}

async function remove(id) {
  return await Position.destroy({ where: { id } });
}

module.exports = { allPosition, detail, update, create, remove };
