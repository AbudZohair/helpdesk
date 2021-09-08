const UserModel = require("../app/models/User");
const RoleModel = require("../app/models/Role");
const AdminBro = require("adminjs");
const argon2 = require("argon2");

module.exports = {
  branding: {
    logo: false,
    companyName: "HelpDesk",
    softwareBrothers: false,
  },
  locale: {
    translations: {
      labels: {
        navigation: "",
      },
    },
  },
  rootPath: "/register",
  dashboard: {
    component: AdminBro.bundle("./components/dashboard/registerDashboard.jsx"),
  },
  resources: [
    {
      resource: RoleModel,
      options: {
        actions: {
          new: { isAccessible: false },
          edit: {
            isAccessible: false,
          },
          list: {
            isAccessible: false,
          },
          show: {
            isAccessible: false,
          },
        },
      },
    },
    {
      resource: UserModel,
      options: {
        properties: {
          password: {
            type: "password",
          },
        },
        editProperties: ["email", "password"],
        actions: {
          edit: {
            isAccessible: false,
            hideActionHeader: true,
          },
          list: {
            isAccessible: false,
          },
          new: {
            hideActionHeader: true,
            component: AdminBro.bundle("./components/register/Register.jsx"),
            containerWidth: [1 / 2],
            after: async (res, req, ctx) => {
              if (!res.record.id) return res;
              res.redirectUrl = "/admin/login";
              res.notice = {
                message: "You Account created successfully",
                type: "success",
              };
              return res;
            },
            before: async function (request) {
              if (request.payload.password) {
                request.payload = {
                  ...request.payload,
                  password: await argon2.hash(request.payload.password),
                };
              }

              return request;
            },
          },
        },
      },
    },
  ],
};
