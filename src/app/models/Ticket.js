const { Schema, model } = require("mongoose");
const Comment = require("./Comment");
const User = require("./User");
const Ticket = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    status: {
      type: String,
      required: true,
      enum: ["Active", "Pending", "Closed"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
    collection: "Ticket",
  }
);

Ticket.virtual("replies", {
  ref: "Comment",
  localField: "_id",
  foreignField: "ticket",
});

Ticket.pre("findOne", function (next) {
  this.populate({
    path: "replies",
    populate: { path: "author", model: User },
  });
  next();
});

// Cascade Deleting Related Replies

Ticket.pre("findOneAndRemove", async function (next) {
  await Comment.deleteMany({ ticket: this._conditions._id });
  next();
});
module.exports = model("Ticket", Ticket);
