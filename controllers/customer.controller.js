const express = require("express");
const {
  allCustomer,
  create,
  customerDetail,
  deleteCustomer,
  update,
} = require("../services/customer.service");
const Customer = require("../models/customer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { logged } = require("../middleware/middleware");
require("dotenv").config();

const customerRouter = express.Router();

customerRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const customer = await customerDetail(id);
    return res.status(200).json(customer);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

customerRouter.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await deleteCustomer(id);
    return res.status(200).json({ msg: "customer deleted" });
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

customerRouter.put("/:id", async (req, ses) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const newData = await update(id, data);
    return res.status(200).json(newData);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

customerRouter.post(
  "/signup",

  // middleware kiểm tra sự tồn tại của người dùng
  async (req, res, next) => {
    const customer = await Customer.findOne({
      where: { userName: req.body.userName },
    });
    if (customer) {
      return res.status(409).json({ msg: "this username has already existed" });
    } else {
      next();
    }
  },
  async (req, res) => {
    try {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const customer = new Customer({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName: req.body.userName,
        password: hash,
      });
      const result = await customer.save();
      return res.status(201).json({
        msg: "new customer created",
        customerInfo: result,
      });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
);

customerRouter.post(
  "/login",

  // middleware xác thực người dùng
  async (req, res, next) => {
    const customer = await Customer.findOne({
      where: { userName: req.body.userName },
    });
    if (!customer) {
      return res
        .status(409)
        .json({ msg: "user name or password is incorrect" });
    } else {
      const result = bcrypt.compareSync(req.body.password, customer.password);
      if (result) {
        req.auth = JSON.parse(JSON.stringify(customer));
        next();
      } else {
        return res
          .status(409)
          .json({ msg: "user name or password is incorrect" });
      }
    }
  },
  async (req, res) => {
    try {
      const abc = req.auth;
      delete abc.password;
      // tạo 1 jwt trả về client
      const token = jwt.sign(
        {
          id: abc.id,
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "365d",
        }
      );
      abc.token = token;

      return res.status(200).json(abc);
    } catch (error) {
      return res.status(400).json(error);
    }
  }
);

customerRouter.get("/", logged, async (req, res) => {
  try {
    const user = req.auth;
    if (user) {
      return res.status(200).json(user);
    } else {
      return res.status(400).json({ error: "not auth" });
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

module.exports = { router: customerRouter, route: "/customers" };
