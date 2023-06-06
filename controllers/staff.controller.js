const express = require("express");
const {
  allStaff,
  newStaff,
  staffDetail,
  updateData,
  deleteStaff,
} = require("../services/staff.service");
const Staff = require("../models/staff");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { auth, isManager } = require("../middleware/middleware");
const staffRouter = express.Router();

staffRouter.get("/", async (req, res) => {
  try {
    const response = await allStaff();
    response = JSON.parse(JSON.stringify(response));
    delete response.password;
    return res.status(200).json(response);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

staffRouter.post("/", async (req, res) => {
  try {
    const data = req.body;
    const staff = await newStaff(data);
    return res.status(200).json(staff);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

staffRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const detail = await staffDetail(id);
    return res.status(200).json(detail);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

staffRouter.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const data = req.body;
    const newUpdate = await updateData(id, data);
    return res.status(200).json(newUpdate);
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

staffRouter.post(
  "/signup",
  async (req, res, next) => {
    const staff = await Staff.findOne({
      where: { userName: req.body.userName },
    });
    if (staff) {
      return res.status(409).json({ msg: "this username has already existed" });
    } else {
      next();
    }
  },
  async (req, res) => {
    try {
      const hash = bcrypt.hashSync(req.body.password, 10);
      const staff = new Staff({
        image: req.body.image,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        positionId: req.body.positionId,
        mail: req.body.mail,
        userName: req.body.userName,
        password: hash,
      });
      const result = await staff.save();
      return res.status(201).json({
        msg: "new staff created",
        customerInfo: result,
      });
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  }
);

staffRouter.post(
  "/login",
  async (req, res, next) => {
    const staff = await Staff.findOne({
      where: { userName: req.body.userName },
    });
    if (!staff) {
      return res
        .status(409)
        .json({ msg: "user name or password is incorrect" });
    } else {
      const result = bcrypt.compareSync(req.body.password, staff.password);
      if (result) {
        req.auth = JSON.parse(JSON.stringify(staff));
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

staffRouter.delete("/:id", auth, isManager, async (req, res) => {
  try {
    const id = req.params.id;
    const staff = await Staff.findByPk(id);
    if (!staff) {
      return res.status(404).json({ msg: "staff is not exists " });
    }
    if (req.auth) {
      await deleteStaff(id);
      return res.status(200).json({ msg: "staff deleted" });
    } else {
      return res.status(401).json({ msg: "not auth" });
    }
  } catch (err) {
    return res.status(400).json({ error: err });
  }
});

module.exports = { router: staffRouter, route: "/staffs" };
