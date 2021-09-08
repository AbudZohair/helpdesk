const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const { config } = require("./src/config/config");
const admin = require("./src/admin/router");
const register = require("./src/register/router");

// Read Env
dotenv.config();

const app = express();
app.use(express.static("public"));
app.get("/", (req, res, next) => {
  res.redirect("/admin/login");
});
app.use("/admin", admin);
app.use("/register", register);

const run = async () => {
  await connectDB();
  app.listen(config().PORT, () => {
    console.log(`Server is running on port ${config().PORT}`);
  });
};

run();
