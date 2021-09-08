const AdminBroExpress = require("@adminjs/express");
const AdminBro = require(".");

module.exports = AdminBroExpress.buildRouter(AdminBro);
