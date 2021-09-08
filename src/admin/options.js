const resources = require("./resources");
const AdminBro = require("adminjs");

const User = require("../app/models/User");
const Role = require("../app/models/Role");

module.exports = {
  resources,
  rootPath: "/admin",
  dashboard: {
    component: AdminBro.bundle("./components/dashboard/Dashboard"),
    handler: async (req, res, ctx) => {
      const Ticket = ctx._admin.findResource("Ticket");
      const tickets = await Ticket.count();

      const customerRole = await Role.findOne({ name: "customer" });
      const users = await User.countDocuments({
        role: customerRole._id,
      });
      return {
        role: ctx.currentAdmin.role,
        tickets,
        users,
      };
    },
  },
  branding: {
    logo: false,
    companyName: "HelpDesk",
    softwareBrothers: false,
  },
  assets: {
    scripts: ["/custom.js"],
    styles: ["/custom.css"],
  },
};
