const Staff = require("../models/staff");

async function allStaff() {
  const staffs = await Staff.findAll();
  staffs = JSON.parse(JSON.stringify(staffs));
  delete staffs.password;
  console.log(staffs);
  return staffs;
}

async function newStaff(data) {
  return Staff.create(data);
}

async function staffDetail(id) {
  return Staff.findOne({ where: { id } });
}

async function updateData(id, data) {
  await Staff.update(data, { where: { id } });
  return Staff.findByPk(id);
}

async function deleteStaff(id) {
  return Staff.destroy({ where: { id } });
}

module.exports = {
  allStaff,
  newStaff,
  staffDetail,
  updateData,
  deleteStaff,
};
