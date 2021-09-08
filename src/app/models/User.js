const { Schema, model } = require("mongoose");
const Role = require("./Role");
const User = new Schema({
  email: {
    type: String,
    required: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Please enter a valid email",
    ],
    trim: true,
    unique: true,
  },
  password: { type: String, required: true },
  role: {
    type: Schema.Types.ObjectId,
    ref: "Role",
    required: [true, "Role Field is Missing"],
  },
});

User.pre("validate", async function (next) {
  if (!this.role) {
    const customerRole = await Role.findOne({ name: "customer" });
    this.role = await customerRole._id;
  }

  return next();
});
module.exports = model("User", User);
