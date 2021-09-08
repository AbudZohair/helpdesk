const mongoose = require("mongoose");
const { config } = require("./config");

const connectDB = async () => {
  await mongoose.connect(config().DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("DB connected successfully");
};

module.exports = connectDB;
