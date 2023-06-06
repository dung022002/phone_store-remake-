const express = require("express");
const {
  allPhone,
  create,
  deletePhone,
  update,
  phoneDetail,
} = require("../services/phone.service");
const phoneRouter = express.Router();

phoneRouter.get("/", async (req, res) => {
  const response = await allPhone();
  return res.json(response);
});

phoneRouter.post("/", async (req, res) => {
  try {
    const body = req.body;
    const newPhone = await create(body);
    return res.status(200).json(newPhone);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

phoneRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deletePhone(id);
    return res.status(200).json({ msg: "deleted completed" });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

phoneRouter.put("/:id", async (req, res) => {
  try {
    const data = req.body;
    const id = req.params.id;
    const updatePhone = await update(id, data);
    return res.status(200).json(updatePhone);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

phoneRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await phoneDetail(id);
    return res.json(response);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ error: err });
  }
});
module.exports = { router: phoneRouter, route: "/phones" };
