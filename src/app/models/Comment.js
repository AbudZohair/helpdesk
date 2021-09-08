const { Schema, model } = require("mongoose");

const Comment = new Schema(
  {
    body: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ticket: {
      type: Schema.Types.ObjectId,
      ref: "Ticket",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

Comment.post("save", async function (doc) {
  await this.model("Ticket").findByIdAndUpdate(
    {
      _id: doc.ticket,
    },
    {
      updatedAt: Date.now(),
    }
  );
});

module.exports = model("Comment", Comment);
