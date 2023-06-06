const express = require("express");
const storeRouter = express.Router();
const {
  allStore,
  storeDetail,
  newStore,
  update,
  remove,
} = require("../services/store.service");

storeRouter.get("/", async (req, res) => {
  try {
    const res = await allStore();
    return res.status(200).json(res);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});
storeRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const detail = await storeDetail(id);
    return res.status(200).json(detail);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

storeRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newBrand = await newStore(data);
    return res.status(200).json(newBrand);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

storeRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const newData = await update(id, data);
    return res.status(200).json(newData);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

storeRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await remove(id);
    return res.status(200).json({ msg: "brand deleted" });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

module.exports = { router: storeRouter, route: "/store" };
