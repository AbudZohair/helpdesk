const { Schema, model, modelNames } = require("mongoose");

const allModels = [...modelNames(), "Ticket", "Role"];
const Role = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ["Super Admin", "agent", "customer"],
    default: "customer",
  },
  super_admin: {
    type: Boolean,
    required: false,
    default: false,
  },
  grants: [
    {
      resource: {
        type: String,
        enum: allModels,
      },
      actions: [
        {
          action: {
            type: String,
            unique: false,
            enum: [
              "*",
              "search",
              "show",
              "list",
              "new",
              "edit",
              "delete",
              "bulkDelete",
              "addReply",
            ],
          },
        },
      ],
    },
  ],
});

module.exports = model("Role", Role);
