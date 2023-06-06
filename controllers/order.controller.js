const express = require("express");
const { allOrder, create, orderDetail } = require("../services/order.service");

const orderRouter = express.Router();

orderRouter.get("/", async (req, res) => {
  try {
    return res.status(200).json(await allOrder);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

orderRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    return res.status(200).json(await create(data));
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

orderRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    return res.status(200).json(await orderDetail(id));
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

module.exports = { router: orderRouter, route: "/orders" };
