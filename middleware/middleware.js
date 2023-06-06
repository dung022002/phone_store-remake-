const jwt = require("jsonwebtoken");
const Customer = require("../models/customer");
const Staff = require("../models/staff");
const Position = require("../models/position");

// middleware xác minh người dùng
async function logged(req, res, next) {
  const token = req.headers.authorization.replace("bearer ", "");
  if (!token) {
    req.auth = null;
    next();
  } else {
    try {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (payload && payload.id) {
        let user = await Customer.findByPk(payload.id);
        user = JSON.parse(JSON.stringify(user));
        delete user.password;
        req.auth = user;
        next();
      } else {
        req.auth = null;
        next();
      }
    } catch (error) {
      req.auth = null;
      next();
    }
  }
}

// middleware xác minh nhân viên
async function auth(req, res, next) {
  const token = req.headers.authorization.replace("bearer ", "");
  if (!token) {
    req.auth = null;
    next();
  } else {
    try {
      const payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      if (payload && payload.id) {
        let user = await Staff.findByPk(payload.id);
        user = JSON.parse(JSON.stringify(user));
        delete user.password;
        req.auth = user;
        next();
      } else {
        req.auth = null;
        next();
      }
    } catch (error) {
      req.auth = null;
      next();
    }
  }
}

// middleware xác minh quản lý
async function isManager(req, res, next) {
  try {
    if (!req.auth) {
      req.auth = null;
      next();
    } else {
      const user = req.auth;
      if (user.id == 1) {
        next();
      } else {
        req.auth = null;
        next();
      }
    }
  } catch (error) {
    req.auth = null;
    next();
  }
}

module.exports = { auth, isManager, logged };
