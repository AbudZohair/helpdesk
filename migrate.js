require("dotenv").config();
const argon2 = require("argon2");
const mongoose = require("mongoose");

const Role = require("./src/app/models/Role");
const User = require("./src/app/models/User");

const { MONGO_URI } = process.env;

init();
async function init() {
  console.log("Initing migrations");

  await mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("Connected to", MONGO_URI);

  console.log();
  console.log("\x1b[34mCreating Role");

  const roleId = mongoose.Types.ObjectId();
  await new Role({
    _id: roleId,
    name: "Super Admin",
    super_admin: true,
  }).save();
  await new Role({
    _id: mongoose.Types.ObjectId(),
    name: "customer",
    super_admin: false,
  }).save();

  await new Role({
    _id: mongoose.Types.ObjectId(),
    name: "agent",
    super_admin: false,
  }).save();
  console.log("Creating User");

  const password = await argon2.hash("admin");
  await new User({
    email: "admin@admin.com",
    password: password,
    role: roleId,
  }).save();

  await mongoose.disconnect();
  console.log();
  console.log("\x1b[42m\x1b[37m", "Migration finished\x1b[0m");
  console.log("User: \x1b[4madmin@admin.com\x1b[0m");
  console.log("Password: \x1b[4madmin\x1b[0m");
}
