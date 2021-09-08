const AdminBroExpress = require("@adminjs/express");
const AdminBro = require(".");
const mongoose = require("mongoose");
require("dotenv").config();
const userModel = require("../app/models/User");
const roleModel = require("../app/models/Role");

const { authenticationClosure } = require("./auth");

const authenticate = authenticationClosure({
  userModel,
  roleModel,
});

const options = {
  cookieName: "helpdesk",
  cookiePassword: process.env.COOKIE_SECRET,
  authenticate,
};

module.exports = AdminBroExpress.buildAuthenticatedRouter(
  AdminBro,
  options,
  null,
  { resave: false, saveUninitialized: true }
);
