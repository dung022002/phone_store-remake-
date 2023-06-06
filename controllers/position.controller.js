const express = require("express");
const positionRouter = express.Router();
const {
  allPosition,
  detail,
  update,
  create,
  remove,
} = require("../services/position.service");

positionRouter.get("/", async (req, res) => {
  try {
    const response = await allPosition();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

positionRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const response = await detail(id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

positionRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    const response = await create(data);
    return res.status(200).json(response);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: error });
  }
});

positionRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const response = await update(id, data);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error });
  }
});

module.exports = { router: positionRouter, route: "/position" };
