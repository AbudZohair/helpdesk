const MongooseAdapter = require("@adminjs/mongoose");
const AdminBro = require("adminjs");
AdminBro.registerAdapter(MongooseAdapter);

const registerOptions = require("./registerOptions");

module.exports = new AdminBro(registerOptions);
