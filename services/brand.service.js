const Brand = require("../models/brand");

async function allBrand() {
  return Brand.findAll();
}

async function create(data) {
  return await Brand.create(data);
}

async function update(id, data) {
  await Brand.update(data, { where: { id } });
  return Brand.findByPk(id);
}

async function deleteBrand(id) {
  return Brand.destroy({ where: { id } });
}

module.exports = { allBrand, create, update, deleteBrand };
