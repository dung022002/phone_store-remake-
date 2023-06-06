const express = require("express");
const {
  allBrand,
  create,
  update,
  deleteBrand,
} = require("../services/brand.service");

const brandRouter = express.Router();

brandRouter.get("/", async (req, res) => {
  try {
    const response = await allBrand();
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

brandRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newBrand = await create(data);
    return res.status(200).json(newBrand);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

brandRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const newData = await update(id, data);
    return res.status(200).json(newData);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

brandRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteBrand(id);
    return res.status(200).json({ msg: "brand deleted" });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

module.exports = { router: brandRouter, route: "/brands" };
